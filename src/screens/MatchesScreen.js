import { View , StyleSheet, ScrollView, Image, Text} from "react-native";
import React , { useState } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import globalStyles from "../../utils/globalStyles";
import SwitchSelector from 'react-native-switch-selector';
import CardProfilContainer from "../components/CardProfile"

const MatchesScreen = () => {
  const options = [
    { label: 'My Matches', value: '1' },
    { label: 'Who likes me', value: '2' }
  ];

  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const photosData1 = [
    // 'https://static.lacapsule.academy/faceup/picture1.jpg',
    // 'https://static.lacapsule.academy/faceup/picture2.jpg',
    // 'https://static.lacapsule.academy/faceup/picture3.jpg',
    // 'https://static.lacapsule.academy/faceup/picture4.jpg',
    // 'https://static.lacapsule.academy/faceup/picture1.jpg',
    // 'https://static.lacapsule.academy/faceup/picture2.jpg',
    // 'https://static.lacapsule.academy/faceup/picture3.jpg',
    // 'https://static.lacapsule.academy/faceup/picture4.jpg',
    // 'https://static.lacapsule.academy/faceup/picture1.jpg',
    // 'https://static.lacapsule.academy/faceup/picture2.jpg',
    // 'https://static.lacapsule.academy/faceup/picture3.jpg',
    // 'https://static.lacapsule.academy/faceup/picture4.jpg',
  ];

  const photosData2 = [
    'https://static.lacapsule.academy/faceup/picture4.jpg',
    'https://static.lacapsule.academy/faceup/picture3.jpg',
    'https://static.lacapsule.academy/faceup/picture2.jpg',
    'https://static.lacapsule.academy/faceup/picture1.jpg',
    'https://static.lacapsule.academy/faceup/picture4.jpg',
    'https://static.lacapsule.academy/faceup/picture3.jpg',
    'https://static.lacapsule.academy/faceup/picture2.jpg',
    'https://static.lacapsule.academy/faceup/picture1.jpg',
    'https://static.lacapsule.academy/faceup/picture4.jpg',
    'https://static.lacapsule.academy/faceup/picture3.jpg',
    'https://static.lacapsule.academy/faceup/picture2.jpg',
    'https://static.lacapsule.academy/faceup/picture1.jpg',
  ];

  let photos;
  if (selectedOption === '1') {
    photos = photosData1.map((data, i) => {
      return (
        <CardProfilContainer key={i} data={data} />
      );
    });
  } else {
    photos = photosData2.map((data, i) => {
      return (
        <CardProfilContainer key={i} data={data} />
      );
    });
  }

  let content;
  if (photos.length === 0) {
    if (selectedOption === '1') {
      content = (
        <View style={styles.emptyContainer}>
          <Text style={globalStyles.mainText} className='text-center'>You don't have any matches yet.</Text>
          <Text style={globalStyles.mainText} className='text-center pt-7 pb-7'>Keep swiping and find your perfect match!</Text>
          <FontAwesome name='heart' size={40} color='#ffffff' />
        </View>
      );
    } else {
      content = (
        <View style={styles.emptyContainer}>
          <Text style={globalStyles.mainText} className='text-center'>No one has liked you yet.</Text>
          <Text style={globalStyles.mainText} className='text-center pt-7 pb-7'>Keep swiping and see who's interested!</Text>
          <FontAwesome name='heart' size={40} color='#ffffff' />
        </View>
      );
    }
  } else {
    content = (
      <View style={styles.profilcontainer}>
        {photos}
      </View>
    );
  }

  return (
    <View style={globalStyles.screen} >
      <View style={globalStyles.container} className='m-2 space-y-7'>
        <View className="rounded-lg bg-white w-327 h-19  p-2 ">
          <SwitchSelector options={options} initial={0} onPress={value => setSelectedOption(value)} buttonColor="#ec7955" borderRadius={8} style={globalStyles.mainText} />
        </View >
        {photos.length > 0 && (selectedOption === '1' ? (
          <Text style={globalStyles.titleText} className='text-center'>YOUR MATCHES :</Text>
        ) : (
          <Text style={globalStyles.titleText} className='text-center'>PEOPLE WHO LIKES YOU :</Text>
        ))}
        <View>
          <ScrollView contentContainerStyle={styles.scrollViewContent} >

            <View style={styles.profilcontainer}>
            {content}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 150, 
       
      },

      switchSelector: {
        // zIndex: 1,
       
      },

      profilcontainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // marginTop: 5,
        paddingHorizontal: 0,
      },
    
     emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 150,
  },

})

export default MatchesScreen;