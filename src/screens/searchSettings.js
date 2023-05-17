import React, { useState, useEffect } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import globalStyles from "../../utils/globalStyles";
import { Searchbar } from "react-native-paper";
import UserPartner from "../components/UserPartner";

const LinkAPartner = ({ openLinkPartner, closeLinkPartner }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

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

  return (
    <Modal visible={openLinkPartner} transparent={true}>
      <TouchableOpacity style={styles.container} activeOpacity={1}>
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
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
};

const windowHeight = Dimensions.get("window").height;
const modalHeight = (2 / 3) * windowHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(29, 38, 53, 0.85)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
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
