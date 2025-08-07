import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { CartItemType } from "@/type";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const CartItem = ({ item }: { item: CartItemType }) => {
  const { increaseQty, decreaseQty, removeItem } = useCartStore();

  return (
    <View className="cart-item">
      <View className="flex flex-row items-center gap-x-3">
        <View className="cart-item__image">
          <Image
            source={{ uri: item.image_url }}
            className="size-4/5 rounded-lg"
            resizeMode="cover"
          />
        </View>

        <View className="overflow-hidden flex-1">
          <Text className="base-bold text-dark-100">{item.name}</Text>
          <FlatList
            data={item?.customizations}
            renderItem={({ item }) => (
              <Text className="text-xs font-light">
                {item.name}{" "}
                <Text className="text-primary">${item.price / 10}</Text>
              </Text>
            )}
            contentContainerClassName="gap-4 "
            keyExtractor={(item) => item.id}
            horizontal
          />
          <Text className="paragraph-bold text-primary mt-1">
            $
            {(
              (item?.price ?? 0) +
              item!.customizations!.reduce((sum, c) => sum + c.price / 10, 0)
            ).toFixed(2)}
          </Text>

          <View className="flex flex-row items-center gap-x-4 mt-2">
            <TouchableOpacity
              onPress={() => decreaseQty(item.id, item.customizations!)}
              className="cart-item__actions"
            >
              <Image
                source={images.minus}
                className="size-1/2"
                resizeMode="contain"
                tintColor={"#FF9C01"}
              />
            </TouchableOpacity>

            <Text className="base-bold text-dark-100">{item.quantity}</Text>

            <TouchableOpacity
              onPress={() => increaseQty(item.id, item.customizations!)}
              className="cart-item__actions"
            >
              <Image
                source={images.plus}
                className="size-1/2"
                resizeMode="contain"
                tintColor={"#FF9C01"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => removeItem(item.id, item.customizations!)}
              className="flex-center ml-auto"
            >
              <Image
                source={images.trash}
                className="size-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
