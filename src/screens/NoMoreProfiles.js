import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import globalStyles from "../../utils/globalStyles";

const NoMoreProfiles = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={globalStyles.titleTextPink}>
        Oops! No more profiles found!
      </Text>
      <Text style={{ ...globalStyles.mainText, textAlign: "center" }}>
        Come back later, love is just around the corner ❤️
      </Text>
      <Image
        style={{ width: 300, height: 300, marginTop: 20 }}
        source={{
          uri: "https://media.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy-downsized-large.gif",
        }}
      />
    </View>
  );
};

export default NoMoreProfiles;
