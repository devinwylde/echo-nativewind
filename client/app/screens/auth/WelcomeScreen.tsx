import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

import {
  AuthenticationErrorMessage,
  AuthenticationResponse,
  inValidEmailResponse,
} from "../../components/auth/AuthenticationResponse";
import { EmailInput, WelcomeEmailInput } from "../../components/common/CustomInputs";
import { ExternalAuthButton } from "@app/components/auth/AuthButtons";

const WelcomeScreen = ({ navigation }: any) => {
  const keyboardVerticalOffest = Platform.OS === "ios" ? 0 : 0;
  const keyboardBehavior = Platform.OS === "ios" ? "padding" : undefined;

  const [email, setEmail] = useState<string>("");
  const [authResponse, setAuthResponse] =
    React.useState<AuthenticationResponse>();

  const handleLogin = () => {
    const preparedEmail = email.trim();
    if (preparedEmail.length !== 0 && isValidEmail(preparedEmail)) {
      navigation.navigate("Log In", { newEmail: preparedEmail });
      setAuthResponse(undefined);
    } else {
      console.log("Invalid email");
      setAuthResponse({ user: undefined, error: inValidEmailResponse });
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleGoogleSignIn = async () => {
    console.log("Google Sign In");
  };

  const handleFacebookSignIn = async () => {
    console.log("Facebook Sign In");
  };

  const handleAppleSignIn = async () => {
    console.log("Apple Sign In");
  };

  const handleGithubSignIn = async () => {
    console.log("Github Sign In");
  };

  return (
    <View>
      <KeyboardAvoidingView
        behavior={keyboardBehavior}
        keyboardVerticalOffset={keyboardVerticalOffest}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex flex-col items-center w-full h-full bg-white">
            <View className="flex flex-col items-center justify-start pt-16 w-full h-full">
              <Image
                  className="w-full h-48"
                  resizeMode="contain"
                  source={require("../../../assets/images/lilguy.png")}
              />

              <Text className="text-5xl font-semibold mt-6">Echo</Text>
              <Text className="text-lg text-center mt-2">Find out what's happening near you.</Text>

              <View className="flex flex-col items-center w-full mt-10">
                <View className="flex flex-col justify-between w-5/6">
                
                <EmailInput
                      value={email}
                      onChangeText={(text) => setEmail(text)}
                />

                <View className="flex justify-around items-center w-full mt-4">
                  <AuthenticationErrorMessage
                    response={authResponse}
                    onPress={() => setAuthResponse(undefined)}
                  />
                </View>

                <TouchableOpacity
                      className="flex justify-center items-center rounded-full shadow ml-2 w-11/12 h-10 mt-5 bg-teal-400"
                      onPress={handleLogin}>
                      <Text className="text-white">Next</Text>
                </TouchableOpacity>

                <View className="flex flex-row items-center mt-8">
            <View className="flex flex-1 h-0.5 bg-gray-500" />
            <View>
              <Text className="mx-3 font-light">
                Or Login With
              </Text>
            </View>
            <View className="flex flex-1 h-0.5 bg-gray-500" />
          </View>

          <View className="flex flex-row w-full justify-between mt-4">
            <ExternalAuthButton
              onPress={handleGoogleSignIn}
              companyName="google"
            />
            <ExternalAuthButton
              onPress={handleAppleSignIn}
              companyName="apple"
            />
            <ExternalAuthButton
              onPress={handleFacebookSignIn}
              companyName="facebook"
            />
            <ExternalAuthButton
              onPress={handleGithubSignIn}
              companyName="github"
            />
          </View>
                </View>
                
          <TouchableOpacity 
                  className="w-full justify-center items-center flex-row mt-10"
                  onPress={() => {
                    navigation.navigate("Sign Up");
                }}>
                  <Text className="font-semibold">Don't have an account?</Text>
                  <Text className="font-semibold underline text-teal-300 ml-1">Sign up.</Text>
          </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

// const styles = StyleSheet.create({
//   image: {
//     maxWidth: Dimensions.get("window").width * 1,
//     maxHeight: Dimensions.get("window").height * 0.37,
//     resizeMode: "contain",
//   },

//   error_container: {
//     display: "flex",
//     justifyContent: "space-around",
//     alignItems: "center",
//     width: "100%",
//   },

//   header_text: {
//     fontFamily: "Gilroy-ExtraBold",
//     fontSize: Dimensions.get("window").width * 0.07,
//   },

//   login_text: {
//     fontFamily: "Gilroy-Light",
//     fontSize: Dimensions.get("window").width * 0.049,
//     marginLeft: Dimensions.get("window").width * 0.02,
//   },

//   main_container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     height: "100%",
//     width: "100%",
//     justifyContent: "flex-end",
//     backgroundColor: "white",
//   },

//   sub_container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: Dimensions.get("window").width * 1,
//     height: Dimensions.get("window").height * 0.75,
//   },

//   info_container: {
//     width: Dimensions.get("window").width * 1,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "space-evenly",
//     minHeight: Dimensions.get("window").height * 0.35,
//   },

//   login_container: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     width: Dimensions.get("window").width * 0.8,
//     height: Dimensions.get("window").height * 0.09,
//   },

//   image_container: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   login_mini_container: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   login_button: {
//     backgroundColor: "#5dbea3",
//     width: Dimensions.get("window").width * 0.105,
//     height: Dimensions.get("window").width * 0.105,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 100,
//     boxShadow: "0px 0px 34px -3px rgba(0,0,0,0.1)",
//     marginLeft: Dimensions.get("window").width * 0.02,
//   },

//   arrow_image: {
//     width: Dimensions.get("window").width * 0.05,
//     height: Dimensions.get("window").width * 0.05,
//     resizeMode: "contain",
//   },

//   link: {
//     color: "#5dbea3",
//     textDecorationLine: "underline",
//   },
// });

export default WelcomeScreen;
