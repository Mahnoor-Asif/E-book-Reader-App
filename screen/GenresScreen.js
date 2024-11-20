import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { firebaseDatabase } from "../firebase"; // Import Firebase methods
import { ref, set, get } from "firebase/database";

const GenresScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [bookCovers, setBookCovers] = useState({});

  const books = [
    { id: 1, title: "The Adventures of Sherlock Holmes", author: "Lena Williams", pages: 320 },
    { id: 2, title: "Jurassic Park", author: "David Hartman", pages: 290 },
    { id: 3, title: "The Time Machine", author: "Ella Turner", pages: 270 },
    { id: 4, title: "Frankenstein", author: "Michael Adams", pages: 380 },
    { id: 5, title: "Shadows of Yesterday", author: "Sophia Green", pages: 310 },
    { id: 6, title: "Beyond the Sea", author: "James Sullivan", pages: 225 },
    { id: 7, title: "Echoes of the Forgotten", author: "Rebecca Hayes", pages: 240 },
    { id: 8, title: "The Twilight King", author: "Henry Parker", pages: 400 },
    { id: 9, title: "Moonlit Dreams", author: "Isabella Clarke", pages: 215 },
  ];

  useEffect(() => {
    books.forEach((book) => {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${book.title}`)
        .then((response) => {
          const bookData = response.data.items?.[0];
          if (bookData?.volumeInfo.imageLinks?.thumbnail) {
            setBookCovers((prev) => ({
              ...prev,
              [book.title]: bookData.volumeInfo.imageLinks.thumbnail,
            }));
          }
        })
        .catch((error) => console.error("Error fetching book cover:", error));
    });

    // Fetch favorites from Firebase
    const favoritesRef = ref(firebaseDatabase, "/favorites");
    get(favoritesRef).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        const favoritesList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setFavorites(favoritesList);
      }
    });
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleFavorite = (book) => {
    if (favorites.some((fav) => fav.id === book.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== book.id));
      alert(`${book.title} removed from favorites`);
      // Remove from Firebase
      const favoriteRef = ref(firebaseDatabase, `/favorites/${book.id}`);
      set(favoriteRef, null);
    } else {
      setFavorites([...favorites, { ...book, imageUrl: bookCovers[book.title] || "https://via.placeholder.com/150" }]);
      alert(`${book.title} added to favorites`);
      // Add to Firebase
      const favoriteRef = ref(firebaseDatabase, `/favorites/${book.id}`);
      set(favoriteRef, { ...book, imageUrl: bookCovers[book.title] || "https://via.placeholder.com/150" });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#FF4081" />
        </TouchableOpacity>
        <Text style={styles.heading}>Fiction Books</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search books..."
          placeholderTextColor="#9E9E9E"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {filteredBooks.map((book) => (
          <View key={book.id} style={styles.bookCard}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BookDetail", { book });
              }}
              style={styles.bookImageContainer}
            >
              <Image
                source={{ uri: bookCovers[book.title] || "https://via.placeholder.com/150" }}
                style={styles.bookCoverImage}
              />
            </TouchableOpacity>
            <View style={styles.bookDetailsContainer}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>Author: {book.author}</Text>
              <Text style={styles.bookPages}>Pages: {book.pages}</Text>
            </View>
            <TouchableOpacity onPress={() => handleFavorite(book)} style={styles.favoriteIconContainer}>
              <Icon
                name={favorites.some((fav) => fav.id === book.id) ? "heart" : "heart-o"}
                size={25}
                style={favorites.some((fav) => fav.id === book.id) ? styles.iconFilled : styles.iconEmpty}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.viewFavButton}
        onPress={() => navigation.navigate("Fav", { favorites })}
      >
        <Text style={styles.viewFavText}>View Favorites</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", marginTop: 40 },
  header: { flexDirection: "row", alignItems: "center", padding: 20, backgroundColor: "#F5F5F5" },
  heading: { fontSize: 24, fontWeight: "bold", color: "#FF4081", marginLeft: 10 },
  searchContainer: { margin: 10 },
  searchInput: {
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  scrollContainer: { flex: 1 },
  scrollContent: { alignItems: "center" },
  bookCard: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
    width: "90%",
  },
  bookImageContainer: { marginRight: 10 },
  bookCoverImage: { width: 60, height: 90, borderRadius: 4 },
  bookDetailsContainer: { flex: 1 },
  bookTitle: { fontSize: 18, fontWeight: "bold" },
  bookAuthor: { fontSize: 14, color: "#757575" },
  bookPages: { fontSize: 14, color: "#757575" },
  favoriteIconContainer: { marginLeft: 10 },
  iconFilled: { color: "#FF4081" },
  iconEmpty: { color: "#757575" },
  viewFavButton: { backgroundColor: "#FF4081", padding: 10, borderRadius: 8, margin: 10 },
  viewFavText: { color: "#FFF", textAlign: "center", fontWeight: "bold" },
});

export default GenresScreen;
