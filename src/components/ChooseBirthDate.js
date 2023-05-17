import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import React from "react";
import globalStyles from "../../utils/globalStyles";

const ChooseBirthDate = ({
  dayOfBirth,
  monthOfBirth,
  yearOfBirth,
  getDayOfBirth,
  getMonthOfBirth,
  getYearOfBirth,
}) => {
  return (
    <View className="mb-7">
      <Text style={globalStyles.titleText}>What is your birth date ?</Text>
      <View className="justify-between flex-row">
        <TextInput
          className="bg-transparent w-3/12"
          keyboardType="numeric"
          label="Day"
          maxLength={2}
          style={[globalStyles.mainText, { paddingHorizontal: 0 }]}
          theme={{
            colors: {
              onSurfaceVariant: globalStyles.placeholderColor,
            },
          }}
          mode="flat"
          placeholder="02"
          underlineColor={globalStyles.whiteColor}
          activeUnderlineColor={globalStyles.primaryColor}
          textColor={globalStyles.whiteColor}
          onChangeText={(text) => getDayOfBirth(text)}
          value={dayOfBirth}
        />
        <TextInput
          className="bg-transparent w-3/12"
          keyboardType="numeric"
          label="Month"
          maxLength={2}
          style={[globalStyles.mainText, { paddingHorizontal: 0 }]}
          theme={{
            colors: {
              onSurfaceVariant: globalStyles.placeholderColor,
            },
          }}
          mode="flat"
          placeholder="09"
          underlineColor={globalStyles.whiteColor}
          activeUnderlineColor={globalStyles.primaryColor}
          textColor={globalStyles.whiteColor}
          onChangeText={(text) => getMonthOfBirth(text)}
          value={monthOfBirth}
        />
        <TextInput
          className="bg-transparent w-3/12"
          keyboardType="numeric"
          label="Year"
          maxLength={4}
          style={[globalStyles.mainText, { paddingHorizontal: 0 }]}
          theme={{
            colors: {
              onSurfaceVariant: globalStyles.placeholderColor,
            },
          }}
          mode="flat"
          placeholder="1997"
          underlineColor={globalStyles.whiteColor}
          activeUnderlineColor={globalStyles.primaryColor}
          textColor={globalStyles.whiteColor}
          onChangeText={(text) => getYearOfBirth(text)}
          value={yearOfBirth}
        />
      </View>
    </View>
  );
};

export default ChooseBirthDate;
