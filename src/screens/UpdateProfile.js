import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import globalStyles from "../../utils/globalStyles";
import Header from "../components/Header";
import SelectPicture from "../components/SelectPicture";
import ChooseBirthDate from "../components/ChooseBirthDate";
import { Divider, Modal, Portal, RadioButton } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import MainTextInput from "../components/MainTextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RadioButtonItem from "../components/RadioButtonItem";
import { Snackbar } from "react-native-paper";
import moment from "moment";

const UpdateProfile = () => {
  //Map through the user pictures
  const [userPictures, setUserPictures] = useState([
    "https://images.pexels.com/photos/3656773/pexels-photo-3656773.jpeg",
    "https://images.pexels.com/photos/2364381/pexels-photo-2364381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ]);

  const DATA = [...userPictures, ...Array(6 - userPictures.length).fill(null)];

  //Used to track user picture in SelectPicture component via inverse data flow
  const getUserPictures = (value) => {
    setUserPictures([...userPictures, value]);
  };

  //Used to track user picture in SelectPicture component via inverse data flow
  const removeUserPicture = (value) => {
    setUserPictures(userPictures.filter((item) => item !== value));
  };

  //keep track of the birthdate component
  const [dayOfBirth, setDayOfBirth] = useState("02");
  const [monthOfBirth, setMonthOfBirth] = useState("11");
  const [yearOfBirth, setYearOfBirth] = useState("1997");
  const getDayOfBirth = (value) => {
    setDayOfBirth(value);
  };
  const getMonthOfBirth = (value) => {
    setMonthOfBirth(value);
  };
  const getYearOfBirth = (value) => {
    setYearOfBirth(value);
  };

  //Keep track of the job title
  const [jobTitle, setJobTitle] = useState("");
  const getJobTitle = (value) => {
    setJobTitle(value);
  };

  //Keep track of the user description
  const [userDescription, setUserDescription] = useState("");
  const getUserDescription = (value) => {
    setUserDescription(value);
  };

  //Keep track of the gender modal
  const [genderModalvisible, setGenderModalVisible] = useState(false);
  const showGenderModal = () => setGenderModalVisible(true);
  const hideGenderModal = () => setGenderModalVisible(false);
  const [gender, setGender] = useState("Woman");

  //Keep track of the Sexuality modal
  const [sexualityModalvisible, setSexualityModalVisible] = useState(false);
  const showSexualityModal = () => setSexualityModalVisible(true);
  const hideSexualityModal = () => setSexualityModalVisible(false);
  const [sexuality, setSexuality] = useState("Bisexual");

  //Used for set error message in the snack bar
  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  //Used to set the snack bar visibility
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const dismissSnackBar = () => {
    setIsSnackBarVisible(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleUpdateProfile = () => {
    if (userPictures.length < 2) {
      setIsSnackBarVisible(true);
      setErrorMessage("Please select at least 2 pictures");
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

    console.log({
      userPictures,
      userDateOfBirth,
      gender,
      sexuality,
      jobTitle,
      userDescription,
    });

    setIsSnackBarVisible(true);
    setSuccessMessage("Your profile has been updated successfully");
  };

  return (
    <KeyboardAvoidingView style={globalStyles.screen} className="pt-5 pb-10">
      <ScrollView style={globalStyles.container}>
        <View className="flex-row justify-between items-center">
          <View className="w-3/5">
            <Header />
          </View>
          <TouchableOpacity
            onPress={() => handleUpdateProfile()}
            style={{ backgroundColor: globalStyles.primaryColor }}
            className="mb-5 rounded-full h-10 w-10 justify-center items-center"
          >
            <MaterialCommunityIcons
              name="content-save-all"
              size={25}
              color="white"
            />
          </TouchableOpacity>
        </View>
        {(errorMessage || successMessage) && (
          <View className="mt-5">
            <Snackbar
              visible={isSnackBarVisible}
              onDismiss={dismissSnackBar}
              action={{
                label: "Dismiss",
              }}
              duration={2000}
            >
              {errorMessage && (
                <Text style={globalStyles.mainTextPrimary}>{errorMessage}</Text>
              )}
              {successMessage && (
                <Text style={globalStyles.mainText}>{successMessage}</Text>
              )}
            </Snackbar>
          </View>
        )}

        <Text className="mb-5" style={globalStyles.titleText}>
          Edit your photos
        </Text>

        <FlatList
          //Render user pictures
          className="mb-7"
          data={DATA}
          numColumns={3}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: "33.3%",
                height: 120,
                justifyContent: "center",
              }}
            >
              <SelectPicture
                getUserPictures={getUserPictures}
                removeUserPicture={removeUserPicture}
                picture={item}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
        <ChooseBirthDate
          dayOfBirth={dayOfBirth}
          monthOfBirth={monthOfBirth}
          yearOfBirth={yearOfBirth}
          getDayOfBirth={getDayOfBirth}
          getMonthOfBirth={getMonthOfBirth}
          getYearOfBirth={getYearOfBirth}
        />
        <View className="mb-7">
          <Text className="mb-5" style={globalStyles.titleText}>
            Your gender
          </Text>
          <TouchableOpacity
            className="flex-row justify-between mb-2"
            onPress={() => {
              showGenderModal(true);
            }}
          >
            <Text style={globalStyles.mainText}>{gender}</Text>
            <Entypo name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
          <Divider />
          <Portal>
            <Modal
              visible={genderModalvisible}
              onDismiss={hideGenderModal}
              contentContainerStyle={{
                backgroundColor: "white",
                width: "70%",
                height: "40%",
                alignSelf: "center",
                borderRadius: 5,
                backgroundColor: "#4A5364",
                paddingHorizontal: 10,
              }}
            >
              <RadioButton.Group
                onValueChange={(value) => {
                  setGender(value);
                  setGenderModalVisible(false);
                }}
                value={gender}
              >
                <RadioButtonItem label="Man" value="Man" />
                <RadioButtonItem label="Woman" value="Woman" />
                <RadioButtonItem label="Non-binary" value="Non-binary" />
              </RadioButton.Group>
            </Modal>
          </Portal>
        </View>
        <View className="mb-7">
          <Text className="mb-5" style={globalStyles.titleText}>
            Your sexuality
          </Text>
          <TouchableOpacity
            className="flex-row justify-between mb-2"
            onPress={() => {
              showSexualityModal(true);
            }}
          >
            <Text style={globalStyles.mainText}>{sexuality}</Text>
            <Entypo name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
          <Divider />
          <Portal>
            <Modal
              visible={sexualityModalvisible}
              onDismiss={hideSexualityModal}
              contentContainerStyle={{
                backgroundColor: "white",
                width: "80%",
                height: "75%",
                alignSelf: "center",
                borderRadius: 5,
                backgroundColor: "#4A5364",
                paddingHorizontal: 10,
              }}
            >
              <RadioButton.Group
                onValueChange={(value) => {
                  setSexuality(value);
                  setSexualityModalVisible(false);
                }}
                value={sexuality}
              >
                <RadioButtonItem label="Straight" value="Straight" />
                <RadioButtonItem label="Gay" value="Gay" />
                <RadioButtonItem label="Lesbian" value="Lesbian" />
                <RadioButtonItem label="Bisexual" value="Bisexual" />
                <RadioButtonItem label="Pansexual" value="Pansexual" />
                <RadioButtonItem label="Polysexual" value="Polysexual" />
                <RadioButtonItem label="Queer" value="Queer" />
              </RadioButton.Group>
            </Modal>
          </Portal>
        </View>
        <View className="mb-7">
          <MainTextInput
            title="What's your job title?"
            placeholder="UX Designer"
            //Send getJobTitle function as prop to get the jobTitle value in the component via inverse data flow
            getInputValue={getJobTitle}
            //Pass the value of the input as prop in order to be able to clear it after form submission
            value={jobTitle}
          />
        </View>
        <View className="mb-7">
          <MainTextInput
            title="Say something about yourself"
            placeholder="Tell a little story about you..."
            //Send getUserDescription function as prop to get the description value in the component via inverse data flow
            getInputValue={getUserDescription}
            //Pass the value of the input as prop in order to be able to clear it after form submission
            value={userDescription}
            multiline={true}
          />
          <View className="flex-row justify-between">
            <Text style={globalStyles.textSmall}>
              Phone Number are not allowed
            </Text>
            <Text style={globalStyles.textSmall}>
              {userDescription.length}/150
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UpdateProfile;
