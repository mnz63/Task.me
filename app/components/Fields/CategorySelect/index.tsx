import { View, Text } from "@gluestack-ui/themed";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

type Props = {
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
};

export default function CategorySelect({
  selectedCategory,
  onSelectCategory,
}: Props) {
  const handleCategory = (name) => {
    onSelectCategory(name);
  };

  const CategoryButton = ({ name, label }) => {
    const isSelected = name === selectedCategory;
    return (
      <TouchableOpacity
        style={{
          height: 48,
          width: "48%",
          backgroundColor: isSelected ? "#006EE9" : "#FFF",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#006de922",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => handleCategory(name)}
        activeOpacity={0.7}
      >
        <Text
          fontFamily="Poppins_400Regular"
          color={isSelected ? "#FFF" : "#006EE9"}
          fontSize={13}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text
        fontFamily="Poppins_500Medium"
        fontSize={15}
        color={"#006EE9"}
        mb={5}
      >
        Categoria
      </Text>
      <View flexDirection="row" justifyContent="space-between">
        <CategoryButton name={"priority"} label={"Prioridade"} />
        <CategoryButton name={"daily"} label={"Tarefa Diária"} />
      </View>
    </View>
  );
}
