import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import globalStyles from "../../utils/globalStyles";
import { allUsers } from "../../fakeData/allUsers";
import SearchSettings from "./SearchSettings";
import ProfileCarousel from "../components/ProfileCarousel";
import CardStack, { Card } from "react-native-card-stack-swiper";
import HomeHeader from "../components/HomeHeader";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import UserPartner from "../components/UserPartner";
import { Divider } from "react-native-paper";
import { useSelector } from "react-redux";

const HomeScreen = ({ navigation, itsAMatch }) => {
  const userToken = useSelector((state) => state.user.token);
  console.log(userToken);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const closeSearchSettings = () => {
    setSettingsOpen(false);
  };
  const openSearchSettings = () => {
    setSettingsOpen(true);
  };
  return (
    <View style={globalStyles.screen}>
      <View style={globalStyles.container}>
        {/* UserSearch setting modal */}
        <SearchSettings
          settingsOpen={settingsOpen}
          closeSearchSettings={closeSearchSettings}
        />

        {/* Home Header component responsible for opening user search settings */}
        <HomeHeader
          navigation={navigation}
          openSearchSettings={openSearchSettings}
          userPicture="https://images.pexels.com/photos/1382726/pexels-photo-1382726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />

        {/* CardStack responsible for swiping cards */}
        <CardStack
          className="flex-1"
          verticalSwipe={false}
          cardContainerStyle={{ width: "100%", height: "100%" }}
          ref={(swiper) => {
            this.swiper = swiper;
          }}
          horizontalThreshold={50}
          onSwipedRight={(card) => console.log(card)}
        >
          {/* Map trough an array of potential match for our user */}
          {allUsers.map((user, index) => (
            <Card
              className="h-full"
              style={{ backgroundColor: globalStyles.appBackgroundColor }}
              key={index}
            >
              <ScrollView>
                {/* User Pictures */}
                <ProfileCarousel userPictures={user.pictures} />

                <View className="justify-center items-center">
                  <View
                    className="w-full h-40 rounded-xl p-4 flex-row justify-between mb-4"
                    style={{ backgroundColor: globalStyles.cardColor }}
                  >
                    <View>
                      <View className="flex-row mb-2.5">
                        <FontAwesome
                          name="user"
                          size={20}
                          color={globalStyles.lightPink}
                        />
                        <Text
                          style={[globalStyles.mainText, { marginLeft: 10 }]}
                        >
                          {user.firstname}
                        </Text>
                      </View>
                      <View className="flex-row mb-2.5">
                        <FontAwesome
                          name="map-marker"
                          size={20}
                          color={globalStyles.lightPink}
                        />
                        <Text
                          className="truncate"
                          style={[globalStyles.mainText, { marginLeft: 10 }]}
                        >
                          {user.city}
                        </Text>
                      </View>
                      <View className="flex-row mb-2.5">
                        <FontAwesome
                          name="id-card"
                          size={20}
                          color={globalStyles.lightPink}
                        />
                        <Text
                          className="truncate"
                          style={[globalStyles.mainText, { marginLeft: 10 }]}
                        >
                          {user.age} {user.gender}
                        </Text>
                      </View>
                      <View className="flex-row mb-2.5">
                        <FontAwesome
                          name="briefcase"
                          size={20}
                          color="#F0D3C9"
                        />
                        <Text
                          className="truncate"
                          style={[globalStyles.mainText, { marginLeft: 10 }]}
                        >
                          {user.jobTitle}
                        </Text>
                      </View>
                    </View>
                    <View>
                      {itsAMatch ? (
                        <View>
                          <TouchableOpacity
                            onPress={() => console.log("handleDismatch")}
                            className="w-10 h-10 mb-4 bg-white rounded-full justify-center items-center"
                          >
                            <MaterialCommunityIcons
                              name="heart-broken"
                              size={30}
                              color={globalStyles.primaryColor}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => console.log("handleMessage")}
                            className="w-10 h-10 bg-white rounded-full justify-center items-center"
                          >
                            <Ionicons
                              name="chatbubbles-sharp"
                              size={30}
                              color={globalStyles.primaryColor}
                            />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              console.log("handleLike");
                              swiper.swipeRight();
                            }}
                            className="w-10 h-10 mb-4 bg-white rounded-full justify-center items-center"
                          >
                            <MaterialCommunityIcons
                              name="heart"
                              size={30}
                              color={globalStyles.primaryColor}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => console.log("handleDislike")}
                            className="w-10 h-10 bg-white rounded-full justify-center items-center"
                          >
                            <Feather
                              name="x"
                              size={30}
                              color={globalStyles.primaryColor}
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                  {/* User Description to render conditionally */}
                  <View
                    className="w-full h-40 rounded-xl p-4 mb-4"
                    style={{ backgroundColor: globalStyles.cardColor }}
                  >
                    <Text className="mb-2" style={globalStyles.titleTextPink}>
                      What you need to know about Julia
                    </Text>
                    <Text style={globalStyles.mainText}>
                      {user.description}
                    </Text>
                  </View>

                  {/* User RelationShips */}
                  <View className="self-start">
                    <Text className="mb-2" style={globalStyles.titleTextPink}>
                      In relationship with:
                    </Text>
                    <UserPartner
                      name="Manu"
                      picture="https://images.pexels.com/photos/14465200/pexels-photo-14465200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    />
                  </View>

                  <Divider
                    className="mb-3"
                    style={{
                      color: "white",
                      height: 0.5,
                      width: "100%",
                    }}
                  />

                  <TouchableOpacity
                    className="flex-row justiy-center items-center"
                    onPress={() => console.log("contact us")}
                  >
                    <FontAwesome
                      name="flag"
                      size={20}
                      color={globalStyles.primaryColor}
                    />
                    <Text style={[globalStyles.mainText, { marginLeft: 10 }]}>
                      Report this profile
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Card>
          ))}
        </CardStack>
      </View>
    </View>
  );
};

export default HomeScreen;
