import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import globalStyles from "../../utils/globalStyles";
import MainTextInput from "../components/MainTextInput";
import PasswordInput from "../components/PasswordInput";
import MainButton from "../components/MainButton";
import { Snackbar } from "react-native-paper";
import { isEmailValid, isInputEmpty } from "../../utils/validateInputsContent";
import Header from "../components/Header";
import { loginUser } from "../../utils/authenticateUser";
import { useDispatch } from "react-redux";
import { addTokenToStore } from "../../reducers/User";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //This function is used to reset the input fields after form submission
  const resetInputFields = () => {
    setEmail("");
    setPassword("");
  };

  //This is used to track the email value in the MainTextInput component
  const getEmailValue = (value) => {
    setEmail(value);
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

  const handleLogin = async () => {
    //Some validations to make sure that the email and password are not empty and valid
    if (isInputEmpty(email) || isInputEmpty(password)) {
      setIsSnackBarVisible(true);
      setErrorMessage("All fields are required");
      return;
    }
    if (!isEmailValid(email)) {
      setIsSnackBarVisible(true);
      setErrorMessage("Your email address is not valid");
      return;
    }
    //If the email and password are valid, we login the user, dispatch his token ins the redux store
    //and redirect him to the home screen
    const data = await loginUser({ email, password });
    if (data.result === true) {
      const userToken = data.userToken;
      dispatch(addTokenToStore(userToken));
      resetInputFields();
      navigation.navigate("TabNavigator");
    } else {
      setIsSnackBarVisible(true);
      setErrorMessage(data.message);
    }
  };

  return (
    <KeyboardAvoidingView style={globalStyles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyles.container} className="justify-between">
          <View>
            <Header />
            <View className="my-7">
              <MainTextInput
                title="Enter your email address"
                placeholder="janedoe@gmail.com"
                //Send getEmailValue function as prop to get the email value in the component via inverse data flow
                getInputValue={getEmailValue}
                //Pass the value of the input as prop in order to be able to clear it after form submission
                value={email}
              />
            </View>
            <View className="mb-7">
              <PasswordInput
                title="Enter your password"
                placeholder="Enter your password"
                //Send getPassword function as prop to get the email value in the component via inverse data flow
                getInputValue={getPasswordValue}
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
              eventHandler={handleLogin}
            >
              <Text style={globalStyles.titleText}>Login</Text>
            </MainButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
