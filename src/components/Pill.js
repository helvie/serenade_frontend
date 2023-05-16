import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Chip } from "react-native-paper";
import globalStyles from "../../utils/globalStyles";

const Pill = (props) => {
  return (
    <View>
      <Chip
        style={{
          marginRight: 10,
          marginBottom: 10,
          backgroundColor: globalStyles.primaryColor,
        }}
        textStyle={[
          globalStyles.mainText,
          {
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
          },
        ]}
      >
        {props.content}
      </Chip>
    </View>
  );
};

export default Pill;
