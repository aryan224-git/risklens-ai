from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent
DATA_PATH = BASE_DIR / "data" / "creditcard.csv"

df = pd.read_csv(DATA_PATH)

print("=" * 60)
print("DATASET INFORMATION")
print("=" * 60)

print(df.info())

print("\n")

print("=" * 60)
print("MISSING VALUES")
print("=" * 60)

print(df.isnull().sum())

print("\n")

print("=" * 60)
print("CLASS DISTRIBUTION")
print("=" * 60)

print(df["Class"].value_counts())

print("\n")

fraud_percentage = (
    df["Class"].value_counts(normalize=True) * 100
)

print(fraud_percentage)

print("\n")

print("=" * 60)
print("STATISTICS")
print("=" * 60)

print(df.describe())