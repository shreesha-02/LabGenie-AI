# Machine Learning Knowledge Base

## Linear Regression

### Concept
Linear Regression is a supervised machine learning algorithm used to predict a continuous numerical value based on one or more input features.

### Working Principle
The algorithm finds a linear relationship between input variables and a target variable.

For simple linear regression, the relationship can be represented as:

y = mx + c

where y is the predicted value, x is the input, m is the slope, and c is the intercept.

The model learns the parameters by minimizing the difference between predicted and actual values, commonly using Mean Squared Error.

### Algorithm Steps
1. Collect a dataset containing input features and a continuous target.
2. Preprocess the data and handle missing values if required.
3. Split the dataset into training and testing sets.
4. Train the Linear Regression model using the training data.
5. Predict values for the test data.
6. Evaluate the model using suitable regression metrics.

### Important Properties
- Used for continuous numerical prediction.
- Common evaluation metrics include MAE, MSE, RMSE, and R².
- Simple and easy to interpret.
- Sensitive to strong outliers and unsuitable for highly non-linear relationships without transformation.

### Laboratory Requirements
- Computer or laptop
- Python
- NumPy and pandas
- scikit-learn
- Jupyter Notebook or equivalent Python environment
- Dataset containing numerical features and a continuous target

### Common Precautions
- Check for missing and inconsistent data.
- Examine outliers before training.
- Avoid data leakage between training and testing sets.
- Use appropriate evaluation metrics.
- Do not assume that every dataset has a linear relationship.

### Viva Topics
- What is Linear Regression?
- What is the difference between simple and multiple Linear Regression?
- What is Mean Squared Error?
- What is R² score?
- When should Linear Regression be used?


## Logistic Regression

### Concept
Logistic Regression is a supervised machine learning algorithm mainly used for classification problems. It estimates the probability that an observation belongs to a particular class.

### Working Principle
Logistic Regression applies the sigmoid function to a weighted combination of input features.

The sigmoid function converts the model output into a probability between 0 and 1.

For binary classification, a threshold such as 0.5 can be used to assign the prediction to one of two classes.

### Algorithm Steps
1. Collect a labeled classification dataset.
2. Clean and preprocess the data.
3. Encode categorical variables when necessary.
4. Split the dataset into training and testing sets.
5. Train the Logistic Regression model.
6. Predict class probabilities or class labels.
7. Evaluate the classifier using suitable metrics.

### Important Properties
- Commonly used for binary classification.
- Can also be extended to multiclass classification.
- Produces probability estimates.
- Common evaluation metrics include accuracy, precision, recall, F1-score, and ROC-AUC.
- Feature scaling may be useful depending on the dataset and implementation.

### Laboratory Requirements
- Computer or laptop
- Python
- pandas and NumPy
- scikit-learn
- Jupyter Notebook or equivalent Python environment
- Labeled classification dataset

### Common Precautions
- Check class imbalance before evaluating the model.
- Avoid data leakage.
- Encode categorical variables correctly.
- Choose an appropriate classification threshold when required.
- Do not evaluate the model only using accuracy when classes are highly imbalanced.

### Viva Topics
- What is Logistic Regression?
- Why is Logistic Regression used for classification?
- What is the sigmoid function?
- What is the difference between Linear and Logistic Regression?
- What is a classification threshold?


## K-Means Clustering

### Concept
K-Means is an unsupervised machine learning algorithm used to divide data points into a specified number of clusters.

### Working Principle
K-Means assigns each data point to the nearest cluster centroid and repeatedly updates the centroids until the cluster assignments stabilize or a stopping condition is reached.

### Algorithm Steps
1. Select the number of clusters K.
2. Initialize K cluster centroids.
3. Assign each data point to the nearest centroid.
4. Recalculate the centroid of each cluster.
5. Repeat the assignment and centroid-update steps.
6. Stop when the centroids or assignments no longer change significantly.

### Important Properties
- It is an unsupervised learning algorithm.
- The number of clusters K must normally be specified.
- Euclidean distance is commonly used.
- The Elbow Method can help select a suitable value of K.
- Sensitive to feature scaling and initialization.

### Laboratory Requirements
- Computer or laptop
- Python
- pandas and NumPy
- scikit-learn
- Matplotlib for visualization
- Dataset containing numerical features

### Common Precautions
- Scale features when their ranges differ significantly.
- Choose K carefully.
- Check for outliers because they can affect centroids.
- Run the algorithm with suitable initialization settings.
- Visualize clusters when possible.

### Viva Topics
- What is K-Means clustering?
- Why is K-Means called unsupervised learning?
- What is a centroid?
- What is the Elbow Method?
- What happens when the value of K is changed?


## Decision Tree

### Concept
A Decision Tree is a supervised machine learning algorithm used for classification and regression. It represents decisions using a tree-like structure of nodes and branches.

### Working Principle
The algorithm recursively divides the dataset using feature-based conditions. Internal nodes represent decisions, branches represent outcomes, and leaf nodes represent final predictions.

Common splitting measures include Gini Impurity, Entropy, and Information Gain.

### Algorithm Steps
1. Prepare and preprocess the dataset.
2. Select a suitable splitting criterion.
3. Find the feature and threshold that provide a useful split.
4. Divide the dataset into smaller groups.
5. Repeat the process recursively for the resulting groups.
6. Stop according to conditions such as maximum depth or minimum samples.
7. Use leaf nodes to make predictions.

### Important Properties
- Can be used for classification and regression.
- Easy to interpret and visualize.
- Can model non-linear relationships.
- Can handle numerical and categorical features depending on implementation.
- Deep trees may overfit the training data.
- Pruning or depth constraints can help reduce overfitting.

### Laboratory Requirements
- Computer or laptop
- Python
- pandas and NumPy
- scikit-learn
- Matplotlib or another visualization library
- Classification or regression dataset

### Common Precautions
- Avoid unnecessarily deep trees.
- Monitor training and testing performance.
- Use suitable splitting criteria.
- Check for overfitting.
- Use train-test splitting or cross-validation for evaluation.

### Viva Topics
- What is a Decision Tree?
- What is a root node?
- What is a leaf node?
- What is Gini Impurity?
- Why can Decision Trees overfit?


## K-Nearest Neighbors (KNN)

### Concept
K-Nearest Neighbors is a supervised machine learning algorithm that predicts the class or value of a data point using the closest training examples.

### Working Principle
For a new data point, KNN calculates its distance from training samples and selects the K nearest neighbors.

For classification, the most common class among the neighbors is usually selected. For regression, the average of the neighbors' target values can be used.

### Algorithm Steps
1. Collect and preprocess the dataset.
2. Choose the value of K.
3. Scale features when appropriate.
4. Calculate the distance between the new sample and training samples.
5. Select the K nearest samples.
6. Determine the prediction using the neighbors.
7. Evaluate the model using suitable metrics.

### Important Properties
- Simple and easy to understand.
- Can be used for classification and regression.
- Commonly uses Euclidean distance.
- Sensitive to feature scaling.
- Large datasets can make prediction computationally expensive.
- The choice of K affects model performance.

### Laboratory Requirements
- Computer or laptop
- Python
- pandas and NumPy
- scikit-learn
- Dataset for classification or regression

### Common Precautions
- Scale features when their ranges differ.
- Choose K carefully.
- Avoid unnecessarily large K values.
- Remove or handle noisy and irrelevant features when appropriate.
- Evaluate the model on unseen test data.

### Viva Topics
- What is KNN?
- What does K represent?
- Why is feature scaling important in KNN?
- What distance measure is commonly used?
- What happens when K is too small or too large?


## Data Preprocessing

### Concept
Data preprocessing is the process of preparing raw data for machine learning by cleaning, transforming, and organizing it into a suitable format.

### Working Principle
Machine learning models generally perform better when input data is consistent and appropriately represented. Preprocessing may include handling missing values, encoding categorical data, scaling numerical features, and splitting the dataset.

### Algorithm Steps
1. Collect and inspect the dataset.
2. Identify missing, duplicate, or inconsistent values.
3. Handle missing values using suitable methods.
4. Encode categorical variables when required.
5. Scale or normalize numerical features when required.
6. Detect and handle problematic outliers when appropriate.
7. Split the data into training and testing sets.
8. Use the processed data for model training and evaluation.

### Important Properties
- Improves data quality.
- Helps models work with numerical and categorical information appropriately.
- Feature scaling is important for algorithms based on distance or gradient optimization.
- Train-test splitting helps evaluate generalization.
- Preprocessing decisions should be based on the characteristics of the dataset.

### Laboratory Requirements
- Computer or laptop
- Python
- pandas and NumPy
- scikit-learn
- Jupyter Notebook or equivalent Python environment
- A dataset requiring preprocessing

### Common Precautions
- Avoid data leakage during preprocessing.
- Fit preprocessing transformations using training data when appropriate.
- Do not remove useful information without justification.
- Handle missing values carefully.
- Apply scaling consistently to training and test data.

### Viva Topics
- What is data preprocessing?
- Why is data cleaning important?
- What is feature scaling?
- What is data leakage?
- Why do we split data into training and testing sets?