import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import globalStyles from "../../utils/globalStyles";
import MainButton from "../components/MainButton";
import { Snackbar } from "react-native-paper";
import InProgressBar from "../components/InProgressBar";
import SelectPicture from "../components/SelectPicture";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  addPicturesToStore,
  addTokenToStore,
  clearStore,
} from "../../reducers/User";
import { signupUser, updateUserPictures } from "../../utils/authenticateUser";

const SetProfilePicture = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [userPictures, setUserPictures] = useState([]);

  const [picturesAddedToStore, setPicturesAddedToStore] = useState(false);

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

  useEffect(() => {
    // we wait our handleSubmit function to dispatch the user pictures to the redux store
    // and then set the picturesAddedToStore state to true so that we can upload the pictures to cloudinary
    if (picturesAddedToStore) {
      (async () => {
        // we Signup our user using our signup user module in  modules/authenticateUser.js
        const data = await signupUser(user);
        // Check if the response is successful and access the user token
        if (data.result === true) {
          const currentUser = data.user;
          const currentUserToken = data.userToken;

          // if we've got the token of the user, we redirect user to the home screen,
          // passing dynamically his token and his properties
          if (currentUser && currentUserToken) {
            dispatch(addTokenToStore(currentUserToken));
            dispatch(clearStore());
            navigation.navigate("TabNavigator", { currentUser });
          } else {
            // otherwise we stop our signup process and show an error message
            setIsSnackBarVisible(true);
            setErrorMessage("Something went wrong during your signup 😨");
            return;
          }

          // in the background we update his document in database with his pictures form the redux store
          // we don't do this in the signupUser function because this procress is very slow
          // and can take a long time to complete
          updateUserPictures(currentUserToken, user.pictures).then((data) => {
            if (data.result === true) {
              return;
            } else {
              console.log(data.message);
            }
          });
        } else {
          setIsSnackBarVisible(true);
          setErrorMessage(data.message + "😨");
        }
      })();
    }
  }, [user, picturesAddedToStore]);

  const handleSubmit = () => {
    //Some validation to make sure the user has selected at least 3 pictures
    if (userPictures.length < 2) {
      setIsSnackBarVisible(true);
      setErrorMessage("Please select at least 2 pictures");
      return;
    }
    // If validation is passed, add pictures to the store
    dispatch(addPicturesToStore(userPictures));
    setPicturesAddedToStore(true);
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
