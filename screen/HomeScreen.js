import React from 'react';
import { View, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const genreImages = [
    { genre: 'Fiction', imageUrl: 'https://img.freepik.com/free-photo/open-book-concept-fiction-storytelling_23-2150793803.jpg' },
    { genre: 'Non-fiction', imageUrl: 'https://media.licdn.com/dms/image/v2/C4D12AQFwd6aXpolI6g/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1643197965018?e=2147483647&v=beta&t=5DKaSfghooQ0Ql-gJBdnVp7UONtnEUnxMsRa464wPUY' },
    { genre: 'Adventure', imageUrl: 'https://pics.craiyon.com/2023-07-12/9a2c7b98a9664580a12006146cd72dcd.webp' },
    { genre: 'Romantic', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2mtnsaR2PtoTxczEb9wsPCu7XsX8QwcNPYIdur4I-NCBamI6P9fxqPBELE4lU1YOWcI4&usqp=CAU' },
    { genre: 'Art', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh6LIvr7ft9OYk2bRU1i6ukiy9GoaUZmS8vQ&s' },
    { genre: 'Mystery', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThMypF2Ses8UOIv0ox3LMysx7pcUOny3tqKQ&s' },
    { genre: 'Science', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvCnzt1lsHvefZDJW4ANSPCxroZS9N6ZpuIA&s' },
    { genre: 'History', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCXjC-CtWqYPdOrqGSI_ZOdXzKyIQs5zmIJw&s' },
  ];

  const handleGenrePress = (genre) => {
    if (genre === 'Fiction') {
      navigation.navigate('Genres'); // Navigate to GenresScreen
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput 
          placeholder="Search books"
          style={styles.searchInput}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.featuredContainer}>
          <Image 
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOmbnpMzr0ZgCS1BngsOmn3znLKiy7v-gq_g&s' }}
            style={styles.featuredImage}
          />
          <Text style={styles.featuredText}>SEARCH INSTRUCTIVE BOOKS</Text>
        </View>

        <View style={styles.genresContainer}>
          <View style={styles.genresHeader}>
            <Text style={styles.sectionTitle}>Genres</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ViewAll')}>
              <Text style={styles.viewMore}>View more</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScrollContainer}>
            {genreImages.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleGenrePress(item.genre)} style={styles.genreWrapper}>
                <Image source={{ uri: item.imageUrl }} style={styles.genreImage} />
                <Text style={styles.genreText}>{item.genre}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.promoBanner}>
        <Text style={styles.promoTitle}>Book Sale Coming Soon!</Text>
        <Text style={styles.promoText}>Stay tuned for exclusive discounts on bestsellers and more.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', paddingTop: 30 },
  searchContainer: { padding: 12, backgroundColor: '#f5f5f5', marginHorizontal: 16, marginTop: 40, borderRadius: 8 },
  searchInput: { fontSize: 16, color:'#333' },
  scrollContent:{ paddingBottom :80 },

  featuredContainer:{ alignItems:'center', marginVertical :16},
  featuredImage:{ width:'95%', height :320 , borderRadius :8},
  featuredText:{ position:'absolute', fontSize :20 , fontWeight:'bold', color:'#ffffff', top :16 , left :16 , backgroundColor:'rgba(0 ,0 ,0 ,0.4)', padding :8 , borderRadius :5},
  
  genresContainer:{ paddingHorizontal :16 , marginBottom :10},
  genresHeader:{ flexDirection :'row' , justifyContent :'space-between' , alignItems :'center' , marginBottom :10},
  sectionTitle:{ fontSize :22 , fontWeight :'bold'},
  
  viewMore:{ color:'#007bff' , fontSize :16},
  
  imageScrollContainer:{ marginTop :10},
  genreWrapper:{ marginRight :16 , alignItems :'center'},
  
  genreImage:{ width :120 , height :180 , borderRadius :8},
  genreText:{ fontSize :14 , fontWeight :'bold' , textAlign :'center' , marginTop :8},

  promoBanner:{ position:'absolute', bottom :0 , left :0 , right :0 , backgroundColor:'#FF4081',
    paddingVertical :15 , paddingHorizontal :10 , alignItems:'center',
    borderTopLeftRadius :12 , borderTopRightRadius :12 ,
    shadowColor:'#000' , shadowOffset:{ width :0 , height :-2 } ,
    shadowOpacity :0.3 , shadowRadius :5 , elevation :5},
    
  promoTitle:{ color:'#ffffff' , fontSize :18 , fontWeight :'bold' , marginBottom :5},
  
  promoText:{ color:'#ffffff' , fontSize :14 , textAlign :'center'},
});

export default HomeScreen;