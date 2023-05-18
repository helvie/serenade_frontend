import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import SearchSettings from "./SearchSettings";
import globalStyles from "../../utils/globalStyles";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const user = useSelector((state) => state.user.value);
  console.log(user);
  const [openSearchSettings, setOpenSearchSettings] = useState(false);
  const closeSearchSettings = () => {
    setOpenSearchSettings(false);
  };
  return (
    <View style={globalStyles.screen}>
      <SearchSettings
        openSearchSettings={openSearchSettings}
        closeSearchSettings={closeSearchSettings}
      />
      <View style={globalStyles.container}>
        <TouchableOpacity
          className="bg-black"
          onPress={() => {
            setOpenSearchSettings(true);
          }}
        >
          <Text style={globalStyles.mainText}>HomeScreen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
