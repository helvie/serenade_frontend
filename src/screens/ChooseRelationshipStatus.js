import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import globalStyles from "../../utils/globalStyles";
import InProgressBar from "../components/InProgressBar";
import MainButton from "../components/MainButton";
import { RadioButton, Snackbar } from "react-native-paper";
import RadioButtonItem from "../components/RadioButtonItem";
import { isInputEmpty } from "../../utils/validateInputsContent";
import Header from "../components/Header";
const ChooseRelationshipStatus = ({ navigation }) => {
  const [inputValue, setInputValue] = useState("");
  //Used to set the snack bar visibility
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const dismissSnackBar = () => {
    setIsSnackBarVisible(false);
    setErrorMessage("");
  };

  //Used for set error message in the snack bar
  const [errorMessage, setErrorMessage] = useState("");

  const handlePress = () => {
    //Check if the input is empty or not
    if (isInputEmpty(inputValue)) {
      setIsSnackBarVisible(true);
      setErrorMessage("Please choose something");
      return;
    }
    console.log(inputValue);
    navigation.navigate("CreateUserInfos");
  };
  return (
    <KeyboardAvoidingView style={globalStyles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyles.container} className="justify-between">
          <View>
            <Header />
            <View className="my-12 w-4/6 self-center">
              <InProgressBar progressValue={0.68} />
            </View>
            <View>
              <Text style={globalStyles.titleText} className="mb-5">
                Currenlty you are...
              </Text>
              <RadioButton.Group
                onValueChange={(value) => setInputValue(value)}
                value={inputValue}
              >
                <RadioButtonItem label="Single" value="Single" />
                <RadioButtonItem
                  label="In a relationship"
                  value="In a relationship"
                />
              </RadioButton.Group>
            </View>
          </View>
          <View className="mt-2">
            {errorMessage && (
              <View>
                <Snackbar
                  visible={isSnackBarVisible}
                  onDismiss={dismissSnackBar}
                  action={{
                    label: "Dismiss",
                  }}
                  duration={4000}
                >
                  <Text style={globalStyles.mainTextPrimary}>
                    {errorMessage}
                  </Text>
                </Snackbar>
              </View>
            )}
            <MainButton
              //MainButton as an eventHandler prop responsible to fire a function in his parent component
              // This is also inverse data flow
              eventHandler={handlePress}
            >
              <Text style={globalStyles.titleText}>Continue</Text>
            </MainButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChooseRelationshipStatus;
