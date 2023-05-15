import { View, Text } from "react-native";
import React from "react";
import { RadioButton } from "react-native-paper";
import globalStyles from "../../utils/globalStyles";

const RadioButtonItem = ({ label, value, hasBorder = true }) => {
  return (
    <View
      style={
        hasBorder && {
          borderBottomWidth: 0.3,
          borderBottomColor: globalStyles.whiteColor,
          marginBottom: 20,
        }
      }
    >
      <RadioButton.Item
        label={label}
        value={value}
        labelStyle={globalStyles.titleText}
        color={globalStyles.whiteColor}
        className="px-0"
      />
    </View>
  );
};

export default RadioButtonItem;
