import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../../utils/globalStyles";
import ProfileCarousel from "../components/ProfileCarousel";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import UserPartner from "../components/UserPartner";
import { Divider } from "react-native-paper";
import { useSelector } from "react-redux";
import { createADislike, createALike } from "../../utils/authenticateUser";
import Header from "../components/Header";
import { age } from "../../utils/transformDate";
import { truncateCityname } from "../../utils/truncateText";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const DisplayUserInfos = ({ navigation }) => {
  const currentUserToken = useSelector((state) => state.user.token);
  const route = useRoute();

  // we get the user to display the profile
  const [data, setData] = useState(route.params?.data);

  // if its A Matched user we get the itsAMatch props from the previous screen to conditionnaly render buttons
  let itsAMatch = false;

  // define a new object to pass to chat screen
  let dataFormattedForChat = {};

  if (route.params?.itsAMatch) {
    itsAMatch = route.params.itsAMatch;
    dataFormattedForChat = {
      matchId: route.params.matchId,
      matchedUser: data,
      messages: route.params.messages,
    };
  }

  return (
    <View style={globalStyles.screen}>
      <View style={globalStyles.container}>
        <Header />

        <ScrollView>
          {/* User Pictures */}
          <ProfileCarousel userPictures={data.pictures} />

          <View className="flex-1 items-center justify-between py-4">
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
                  <Text style={[globalStyles.mainText, { marginLeft: 10 }]}>
                    {data.name}
                  </Text>
                </View>
                {data.location && (
                  <View className="flex-row mb-2 items-center">
                    <FontAwesome
                      name="map-marker"
                      size={20}
                      color={globalStyles.lightPink}
                    />
                    <Text style={[globalStyles.mainText, { marginLeft: 10 }]}>
                      {truncateCityname(data.location.city)}
                    </Text>
                  </View>
                )}
                <View className="flex-row mb-2 items-center">
                  <FontAwesome
                    name="id-card"
                    size={20}
                    color={globalStyles.lightPink}
                  />
                  <Text style={[globalStyles.mainText, { marginLeft: 10 }]}>
                    {`${age(data.birthdate)}yo`} {data.gender}
                  </Text>
                </View>
                {data.occupation && (
                  <View className="flex-row mb-2 items-center">
                    <FontAwesome name="briefcase" size={20} color="#F0D3C9" />
                    <Text style={[globalStyles.mainText, { marginLeft: 10 }]}>
                      {data.occupation}
                    </Text>
                  </View>
                )}
              </View>
              <View>
                {itsAMatch ? (
                  <>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("ChatScreen", {
                            match: dataFormattedForChat,
                          });
                        }}
                        className="w-10 h-10 mb-4 bg-white rounded-full justify-center items-center"
                      >
                        <Ionicons
                          name="chatbubbles"
                          size={30}
                          color={globalStyles.primaryColor}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          alert(
                            "Sorry this is an MVP we didn't have time to do this feature, at least you can continue to speak with your crush 😂😂"
                          );
                        }}
                        className="w-10 h-10 bg-white rounded-full justify-center items-center"
                      >
                        <MaterialCommunityIcons
                          name="heart-broken"
                          size={30}
                          color={globalStyles.primaryColor}
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <>
                    <View>
                      <TouchableOpacity
                        onPress={async () => {
                          const responseData = await createALike(
                            currentUserToken,
                            data.token
                          );
                          if (responseData.result === false) {
                            console.log(data.message);
                            return;
                          }
                          if (responseData.result === true) {
                            navigation.navigate("HomeScreen");
                            return;
                          }
                          if (responseData.isAMatch === true) {
                            navigation.navigate("ItsAMatch", {
                              matchData: responseData.matchData,
                            });
                            return;
                          }
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
                        onPress={async () => {
                          const data = await createADislike(
                            currentUserToken,
                            data.token
                          );
                          if (data.result === true) {
                            navigation.navigate("HomeScreen");
                          } else {
                            console.log(data.message);
                          }
                        }}
                        className="w-10 h-10 bg-white rounded-full justify-center items-center"
                      >
                        <Feather
                          name="x"
                          size={30}
                          color={globalStyles.primaryColor}
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </View>
            {data.description && (
              <View
                className="w-full h-40 rounded-xl p-4 mb-4"
                style={{ backgroundColor: globalStyles.cardColor }}
              >
                <Text className="mb-2" style={globalStyles.titleTextPink}>
                  What you need to know about {data.name}
                </Text>
                <Text style={globalStyles.mainText}>{data.description}</Text>
              </View>
            )}

            {/* User RelationShips */}
            <View className="self-start">
              {(data.myRelationships?.length === 0 &&
                data.relationshipStatus === "Single" && (
                  <>
                    <Text className="mb-2" style={globalStyles.titleTextPink}>
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
                (data.myRelationships?.length === 0 &&
                  data.relationshipStatus === "In a relationship" && (
                    <>
                      <Text className="mb-2" style={globalStyles.titleTextPink}>
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
                (data.myRelationships?.length > 0 && (
                  <>
                    <Text className="mb-2" style={globalStyles.titleTextPink}>
                      In relationship with:
                    </Text>
                    {data.myRelationships.map((item, index) => (
                      <UserPartner
                        name={item.name}
                        picture={item.pictures[0]}
                        key={index}
                      />
                    ))}
                  </>
                ))}
            </View>

            {(data.description ||
              data.relationshipStatus ||
              data.myRelationships?.length > 0) && (
              <Divider
                className="my-3"
                style={{
                  color: "white",
                  height: 0.5,
                  width: "100%",
                }}
              />
            )}
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
      </View>
    </View>
  );
};

export default DisplayUserInfos;
