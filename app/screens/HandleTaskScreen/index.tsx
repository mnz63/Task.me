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

export default function HandleTaskScreen() {
  const { goBack }: NavigationProp<ParamListBase> = useNavigation();
  const route: any = useRoute();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [selectedCategory, setSelectedCategory] = useState("priority");
  const isEditTask = route.params.isEdit;

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
          <SelectDateField />
          <View mt={20}>
            <InputTextField
              control={control}
              label="Título"
              name="title"
              placeholder="Título da tarefa"
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
            />
            {selectedCategory == "priority" && <ToDoList />}
            <CustomButton
              label={isEditTask ? "Editar tarefa" : "Criar tarefa"}
            />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
