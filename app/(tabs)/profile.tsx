import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Profile = () => {
  const { user, logout } = useAuthStore();

  async function handleLogout() {
    Alert.alert("Logout", "Do you want to end your current session?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout()
        },
      },
    ]);
  }
  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerClassName=" px-5 pb-32 items-center gap-4 ">
        <View className="custom-header">
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={images.arrowBack}
              className="size-5"
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text className="base-semibold text-dark-100">Profile</Text>

          <Image
            source={images.search}
            className="size-5"
            resizeMode="contain"
          />
        </View>
        <View className="relative">
          <Image source={{ uri: user?.avatar }} className="profile-avatar" />
          <Image source={images.pencil} className="profile-edit"></Image>
        </View>

        <View className="rounded-3xl p-4 bg-white shadow-sm items-start gap-4 mt-8 mb-4 w-full">
          <View className="profile-field">
            <View className="profile-field__icon">
              <Image source={images.user} className="size-6" />
            </View>
            <View className="flex-col items-start justify-between gap-1">
              <Text className="body-regular">Full name</Text>
              <Text className="base-semibold">{user?.name}</Text>
            </View>
          </View>
          <View className="profile-field">
            <View className="profile-field__icon">
              <Image source={images.envelope} className="size-6" />
            </View>
            <View className="flex-col items-start justify-between gap-1">
              <Text className="body-regular">Email</Text>
              <Text className="base-semibold">{user?.email}</Text>
            </View>
          </View>
        </View>

        <CustomButton
          title="Edit Profile"
          style="bg-primary/20 border-2 border-primary"
          textStyle="!text-primary font-bold"
        />
        <CustomButton
          onPress={handleLogout}
          leftIcon={
            <View className="items-center justify-center px-2">
              <Image source={images.logout} className="text-error size-7" />
            </View>
          }
          title="Logout"
          style="bg-error/20 border-2 border-error"
          textStyle="!text-error font-bold"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
