import CartItem from "@/components/CartItem";
import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { PaymentInfoStripeProps } from "@/type";
import cn from "clsx";
import { Link, router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PaymentInfoStripe = ({
  label,
  value,
  labelStyle,
  valueStyle,
}: PaymentInfoStripeProps) => (
  <View className="flex-between flex-row my-1">
    <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
      {label}
    </Text>
    <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
      {value}
    </Text>
  </View>
);
const Cart = () => {
  const { items, getTotalItems, getTotalPrice } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) =>
          [item.id, ...(item.customizations?.map((c) => c.id) || [])].join("-")
        }
        ListHeaderComponent={() => (
          <View className="custom-header">
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={images.arrowBack}
                className="size-5"
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Text className="base-semibold text-dark-100">Your Cart</Text>

            <Image
              source={images.search}
              className="size-5"
              resizeMode="contain"
            />
          </View>
        )}
        contentContainerClassName="pb-28 px-5 pt-5"
        ListEmptyComponent={() => (
          <View className="w-full flex-col items-center gap-2">
            <Image
              source={images.emptyState}
              className="size-40"
              resizeMode="contain"
            />
            <Text className="base-bold">There is nothing in your cart</Text>
            <Text className="body-regular">
              Go and grab something to{" "}
              <Link href={"/search"} className="font-bold text-primary">
                eat
              </Link>
            </Text>
          </View>
        )}
        ListFooterComponent={() =>
          totalItems > 0 && (
            <View className="gap-5">
              <View className="mt-6 border border-gray-200 p-5 rounded-2xl">
                <Text className="h3-bold text-dark-100 mb-5">
                  Payment Summary
                </Text>

                <PaymentInfoStripe
                  label={`Total Items (${totalItems})`}
                  value={`$${totalPrice.toFixed(2)}`}
                />
                <PaymentInfoStripe label={`Delivery Fee`} value={`$5.00`} />
                <PaymentInfoStripe
                  label={`Discount`}
                  value={`- $0.50`}
                  valueStyle="!text-success"
                />
                <View className="border-t border-gray-300 my-2" />
                <PaymentInfoStripe
                  label={`Total`}
                  value={`$${(totalPrice + 5 - 0.5).toFixed(2)}`}
                  labelStyle="base-bold !text-dark-100"
                  valueStyle="base-bold !text-dark-100 !text-right"
                />
              </View>

              <CustomButton title="Order Now" />
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default Cart;
