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
import Header from "../components/Header";
import ChooseBirthDate from "../components/ChooseBirthDate";
import moment from "moment";
import ChooseYourCity from "../components/ChooseYourCity";

const CreateUserInfos = ({ navigation }) => {
  const [name, setName] = useState("");
  const [imaginaryName, setImaginaryName] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState("");
  const [monthOfBirth, setMonthOfBirth] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [userCity, setUserCity] = useState({});

  //This function is used to reset the input fields after form submission
  const resetInputFields = () => {
    setName("");
    setImaginaryName("");
    setDayOfBirth("");
    setMonthOfBirth("");
    setYearOfBirth("");
  };

  //This is used to track the name in the MainTextInput component
  const getName = (value) => {
    setName(value);
  };

  //This is used to track the user city in the ChooseYourCity component
  const getCity = (value) => {
    setUserCity(value);
  };

  //This is used to track the imaginary name in the MainTextInput component
  const getImaginaryName = (value) => {
    setImaginaryName(value);
  };

  const getDayOfBirth = (value) => {
    setDayOfBirth(value);
  };
  const getMonthOfBirth = (value) => {
    setMonthOfBirth(value);
  };
  const getYearOfBirth = (value) => {
    setYearOfBirth(value);
  };

  //Used for set error message in the snack bar
  const [errorMessage, setErrorMessage] = useState("");

  //Used to set the snack bar visibility
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);

  const dismissSnackBar = () => {
    setIsSnackBarVisible(false);
    setErrorMessage("");
  };

  const handlePress = () => {
    //Some validations to make sure that the inputs are not empty and valid
    if (
      isInputEmpty(name) ||
      isInputEmpty(imaginaryName) ||
      isInputEmpty(dayOfBirth) ||
      isInputEmpty(monthOfBirth) ||
      isInputEmpty(yearOfBirth)
    ) {
      setIsSnackBarVisible(true);
      setErrorMessage("All the fields are required");
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
      return;
    }

    if (
      yearOfBirth < 1900 ||
      yearOfBirth > 2005 ||
      Number(yearOfBirth) % 1 !== 0 ||
      typeof Number(yearOfBirth) !== "number"
    ) {
      setIsSnackBarVisible(true);
      setErrorMessage("Your year of birth does not meet our requirements");
      return;
    }

    const userDateOfBirth = moment()
      .year(yearOfBirth)
      .month(monthOfBirth - 1)
      .date(dayOfBirth);

    //If all the inputs are valid, this function will be called
    console.log({
      name,
      imaginaryName,
      userDateOfBirth,
      userCity,
    });
    // call the function to reset input fields
    resetInputFields();
    navigation.navigate("SetProfilePictures");
  };

  return (
    <KeyboardAvoidingView style={globalStyles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View className="justify-between mt-5">
            <View>
              <Header />
              <View className="mb-12 w-4/6 self-center">
                <InProgressBar progressValue={0.85} />
              </View>
              <View className="mb-7">
                <MainTextInput
                  title="What is your name ?"
                  subtitle="Be careful, you won’t be able to change your name"
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
              <ChooseBirthDate
                dayOfBirth={dayOfBirth}
                monthOfBirth={monthOfBirth}
                yearOfBirth={yearOfBirth}
                getDayOfBirth={getDayOfBirth}
                getMonthOfBirth={getMonthOfBirth}
                getYearOfBirth={getYearOfBirth}
              />

              <ChooseYourCity getCity={getCity} />
            </View>
            <View className="mt-10">
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreateUserInfos;
