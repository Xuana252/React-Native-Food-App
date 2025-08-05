import { images } from "@/constants";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CartButton = () => {
  const totalItems = 10;
  return (
    <Link href={"/cart"} asChild>
      <TouchableOpacity className="cart-btn">
        <Image source={images.bag} className="size-5" resizeMode="contain" />
        {totalItems && (
          <View className="cart-badge">
            <Text className="small-bold text-white">{totalItems}</Text>
          </View>
        )}
      </TouchableOpacity>
    </Link>
  );
};

export default CartButton;
