import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import globalStyles from "../../utils/globalStyles";

const MainTextInput = ({
  title,
  subtitle,
  placeholder,
  getInputValue,
  value,
}) => {
  return (
    <View>
      {title && <Text style={globalStyles.titleText}>{title}</Text>}
      {subtitle && (
        <Text className="mt-2" style={globalStyles.mainText}>
          {subtitle}
        </Text>
      )}
      <TextInput
        className="bg-transparent"
        style={[globalStyles.titleText, { paddingHorizontal: 0 }]}
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

export default MainTextInput;
