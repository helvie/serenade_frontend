import { Button } from "react-native-paper";
import React from "react";
import { StyleSheet } from "react-native";
import globalStyles from "../../utils/globalStyles";

const MainButton = ({ children, eventHandler, height = 48 }) => {
  return (
    <Button
      style={[
        styles.main,
        {
          backgroundColor: globalStyles.primaryColor,
          height: height,
        },
      ]}
      mode="contained"
      onPress={() => eventHandler()}
    >
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  main: {
    borderRadius: 10,
    minwidth: "100%",
  },
});

export default MainButton;
