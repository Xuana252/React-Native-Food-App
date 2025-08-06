import { appwriteConfig, databases } from "@/lib/appwrite";
import { Category, GetMenuParams, MenuItem } from "@/type";
import { Query } from "react-native-appwrite";

export async function getMenu({ category, query, limit }: GetMenuParams) {
  const queries = [];

  if (category) queries.push(Query.equal("categories", category));
  if (query) queries.push(Query.search("name", query));
  queries.push(Query.limit(limit));

  const menus = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.menuCollectionId,
    queries
  );

  return menus.documents as unknown as MenuItem[];
}

export async function getMenuById({id}:{id:string}) {
  return (await databases.getDocument(
    appwriteConfig.databaseId,
    appwriteConfig.menuCollectionId,
    id
  )) as MenuItem;
}

export async function getCategories() {
  const categories = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.categoriesCollectionId
  );
  return categories.documents as unknown as Category[];
}
