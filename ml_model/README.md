# ML Model Assets

This folder contains model training assets:

- `premium_model.py`: Training and evaluation script.
- `insurance_premium_data.csv`: Training dataset.

Train and export model:

```bash
..\.venv\Scripts\python.exe premium_model.py --csv insurance_premium_data.csv --model-out ..\backend\premium_model.pkl
```
