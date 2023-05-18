import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
//import SearchSettings from "./SearchSettings";
import globalStyles from "../../utils/globalStyles";
import Swiper from "react-native-deck-swiper";
import { allUsers } from "../../fakeData/allUsers";

const HomeScreen = () => {
  const [openSearchSettings, setOpenSearchSettings] = useState(false);
  const closeSearchSettings = () => {
    setOpenSearchSettings(false);
  };
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "yellow" }}>
      {/* <HomeHeader /> */}
      <Text>Hello</Text>

      <Swiper
        containerStyle={{ backgroundColor: "yellow" }}
        cards={allUsers}
        renderCard={(card) => (
          <View key={card.id} className="bg-red-500">
            <Text>{card.firstname}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;

// <SearchSettings
//   openSearchSettings={openSearchSettings}
//   closeSearchSettings={closeSearchSettings}
// />
// <View style={globalStyles.container}>
//   <TouchableOpacity
//     className="bg-black"
//     onPress={() => {
//       setOpenSearchSettings(true);
//     }}
//   >
//     <Text style={globalStyles.mainText}>HomeScreen</Text>
//   </TouchableOpacity>
// </View>
