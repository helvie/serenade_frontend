import React, { useState, useEffect } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  Text,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import globalStyles from "../../utils/globalStyles";
import { Searchbar } from "react-native-paper";
import UserPartner from "../components/UserPartner";
import MainButton from "../components/MainButton";

const LinkAPartner = ({ openLinkPartner, closeLinkPartner }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  handleSearhchPartner = () => {
    console.log("searching partner");
  };

  handleAddPartner = () => {
    console.log("partner added");
  };

  handleRemovePartner = () => {
    console.log("partner removed");
  };

  return (
    <Modal visible={openLinkPartner} transparent={true} animationType="slide">
      <View style={styles.container} activeOpacity={1}>
        <KeyboardAvoidingView style={keyboardVisible && { flex: 1 }}>
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={closeLinkPartner}
                className="self-end mb-5"
              >
                <AntDesign
                  name="closecircle"
                  size={25}
                  color={globalStyles.whiteColor}
                />
              </TouchableOpacity>
              <Searchbar
                placeholder="Enter your partner's imaginary name"
                inputStyle={globalStyles.mainTextBlack}
                onChangeText={onChangeSearch}
                value={searchQuery}
                className="mb-3"
                iconColor={globalStyles.primaryColor}
                onIconPress={() => handleSearhchPartner()}
                onSubmitEditing={() => handleSearhchPartner()}
              />
              <View className="mb-10">
                <Text style={globalStyles.mainText} className="mb-5">
                  1 Person Found
                </Text>
                <View className="flex-row justify-between">
                  <UserPartner
                    name="Manu"
                    picture="https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  />

                  <MainButton height={40} eventHandler={handleAddPartner}>
                    <Text style={globalStyles.mainText}>Add</Text>
                  </MainButton>
                </View>
              </View>

              <Text style={globalStyles.titleText} className="mb-5">
                My relationsships:
              </Text>
              <View>
                <View className="flex-row justify-between mb-2">
                  <UserPartner
                    name="Manu"
                    picture="https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  />

                  <MainButton height={40} eventHandler={handleRemovePartner}>
                    <Text style={globalStyles.mainText}>Remove</Text>
                  </MainButton>
                </View>
                <View className="flex-row justify-between mb-2">
                  <UserPartner
                    name="Manu"
                    picture="https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  />

                  <MainButton height={40} eventHandler={handleRemovePartner}>
                    <Text style={globalStyles.mainText}>Remove</Text>
                  </MainButton>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const windowHeight = Dimensions.get("window").height;
const modalHeight = (4 / 5) * windowHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "rgba(29, 38, 53, 0.85)",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: modalHeight,
  },
  modalContent: {
    flex: 1,
    padding: 16,
    // Additional styles for your modal content
  },
});

export default LinkAPartner;
