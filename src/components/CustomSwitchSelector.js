import { View, TouchableOpacity, Text } from "react-native";
import React, { useState } from "react";
import globalStyles from "../../utils/globalStyles";
import { useEffect } from "react";

const CustomSwitchSelector = ({ onOptionChange }) => {
  const [selectedOption, setSelectedOption] = useState("My Matches");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onOptionChange(option);
  };

  useEffect(() => {
    onOptionChange(selectedOption);
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor:
            selectedOption === "My Matches" ? "#ec7955" : "white",
          paddingVertical: 10,
          alignItems: "center",
        }}
        onPress={() => handleOptionChange("My Matches")}
      >
        <Text
          style={{
            color: selectedOption === "My Matches" ? "white" : "black",
            fontSize: 15,
            fontFamily: "LabGrostesque-Regular",
          }}
        >
          My Matches
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor:
            selectedOption === "Who likes me" ? "#ec7955" : "white",
          paddingVertical: 10,
          alignItems: "center",
        }}
        onPress={() => handleOptionChange("Who likes me")}
      >
        <Text
          style={{
            color: selectedOption === "Who likes me" ? "white" : "black",
            fontFamily: "LabGrostesque-Regular",
            fontSize: 15,
          }}
        >
          Who likes me
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomSwitchSelector;
