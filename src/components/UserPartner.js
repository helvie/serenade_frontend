import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import globalStyles from "../../utils/globalStyles";

const UserPartner = ({ name, picture }) => {
  return (
    <View className="mb-4">
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: picture }}
          className="rounded-full mr-2 w-10 h-10"
        />
        <Text style={[globalStyles.mainText, { marginRight: 10 }]}>{name}</Text>
      </View>
    </View>
  );
};

export default UserPartner;
