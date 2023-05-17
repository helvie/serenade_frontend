import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import globalStyles from "../../utils/globalStyles";
import MainButton from "../components/MainButton";
import { Snackbar } from "react-native-paper";
import InProgressBar from "../components/InProgressBar";
import SelectPicture from "../components/SelectPicture";
import Header from "../components/Header";

const SetProfilePicture = ({ navigation }) => {
  const [userPictures, setUserPictures] = useState([]);

  //Used to track user picture in SelectPicture component via inverse data flow
  const getUserPictures = (value) => {
    setUserPictures([...userPictures, value]);
  };

  //Used to track user picture in SelectPicture component via inverse data flow
  const removeUserPicture = (value) => {
    setUserPictures(userPictures.filter((item) => item !== value));
  };
  //Used to set the snack bar visibility
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);

  //Used for set error message in the snack bar
  const [errorMessage, setErrorMessage] = useState("");

  const dismissSnackBar = () => {
    setIsSnackBarVisible(false);
    setErrorMessage("");
  };

  const handleSubmit = () => {
    //Some validation to make sure the user has selected at least 3 pictures
    if (userPictures.length < 2) {
      setIsSnackBarVisible(true);
      setErrorMessage("Please select at least 2 pictures");
      return;
    }
    //if Validation are passed then we can send the user to the next screen
    console.log(userPictures);
    navigation.navigate("TabNavigator");
  };

  //Initialize the 6 selected pictures component to display
  const data = new Array(6).fill(null);
  const renderItem = ({ index, item }) => {
    return (
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
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={globalStyles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyles.container} className="justify-between">
          <ScrollView>
            <Header />
            <View className="mb-12 w-4/6 self-center">
              <InProgressBar progressValue={1} />
            </View>
            <Text style={globalStyles.titleText} className="mb-2">
              Show yourself in your best light
            </Text>
            <Text style={globalStyles.textSmall} className="mb-10">
              No ulterior motives - let's keep it romantic, the world needs it.
              Nudity, lingerie or shirtless selfies will get you blocked.
            </Text>

            <FlatList
              //Render our components initialized above
              data={data}
              numColumns={3}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          </ScrollView>
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
              eventHandler={handleSubmit}
            >
              <Text style={globalStyles.titleText}>
                I'm ready to see people
              </Text>
            </MainButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SetProfilePicture;
