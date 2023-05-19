import { Image, View, Text, StyleSheet } from "react-native";
import React from "react";
import globalStyles from "../../utils/globalStyles";

const UserAvatar = (props) => {
  // // Initialisation of connected status
  const isConnected = props.connected;
  const displayAvatar = props.avatarDisplay;
  const size = props.size;
  const avatarImage = props.avatarImage;

  return (
    <View style={{ width: size, height: size }}>
      {displayAvatar && (
        <>
          <View style={isConnected && [styles.connect]}></View>
          <Image
            style={[styles.avatarImage, { width: size, height: size }]}
            className="rounded-full"
            source={{ uri: avatarImage }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  connect: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 15,
    height: 15,
    backgroundColor: "#00ff00",
    borderColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 50,
    zIndex: 1000,
  },

  avatarImage: {
    borderRadius: 50,
  },
});
export default UserAvatar;
