import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import globalStyles from "../../utils/globalStyles";
import InProgressBar from "../components/InProgressBar";
import MainButton from "../components/MainButton";
import { RadioButton, Snackbar } from "react-native-paper";
import RadioButtonItem from "../components/RadioButtonItem";
import { isInputEmpty } from "../../utils/validateInputsContent";

const ChooseYourSexuality = () => {
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
      setErrorMessage("Please make a choice");
      return;
    }
    console.log(inputValue);
  };
  return (
    <KeyboardAvoidingView style={globalStyles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={globalStyles.container}
          contentContainerStyle={{ justifyContent: "space-between" }}
        >
          <View>
            <View className="my-12 w-4/6 self-center">
              <InProgressBar progressValue={0.51} />
            </View>
            <View>
              <Text style={globalStyles.titleText} className="mb-5">
                You consider yourself to be...
              </Text>
              <RadioButton.Group
                onValueChange={(value) => setInputValue(value)}
                value={inputValue}
              >
                <RadioButtonItem label="Straight" value="Straight" />
                <RadioButtonItem label="Gay" value="Gay" />
                <RadioButtonItem label="Lesbian" value="Lesbian" />
                <RadioButtonItem label="Bisexual" value="Bisexual" />
                <RadioButtonItem label="Pansexual" value="Pansexual" />
                <RadioButtonItem label="Polysexual" value="Polysexual" />
                <RadioButtonItem label="Queer" value="Queer" />
              </RadioButton.Group>
            </View>
          </View>
          <View className="my-10">
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChooseYourSexuality;
