import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import UserAvatar from "./UserAvatar";
import { FontAwesome } from "@expo/vector-icons";
import globalStyles from "../../utils/globalStyles";

const HomeHeader = ({ openSearchSettings, userPicture, navigation }) => {
  return (
    <View
      className="flex-row justify-between items-center py-4 px-0"
      style={{ paddingHorizontal: 25 }}
    >
      <TouchableOpacity
        className="w-1/5"
        onPress={() => navigation.navigate("ProfileScreen")}
      >
        <UserAvatar size={40} avatarImage={userPicture} avatarDisplay={true} />
      </TouchableOpacity>
      <Text className="text-center w-3/5" style={globalStyles.titleText}>
        Serenade
      </Text>
      <TouchableOpacity
        className="w-1/5 flex-row justify-end"
        onPress={() => openSearchSettings()}
      >
        <FontAwesome name="sliders" size={24} color={globalStyles.whiteColor} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
