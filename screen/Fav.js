import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { firebaseDatabase } from '../firebase'; // Import Firebase database instance
import { ref, onValue, remove, update } from "firebase/database"; // Import Firebase methods

const FavScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites from Firebase Realtime Database when navigating to the screen
  useEffect(() => {
    const favoritesRef = ref(firebaseDatabase, '/favorites');

    const onValueChange = onValue(favoritesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const favoritesList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setFavorites(favoritesList);
      } else {
        setFavorites([]); // If no favorites found, set empty array
      }
    });

    // Clean up the listener when the component is unmounted
    return () => {
      onValueChange(); // Unsubscribe from the database updates
    };
  }, []);

  const handleRemove = (bookId) => {
    Alert.alert(
      "Remove from Favorites",
      "Are you sure you want to remove this book from your favorites?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => removeFavorite(bookId) },
      ]
    );
  };

  const removeFavorite = (bookId) => {
    const favoriteRef = ref(firebaseDatabase, `/favorites/${bookId}`);
    remove(favoriteRef)
      .then(() => {
        setFavorites(favorites.filter((book) => book.id !== bookId));
        Alert.alert("Success", "Book removed from favorites.");
      })
      .catch((error) => {
        Alert.alert("Error", "An error occurred while removing the book.");
      });
  };

  const handleUpdate = (bookId, newTitle) => {
    const favoriteRef = ref(firebaseDatabase, `/favorites/${bookId}`);
    update(favoriteRef, { title: newTitle })
      .then(() => {
        setFavorites(favorites.map((book) => (book.id === bookId ? { ...book, title: newTitle } : book)));
        Alert.alert("Success", "Book title updated.");
      })
      .catch((error) => {
        Alert.alert("Error", "An error occurred while updating the book title.");
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.bookCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.bookCoverImage} />
      <View style={styles.bookDetailsContainer}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>Author: {item.author}</Text>
        <Text style={styles.bookPages}>Pages: {item.pages}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={() => {
            // Navigate to update screen or show an alert to update title
            Alert.prompt("Update Book Title", "Enter new title", [
              { text: "Cancel" },
              { text: "Update", onPress: (text) => handleUpdate(item.id, text) },
            ]);
          }}
        >
          <Icon name="edit" size={20} color="#FF4081" style={styles.editIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRemove(item.id)}>
          <Icon name="trash" size={20} color="red" style={styles.deleteIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // This navigates back to the previous screen
      >
        <Icon name="arrow-left" size={24} color="#FFF" />
      </TouchableOpacity>

      {/* Heading */}
      <Text style={styles.heading}>My Favorites</Text>

      {/* Data Display */}
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatList}
        />
      ) : (
        <Text style={styles.noFavoritesText}>No favorite books added yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFF" },

  // Back button at the top left
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: "#FF4081",
    borderRadius: 50,
    elevation: 3,
  },

  // Heading style
  heading: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#FF4081", 
    marginTop: 70,  // Added margin to avoid overlapping with back button
    marginBottom: 20,
  },

  flatList: { paddingBottom: 20 },

  bookCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    elevation: 3,
  },

  // Image styling
  bookCoverImage: {
    width: 80,  // Adjusted size for better visibility
    height: 120, // Adjusted size for better visibility
    borderRadius: 8,
    marginRight: 15,
  },

  bookDetailsContainer: { flex: 1 },
  bookTitle: { fontSize: 18, fontWeight: "bold" },
  bookAuthor: { fontSize: 14, color: "#757575" },
  bookPages: { fontSize: 14, color: "#757575" },
  actionsContainer: { flexDirection: "row", alignItems: "center" },
  editIcon: { marginRight: 10 },
  deleteIcon: {},
  noFavoritesText: { fontSize: 18, textAlign: "center", color: "#757575" },
});

export default FavScreen;
