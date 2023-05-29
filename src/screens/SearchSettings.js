import React, { useState, useEffect } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import globalStyles from "../../utils/globalStyles";
import { Slider } from "@miblanchard/react-native-slider";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RadioButton, Snackbar } from "react-native-paper";
import RadioButtonItem from "../components/RadioButtonItem";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import ChooseYourCity from "../components/ChooseYourCity";
import { useSelector } from "react-redux";
import { saveSearchSettings } from "../../utils/authenticateUser";

const SearchSettings = ({ settingsOpen, closeSearchSettings, userInfos }) => {
  const userToken = useSelector((state) => state.user.token);
  const [genderSearched, setGenderSearched] = useState("Non-binary");
  const [partnerSexuality, setPartnerSexuality] = useState(
    userInfos?.sexuality
  );
  const [userCity, setUserCity] = useState(userInfos?.location);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const dismissSnackBar = () => {
    setIsSnackBarVisible(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const getCity = (value) => {
    setUserCity(value);
  };
  //Initial values for the sliders
  const [ageRange, setAgeRange] = useState([30, 55]);
  const [maxDistance, setMaxDistance] = useState([30]);

  //Markers for the sliders
  const maxDistanceMarker = () => (
    <View
      style={{ backgroundColor: globalStyles.primaryColor }}
      className="items-center h-7 w-7 rounded-full justify-center"
    >
      <Text style={globalStyles.textSmall}>{maxDistance}</Text>
    </View>
  );

  const ageRangeMarker = ({ currentValue }) => (
    <View
      style={{ backgroundColor: globalStyles.primaryColor }}
      className="items-center h-7 w-7 rounded-full justify-center"
    >
      <Text style={globalStyles.textSmall}>{currentValue}</Text>
    </View>
  );

  //Handlers for the slider changes
  const handleChangeMaxDistance = (newValue) => {
    setMaxDistance(newValue);
  };
  const handleAgeRangeChange = (newValues) => {
    setAgeRange(newValues);
  };

  const handleSaveSearchSettings = async () => {
    const searchSettings = {
      search: {
        maxDistance: maxDistance[0],
        ageMin: ageRange[0],
        ageMax: ageRange[1],
        genderLiked: genderSearched,
        sexualityLiked: partnerSexuality,
      },
      location: {
        city: userCity.name || userCity.city,
        latitude: userCity.lat || userCity.latitude,
        longitude: userCity.lng || userCity.longitude,
      },
      userToken,
    };

    const data = await saveSearchSettings(searchSettings);
    if (data.result === true) {
      setIsSnackBarVisible(true);
      setSuccessMessage("Search settings saved successfully");
      setTimeout(() => {
        setIsSnackBarVisible(false);
        setSuccessMessage("");
        closeSearchSettings();
      }, 3000);
    } else {
      setIsSnackBarVisible(true);
      setErrorMessage(data.message);
    }
  };

  const mtValue = Platform.select({
    ios: 45,
    android: 16,
    default: 16,
  });

  return (
    <Modal visible={settingsOpen} transparent={true} animationType="slide">
      <TouchableOpacity style={styles.container} activeOpacity={1}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView style={styles.modal}>
            <View style={styles.modalContent}>
              <View
                className="flex-row justify-between items-center mb-5"
                style={{ marginTop: mtValue }}
              >
                <TouchableOpacity
                  onPress={() => {
                    handleSaveSearchSettings();
                  }}
                  style={{ backgroundColor: globalStyles.primaryColor }}
                  className="rounded-full h-10 w-10 justify-center items-center"
                >
                  <MaterialCommunityIcons
                    name="content-save-all"
                    size={25}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={closeSearchSettings}>
                  <AntDesign
                    name="closecircle"
                    size={25}
                    color={globalStyles.whiteColor}
                  />
                </TouchableOpacity>
              </View>
              {(errorMessage || successMessage) && (
                <View className="mt-16">
                  <Snackbar
                    visible={isSnackBarVisible}
                    onDismiss={dismissSnackBar}
                    action={{
                      label: "Dismiss",
                    }}
                    duration={4000}
                  >
                    <Text style={globalStyles.mainTextPrimary}>
                      {errorMessage ? errorMessage : successMessage}
                    </Text>
                  </Snackbar>
                </View>
              )}
              <View className="mb-7">
                <Text className="text-center" style={globalStyles.titleText}>
                  Search Settings
                </Text>
                <Text className="text-center" style={globalStyles.textSmall}>
                  Refine your search
                </Text>
              </View>
              <View className="mb-7">
                <ChooseYourCity getCity={getCity} />
              </View>

              {/* +++++++++++++MAX DISTANCE SLIDER  ++++++++++++ */}
              <View className="mb-7">
                <Text className="mb-2" style={globalStyles.titleText}>
                  Maximum distance
                </Text>
                <View className="flex-row justify-between">
                  <Text style={globalStyles.textSmall}>0km</Text>
                  <Ionicons name="md-infinite-sharp" size={24} color="white" />
                </View>
                <View className="flex-row justify-between">
                  <View className="mt-2">
                    <MaterialCommunityIcons
                      name="target"
                      size={24}
                      color={globalStyles.primaryColor}
                    />
                  </View>
                  <View className="w-10/12">
                    <Slider
                      value={maxDistance}
                      minimumValue={1}
                      maximumValue={300}
                      onValueChange={(value) => handleChangeMaxDistance(value)}
                      step={5}
                      thumbTintColor={globalStyles.primaryColor}
                      trackStyle={{
                        backgroundColor: globalStyles.whiteColor,
                      }}
                      minimumTrackStyle={{
                        backgroundColor: globalStyles.primaryColor,
                      }}
                      renderThumbComponent={maxDistanceMarker}
                    />
                  </View>
                  <View className="mt-2">
                    <MaterialCommunityIcons
                      name="target"
                      size={24}
                      color={globalStyles.primaryColor}
                    />
                  </View>
                </View>
              </View>
              {/* +++++++++++++++++++++++++++++++++++++++++++++++ */}

              {/* +++++++++++++AGE RANGE SLIDER ++++++++++++ */}
              <View className="mb-7">
                <Text className="mb-2" style={globalStyles.titleText}>
                  Age Range
                </Text>
                <View className="flex-row justify-between">
                  <Text style={globalStyles.textSmall}>18 years</Text>
                  <Ionicons name="md-infinite-sharp" size={24} color="white" />
                </View>
                <View className="flex-row justify-between">
                  <View className="mt-3">
                    <MaterialCommunityIcons
                      name="gauge-empty"
                      size={24}
                      color={globalStyles.primaryColor}
                    />
                  </View>
                  {/* ++++++++++++++++++++++++++++++multi slider here++++++++++++++++++++ */}
                  <View className="w-10/12">
                    <MultiSlider
                      values={[ageRange[0], ageRange[1]]}
                      sliderLength={300}
                      onValuesChange={handleAgeRangeChange}
                      min={18}
                      max={99}
                      step={1}
                      allowOverlap
                      snapped
                      customMarker={ageRangeMarker}
                      selectedStyle={{
                        backgroundColor: globalStyles.primaryColor,
                      }}
                    />
                  </View>

                  <View className="mt-3">
                    <MaterialCommunityIcons
                      name="gauge-full"
                      size={24}
                      color={globalStyles.primaryColor}
                    />
                  </View>
                </View>
              </View>
              {/* ++++++++++++++++++++++++++++++++++++++++++++ */}

              {/* +++++++++++++WHAT YOU'RE LOOKING FOR ++++++++++++ */}
              <View className="mb-7">
                <Text className="mb-5" style={globalStyles.titleText}>
                  What are you looking for?
                </Text>
                <RadioButton.Group
                  onValueChange={(value) => {
                    setGenderSearched(value);
                  }}
                  value={genderSearched}
                >
                  <RadioButtonItem label="Man" value="Man" />
                  <RadioButtonItem label="Woman" value="Woman" />
                  <RadioButtonItem label="Non-binary" value="Non-binary" />
                </RadioButton.Group>
              </View>
              {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

              {/* +++++++++++++your partner's sexual orientation ++++++++++++ */}
              <View className="mb-7">
                <Text className="mb-5" style={globalStyles.titleText}>
                  Your partner's sexuality
                </Text>
                <RadioButton.Group
                  onValueChange={(value) => setPartnerSexuality(value)}
                  value={partnerSexuality}
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
              {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "rgba(29, 38, 53, 0.9)",
  },
  modalContent: {
    flex: 1,
    padding: 16,

    // Additional styles for your modal content
  },
});

export default SearchSettings;
