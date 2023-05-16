import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import globalStyles from "../../utils/globalStyles";
import MainButton from "../components/MainButton";

const LandingScreen = ({ navigation }) => {
  const handleSubscription = () => {
    navigation.navigate("SignupScreen");
  };
  const handleLogin = () => {
    navigation.navigate("LoginScreen");
  };
  return (
    <View style={globalStyles.screen}>
      <View className="h-[65%]">
        <ImageBackground
          source={require("../../assets/images/landing-bg.jpg")}
          className="h-full min-w-full"
          resizeMode="cover"
        />
      </View>
      <View className="-mt-[35%] items-center" style={globalStyles.container}>
        <Text style={globalStyles.mainText}>
          Serenade is the dating app for people who think they can be in love
          with more than one person. Sign up solo or with a partner to find
          other kind hearted lovers.
        </Text>
        <View className="mt-10 mb-5 min-w-full">
          <MainButton eventHandler={handleSubscription}>
            <Text style={globalStyles.mainText}>Join Serenade</Text>
          </MainButton>
        </View>
        <TouchableOpacity className="mb-5" onPress={() => handleLogin()}>
          <Text style={globalStyles.mainText}>
            Already In ?{" "}
            <Text style={globalStyles.mainTextPrimary}>SignIn</Text>
          </Text>
        </TouchableOpacity>
        <Text style={globalStyles.mainText} className="text-center">
          By continuing you agree to our Terms of Use and Privacy Policy
        </Text>
      </View>
    </View>
  );
};

export default LandingScreen;
