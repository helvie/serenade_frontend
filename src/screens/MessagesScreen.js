import { View , StyleSheet, ScrollView, Text} from "react-native";
import React  from "react";
import globalStyles from "../../utils/globalStyles";
import CardMessageContainer from "../components/CardMessageContainer";


const MessagesScreen = () => {

  const photosData1 = [
    {
      imageUrl: 'https://static.lacapsule.academy/faceup/picture1.jpg',
      name: 'John Doe',
      message: 'Hello there!',
      time: '10:30 AM'
    },
    {
      imageUrl: 'https://static.lacapsule.academy/faceup/picture2.jpg',
      name: 'Jane Smith',
      message: 'Nice to meet you!',
      time: '11:45 AM'
    },
    {
      imageUrl: 'https://static.lacapsule.academy/faceup/picture3.jpg',
      name: 'Michael Johnson',
      message: 'How are you?',
      time: '02:15 PM'
    },
    {
      imageUrl: 'https://static.lacapsule.academy/faceup/picture4.jpg',
      name: 'Emily Brown',
      message: 'Enjoying the day!',
      time: '05:20 PM'
    },
    {
      imageUrl: 'https://static.lacapsule.academy/faceup/picture1.jpg',
      name: 'David Wilson',
      message: 'What are your hobbies?',
      time: '08:10 PM'
    },
    {
      imageUrl: 'https://static.lacapsule.academy/faceup/picture2.jpg',
      name: 'Jane Smith',
      message: 'Nice to meet you!',
      time: '11:45 AM'
    },
    {
      imageUrl: 'https://static.lacapsule.academy/faceup/picture3.jpg',
      name: 'Michael Johnson',
      message: 'How are you?',
      time: '02:15 PM'
    },
    {
      imageUrl: 'https://static.lacapsule.academy/faceup/picture4.jpg',
      name: 'Emily Brown',
      message: 'Enjoying the day!',
      time: '05:20 PM'
    },
    
  ];
  

    const message = photosData1.map((data, i) => {
      return (
        <CardMessageContainer key={i}
        image={data.imageUrl}
        name={data.name}
        message={data.message}
        time={data.time} />
      );
    });
  

  

  return (
    <View style={globalStyles.screen} >
      <View style={styles.titleContainer} className=' space-y-6'> 
        <Text style={globalStyles.titleText}>My Messages</Text>
        <Text style={globalStyles.mainText}>Find your alterego among one of these people</Text>
      </View>
      <View style={styles.horizontalLine} />
      <ScrollView contentContainerStyle={styles.scrollViewContent} >
        <View style={globalStyles.container}>
          <View>
            <View style={styles.profilcontainer}>
              {message}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 20,
  },
  
  horizontalLine: {
    width: '100%',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    // marginVertical: 20,
    paddingBottom: 10,
    marginBottom:0,
  },
  scrollViewContent: {
    flexGrow: 1,
  },

  profilcontainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    justifyContent: 'center',
  },

})

export default MessagesScreen;