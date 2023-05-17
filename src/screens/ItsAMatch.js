import {
  Animated,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import globalStyles from "../../utils/globalStyles";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import ConfettiCannon from "react-native-confetti-cannon";
import MainButton from "../components/MainButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ItsAMatch = () => {
  const image1Position = useRef(new Animated.Value(-50)).current;
  const image2Position = useRef(new Animated.Value(50)).current;
  const [showHeartIcon, setShowHeartIcon] = useState(false);

  useEffect(() => {
    const slideImages = () => {
      Animated.parallel([
        Animated.timing(image1Position, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(image2Position, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]).start(() => setShowHeartIcon(true));
    };

    slideImages();
  }, []);
  //slideImages();
  handlePress = () => {
    console.log("Pressed");
  };
  return (
    <View style={globalStyles.screen}>
      <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
      <View style={globalStyles.container}>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <Text
            className="text-center mt-5 mb-7"
            style={globalStyles.titleText}
          >
            Congratulations!!!
          </Text>
          <View className="mb-10">
            <View
              className=" rounded-xl h-12 w-48 justify-center items-center rotate-6"
              style={{ backgroundColor: globalStyles.whiteColor }}
            ></View>
            <View
              className="-rotate-6 absolute rounded-xl h-12 w-48 justify-center items-center"
              style={{ backgroundColor: globalStyles.primaryColor }}
            >
              <Text style={globalStyles.titleText}>It's a Match </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Animated.View
              style={{
                transform: [{ translateX: image1Position }],
              }}
            >
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/3808025/pexels-photo-3808025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                }}
                style={{
                  width: 150,
                  height: 200,
                  borderRadius: 10,
                  margin: 10,
                }}
              />
            </Animated.View>

            <Animated.View
              style={{
                transform: [{ translateX: image2Position }],
              }}
            >
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/14344662/pexels-photo-14344662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                }}
                style={{
                  width: 150,
                  height: 200,
                  borderRadius: 10,
                  margin: 10,
                }}
              />
            </Animated.View>
            {showHeartIcon && (
              <Animatable.View
                animation="pulse"
                iterationCount="infinite"
                style={{
                  position: "absolute",
                  zIndex: 10,
                  right: "37%",
                }}
              >
                <FontAwesomeIcon
                  name="heart"
                  size={80}
                  color={globalStyles.primaryColor}
                />
              </Animatable.View>
            )}
          </View>
          <Text
            className="text-center mt-5 mb-7 px-4"
            style={globalStyles.mainText}
          >
            Let’s ask about something interesting or you can just start with
            “Hello”
          </Text>
          <View className="w-11/12 mb-7">
            <MainButton eventHandler={handlePress}>
              <Text style={globalStyles.mainText}>
                Say Hello to Emma{" "}
                <MaterialCommunityIcons
                  name="hand-wave"
                  size={24}
                  color="yellow"
                />
              </Text>
            </MainButton>
          </View>
          <TouchableOpacity
            className="mb-7"
            onPress={() => {
              console.log("later");
            }}
          >
            <Text style={globalStyles.mainTextPrimary}>
              Not Now, I’ll Talk Later
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default ItsAMatch;
