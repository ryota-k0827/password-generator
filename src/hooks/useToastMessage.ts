import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

type Props = {
  title: string;
  description: string | null;
  status: "info" | "warning" | "success" | "error";
};

export const useToastMessage = () => {
  const toast = useToast();
  const showMessage = useCallback(
    (props: Props) => {
      const { title, description, status } = props;
      toast.closeAll();
      toast({
        title,
        description,
        status,
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    },
    [toast]
  );
  return { showMessage };
};
