import { Account, Avatars, Client, Databases, Storage } from "react-native-appwrite";
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_IT!;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const PLATFORM = process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!;

export const DB_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID!
export const USER_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!
export const CATEGORY_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_CATEGORY_COLLECTION_ID!
export const MENU_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID!
export const CUSTOMIZATION_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_CUSTOMIZATION_COLLECTION_ID!
export const MENU_CUSTOMIZATION_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATION_COLLECTION_ID!

export const BUCKET_ID = process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!

export const appwriteConfig = {
    endpoint:ENDPOINT,
    projectId: PROJECT_ID,
    platform: PLATFORM,
    databaseId: DB_ID,
    bucketId: BUCKET_ID,
    userCollectionId: USER_COLLECTION_ID,
    categoriesCollectionId: CATEGORY_COLLECTION_ID,
    menuCollectionId: MENU_COLLECTION_ID,
    customizationsCollectionId: CUSTOMIZATION_COLLECTION_ID,
    menuCustomizationsCollectionId: MENU_CUSTOMIZATION_COLLECTION_ID
}
const client = new Client();
client
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setPlatform(PLATFORM)


export const account = new Account(client)
export const databases = new Databases(client)
export const avatars = new Avatars(client)
export const storage = new Storage(client)
 
