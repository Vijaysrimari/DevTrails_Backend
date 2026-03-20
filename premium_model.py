import argparse
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Tuple

import joblib
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns

from sklearn.compose import ColumnTransformer
from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor
from sklearn.impute import SimpleImputer
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler


# Required dataset columns
REQUIRED_COLUMNS = [
    "rainfall",
    "flood_risk",
    "aqi",
    "disruption_days",
    "worker_income",
    "zone_risk",
    "premium",
]

TARGET_COLUMN = "premium"
FEATURE_COLUMNS = [c for c in REQUIRED_COLUMNS if c != TARGET_COLUMN]


@dataclass
class ModelResult:
    name: str
    model: Pipeline
    r2: float
    mae: float
    mse: float


def load_dataset(csv_path: str) -> pd.DataFrame:
    """Load dataset and validate columns"""
    df = pd.read_csv(csv_path)

    missing_cols = [col for col in REQUIRED_COLUMNS if col not in df.columns]
    if missing_cols:
        raise ValueError(
            f"Missing columns: {missing_cols}. Expected columns: {REQUIRED_COLUMNS}"
        )

    return df[REQUIRED_COLUMNS].copy()


def preprocess_and_split(
    df: pd.DataFrame,
    test_size: float = 0.2,
    random_state: int = 42,
) -> Tuple[pd.DataFrame, pd.DataFrame, pd.Series, pd.Series]:
    """Prepare data and split into train/test"""

    df = df.copy()

    for col in REQUIRED_COLUMNS:
        df[col] = pd.to_numeric(df[col], errors="coerce")

    X = df[FEATURE_COLUMNS]
    y = df[TARGET_COLUMN]

    if y.isna().any():
        raise ValueError("Target column contains missing values.")

    return train_test_split(
        X, y, test_size=test_size, random_state=random_state
    )


def build_preprocessor() -> ColumnTransformer:
    """Preprocessing pipeline"""

    numeric_transformer = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler()),
        ]
    )

    return ColumnTransformer(
        transformers=[
            ("num", numeric_transformer, FEATURE_COLUMNS),
        ]
    )


def build_models(random_state: int = 42) -> Dict[str, Pipeline]:
    """Build ML models"""

    preprocessor = build_preprocessor()

    gradient_boosting = Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            ("regressor", GradientBoostingRegressor(
                n_estimators=300,
                learning_rate=0.05,
                max_depth=3,
                random_state=random_state
            )),
        ]
    )

    random_forest = Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            ("regressor", RandomForestRegressor(
                n_estimators=300,
                random_state=random_state,
                n_jobs=-1,
            )),
        ]
    )

    return {
        "GradientBoostingRegressor": gradient_boosting,
        "RandomForestRegressor": random_forest,
    }


def train_and_evaluate_models(
    models: Dict[str, Pipeline],
    X_train: pd.DataFrame,
    X_test: pd.DataFrame,
    y_train: pd.Series,
    y_test: pd.Series,
) -> List[ModelResult]:
    """Train models and evaluate performance"""

    results = []

    for name, model in models.items():
        model.fit(X_train, y_train)

        predictions = model.predict(X_test)

        result = ModelResult(
            name=name,
            model=model,
            r2=r2_score(y_test, predictions),
            mae=mean_absolute_error(y_test, predictions),
            mse=mean_squared_error(y_test, predictions),
        )

        results.append(result)

    return results


def select_best_model(results: List[ModelResult], min_r2: float = 0.85) -> ModelResult:
    """Select best model based on R² score"""

    best = sorted(results, key=lambda x: x.r2, reverse=True)[0]

    if best.r2 < min_r2:
        raise RuntimeError(
            f"Best model R²={best.r2:.4f} is below threshold {min_r2}"
        )

    return best


def print_metrics(results: List[ModelResult]):
    """Print evaluation metrics"""

    print("\nModel Evaluation Results")
    print("-" * 70)
    print(f"{'Model':30} {'R2 Score':>10} {'MAE':>10} {'MSE':>10}")
    print("-" * 70)

    for r in sorted(results, key=lambda x: x.r2, reverse=True):
        print(f"{r.name:30} {r.r2:10.4f} {r.mae:10.4f} {r.mse:10.4f}")

    print("-" * 70)


def plot_feature_importance(model: Pipeline, model_name: str, output_path: str):
    """Plot feature importance"""

    reg = model.named_steps["regressor"]

    if not hasattr(reg, "feature_importances_"):
        return

    importances = reg.feature_importances_

    df = pd.DataFrame({
        "feature": FEATURE_COLUMNS,
        "importance": importances
    }).sort_values("importance", ascending=False)

    plt.figure(figsize=(10, 6))
    sns.barplot(data=df, x="importance", y="feature", palette="viridis")

    plt.title(f"Feature Importance - {model_name}")
    plt.xlabel("Importance")
    plt.ylabel("Feature")

    plt.tight_layout()
    plt.savefig(output_path, dpi=200)
    plt.close()


def save_model(model: Pipeline, path: str):
    """Save trained model"""

    joblib.dump(model, path)


def load_saved_model(path: str) -> Pipeline:
    """Load trained model"""

    return joblib.load(path)


def predict_premium(model: Pipeline, worker_data: Dict[str, float]) -> float:
    """Predict premium for new worker"""

    df = pd.DataFrame([worker_data])

    df = df[FEATURE_COLUMNS]

    for col in FEATURE_COLUMNS:
        df[col] = pd.to_numeric(df[col], errors="coerce")

    prediction = model.predict(df)

    return float(np.asarray(prediction)[0])


def run_training_pipeline(
    csv_path: str,
    model_output_path: str = "premium_model.pkl",
    importance_plot_path: str = "feature_importance.png",
    min_r2: float = 0.85,
):

    df = load_dataset(csv_path)

    X_train, X_test, y_train, y_test = preprocess_and_split(df)

    models = build_models()

    results = train_and_evaluate_models(
        models, X_train, X_test, y_train, y_test
    )

    print_metrics(results)

    best = select_best_model(results, min_r2)

    print(
        f"\nBest Model: {best.name} | "
        f"R²={best.r2:.4f} MAE={best.mae:.4f} MSE={best.mse:.4f}"
    )

    save_model(best.model, model_output_path)

    plot_feature_importance(
        best.model,
        best.name,
        importance_plot_path,
    )

    print(f"\nModel saved to: {Path(model_output_path).resolve()}")
    print(f"Feature importance plot saved to: {Path(importance_plot_path).resolve()}")

    return best


def parse_args():
    parser = argparse.ArgumentParser(
        description="Train premium prediction model"
    )

    parser.add_argument(
        "--csv",
        required=True,
        help="Path to dataset CSV"
    )

    parser.add_argument(
        "--model-out",
        default="premium_model.pkl",
        help="Output model file"
    )

    parser.add_argument(
        "--plot-out",
        default="feature_importance.png",
        help="Feature importance output"
    )

    parser.add_argument(
        "--min-r2",
        type=float,
        default=0.85,
        help="Minimum R² score required"
    )

    return parser.parse_args()


if __name__ == "__main__":

    args = parse_args()

    run_training_pipeline(
        csv_path=args.csv,
        model_output_path=args.model_out,
        importance_plot_path=args.plot_out,
        min_r2=args.min_r2,
    )