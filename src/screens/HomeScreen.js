import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../../utils/globalStyles";
import SearchSettings from "./SearchSettings";
import ProfileCarousel from "../components/ProfileCarousel";
import CardStack, { Card } from "react-native-card-stack-swiper";
import HomeHeader from "../components/HomeHeader";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import UserPartner from "../components/UserPartner";
import { Divider } from "react-native-paper";
import { useSelector } from "react-redux";
import {
  getUserInfos,
  getRecommendations,
  createADislike,
  createALike,
} from "../../utils/authenticateUser";
import LoadingScreen from "./LoadingScreen";
import NoMoreProfiles from "./NoMoreProfiles";
import { age } from "../../utils/transformDate";
import { truncateCityname } from "../../utils/truncateText";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const userToken = useSelector((state) => state.user.token);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [triggerFetchData, setTriggerFetchData] = useState(false);
  const [userInfos, setUserInfos] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const closeSearchSettings = () => {
    setSettingsOpen(false);
    setTriggerFetchData(!triggerFetchData);
  };
  const openSearchSettings = () => {
    setSettingsOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const userProfilePromise = getUserInfos(userToken);
      const recommendationsPromise = getRecommendations(userToken);

      try {
        const [userData, recommendationsData] = await Promise.all([
          userProfilePromise,
          recommendationsPromise,
        ]);

        if (userData.result === true) {
          setUserInfos(userData.user);
          navigation.setParams({ whoLikesMe: userData.user.whoLikesMe });
        } else {
          console.log(userData.message);
        }

        if (recommendationsData.result === true) {
          setRecommendations(recommendationsData.recommendedUsers);
        } else {
          console.log(recommendationsData.message);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [isFocused, triggerFetchData]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View style={globalStyles.screen}>
      <View style={globalStyles.container}>
        {/* UserSearch setting modal */}
        <SearchSettings
          settingsOpen={settingsOpen}
          closeSearchSettings={closeSearchSettings}
          userInfos={userInfos}
        />

        {/* Home Header component responsible for opening user search settings */}
        <HomeHeader
          navigation={navigation}
          openSearchSettings={openSearchSettings}
          userPicture={userInfos?.pictures[0]}
        />

        {/* CardStack responsible for swiping cards */}
        {recommendations.length === 0 && (
          <NoMoreProfiles
            title="Oops! No more profiles"
            subtitle=" Come back later, love is just around the corner❤️"
          />
        )}

        {recommendations.length > 0 && (
          <CardStack
            className="flex-1"
            verticalSwipe={false}
            cardContainerStyle={{ width: "100%", height: "100%" }}
            ref={(swiper) => {
              this.swiper = swiper;
            }}
            horizontalThreshold={50}
            onSwipedRight={async (cardIndex) => {
              const data = await createALike(
                userToken,
                recommendations[cardIndex].token
              );
              if (data.result === false) {
                console.log(data.message);
                return;
              }
              if (data.result === true) {
                return;
              }
              if (data.isAMatch === true) {
                navigation.navigate("ItsAMatch", { matchData: data.matchData });
                return;
              }
            }}
            onSwipedLeft={async (cardIndex) => {
              const data = await createADislike(
                userToken,
                recommendations[cardIndex].token
              );
              if (data.result === true) {
                return;
              } else {
                console.log(data.message);
              }
            }}
            renderNoMoreCards={() => {
              return (
                <NoMoreProfiles
                  title="Oops! No more profiles"
                  subtitle=" Come back later, love is just around the corner❤️"
                />
              );
            }}
          >
            {/* Map trough an array of potential match for our user */}
            {recommendations.map((user, index) => (
              <Card
                className="flex-1"
                style={{ backgroundColor: globalStyles.appBackgroundColor }}
                key={index}
              >
                <ScrollView>
                  {/* User Pictures */}
                  <ProfileCarousel userPictures={user.pictures} />

                  <View className="flex-1 items-center">
                    <View
                      className="w-full h-40 rounded-xl p-4 flex-row justify-between mb-4"
                      style={{ backgroundColor: globalStyles.cardColor }}
                    >
                      <View>
                        <View className="flex-row mb-2 items-center">
                          <FontAwesome
                            name="user"
                            size={20}
                            color={globalStyles.lightPink}
                          />
                          <Text
                            style={[globalStyles.mainText, { marginLeft: 10 }]}
                          >
                            {user.name}
                          </Text>
                        </View>
                        {user.location && (
                          <View className="flex-row mb-2 items-center">
                            <FontAwesome
                              name="map-marker"
                              size={20}
                              color={globalStyles.lightPink}
                            />
                            <Text
                              style={[
                                globalStyles.mainText,
                                { marginLeft: 10 },
                              ]}
                            >
                              {truncateCityname(user.location.city)}
                            </Text>
                          </View>
                        )}
                        <View className="flex-row mb-2 items-center">
                          <FontAwesome
                            name="id-card"
                            size={20}
                            color={globalStyles.lightPink}
                          />
                          <Text
                            style={[globalStyles.mainText, { marginLeft: 10 }]}
                          >
                            {`${age(user.birthdate)}yo`} {user.gender}
                          </Text>
                        </View>
                        {user.occupation && (
                          <View className="flex-row mb-2 items-center">
                            <FontAwesome
                              name="briefcase"
                              size={20}
                              color="#F0D3C9"
                            />
                            <Text
                              style={[
                                globalStyles.mainText,
                                { marginLeft: 10 },
                              ]}
                            >
                              {user.occupation}
                            </Text>
                          </View>
                        )}
                      </View>
                      <View>
                        <View>
                          <TouchableOpacity
                            onPress={() => {
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
                            onPress={() => swiper.swipeLeft()}
                            className="w-10 h-10 bg-white rounded-full justify-center items-center"
                          >
                            <Feather
                              name="x"
                              size={30}
                              color={globalStyles.primaryColor}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    {user.description && (
                      <View
                        className="w-full h-40 rounded-xl p-4 mb-4"
                        style={{ backgroundColor: globalStyles.cardColor }}
                      >
                        <Text
                          className="mb-2"
                          style={globalStyles.titleTextPink}
                        >
                          What you need to know about {user.name}
                        </Text>
                        <Text style={globalStyles.mainText}>
                          {user.description}
                        </Text>
                      </View>
                    )}

                    {/* User RelationShips */}
                    <View className="self-start">
                      {(user.myRelationships?.length === 0 &&
                        user.relationshipStatus === "Single" && (
                          <>
                            <Text
                              className="mb-2"
                              style={globalStyles.titleTextPink}
                            >
                              Relationship Status:
                            </Text>
                            <Text
                              className="italic mb-2"
                              style={globalStyles.titleTextPrimary}
                            >
                              Single
                            </Text>
                          </>
                        )) ||
                        (user.myRelationships?.length === 0 &&
                          user.relationshipStatus === "In a relationship" && (
                            <>
                              <Text
                                className="mb-2"
                                style={globalStyles.titleTextPink}
                              >
                                Relationship Status:
                              </Text>
                              <Text
                                className="italic mb-2"
                                style={globalStyles.titleTextPrimary}
                              >
                                In a relationship
                              </Text>
                            </>
                          )) ||
                        (user.myRelationships?.length > 0 && (
                          <>
                            <Text
                              className="mb-2"
                              style={globalStyles.titleTextPink}
                            >
                              In relationship with:
                            </Text>
                            {user.myRelationships.map((item, index) => (
                              <UserPartner
                                key={index}
                                name={item.name}
                                picture={item.pictures[0]}
                              />
                            ))}
                          </>
                        ))}
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
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
