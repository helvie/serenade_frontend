import { View, Text, StyleSheet } from "react-native";
import React from "react";
import globalStyles from "../../utils/globalStyles";

const ChatSenderMessage = (props) => {
  return (
    <View style={styles.message2Container}>
      <View style={styles.message2}>
        <View style={styles.date2}>
          <Text style={globalStyles.textSmallColored}>{props.date}</Text>
        </View>
        <View style={styles.textContainer2}>
          <Text style={globalStyles.mainText}>{props.text}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  date2: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 15,
    paddingBottom: 5,
  },

  message2: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    maxWidth: "70%",
  },

  message2Container: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },

  textContainer2: {
    backgroundColor: "#EC7955",
    color: "#ffffff",
    minHeight: 38,
    // justifyContent:"center",
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 0,
  },
});

export default ChatSenderMessage;
