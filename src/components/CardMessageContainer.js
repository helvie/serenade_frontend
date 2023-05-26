import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import globalStyles from "../../utils/globalStyles";

export default function CardMessageContainer(props) {
  return (
    <View className="flex-row justify-between items-center mb-4">
      <View className="w-16 mr-2">
        <Image source={{ uri: props.image }} style={styles.image} />
      </View>
      <View className="w-7/12 flex-row justify-start mr-2">
        <View>
          <Text style={globalStyles.mainText}>{props.name}</Text>
          <Text style={globalStyles.textSmallColored}>{props.message}</Text>
        </View>
      </View>
      <View className="w-16 flex-row justify-center">
        <Text className="justify-end" style={globalStyles.textSmallColored}>
          {props.time}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 100,
  },
});
