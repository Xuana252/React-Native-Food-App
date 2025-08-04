import { Account, Avatars, Client, Databases } from "react-native-appwrite";
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_IT!;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const PLATFORM = process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!;

export const DB_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID!
export const USER_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!

export const appwriteConfig = {
    endpoint:ENDPOINT,
    projectId: PROJECT_ID,
    platform: PLATFORM,
    databaseId: DB_ID,
    bucketId: '68643e170015edaa95d7',
    userCollectionId: USER_COLLECTION_ID,
    categoriesCollectionId: '68643a390017b239fa0f',
    menuCollectionId: '68643ad80027ddb96920',
    customizationsCollectionId: '68643c0300297e5abc95',
    menuCustomizationsCollectionId: '68643cd8003580ecdd8f'
}
const client = new Client();
client
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setPlatform(PLATFORM)


export const account = new Account(client)
export const databases = new Databases(client)
export const avatars = new Avatars(client)
 
