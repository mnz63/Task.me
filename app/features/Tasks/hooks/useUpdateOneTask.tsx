import { useToast } from "@gluestack-ui/themed";
import { useCallback, useState } from "react";
import CustomToast from "../../../components/Toast";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

type dataValues = {
  startDate?: Date;
  endDate?: Date;
  title?: string;
  category?: string;
  description?: string;
  taskId?: string;
  userId?: string;
  priority?: number;
};

export default function useUpdateOneTask() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const updateTask = useCallback(
    async ({
      category,
      description,
      endDate,
      startDate,
      title,
      taskId,
      userId,
      priority,
    }: dataValues) => {
      setLoading(true);
      const docRef = doc(db, "users", userId);
      try {
        await getDoc(docRef).then(async (doc) => {
          if (doc.exists) {
            const tasksArr = doc?.data()?.tasks;
            const updatedTasksArr = tasksArr.map((task) => {
              if (task.id === taskId) {
                task.title = title || task.title;
                task.category = category || task.category;
                task.description = description || task.description;
                task.startDate = startDate || task.startDate;
                task.endDate = endDate || task.endDate;
                task.priority = priority || task.priority;
              }
              return task;
            });

            await updateDoc(docRef, {
              tasks: updatedTasksArr,
            }).catch((e) => console.log(e));
            toast.show({
              placement: "top",
              render: () =>
                CustomToast({
                  title: "Tarefa atualizada com sucesso!",
                  message: "Sua tarefa foi atualizada.",
                  type: "success",
                }),
            });
          }
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
    updateTask,
  };
}
