import CartButton from "@/components/CartButton";
import MenuCard from "@/components/MenuCard";
import useAppwrite from "@/lib/useFetch";
import { getCategories, getMenu } from "@/services/food";
import { MenuItem } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
const Search = () => {
  const LIMIT = 1;
  const { query, category } = useLocalSearchParams<{
    query: string;
    category: string;
  }>();
  const {
    data: menus,
    loading,
    error,
    refetch,
  } = useAppwrite({
    fn: getMenu,
    params: {
      category,
      query,
      limit: LIMIT,
    },
  });

  const { data: categories } = useAppwrite({
    fn: getCategories,
  });

  useEffect(() => {
    refetch({ category, query, limit: LIMIT });
  }, [category, query]);
  return (
    <SafeAreaView>
      <FlatList
        data={menus}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;

          return (
            <View
              className={cn(
                "flex-1 max-w-[48%]",
                !isFirstRightColItem ? "mt-10" : "mt-0"
              )}
            >
              <MenuCard item={item as MenuItem}/>
            </View>
          );
        }}
        contentContainerClassName="px-5 pb-32 gap-7"
        columnWrapperClassName="gap-7"
        keyExtractor={(item) => item.$id}
        numColumns={2}
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-between flex-row w-full">
              <View className="flex-start">
                <Text className="small-bold uppercase text-primary">
                  Search
                </Text>
                <View className="flex-start flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-semibold text-dark-100">
                    Find your favorite food
                  </Text>
                </View>
              </View>

              <CartButton />
            </View>

            {/* <SearchBar />

                        <Filter categories={categories!} /> */}
          </View>
        )}
        ListEmptyComponent={() =>
          !loading && <Text className="text-center">No Results</Text>
        }
      />
    </SafeAreaView>
  );
};

export default Search;
