import { useToast } from "@gluestack-ui/themed";
import { useCallback, useState } from "react";
import CustomToast from "../../../components/Toast";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import uuid from "react-native-uuid";

export type TaskDataType = {
  startDate?: Date;
  endDate?: Date;
  title?: string;
  category?: string;
  description?: string;
  userId?: string;
};

export default function useCreateOneTask() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const createTask = useCallback(
    async ({
      category,
      description,
      endDate,
      startDate,
      title,
      userId,
    }: TaskDataType) => {
      setLoading(true);
      const docRef = doc(db, "users", userId);
      try {
        await updateDoc(docRef, {
          tasks: arrayUnion({
            id: uuid.v4(),
            title,
            category,
            description,
            startDate,
            endDate,
          }),
        });
        toast.show({
          placement: "top",
          render: () =>
            CustomToast({
              title: "Tarefa criada com sucesso!",
              message: "Sua tarefa foi criada.",
              type: "success",
            }),
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    },
    [updateDoc]
  );

  return {
    loading,
    createTask,
  };
}
