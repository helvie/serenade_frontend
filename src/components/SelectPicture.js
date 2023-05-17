import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import globalStyles from "../../utils/globalStyles";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

const SelectPicture = ({
  size,
  getUserPictures,
  removeUserPicture,
  picture,
}) => {
  //If  the user has selected an image
  const [selectedImage, setSelectedImage] = useState(null);

  //If the user picture come from  the backend
  const [userPicture, setUserPicture] = useState(picture);

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

  handleDeletePress = () => {
    //Handle delete depending on whether or not the user has selected an image or image come from the backend
    if (selectedImage) {
      setSelectedImage(null);
      removeUserPicture(selectedImage);
    }
    if (userPicture) {
      setUserPicture(null);
      removeUserPicture(userPicture);
    }
  };

  return !selectedImage && !userPicture ? (
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
          source={userPicture ? { uri: userPicture } : { uri: selectedImage }}
          className="w-full h-full rounded-sm absolute z-0"
        />
      </View>
      <View style={{ position: "absolute", top: -5, right: 0 }}>
        <TouchableOpacity onPress={handleDeletePress}>
          <AntDesign
            name="closecircle"
            size={25}
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
