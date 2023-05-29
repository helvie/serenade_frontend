import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import globalStyles from "../../utils/globalStyles";
import CardProfilContainer from "../components/CardProfile";
import { useIsFocused, useNavigationState } from "@react-navigation/native";
import { getMatches } from "../../utils/authenticateUser";
import { useSelector } from "react-redux";
import LoadingScreen from "./LoadingScreen";
import NoMoreProfiles from "./NoMoreProfiles";
import CustomSwitchSelector from "../components/CustomSwitchSelector";

const MatchesScreen = ({ navigation }) => {
  const userToken = useSelector((state) => state.user.token);
  const [isLoading, setIsLoading] = useState(false);
  const [userMatches, setUserMatches] = useState([]);

  const [peopleWhoLikesMe, setPeopleWhoLikesMe] = useState([]);

  const isFocused = useIsFocused();

  const navigationState = useNavigationState((state) => state);

  const [selectedOption, setSelectedOption] = useState("My Matches");

  const onOptionChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    // get a data from one screen in the same TabNavigator
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
              return {
                matchId: match._id,
                matchedUser: match.user,
                messages: match.messages,
              };
            } else if (match.userLiked && match.userLiked.token !== userToken) {
              return {
                matchId: match._id,
                matchedUser: match.userLiked,
                messages: match.messages,
              };
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
      <TouchableOpacity
        key={i}
        className="w-[45%] mr-2 flex-row justify-center align-center"
        onPress={() => {
          navigation.navigate("DisplayUserInfos", { data });
        }}
      >
        <CardProfilContainer picture={data.pictures[0]} {...data} />
      </TouchableOpacity>
    );
  });

  const myMatches = userMatches?.map((data, i) => {
    return (
      <TouchableOpacity
        key={i}
        className="w-[45%] mr-2 flex-row justify-center align-center"
        onPress={() => {
          navigation.navigate("DisplayUserInfos", {
            data: data.matchedUser,
            matchId: data.matchId,
            messages: data.messages,
            itsAMatch: true,
          });
        }}
      >
        <CardProfilContainer
          key={i}
          name={data.matchedUser.name}
          picture={data.matchedUser.pictures[0]}
          birthdate={data.matchedUser.birthdate}
          gender={data.matchedUser.gender}
        />
      </TouchableOpacity>
    );
  });

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View style={{ ...globalStyles.screen, paddingTop: 15 }}>
      <View style={globalStyles.container} className="my-6">
        <CustomSwitchSelector onOptionChange={onOptionChange} />
        <View className="flex-1 mt-5">
          {selectedOption === "Who likes me" && myLikes.length === 0 && (
            <NoMoreProfiles
              title="No one has liked you yet ❤️"
              subtitle="Keep swiping and see who's interested!"
            />
          )}

          {selectedOption === "My Matches" && myMatches.length === 0 && (
            <NoMoreProfiles
              title=" You don't have any matches yet ⚡"
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
    justifyContent: "space-between",
    paddingHorizontal: 0,
  },
});

export default MatchesScreen;
