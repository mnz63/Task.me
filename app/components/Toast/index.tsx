import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from "@gluestack-ui/themed";

export default function CustomToast({ title, message, type }) {
  return (
    <Toast action={type} variant="accent">
      <VStack space="xs">
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription>{message}</ToastDescription>
      </VStack>
    </Toast>
  );
}
