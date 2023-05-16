import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import globalStyles from "../../utils/globalStyles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Divider } from "react-native-paper";
import Chips from "../components/Chips";
import { ScrollView } from 'react-native';

const ProfileScreen = () => {
  return (
    <ScrollView>
    <View style={globalStyles.screen}> 
      <View style={globalStyles.container}>
        {/* profile picture and settings icon formatting */}
          <View style={styles.font}>
          <TouchableOpacity>
          <FontAwesome name="angle-left" size={25} color="white" />
          </TouchableOpacity>
          </View>
          <View style={styles.element}>
            <View style={styles.img}>
              <Image
                source={require("../../assets/Profile.jpg")}
                style={styles.image}
              />
              <View style={styles.textLoc}>
              <Text
                style={[
                  globalStyles.mainText
                ]}
              >
                Manu
              </Text>
              <Text style={styles.textLocation}>
                {" "}
                <FontAwesome name="map-marker" size={13} color="white" /> Paris
              </Text>
            </View>
            </View>
            <View style={styles.iconSet}>
            <TouchableOpacity>
              <FontAwesome
                name="gear"
                size={30}
                color="white"
                style={{color: globalStyles.primaryColor}}
              />
            </TouchableOpacity>
            </View>
        </View>
        {/* formatting of profile cards */}
        <Text style={[globalStyles.mainText, {marginTop: 10, marginBottom: 5,}]}>About you</Text>
        <View style={styles.ChipContainer}>
          <Chips content="25yo"/>
          <Chips content="Man"/>
          <Chips content="Football"/>
          <Chips content="5'11"/>
          <Chips content="French"/>
          <Chips content="Non-smoker"/>
        </View>
      </View>
      {/* Divider for section */}
      <Divider style={{ backgroundColor: 'white', height: 1, width: '100%' }}/>
      {/* Description of user */}
      <View style={styles.desc}>
        <Text style={[globalStyles.titleText, {justifyContent: 'center'}]}>
          What people need to know about you{" "}
        </Text>
        <Text style={[globalStyles.mainText, { marginTop: 10 }]}>
          Fun-loving and adventurous woman seeking a partner in crime to explore
          the world with.
        </Text>
      </View>
      {/* Divider for section */}
      <Divider style={{ backgroundColor: 'white', height: 1, width: '100%' }}/>
      <View style={styles.desc}>
        <TouchableOpacity>
        <View style={styles.element}>
          <View style={styles.textLink}>
          <FontAwesome
            name="link"
            size={25}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={[globalStyles.mainText, {}]}>Add a partner</Text>
          </View>
          <FontAwesome name="angle-right" size={25} color="white" />
          </View>
          </TouchableOpacity>
            <Text style={[globalStyles.titleText, {marginTop: 15, marginBottom: 15,}]}>Your relationships:</Text>
          <TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Image source={require('../../assets/Profile.jpg')} style={styles.imgProfile}/>
              <Text style={[globalStyles.mainText, {textAlign: 'center',alignSelf: 'center', marginRight: 10,}]}>Manu</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Image source={require('../../assets/Profile.jpg')} style={styles.imgProfile}/>
              <Text style={[globalStyles.mainText, {textAlign: 'center',alignSelf: 'center', marginRight: 10,}]}>Numa7</Text>
          </View>
          </TouchableOpacity>
      </View> 
      <Divider style={{ backgroundColor: 'white', height: 2, width: '100%' }}/>
      {/* photos of the users */}
      <View style={styles.desc}>
      <Text style={[globalStyles.titleText, {marginBottom: 15,}]}>Your pictures</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
        <Image source={require('../../assets/Profile.jpg')} style={{width: 100, height: 100, borderRadius: 10, marginBottom: 10}}/>
        <Image source={require('../../assets/Profile.jpg')} style={{width: 100, height: 100, borderRadius: 10,}}/>
        <Image source={require('../../assets/Profile.jpg')} style={{width: 100, height: 100, borderRadius: 10,}}/>
        <Image source={require('../../assets/Profile.jpg')} style={{width: 100, height: 100, borderRadius: 10,}}/>
      </View>
      </View>
    </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  font: {
    marginBottom: 20,
  },
  element: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  img: {
    flexDirection: "row",
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 10,
  },
  imgProfile: {
    width: 60, 
    height: 60, 
    borderRadius: 50, 
    marginRight: 10,
    marginBottom: 10,
  },
  textLocation: {
    color: "white",
    fontSize: 13,
  },
  iconSet: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ChipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: 'center',
  },
  section: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    width: "100%",
  },
  desc: {
    width: "100%",
    padding: 25,
  },
  textLink: {
    flexDirection: 'row',
  },
});
