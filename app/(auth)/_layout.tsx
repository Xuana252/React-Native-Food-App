import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { Redirect, Slot } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthLayout = () => {
  const {isAuthenticated} = useAuthStore()

  if(isAuthenticated) return <Redirect  href={"/"}/>
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="bg-white h-full"
        keyboardShouldPersistTaps="handled"
      >
        <ImageBackground
          source={images.loginGraphic}
          className="relative w-full rounded-b-lg "
          resizeMode="stretch"
          style={{ height: Dimensions.get("screen").height / 2.5 }}
        >
          <Image
            source={images.logo}
            className="self-center size-48 absolute -bottom-16 z"
          />
        </ImageBackground>
        <SafeAreaView>
          <Slot />
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthLayout;
