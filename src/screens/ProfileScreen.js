import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import globalStyles from "../../utils/globalStyles";
import { FontAwesome } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import Pill from "../components/Pill";
import { ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import Header from "../components/Header";
import LinkAPartner from "./LinkAPartner";
import UserPartner from "../components/UserPartner";

const ProfileScreen = ({ navigation }) => {
  const [openLinkPartner, setOpenLinkPartner] = useState(false);
  const closeLinkPartner = () => {
    setOpenLinkPartner(false);
  };
  return (
    <ScrollView>
      <LinkAPartner
        openLinkPartner={openLinkPartner}
        closeLinkPartner={closeLinkPartner}
      />
      <View style={globalStyles.screen}>
        <View style={globalStyles.container}>
          {/* profile picture and settings icon formatting */}
          <Header />
          <View style={styles.element}>
            <View style={styles.img}>
              <Image
                source={require("../../assets/Profile.jpg")}
                style={styles.image}
              />
              <View style={styles.textLoc}>
                <Text style={[globalStyles.mainText]}>Manu</Text>
                <Text style={styles.textLocation}>
                  {" "}
                  <FontAwesome name="map-marker" size={13} color="white" />{" "}
                  Paris
                </Text>
              </View>
            </View>
            <View style={styles.iconSet}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("UpdateProfile");
                }}
              >
                <FontAwesome name="pencil-square-o" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          {/* formatting of profile cards */}
          <Text
            style={[globalStyles.titleText, { marginTop: 10, marginBottom: 5 }]}
          >
            About you
          </Text>
          <View style={styles.ChipContainer}>
            <Pill content="25yo" />
            <Pill content="Man" />
            <Pill content="Football" />
            <Pill content="5'11" />
            <Pill content="French" />
          </View>
        </View>
        {/* Divider for section */}
        <Divider
          style={{ backgroundColor: "white", height: 1, width: "100%" }}
        />
        {/* Description of user */}
        <View style={styles.desc}>
          <Text style={[globalStyles.titleText, { justifyContent: "center" }]}>
            What people need to know about you{" "}
          </Text>
          <Text style={[globalStyles.mainText, { marginTop: 10 }]}>
            Fun-loving and adventurous woman seeking a partner in crime to
            explore the world with.
          </Text>
        </View>
        {/* Divider for section */}
        <Divider
          style={{ backgroundColor: "white", height: 1, width: "100%" }}
        />
        <View style={styles.desc}>
          <TouchableOpacity
            onPress={() => {
              setOpenLinkPartner(true);
            }}
          >
            <View style={styles.element}>
              <View style={styles.textLink}>
                <Feather
                  name="link"
                  size={24}
                  color="white"
                  style={{ marginRight: 4 }}
                />
                <Text style={[globalStyles.mainText, {}]}>Add a partner</Text>
              </View>
              <FontAwesome name="angle-right" size={25} color="white" />
            </View>
          </TouchableOpacity>
          <Text
            style={[
              globalStyles.titleText,
              { marginTop: 15, marginBottom: 15 },
            ]}
          >
            Your relationships:
          </Text>
          <UserPartner
            name="Manu"
            picture="https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <UserPartner
            name="Manu"
            picture="https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </View>
        <Divider
          style={{ backgroundColor: "white", height: 2, width: "100%" }}
        />
        {/* photos of the users */}
        <View style={styles.desc}>
          <Text style={[globalStyles.titleText, { marginBottom: 15 }]}>
            Your pictures
          </Text>
          <View
            style={{
              flexDirection: "row",

              flexWrap: "wrap",
            }}
          >
            <Image
              source={require("../../assets/Profile.jpg")}
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                marginBottom: 10,
                marginRight: 10,
              }}
            />
            <Image
              source={require("../../assets/Profile.jpg")}
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                marginBottom: 10,
                marginRight: 10,
              }}
            />
            <Image
              source={require("../../assets/Profile.jpg")}
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                marginBottom: 10,
                marginRight: 10,
              }}
            />
            <Image
              source={require("../../assets/Profile.jpg")}
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                marginBottom: 10,
                marginRight: 10,
              }}
            />
            <Image
              source={require("../../assets/Profile.jpg")}
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                marginBottom: 10,
                marginRight: 10,
              }}
            />
            <Image
              source={require("../../assets/Profile.jpg")}
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                marginBottom: 10,
                marginRight: 10,
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  element: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  img: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 10,
  },

  textLocation: {
    color: "white",
    fontSize: 13,
  },
  iconSet: {
    justifyContent: "center",
    alignItems: "center",
  },
  ChipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: "center",
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
    flexDirection: "row",
  },
});
