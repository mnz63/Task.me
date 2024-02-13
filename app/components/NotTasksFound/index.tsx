import { Text, View } from "@gluestack-ui/themed";

export default function NotTasksFound() {
  return (
    <View w={"100%"} alignItems="center" justifyContent="center">
      <Text>Você ainda não tem tarefas.</Text>
    </View>
  );
}
