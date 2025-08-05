import { appwriteConfig } from "@/lib/appwrite";
import { MenuItem } from "@/type";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const MenuCard = ({
  item: { $id, image_url, name, price },
}: {
  item: MenuItem;
}) => {
  const imageUrl = `${image_url}?project=${appwriteConfig.projectId}`;
  
 
  return (
    <TouchableOpacity className="menu-card">
      <Image
        source={{ uri: imageUrl }}
        className="size-32 absolute -top-10"
        resizeMode="contain"
      />
      <Text
        className="text-center base-bold text-dark-100 mb-2"
        numberOfLines={1}
      >
        {name}
      </Text>
      <Text className="body-regular text-gray-200 mb-4">From ${price}</Text>
    </TouchableOpacity>
  );
};

export default MenuCard;
