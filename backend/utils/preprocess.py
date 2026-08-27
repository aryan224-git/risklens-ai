from sklearn.model_selection import train_test_split


def split_data(df):
    X = df.drop("Class", axis=1)
    y = df["Class"]

    return train_test_split(
        X,
        y,
        test_size=0.2,
        stratify=y,
        random_state=42,
    )