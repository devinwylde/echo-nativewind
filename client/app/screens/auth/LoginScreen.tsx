import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { ArrowLeftCircle } from "react-native-feather";

import {
  LogInButton,
  ExternalAuthButton,
} from "../../components/auth/AuthButtons";
import {
  AuthenticationErrorMessage,
  AuthenticationResponse,
} from "../../components/auth/AuthenticationResponse";
import {
  EmailInput,
  PasswordInput,
} from "../../components/common/CustomInputs";
import { appSignIn } from "../../services/AuthStore";

const LoginScreen = ({ route, navigation }: any) => {
  const { newEmail } = route.params;

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [authResponse, setAuthResponse] =
    React.useState<AuthenticationResponse>();
  const [invalidLogin, invalidateLogin] = React.useState<boolean>(false); // Possbily change this?

  // Sign in function with email and password
  const onHandleSubmit = async () => {
    Keyboard.dismiss();
    setAuthResponse(await appSignIn(email, password));
  };

  // Listens for the response from the sign in function
  useEffect(() => {
    if (authResponse?.user) {
      console.log("user logged in!");
    } else if (authResponse?.error) {
      console.log(authResponse.error);
      invalidateLogin(true);
    }
  }, [authResponse]);

  useEffect(() => {
    setEmail(newEmail); // On load of the page, set the email to the inputEmail if they entered it!
  }, []);

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="w-full h-full">
        <View className="w-full h-full justify-start items-center px-6 py-2 bg-white">
          <View className="flex flex-row w-full mt-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            >
            <ArrowLeftCircle
              color="black"
              strokeWidth={1.4}
              width={34}
              height={34}
            />
          </TouchableOpacity>
          </View>

          <View className="w-full mt-8">
            <Text className="text-5xl font-bold">Welcome back!</Text>
            <Text className="text-xl mt-1">How have you been?</Text>
          </View>
          <View className="w-full mt-8">
            <EmailInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              invalid={invalidLogin}
            />
            <PasswordInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              invalid={invalidLogin}
            />
          </View>
          
          <View className="flex justify-around items-center w-full mt-2">
            <AuthenticationErrorMessage
              response={authResponse}
              onPress={() => setAuthResponse(undefined)}
            />
          </View>

          <View className="mt-4">
            <LogInButton onPress={onHandleSubmit} />
          </View>

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
    </TouchableWithoutFeedback>

    // Log In

    // Make an account with Google (TEMP)
  );
};

// const styles = StyleSheet.create({
//   main_container: {
//     display: "flex",
//     height: "100%",
//     width: "100%",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     paddingHorizontal: Dimensions.get("window").width * 0.11,
//     paddingVertical: Dimensions.get("window").height * 0.01,
//     backgroundColor: "white",
//     gap: Dimensions.get("window").height * 0.029,
//   },

//   //This is an example of where the error message could be
//   error_container: {
//     display: "flex",
//     justifyContent: "space-around",
//     alignItems: "center",
//     width: "100%",
//     top: Dimensions.get("window").height * 0.1,
//     position: "absolute",
//   },

//   input_container: {
//     display: "flex",
//     width: "100%",
//     justifyContent: "space-around",
//     alignItems: "center",
//     gap: Dimensions.get("window").height * 0.02,
//   },

//   button_container: {
//     display: "flex",
//     justifyContent: "space-around",
//     alignItems: "center",
//     width: "100%",
//   },

//   header_container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-start",
//     width: "100%",
//     marginBottom: Dimensions.get("window").height * 0.019,
//     marginTop: Dimensions.get("window").height * 0.23,
//   },

//   header_text: {
//     fontFamily: "Quicksand-Bold",
//     fontSize: 37,
//     marginBottom: Dimensions.get("window").height * 0.01,
//   },
//   subheader_text: {
//     fontFamily: "Quicksand-Medium",
//     fontSize: 20,
//   },
//   regular_text: {
//     fontFamily: "Quicksand-Medium",
//     color: "#8E8E8E",
//   },
//   horizontal_line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: "#8E8E8E",
//   },
//   externalLinkContainer: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "100%",
//   },
//   footer_text: {
//     fontFamily: "Quicksand-Bold",
//     color: "black",
//     fontSize: 15,
//   },
//   footer_text_container: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "flex-end",
//     gap: 7,
//     flex: 1,
//     paddingBottom: Dimensions.get("window").height * 0.01,
//   },
//   divider_container: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: Dimensions.get("window").height * 0.011,
//   },
//   back_button: {
//     position: "absolute",
//     top: Dimensions.get("window").height * 0.075,
//     left: Dimensions.get("window").width * 0.075,
//   },
// });

export default LoginScreen;
