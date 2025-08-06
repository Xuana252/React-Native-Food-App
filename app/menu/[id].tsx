import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import useAppwrite from "@/lib/useFetch";
import { getMenuById } from "@/services/food";
import { useCartStore } from "@/store/cart.store";
import { CartCustomization, Customization } from "@/type";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Menu = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: item } = useAppwrite({
    fn: getMenuById,
    params: {
      id,
    },
  });
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomization] = useState<Customization[]>([]);

  function handleCustomization(newCustomization: Customization) {
    setCustomization((prev) => {
      const index = prev.findIndex((c) => c.$id === newCustomization.$id);
      if (index > -1) {
        return customizations.filter((c) => c.$id !== newCustomization.$id);
      } else {
        return [...customizations, newCustomization];
      }
    });
  }

  function handleAddToCart() {
    if (item) {
      addItem({
        id: item.$id,
        name: item.name,
        price: item.price,
        image_url: item.image_url,
        customizations: customizations.map(
          (c) =>
            ({
              id: c.$id,
              name: c.name,
              price: c.price,
              type: c.type,
            }) as CartCustomization
        ),
        quantity,
      });
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pb-32 overflow-visible h-full">
        <View className="custom-header">
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={images.arrowBack}
              className="size-5"
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* <Text className="base-semibold text-dark-100"></Text> */}

          <Image
            source={images.search}
            className="size-5"
            resizeMode="contain"
          />
        </View>
        <Text className="h1-bold">{item?.name}</Text>
        <Text className="base-regular">{item?.categories.description}</Text>

        <View className="flex-row w-full items-center">
          <View className="flex-1 gap-4">
            <View className="flex-row gap-1 items-center">
              <Image source={images.star} className="text-primary size-5" />
              <Image source={images.star} className="text-primary size-5" />
              <Image source={images.star} className="text-primary size-5" />
              <Image source={images.star} className="text-primary size-5" />
              <Image source={images.star} className="text-primary size-5" />
              <Text className="paragraph-bold text-gray-100 ml-2">
                {item?.rating}/5
              </Text>
            </View>

            <Text className="h1-bold">
              <Text className="text-primary">$</Text>
              {item?.price}
            </Text>

            <View className="flex-row gap-3 items-start justify-start">
              <View className="flex-col gap-1 items-start justify-start">
                <Text className="body-regular">Calories</Text>
                <Text className="paragraph-bold">{item?.calories} Cal</Text>
              </View>

              <View className="flex-col gap-1 items-start justify-start">
                <Text className="body-regular">Protein</Text>
                <Text className="paragraph-bold">{item?.protein} Cal</Text>
              </View>
            </View>
          </View>
          <Image
            className="aspect-square w-[60%] -mr-[10%]"
            source={{ uri: item?.image_url }}
            resizeMode="stretch"
          />
        </View>

        <View className="flex-row justify-between rounded-full bg-primary/20 p-2 px-4">
          <View className="flex-row gap-1 items-center">
            <Image source={images.dollar} className="text-primary size-3" />
            <Text className="small-bold">Free Delivery</Text>
          </View>

          <View className="flex-row gap-1 items-center">
            <Image source={images.clock} className="text-primary size-3" />
            <Text className="small-bold">Free Delivery</Text>
          </View>

          <View className="flex-row gap-1 items-center">
            <Image source={images.star} className="text-primary size-3" />
            <Text className="small-bold">{item?.rating}</Text>
          </View>
        </View>
        <Text className="body-regular my-4">{item?.description}</Text>

        <Text className="body-bold">Toppings</Text>
        <FlatList
          data={item?.menuCustomizations
            ?.filter((mc) => mc.customizations.type === "topping")
            .map((c) => c.customizations)}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="relative bg-white shadow-sm rounded-xl p-2"
              onPress={() => handleCustomization(item)}
            >
              <Text className="body-medium">
                {item.name}{" "}
                <Text className="text-primary">${item.price / 10}</Text>
              </Text>
              {customizations.includes(item) && (
                <Image
                  source={images.check}
                  className=" bg-green-600 rounded-full absolute -top-2 -right-2 size-4 p-1"
                  tintColor={"white"}
                />
              )}
            </TouchableOpacity>
          )}
          contentContainerClassName="p-2 gap-4"
          keyExtractor={(item) => item.$id}
          horizontal
        />
        <Text className="body-bold">Sides</Text>
        <FlatList
          data={item?.menuCustomizations
            ?.filter((c) => c.customizations.type === "side")
            .map((c) => c.customizations)}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="relative bg-white shadow-sm rounded-xl p-2"
              onPress={() => handleCustomization(item)}
            >
              <Text className="body-medium">
                {item.name}{" "}
                <Text className="text-primary">${item.price / 10}</Text>
              </Text>
              {customizations.includes(item) && (
                <Image
                  source={images.check}
                  className=" bg-green-600 rounded-full absolute -top-2 -right-2 size-4 p-1"
                  tintColor={"white"}
                />
              )}
            </TouchableOpacity>
          )}
          contentContainerClassName="p-2 gap-4"
          keyExtractor={(item) => item.$id}
          horizontal
        />
      </ScrollView>
      <View className="shadow-md rounded-xl bg-white flex-row p-4 absolute bottom-10 inset-x-5 ">
        <View className="flex-row items-center flex-1 justify-center">
          <TouchableOpacity
            onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}
          >
            <Image
              source={images.minus}
              className=" size-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text className="h3-bold px-4">{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity((prev) => prev + 1)}>
            <Image
              source={images.plus}
              className=" size-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-1">
          <CustomButton
            onPress={handleAddToCart}
            title={`Add to cart ($${((item?.price ?? 0) + customizations.reduce((sum, c) => sum + c.price / 10, 0)).toFixed(2)})`}
            textStyle="body-regular"
            style="px-4"
            leftIcon={
              <View className="items-center justify-center mr-2">
                <Image source={images.bag} className="text-white size-4" />
              </View>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Menu;
