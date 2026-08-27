from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    roc_auc_score,
)


def evaluate_model(model, X_test, y_test):
    predictions = model.predict(X_test)
    probabilities = model.predict_proba(X_test)[:, 1]

    print("\nClassification Report\n")
    print(classification_report(y_test, predictions))

    print("\nROC AUC")
    print(roc_auc_score(y_test, probabilities))

    print("\nConfusion Matrix")
    print(confusion_matrix(y_test, predictions))