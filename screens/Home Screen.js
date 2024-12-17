// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ route }) => {
  const { userName } = route.params;  // Get username passed from Login Screen
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch recipes from the API
  const fetchRecipes = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/recipes');
      setRecipes(response.data.recipes);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch recipes.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const renderRecipe = ({ item }) => (
    <View style={styles.recipeCard}>
      <Image source={{ uri: item.image || 'https://via.placeholder.com/150' }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.shortDescription}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello, {userName}!</Text>
      <Button title="Refresh Recipes" onPress={fetchRecipes} />
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      {error ? <Text>{error}</Text> : null}
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    marginBottom: 20,
  },
  recipeCard: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
