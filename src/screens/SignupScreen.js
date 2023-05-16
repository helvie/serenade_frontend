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
import MainTextInput from "../components/MainTextInput";
import PasswordInput from "../components/PasswordInput";
import MainButton from "../components/MainButton";
import { Snackbar } from "react-native-paper";
import { isEmailValid, isInputEmpty } from "../../utils/validateInputsContent";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [password, setPassword] = useState("");

  //This function is used to reset the input fields after form submission
  const resetInputFields = () => {
    setEmail("");
    setEmailConfirmation("");
    setPassword("");
  };

  //This is used to track the email value in the MainTextInput component
  const getEmailValue = (value) => {
    setEmail(value);
  };

  //This is used to track the email confirmation value in the MainTextInput component
  const getEmailConfirmationValue = (value) => {
    setEmailConfirmation(value);
  };

  //This is used to track the password value in the MainTextInput component
  const getPasswordValue = (value) => {
    setPassword(value);
  };

  //Used to set the snack bar visibility
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const dismissSnackBar = () => {
    setIsSnackBarVisible(false);
    setErrorMessage("");
  };

  //Used for set error message in the snack bar
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = () => {
    //Some validations to make sure that the email and password are not empty and valid
    if (
      isInputEmpty(email) ||
      isInputEmpty(emailConfirmation) ||
      isInputEmpty(password)
    ) {
      setIsSnackBarVisible(true);
      setErrorMessage("All fields are required");
      return;
    }
    if (!isEmailValid(email) || !isEmailValid(emailConfirmation)) {
      setIsSnackBarVisible(true);
      setErrorMessage("Your email address is not valid");
      return;
    }

    if (email !== emailConfirmation) {
      setIsSnackBarVisible(true);
      setErrorMessage("Emails do not match");
      return;
    }
    //If the email and password are valid, this function will be called
    console.log({ email, password });
    navigation.navigate("ChooseYourGender");
    // call the function to reset input fields
    resetInputFields();
  };

  return (
    <KeyboardAvoidingView style={globalStyles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyles.container} className="justify-between">
          <View>
            <View className="my-12 w-4/6 self-center">
              <InProgressBar progressValue={0.17} />
            </View>
            <View className="mb-7">
              <MainTextInput
                title="Enter your email address"
                placeholder="janedoe@gmail.com"
                //Send getEmailValue function as prop to get the email value in the component via inverse data flow
                getInputValue={getEmailValue}
                //Pass the value of the input as pro in order to be able to clear it after form submission
                value={email}
              />
            </View>
            <View className="mb-7">
              <MainTextInput
                title="Confirm your email address"
                placeholder="janedoe@gmail.com"
                //Send getEmailConfirmationValue function as prop to get the email value in the component via inverse data flow
                getInputValue={getEmailConfirmationValue}
                //Pass the value of the input as prop in order to be able to clear it after form submission
                value={emailConfirmation}
              />
            </View>
            <View className="mb-7">
              <PasswordInput
                title="Create a password"
                placeholder="Enter your password"
                //Send getPassword function as prop to get the email value in the component via inverse data flow

                getInputValue={getPasswordValue}
                //Pass the value of the input as prop in order to be able to clear it after form submission
                value={password}
              />
            </View>
          </View>
          <View>
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
              eventHandler={handleSignup}
            >
              <Text style={globalStyles.titleText}>Continue</Text>
            </MainButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
