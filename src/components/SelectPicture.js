import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import globalStyles from "../../utils/globalStyles";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";

const SelectPicture = ({ size, getUserPictures, filterUserPictures }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      getUserPictures(result.assets[0].uri);
    }
  };

  return !selectedImage ? (
    <TouchableOpacity
      style={{
        borderColor: globalStyles.primaryColor,
        ...styles.square,
        width: size,
        height: size,
      }}
      onPress={pickImage}
    >
      <Text className="text-white text-4xl">+</Text>
    </TouchableOpacity>
  ) : (
    <View style={{ position: "relative" }}>
      <View
        style={{
          borderColor: "transparent",
          ...styles.square,
          width: size,
          height: size,
        }}
      >
        <Image
          source={{ uri: selectedImage }}
          className="w-full h-full rounded-sm absolute z-0"
        />
      </View>
      <View style={{ position: "absolute", top: -30, right: 0 }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedImage(null);
            filterUserPictures(selectedImage);
          }}
        >
          <Ionicons
            name="close-circle-outline"
            size={32}
            color={globalStyles.primaryColor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  square: {
    width: "30%",
    aspectRatio: 1,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: "3%",
  },
});

export default SelectPicture;
