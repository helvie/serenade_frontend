import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import globalStyles from "../../utils/globalStyles";

export default function CardMessageContainer(props) {
  return (
    <TouchableOpacity>
      <View style={styles.cardContainer}>
        <View style={styles.content}>
          <Image source={{ uri: props.image }} style={styles.image} />
        </View>
        <View style={styles.cardText}>
          <View style={styles.iconContainer}>
            <Text style={[globalStyles.mainText, { marginLeft: 10 }]}>
              {props.name}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <Text style={[styles.secondText, { marginLeft: 10 }]}>
              {props.message}
            </Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Text
            style={[
              styles.secondText,
              { marginRight: 30, marginTop: 5, textAlign: "right" },
            ]}
          >
            {props.time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
  },
  content: {
    width: "10%",
    height: "80%",
    marginRight: 10,
  },
  secondText: {
    fontSize: 15,
    lineHeight: 25,
    fontFamily: "LabGrostesque-Regular",
    color: "#F0D3C9",
  },

  image: {
    width: "150%",
    aspectRatio: 1,
    borderRadius: 100,
  },

  cardText: {
    width: "60%",
    height: "100%",
    borderRadius: 10,
    marginLeft: 10,
    padding: 5,
  },
  iconContainer: {
    flexDirection: "row",
  },
});
