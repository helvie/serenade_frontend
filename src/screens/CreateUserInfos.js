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
import MainTextInput from "../components/MainTextInput";
import MainButton from "../components/MainButton";
import { Snackbar } from "react-native-paper";
import { isInputEmpty } from "../../utils/validateInputsContent";
import InProgressBar from "../components/InProgressBar";
import { TextInput } from "react-native-paper";

import * as Location from "expo-location";

const CreateUserInfos = ({ navigation }) => {
  const [name, setName] = useState("");
  const [imaginaryName, setImaginaryName] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState("");
  const [monthOfBirth, setMonthOfBirth] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [cityName, setCityName] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  //This function is used to reset the input fields after form submission
  const resetInputFields = () => {
    setName("");
    setImaginaryName("");
    setDayOfBirth("");
    setMonthOfBirth("");
    setYearOfBirth("");
    setCityName("");
  };

  //This is used to track the name in the MainTextInput component
  const getName = (value) => {
    setName(value);
  };

  //This is used to track the imaginary name in the MainTextInput component
  const getImaginaryName = (value) => {
    setImaginaryName(value);
  };

  const getCityName = (value) => {
    setCityName(value);
  };

  //Used to set the snack bar visibility
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const dismissSnackBar = () => {
    setIsSnackBarVisible(false);
    setErrorMessage("");
  };

  //Used for set error message in the snack bar
  const [errorMessage, setErrorMessage] = useState("");

  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      return await Location.getCurrentPositionAsync({});
    }
  };

  const handlePress = async () => {
    //Some validations to make sure that the inputs are not empty and valid
    setButtonDisabled(true);
    if (
      isInputEmpty(name) ||
      isInputEmpty(imaginaryName) ||
      isInputEmpty(cityName) ||
      isInputEmpty(dayOfBirth) ||
      isInputEmpty(monthOfBirth) ||
      isInputEmpty(yearOfBirth)
    ) {
      setIsSnackBarVisible(true);
      setErrorMessage("All the fields are required");
      setButtonDisabled(false);
      return;
    }

    if (
      dayOfBirth < 1 ||
      dayOfBirth > 31 ||
      Number(dayOfBirth) % 1 !== 0 ||
      typeof Number(dayOfBirth) !== "number"
    ) {
      setIsSnackBarVisible(true);
      setErrorMessage("Something seems wrong with your birthday");
      setButtonDisabled(false);
      return;
    }

    if (
      monthOfBirth < 1 ||
      monthOfBirth > 12 ||
      Number(monthOfBirth) % 1 !== 0 ||
      typeof Number(monthOfBirth) !== "number"
    ) {
      setIsSnackBarVisible(true);
      setErrorMessage("Something seems wrong with your month of birth");
      setButtonDisabled(false);
      return;
    }

    if (
      yearOfBirth < 1900 ||
      yearOfBirth > 2005 ||
      Number(yearOfBirth) % 1 !== 0 ||
      typeof Number(yearOfBirth) !== "number"
    ) {
      setIsSnackBarVisible(true);
      setErrorMessage("Your age does not meet our requirements");
      setButtonDisabled(false);
      return;
    }

    const location = await getUserLocation();
    if (!location) {
      setIsSnackBarVisible(true);
      setErrorMessage("Please enable location services");
      setButtonDisabled(false);
      return;
    }

    const userDateOfBirth = new Date(yearOfBirth, monthOfBirth - 1, dayOfBirth);
    //If all the inputs are valid, this function will be called
    console.log({
      name,
      imaginaryName,
      cityName,
      userDateOfBirth,
      userLocation: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
    // call the function to reset input fields
    resetInputFields();
    setButtonDisabled(false);
    navigation.navigate("SetProfilePictures");
  };

  return (
    <KeyboardAvoidingView style={globalStyles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={globalStyles.container} className="justify-between">
            <View>
              <View className="my-12 w-4/6 self-center">
                <InProgressBar progressValue={0.85} />
              </View>
              <View className="mb-7">
                <MainTextInput
                  title="What is your name ?"
                  subtitle="Be careful, you won’t be able to change your 
                name"
                  placeholder="Jane"
                  //Send the getName function as prop to get the name value in the component via inverse data flow
                  getInputValue={getName}
                  //Pass the value of the input as prop in order to be able to clear it after form submission
                  value={name}
                />
              </View>
              <View className="mb-7">
                <MainTextInput
                  title="Pick an imaginary name"
                  subtitle="If you wish, the name will allow your partner to link
                your account to theirs"
                  placeholder="sunset lover"
                  //Send the getImaginary function as prop to get the name value in the component via inverse data flow
                  getInputValue={getImaginaryName}
                  //Pass the value of the input as prop in order to be able to clear it after form submission
                  value={imaginaryName}
                />
              </View>
              <View className="mb-7">
                <Text style={globalStyles.titleText}>
                  What is your birth date ?
                </Text>
                <View className="justify-between flex-row">
                  <TextInput
                    className="bg-transparent w-3/12"
                    keyboardType="numeric"
                    label="Day"
                    maxLength={2}
                    style={[globalStyles.titleText, { paddingHorizontal: 0 }]}
                    theme={{
                      colors: {
                        onSurfaceVariant: globalStyles.placeholderColor,
                      },
                    }}
                    mode="flat"
                    placeholder="02"
                    underlineColor={globalStyles.whiteColor}
                    activeUnderlineColor={globalStyles.primaryColor}
                    textColor={globalStyles.whiteColor}
                    onChangeText={(text) => setDayOfBirth(text)}
                    value={dayOfBirth}
                  />
                  <TextInput
                    className="bg-transparent w-3/12"
                    keyboardType="numeric"
                    label="Month"
                    maxLength={2}
                    style={[globalStyles.titleText, { paddingHorizontal: 0 }]}
                    theme={{
                      colors: {
                        onSurfaceVariant: globalStyles.placeholderColor,
                      },
                    }}
                    mode="flat"
                    placeholder="09"
                    underlineColor={globalStyles.whiteColor}
                    activeUnderlineColor={globalStyles.primaryColor}
                    textColor={globalStyles.whiteColor}
                    onChangeText={(text) => setMonthOfBirth(text)}
                    value={monthOfBirth}
                  />
                  <TextInput
                    className="bg-transparent w-3/12"
                    keyboardType="numeric"
                    label="Year"
                    maxLength={4}
                    style={[globalStyles.titleText, { paddingHorizontal: 0 }]}
                    theme={{
                      colors: {
                        onSurfaceVariant: globalStyles.placeholderColor,
                      },
                    }}
                    mode="flat"
                    placeholder="1997"
                    underlineColor={globalStyles.whiteColor}
                    activeUnderlineColor={globalStyles.primaryColor}
                    textColor={globalStyles.whiteColor}
                    onChangeText={(text) => setYearOfBirth(text)}
                    value={yearOfBirth}
                  />
                </View>
              </View>
              <View className="mb-7">
                <MainTextInput
                  title="What is your City ?"
                  placeholder="Paris"
                  //Send the getCityName function as prop to get the name value in the component via inverse data flow
                  getInputValue={getCityName}
                  //Pass the value of the input as prop in order to be able to clear it after form submission
                  value={cityName}
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
                eventHandler={handlePress}
                disabled={buttonDisabled}
              >
                <Text style={globalStyles.titleText}>Continue</Text>
              </MainButton>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreateUserInfos;
