import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import globalStyles from "../../utils/globalStyles";

const PasswordInput = ({ title, placeholder, getInputValue, value }) => {
  return (
    <View>
      <Text style={globalStyles.titleText}>{title}</Text>
      <TextInput
        className="bg-transparent"
        style={[globalStyles.mainText, { paddingHorizontal: 0 }]}
        secureTextEntry={true}
        theme={{ colors: { onSurfaceVariant: globalStyles.placeholderColor } }}
        mode="flat"
        placeholder={placeholder}
        underlineColor={globalStyles.whiteColor}
        activeUnderlineColor={globalStyles.primaryColor}
        textColor={globalStyles.whiteColor}
        onChangeText={(text) => getInputValue(text)}
        value={value}
      />
    </View>
  );
};

export default PasswordInput;
