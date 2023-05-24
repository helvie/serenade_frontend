import { View, StyleSheet, ScrollView, Image, Text } from "react-native";
import React, { useState, useEffect } from "react";
import globalStyles from "../../utils/globalStyles";
import SwitchSelector from "react-native-switch-selector";
import CardProfilContainer from "../components/CardProfile";
import { useIsFocused, useNavigationState } from "@react-navigation/native";
import { getMatches } from "../../utils/authenticateUser";
import { useSelector } from "react-redux";
import LoadingScreen from "./LoadingScreen";
import NoMoreProfiles from "./NoMoreProfiles";

const MatchesScreen = ({ route }) => {
  const userToken = useSelector((state) => state.user.token);
  const [isLoading, setIsLoading] = useState(false);
  const [userMatches, setUserMatches] = useState([]);
  const options = [
    { label: "My Matches", value: "My Matches" },
    { label: "Who likes me", value: "Who likes me" },
  ];

  const [peopleWhoLikesMe, setPeopleWhoLikesMe] = useState([]);

  const isFocused = useIsFocused();

  const navigationState = useNavigationState((state) => state);

  const [selectedOption, setSelectedOption] = useState("My Matches");

  useEffect(() => {
    const whoLikesMe = navigationState.routes.find(
      (route) => route.name === "HomeScreen"
    )?.params?.whoLikesMe;

    if (whoLikesMe) {
      // Use the data from home
      setPeopleWhoLikesMe(whoLikesMe);
    }

    (async () => {
      setIsLoading(true);
      matchData = await getMatches(userToken);
      if (matchData.result === true) {
        const matches = matchData.data
          .map((match) => {
            if (match.user && match.user.token !== userToken) {
              return match.user;
            } else if (match.userLiked && match.userLiked.token !== userToken) {
              return match.userLiked;
            }
            return null; // To exclude the unmatched documents from the result
          })
          .filter(Boolean); //The filter(Boolean) is then applied to remove any null values from the resulting array, which represents the filtered matches.
        setUserMatches(matches);
        setIsLoading(false);
      } else {
        console.log(matchData.message);
        setIsLoading(false);
      }
    })();
  }, [isFocused]);

  const myLikes = peopleWhoLikesMe?.map((data, i) => {
    return (
      <CardProfilContainer
        key={i}
        city={data.location.city}
        picture={data.pictures[0]}
        {...data}
      />
    );
  });

  const myMatches = userMatches?.map((data, i) => {
    return (
      <CardProfilContainer
        key={i}
        city={data.location.city}
        picture={data.pictures[0]}
        {...data}
      />
    );
  });

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View style={globalStyles.screen}>
      <View style={globalStyles.container}>
        <View className="rounded-lg bg-white p-2 mb-7">
          <SwitchSelector
            options={options}
            initial={0}
            onPress={(value) => {
              setSelectedOption(value);
            }}
            buttonColor="#ec7955"
            borderRadius={8}
            textStyle={globalStyles.mainTextBlack}
            selectedTextStyle={globalStyles.mainText}
          />
        </View>
        <View className="flex-1">
          {selectedOption === "Who likes me" && myLikes.length === 0 && (
            <NoMoreProfiles
              title="No one has liked you yet"
              subtitle="Keep swiping and see who's interested!"
            />
          )}

          {selectedOption === "My Matches" && myMatches.length === 0 && (
            <NoMoreProfiles
              title=" You don't have any matches yet."
              subtitle="Keep swiping and find your perfect
             match!"
            />
          )}

          {selectedOption === "My Matches" && myMatches.length > 0 && (
            <>
              <Text style={globalStyles.titleText} className="text-center mb-5">
                {" "}
                You've matched with those people{" "}
              </Text>

              <ScrollView contentContainerStyle={styles.profilcontainer}>
                {myMatches}
              </ScrollView>
            </>
          )}

          {selectedOption === "Who likes me" && myLikes.length > 0 && (
            <>
              <Text style={globalStyles.titleText} className="text-center mb-5">
                {" "}
                Those people have a crush on you{" "}
              </Text>

              <ScrollView contentContainerStyle={styles.profilcontainer}>
                {myLikes}
              </ScrollView>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profilcontainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 0,
  },
});

export default MatchesScreen;
