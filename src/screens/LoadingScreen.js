import React from "react";
import { View, ActivityIndicator } from "react-native";
import globalStyles from "../../utils/globalStyles";

const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: globalStyles.appBackgroundColor,
      }}
    >
      <ActivityIndicator size="large" color={globalStyles.primaryColor} />
    </View>
  );
};

export default LoadingScreen;
