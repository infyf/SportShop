from sklearn.neighbors import NearestNeighbors 
model = NearestNeighbors(n_neighbors= 2).fit(data[['Name', 'Price']]) 
distances, indices = model.kneighbors([[0.3, 0.7]])

print(data.iloc[indices[0]])
