import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const Header = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity onPress={handleGoBack} className="mb-6 mt-2">
      <FontAwesome name="angle-left" size={25} color="white" />
    </TouchableOpacity>
  );
};

export default Header;
