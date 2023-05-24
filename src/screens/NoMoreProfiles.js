import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import globalStyles from "../../utils/globalStyles";
import { submitBehavior } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";

const NoMoreProfiles = ({ title, subtitle }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={globalStyles.titleTextPink}>{title}</Text>
      <Text style={{ ...globalStyles.mainText, textAlign: "center" }}>
        {subtitle}
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
