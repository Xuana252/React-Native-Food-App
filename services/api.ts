import { account, appwriteConfig, avatars, databases } from "@/lib/appwrite";
import { CreateUserPrams, SignInParams } from "@/type";
import { ID, Query } from "react-native-appwrite";

export async function signUp({ name, email, password }: CreateUserPrams) {
  const newAccount = await account.create(ID.unique(), email, password, name);

  if (!newAccount) throw new Error();

  const avatarUrl = avatars.getInitialsURL(name);
  const newUser = await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    ID.unique(),
    {
      accountId: newAccount.$id,
      email,
      name,
      avatar: avatarUrl,
    }
  );
  await signIn({ email, password });
  return newUser;
}

export async function signIn({ email, password }: SignInParams) {
  const session = await account.createEmailPasswordSession(email, password);
}

export async function getUser() {
  const currentAccount = await account.get();
  if (!currentAccount) throw new Error();

  const currentUser = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("accountId", currentAccount.$id)]
  );

  if (!currentUser) throw Error;

  return currentUser.documents[0];
}
