import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CartButton = () => {
  const { getTotalItems } = useCartStore();

  const totalItems = getTotalItems()
  return (
    <Link href={"/cart"} asChild>
      <TouchableOpacity className="cart-btn">
        <Image source={images.bag} className="size-5" resizeMode="contain" />
        {totalItems > 0 && (
          <View className="cart-badge">
            <Text className="small-bold text-white">
              {totalItems.toString()}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Link>
  );
};

export default CartButton;
