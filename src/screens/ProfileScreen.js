import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../../utils/globalStyles";
import { FontAwesome } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import Pill from "../components/Pill";
import { ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import Header from "../components/Header";
import LinkAPartner from "./LinkAPartner";
import UserPartner from "../components/UserPartner";
import { useSelector } from "react-redux";
import { getUserInfos } from "../../utils/authenticateUser";
import { age } from "../../utils/transformDate";
import LoadingScreen from "./LoadingScreen";
import { useIsFocused } from "@react-navigation/native";

const ProfileScreen = ({ navigation }) => {
  const userToken = useSelector((state) => state.user.token);
  // Is used to fire useEffect every time the screen is rendered
  const isFocused = useIsFocused();
  const [openLinkPartner, setOpenLinkPartner] = useState(false);
  const [userInfos, setUserInfos] = useState(null);
  const userAge = age(userInfos?.birthdate) ?? undefined;
  const [isLoading, setIsLoading] = useState(false);

  const closeLinkPartner = () => {
    setOpenLinkPartner(false);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getUserInfos(userToken);
      if (data.result === true) {
        setUserInfos(data.user);
        setIsLoading(false);
      } else {
        console.log(data.message);
      }
    })();
  }, [openLinkPartner, isFocused]);
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View style={globalStyles.screen}>
      <ScrollView>
        <LinkAPartner
          openLinkPartner={openLinkPartner}
          closeLinkPartner={closeLinkPartner}
        />
        <View style={{ paddingHorizontal: 25, paddingTop: 45 }}>
          {/* profile picture and settings icon formatting */}
          <Header />
          <View style={styles.element}>
            <View style={styles.img}>
              <Image
                source={{ uri: userInfos?.pictures[0] }}
                style={styles.image}
              />
              <View style={styles.textLoc}>
                <Text style={[globalStyles.mainText]}>{userInfos?.name}</Text>
                <Text style={styles.textLocation}>
                  {" "}
                  <FontAwesome name="map-marker" size={13} color="white" />{" "}
                  {userInfos?.location.city}
                </Text>
              </View>
            </View>
            <View style={styles.iconSet}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("UpdateProfile", {
                    userInfos,
                  });
                }}
              >
                <FontAwesome name="pencil-square-o" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          {/* formatting of profile cards */}
          <Text
            style={[
              globalStyles.titleText,
              { marginTop: 10, marginBottom: 15 },
            ]}
          >
            About you
          </Text>
          <View style={styles.ChipContainer}>
            <Pill content={`${userAge}yo`} />
            <Pill content={userInfos?.gender} />
            <Pill content={userInfos?.sexuality} />
            {userInfos?.occupation && <Pill content={userInfos?.occupation} />}

            <Pill content={`Imaginary name: ${userInfos?.imaginaryName}`} />
            <Pill content={userInfos?.email} />
          </View>
        </View>
        {/* Divider for section */}
        <Divider
          style={{ backgroundColor: "white", height: 1, width: "100%" }}
        />
        {/* Description of user */}
        {userInfos?.description && (
          <View style={styles.desc}>
            <Text
              style={[globalStyles.titleText, { justifyContent: "center" }]}
            >
              What people need to know about you{" "}
            </Text>
            <Text style={[globalStyles.mainText, { marginTop: 10 }]}>
              {userInfos?.description}
            </Text>
          </View>
        )}
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
                <Text style={[globalStyles.mainText, { marginBottom: 15 }]}>
                  Link your partners
                </Text>
              </View>
              <FontAwesome name="angle-right" size={25} color="white" />
            </View>
          </TouchableOpacity>
          {userInfos?.myRelationships.length > 0 && (
            <>
              <Text
                style={{
                  ...globalStyles.titleText,
                  marginTop: 15,
                  marginBottom: 15,
                }}
              >
                {" "}
                Your relationships:{" "}
              </Text>

              <FlatList
                scrollEnabled={false}
                data={userInfos.myRelationships}
                keyExtractor={(item) => item.token}
                renderItem={({ item }) => (
                  <UserPartner name={item.name} picture={item.pictures[0]} />
                )}
              />
            </>
          )}
        </View>
        <Divider
          style={{ backgroundColor: "white", height: 2, width: "100%" }}
        />
        {/* photos of the users */}
        {userInfos?.pictures.length > 0 && (
          <>
            <View style={styles.desc}>
              <Text style={[globalStyles.titleText, { marginBottom: 15 }]}>
                All your pictures:
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {userInfos?.pictures.map((item, index) => (
                  <Image
                    key={index}
                    source={{ uri: item }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                      marginBottom: 10,
                      marginRight: 10,
                    }}
                  />
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
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
    marginBottom: 10,
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
