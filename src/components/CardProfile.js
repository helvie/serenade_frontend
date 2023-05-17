import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React from "react";
import globalStyles from "../../utils/globalStyles";

export default function CardProfilContainer({
  firstName,
  city,
  age,
  gender,
  picture,
}) {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <Image
        source={{
          uri: picture,
        }}
        style={styles.image}
        className="rounded-t-md"
      />

      <View style={styles.cardText} className="rounded-b-md">
        <View style={styles.iconContainer}>
          <FontAwesome name="user" size={20} color="#ffffff" />
          <Text style={[globalStyles.mainText, { marginLeft: 10 }]}>
            {firstName}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome name="map-marker" size={20} color="#ffffff" />
          <Text style={[globalStyles.mainText, { marginLeft: 10 }]}>
            {city}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome name="id-card" size={20} color="#ffffff" />
          <Text style={[globalStyles.mainText, { marginLeft: 10 }]}>
            {age} {gender}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "47%",
    margin: 5,
  },
  image: {
    aspectRatio: 1,
  },
  cardText: {
    backgroundColor: "#3B485E",
    padding: 10,
  },
  iconContainer: {
    flexDirection: "row",
  },
});
