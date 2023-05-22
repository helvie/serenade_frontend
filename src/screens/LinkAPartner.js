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
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import globalStyles from "../../utils/globalStyles";
import { Searchbar } from "react-native-paper";
import UserPartner from "../components/UserPartner";
import MainButton from "../components/MainButton";
import {
  searchUserPartner,
  addUserPartner,
  getAllUserPartners,
  removeUserPartner,
} from "../../utils/linkPartnerRequests";
import { useSelector } from "react-redux";

const LinkAPartner = ({ openLinkPartner, closeLinkPartner }) => {
  const userToken = useSelector((state) => state.user.token);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [partnerFounded, setPartnerFounded] = useState(false);
  const [allUserPartners, setAllUserPartners] = useState([]);
  const [partnerAdded, setPartnerAdded] = useState(null);
  const [partnerRemovedCount, setPartnerRemovedCount] = useState(0);

  //This useEffect is responsible for raising the modal when the keyboard is open and lowering it when it is closed
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

  // This useEffect is responsible for fetching all the user partners from the database
  // it updates the state of allUserPartners when adding or removing a partner
  useEffect(() => {
    (async () => {
      const data = await getAllUserPartners(userToken);
      if (data.result === true) {
        console.log(data.userPartners);
        setAllUserPartners(data.userPartners);
      } else {
        return;
      }
    })();
  }, [partnerAdded, partnerRemovedCount, partnerFounded]);

  const onChangeSearch = (query) => setSearchQuery(query);

  handleSearhchPartner = async () => {
    const data = await searchUserPartner(searchQuery);
    if (data.result === true) {
      const userPartner = data.userPartner;
      setPartnerFounded({
        name: userPartner.name,
        imaginaryName: userPartner.imaginaryName,
        picture: userPartner.pictures[0],
      });
    } else {
      setErrorMessage("No user match your partner's imaginary name");
    }
  };

  handleAddPartner = async (partnerImaginaryName) => {
    const data = await addUserPartner(userToken, partnerImaginaryName);
    if (data.result === true) {
      setPartnerFounded(false);
      setPartnerAdded(partnerImaginaryName);
    } else {
      setPartnerFounded(false);
      setErrorMessage(data.message);
    }
  };

  handleRemovePartner = async (partnerImaginaryName) => {
    const data = await removeUserPartner(userToken, partnerImaginaryName);
    if (data.result === true) {
      setPartnerRemovedCount((prevCount) => prevCount + 1);
    } else {
      console.log(data.message);
    }
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
                onClearIconPress={() => {
                  setPartnerFounded(false);
                  setErrorMessage("");
                }}
              />
              <View className="mb-10">
                {partnerFounded && (
                  <>
                    <Text style={globalStyles.mainText} className="mb-5">
                      1 Person Found
                    </Text>
                    <View className="flex-row justify-between">
                      <UserPartner
                        name={partnerFounded.name}
                        picture={partnerFounded.picture}
                      />

                      <MainButton
                        height={40}
                        eventHandler={() =>
                          handleAddPartner(partnerFounded.imaginaryName)
                        }
                      >
                        <Text style={globalStyles.mainText}>Add</Text>
                      </MainButton>
                    </View>
                  </>
                )}
                {errorMessage && (
                  <Text style={globalStyles.mainText} className="mb-5">
                    {errorMessage}
                  </Text>
                )}
              </View>
              {allUserPartners.length > 0 && (
                <>
                  <Text style={globalStyles.titleText} className="mb-5">
                    Your relationships:
                  </Text>
                  <View>
                    <FlatList
                      data={allUserPartners}
                      renderItem={({ item }) => (
                        <View className="flex-row justify-between mb-2">
                          <UserPartner
                            name={item.name}
                            picture={item.pictures[0]}
                          />

                          <MainButton
                            height={40}
                            eventHandler={() =>
                              handleRemovePartner(item.imaginaryName)
                            }
                          >
                            <Text style={globalStyles.mainText}>Remove</Text>
                          </MainButton>
                        </View>
                      )}
                      keyExtractor={(item) => item.token}
                    />
                  </View>
                </>
              )}
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
