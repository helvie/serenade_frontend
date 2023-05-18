import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import MainTextInput from "./MainTextInput";
import globalStyles from "../../utils/globalStyles";

const ChooseYourCity = () => {
  // Settings for drop down menu location
  //------------------------------------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const apiKeyOpenCage = "b92119784c034cf2a530f39efb4ad6c4";

  // Purchase filter countries for drop down menu
  //------------------------------------------------
  const handleSearchTerm = (text) => {
    if (text.length > 2) {
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?limit=10&q=${text}&key=${apiKeyOpenCage}`
      )
        .then((response) => response.json())
        .then((json) => {
          setResults(json.results);
        })
        .catch((error) => console.error(error));
    } else {
      setResults([]);
    }
  };

  // Country select for display and profile settings
  // ---------------------------------------------------
  const handleCitySelected = (city, geometry) => {
    const cleanCity = city.replace(/[0-9]/g, "").trim();
    const cityToSet = cleanCity.split(",")[0].trim();
    setSearchTerm(cityToSet);
    setResults([]);

    console.log(city);
    //LATITUDE LONGITUDE (geometry.lat & geometry.lng)
    console.log(geometry);
  };

  const getCityName = (value) => {
    setSearchTerm(value);
    handleSearchTerm(value);
  };

  return (
    <View>
      {/* Display drop down menu location */}
      <MainTextInput
        title="What is your City ?"
        placeholder="Paris"
        //Send the getCityName function as prop to get the city name typed in the component via inverse data flow
        getInputValue={getCityName}
        //Pass the value of the input as prop in order to be able to clear it after form submission
        value={searchTerm}
      />

      <View style={styles.section}>
        <FlatList
          scrollEnabled={false}
          style={{ backgroundColor: "#1D2635", width: "100%" }}
          data={results}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemCity}
              onPress={() => handleCitySelected(item.formatted, item.geometry)}
            >
              <Text style={globalStyles.textSmall}>{`${item.formatted}`}</Text>
            </TouchableOpacity>
          )}
          key={(item) => item.place_id} // Use item.place_id as the unique key
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingTop: 20,
    width: "100%",
  },
  itemCity: {
    minHeight: 60,
    width: "95%",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default ChooseYourCity;
