import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { useAuth } from '../AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const CardComponent = ({ title, description, imageUri, duration }) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUri }}
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SessionCategories')}>
          <Text style={styles.buttonText}>Listen</Text>
        </TouchableOpacity>
        <Text style={styles.cardDuration}>{duration} minutes</Text>
      </View>
    </View>
  );
};

const CarouselComponent = ({ items }) => {
  return (
    <ScrollView 
      horizontal={true} 
      showsHorizontalScrollIndicator={false}
      style={{paddingHorizontal: 10}}
    >
      {items.map((item, index) => 
          <CardComponent 
              key={index}
              title={item.title} 
              description={item.description} 
              imageUri={item.imageUri} 
              duration={item.duration}
          />
      )}
    </ScrollView>
  );
};

const HomeScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      // Log the token to the console
      console.log("Token: ", user.token);
  
      fetch('http://192.168.0.14:3000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then(response => {
          // Log the response status to the console
          console.log("Response Status: ", response.status);
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          // Log the fetched user data to the console
          console.log("Fetched User Data: ", data);
          setUserData(data);
        })
        .catch(err => {
          // Log the error to the console
          console.error('Error fetching user data:', err);
        });
    }
  }, [user]);
  

  const buttonNames = ['Sleep', 'Anxiety', 'Happiness', 'Career', 'Love', 'Healing', 'Confidence','Motivation', 'Spiritual'];

  const carouselItems = [
    {
      title: "Sleep Deeper",
      description: "Take a journey to the deepest sleep",
      imageUri: "https://images.pexels.com/photos/2112008/pexels-photo-2112008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      duration: 18
    },
    {
      title: "Overcome Shyness",
      description: "Become the more confident version of you",
      imageUri: "https://images.pexels.com/photos/6357184/pexels-photo-6357184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      duration: 14
    },
    {
      title: "Uncover Your Hidden Happiness",
      description: "A sense of happiness lies deep inside you.",
      imageUri: "https://images.pexels.com/photos/774866/pexels-photo-774866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      duration: 22
    },
  ];

  const favouritesItems = [
    {
      title: "Ambvient Medatitive Sound",
      description: "Meditate to this relaxing sound",
      imageUri: "https://images.pexels.com/photos/268134/pexels-photo-268134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      duration: 10
    },
    {
      title: "Relentless Focus",
      description: "Increase your focus, get more done",
      imageUri: "https://images.pexels.com/photos/583437/pexels-photo-583437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      duration: 15
    },
  ];

  return (
    <View style={styles.container}>
      {/* <View style={styles.videoContainer}>
        <Video
          source={{ uri: 'https://res.cloudinary.com/djmeitgwd/video/upload/v1689604466/backgroundVideo_nfghph.mp4' }}
          style={StyleSheet.absoluteFill}
          shouldPlay
          isLooping
          resizeMode="cover"
          isMuted={true}
          rate={1}
        />
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.6)', 'transparent']}
          style={StyleSheet.absoluteFill}
        />
      </View> */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {user && userData && (
          <>
            <Text style={styles.title}>Hi {userData.name}!</Text>
            <CardComponent
              title="Morning Meditation for Today"
              description="A New Meditation Every Morning"
              imageUri="https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              duration={12}
            />
            {buttonNames.map((name, index) => 
              index % 3 === 0 ?
                <View style={styles.buttonRow} key={`row_${index}`}>
                  {buttonNames.slice(index, index+3).map((name) =>
                    <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate(name)} key={name}>
                      <Text style={styles.categoryButtonText}>{name}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              :
                null
            )}
            <TouchableOpacity style={styles.buttonSurprise} onPress={() => navigation.navigate('Recommendations')}>
              <Text style={styles.buttonText}>Surprise Me!</Text>
            </TouchableOpacity>
            <Text style={styles.title1}>Popular</Text>
            <CarouselComponent items={carouselItems} />
            <TouchableOpacity style={styles.surpriseButton} onPress={() => navigation.navigate('QuickStartSession')}>
              <Text style={styles.surpriseButtonText}>Surprise Me!</Text>
            </TouchableOpacity>
            <View style={styles.favouritesHeader}>
              <Text style={styles.title1}>Favourites</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <CarouselComponent items={favouritesItems} />
          </>
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 5,
  },
  // videoContainer: {
  //   height: '35%',
  //   zIndex: 1,
  //   borderRadius: 150,
  //   position: 'relative',
  // },
  scrollContainer: {
    marginTop: '0%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 0,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#0e536e',
  },
  title1: {
    fontSize: 20,
    //fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#0e536e',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 50,
    width: 180,
    backgroundColor: '#5f90a3',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTitle: {
    fontWeight: 'bold',
    color: '#fff',
  },

  categoryButton: {
    paddingVertical: 13,
    borderRadius: 15,
    width: '30%', // Adjust this value for space between buttons
    backgroundColor: 'transparent', // Change this to the desired background color
    borderWidth: 1, // Add a border width to make the border visible
    borderColor: 'rgba(101, 140, 156, 0.4)',
    alignItems: 'center',
  },
  categoryButtonText: {
    color: 'rgba(74, 101, 114, 0.5)',
    fontSize: 12, // Adjust this to change the text size
    fontWeight: 'bold',
  },
  surpriseButton:{
    backgroundColor: 'transparent', // Change this to the desired background color
    borderWidth: 1, // Add a border width to make the border visible
    borderColor: '#89cff0',
    paddingVertical: 12,
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    width: 180,
    marginVertical: 30,
  },
  surpriseButtonText:{
    color: '#89cff0',
    fontSize: 16,
  },

  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#4a6572',
  },
  card: {
    borderRadius: 10,
    width: 300,
    backgroundColor: 'rgba(200, 236, 250, 0.2)',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  cardContent: {
    padding: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10, 
  },
  cardTitle: {
    fontSize: 16,
    color: 'rgba(14, 83, 110, 0.6)',
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(134, 173, 189, 0.8)',

  },
  cardDuration: {
    fontSize: 12,
    color: 'rgba(134, 173, 189, 0.8)',

  },
  seeAllText: {
    alignSelf: 'center',
    alignItems: 'center',  },
});

export default HomeScreen;
