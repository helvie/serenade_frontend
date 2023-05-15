import { Button } from "react-native-paper";
import React from "react";
import { StyleSheet } from "react-native";
import globalStyles from "../../utils/globalStyles";

const MainButton = ({ children, eventHandler, disabled }) => {
  return (
    <Button
      disabled={disabled}
      style={[
        styles.main,
        {
          backgroundColor: disabled
            ? globalStyles.secondaryColor
            : globalStyles.primaryColor,
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
    height: 48,
  },
});

export default MainButton;
