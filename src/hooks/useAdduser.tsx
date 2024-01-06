import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export const useAdduser = () => {
  const usersCollectionRef = collection(db, "users");
  const adduser = async ({
    username,
    score,
  }: {
    username: string;
    score: number;
  }) => {
    try {
      await addDoc(usersCollectionRef, {
        username,
        score,
        createdAt: serverTimestamp(),
      });
      return "succeeded";
    } catch (e) {
      return "failed";
    }
  };
  return {
    adduser,
  };
};
