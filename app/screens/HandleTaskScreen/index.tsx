import { Pressable, Text, View } from "@gluestack-ui/themed";
import Layout from "../../components/Layout";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import SelectDateField from "./components/SelectDateField";
import InputTextField from "../../components/Fields/InputTextField";
import { useForm } from "react-hook-form";
import { TextAreaField } from "../../components/Fields/TextAreaField";
import ToDoList from "../../components/ToDoList";
import { ScrollView } from "react-native";
import CategorySelect from "../../components/Fields/CategorySelect";
import { useState } from "react";
import CustomButton from "../../components/Buttons/CustomButton";
import { useUserAuthContext } from "../../features/Auth/UserContext";
import moment from "moment";
import useCreateOneTask from "../../features/Tasks/hooks/useCreateOneTask";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCreateTask } from "../../common/utils/SchemaForm";

export default function HandleTaskScreen() {
  const { goBack, navigate }: NavigationProp<ParamListBase> = useNavigation();
  const route: any = useRoute();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaCreateTask),
  });

  const [selectedCategory, setSelectedCategory] = useState("priority");
  const [selectedDate, setSelectedDate] = useState("");

  const isEditTask = route.params.isEdit;
  const { me } = useUserAuthContext();
  const { createTask, loading } = useCreateOneTask();

  const submit = async (data) => {
    const values = {
      title: data.title,
      category: selectedCategory,
      description: data.description,
      startDate: new Date(),
      endDate: moment(selectedDate, "YYYY/MM/DD").toDate(),
      userId: me?.uid,
    };

    await createTask(values);
    navigate("Tasks");
  };

  return (
    <Layout
      onPressBack={goBack}
      title={isEditTask ? "Editar tarefa" : "Adicionar tarefa"}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={50}
        style={{
          width: "100%",
          maxHeight: "80%",
        }}
      >
        <View h={"100%"} w={"100%"} mt={10}>
          <SelectDateField selectDate={setSelectedDate} />
          <View mt={20}>
            <InputTextField
              control={control}
              label="Título"
              name="title"
              placeholder="Título da tarefa"
              errorMessage={errors?.title?.message}
            />
            <CategorySelect
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <TextAreaField
              control={control}
              name="description"
              placeholder="Adicione uma descrição da tarefa"
              label="Descrição"
              errorMessage={errors?.description?.message}
            />
            {selectedCategory == "priority" && <ToDoList />}
            <CustomButton
              label={isEditTask ? "Editar tarefa" : "Criar tarefa"}
              onPress={handleSubmit(submit)}
              isLoading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
