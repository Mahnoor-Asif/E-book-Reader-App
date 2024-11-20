import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing FontAwesome for icons

const books = [
  { id: '1', title: 'Book 1', genre: 'Mystery', imageUrl: 'https://marketplace.canva.com/EAFXKFIDad4/1/0/1003w/canva-brown-mystery-novel-book-cover-cSu1pdo96zA.jpg' },
  { id: '2', title: 'Book 2', genre: 'Biography', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzas4ufFOONE43jZytxemEtX22XYnLjeTw1g&s' },
  { id: '3', title: 'Book 3', genre: 'Fantasy', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrIdaPAgUXB4L8p6aPCB_RYcsnJF43c7rEJA&s' },
  { id: '4', title: 'Book 4', genre: 'Science Fiction', imageUrl: 'https://marketplace.canva.com/EAFf0E5urqk/1/0/1003w/canva-blue-and-green-surreal-fiction-book-cover-53S3IzrNxvY.jpg' },
  { id: '5', title: 'Book 5', genre: 'Romance', imageUrl: 'https://marketplace.canva.com/EAFjJ3RcwLg/1/0/1003w/canva-blue-black-white-modern-concept-story-about-you-and-me-book-cover-5wv9XTNx5Vc.jpg' },
  { id: '6', title: 'Book 6', genre: 'Historical Fiction', imageUrl: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/history-book-cover-design-template-0e3961aae83cdeab2d3b120dd2d7063c_screen.jpg?ts=1692216756' },
  { id: '7', title: 'Book 7', genre: 'Horror', imageUrl: 'https://www.kboards.com/cdn-cgi/image/format=auto,onerror=redirect,width=1920,height=1920,fit=scale-down//media/horror-book-cover-design-scary-girl-gothic-mysterious-book-cover-young-devil-dark-halloween-ho-jpg.18/full' },
  { id: '8', title: 'Book 8', genre: 'Thriller', imageUrl: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/thriller-suspense-book-cover-design-template-1438d47348d378a3f26d2c78a2b48a54_screen.jpg?ts=1698340735' },
  { id: '9', title: 'Book 9', genre: 'Adventure', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7qiYC-rqN62-cjiZtjDL98zIeTi6lppRZqw&s' },
  { id: '10', title: 'Book 10', genre: 'Non-Fiction', imageUrl: 'https://covers.bookcoverzone.com/slir/w450/png24-front/bookcover0027564.jpg' },
];

const ViewAll = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.genre.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => {
        if (item.genre === 'Mystery') {
          navigation.navigate('Genres'); // Navigate to GenresScreen for Mystery
        }
      }}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.genreContainer}>
        <Text style={styles.genre}>{item.genre}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#FF4081" />
        </TouchableOpacity>
        <Text style={styles.heading}>All Books</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search by title or genre"
        value={search}
        onChangeText={setSearch}
      />
      
      <FlatList
        data={filteredBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10, backgroundColor:'#fff'},
  header: {
    flexDirection:'row',
    alignItems:'center',
    paddingVertical :20,
    paddingHorizontal :10,
    backgroundColor:'#F5F5F5',
    borderBottomWidth :1,
    borderBottomColor:'#DDD',
  },
  heading: { fontSize :22, fontWeight :'bold', color:'#FF4081', marginLeft :10 },
  searchBar: { height :40, borderColor :'#ddd', borderWidth :1, borderRadius :8, paddingHorizontal :10, marginBottom :10 },
  list: { paddingBottom :20 },
  card: { flex :1, marginRight :10, borderRadius :10, overflow :'hidden' },
  image: { width :'100%', height :150 },
  genreContainer: { position :'absolute', bottom :0, left :0, right :0, backgroundColor :'rgba(0,0,0,0.6)', paddingVertical :5 },
  genre: { color:'#fff', textAlign:'center' },
});

export default ViewAll;
