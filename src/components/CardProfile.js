import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React from "react";
import globalStyles from "../../utils/globalStyles";
import { truncateCityname } from "../../utils/truncateText";
import { age } from "../../utils/transformDate";

export default function CardProfilContainer(props) {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{
          uri: props.picture,
        }}
        style={styles.image}
        className="rounded-t-md"
      />

      <View style={styles.cardText} className="rounded-b-md">
        <View style={styles.iconContainer}>
          <FontAwesome name="user" size={20} color="#ffffff" />
          <Text style={[globalStyles.mainText, { marginLeft: 10 }]}>
            {props.name}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome name="map-marker" size={20} color="#ffffff" />
          <Text style={[globalStyles.mainText, { marginLeft: 10 }]}>
            {truncateCityname(props.city)}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome name="id-card" size={20} color="#ffffff" />
          <Text style={[globalStyles.mainText, { marginLeft: 10 }]}>
            {age(props.birthdate)} {props.gender}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
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
    alignItems: "center",
  },
});
