import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../../utils/globalStyles";
import CardMessageContainer from "../components/CardMessageContainer";
import LoadingScreen from "./LoadingScreen";
import { getMatches } from "../../utils/authenticateUser";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import NoMoreProfiles from "./NoMoreProfiles";

const MessagesScreen = ({ navigation }) => {
  const userToken = useSelector((state) => state.user.token);

  const [isLoading, setIsLoading] = useState(false);
  const [matchesInfos, setMatchesInfos] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const matchData = await getMatches(userToken);
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
        setMatchesInfos(matches);
        setIsLoading(false);
      } else {
        console.log(matchData.message);
        setIsLoading(false);
      }
    })();
  }, [isFocused]);

  const messages = matchesInfos.map((match, i) => {
    // If there are no messages, the last message content and hour are set to default values
    let lastMessageContent = `Say something to ${match.matchedUser.name}...`;
    let lastMessagehour = "💖";
    let moment = "";

    // if there is any messages between our users we set the last message content and hour
    if (match.messages.length > 0) {
      lastMessageContent = match.messages[match.messages.length - 1].content;
      const lastMessageDate = new Date(
        match.messages[match.messages.length - 1].date
      );
      lastMessagehour =
        lastMessageDate.getHours() - 12 + ":" + lastMessageDate.getMinutes();

      // We set the hour to the correct format
      if (lastMessageDate.getHours() > 12) {
        moment = " pm";
      } else {
        moment = " am";
      }
    }
    return (
      <TouchableOpacity
        key={i}
        onPress={() => {
          navigation.navigate("ChatScreen", { match: match });
        }}
      >
        <CardMessageContainer
          key={i}
          image={match.matchedUser.pictures[0]}
          name={match.matchedUser.name}
          message={lastMessageContent}
          time={`${lastMessagehour} ${moment}`}
        />
      </TouchableOpacity>
    );
  });

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View style={globalStyles.screen}>
      <View className="mt-10">
        <Text style={globalStyles.titleText} className="mb-4">
          My Messages
        </Text>
        <Text style={globalStyles.mainText}>
          Find your alterego among one of these people
        </Text>
      </View>
      <View style={styles.horizontalLine} />
      <View style={globalStyles.container}>
        {/* If there are no messages, we display a message */}
        {messages.length > 0 && (
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {messages}
          </ScrollView>
        )}

        {messages.length === 0 && (
          <NoMoreProfiles
            title="Oops no messages yet 📨"
            subtitle="Keep swiping and you'll eventually find shoes to suit your feet."
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalLine: {
    width: "100%",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 0,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default MessagesScreen;
