import { View, StyleSheet, ScrollView, Image, Text } from "react-native";
import React, { useState } from "react";
import globalStyles from "../../utils/globalStyles";
import SwitchSelector from "react-native-switch-selector";
import CardProfilContainer from "../components/CardProfile";
import { likes, matches } from "../../fakeData/db";

const MatchesScreen = () => {
  const options = [
    { label: "My Matches", value: "My Matches" },
    { label: "Who likes me", value: "Who likes me" },
  ];

  const [selectedOption, setSelectedOption] = useState("My Matches");

  const myLikes = likes?.map((data, i) => {
    return <CardProfilContainer key={i} {...data} />;
  });

  const myMatches = matches?.map((data, i) => {
    return <CardProfilContainer key={i} {...data} />;
  });

  return (
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
            <Text style={globalStyles.titleText} className="text-center">
              {" "}
              No one has liked you yet. Keep swiping and see who's interested!
            </Text>
          )}

          {selectedOption === "My Matches" && myMatches.length === 0 && (
            <Text style={globalStyles.titleText} className="text-center">
              {" "}
              You don't have any matches yet. Keep swiping and find your perfect
              match!
            </Text>
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
