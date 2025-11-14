import { toast as sonnerToast } from "sonner";

export const showSuccess = (message: string, description?: string) => {
  sonnerToast.success(message, {
    description,
  });
};

export const showError = (message: string, description?: string) => {
  sonnerToast.error(message, {
    description,
  });
};

export const showInfo = (message: string, description?: string) => {
  sonnerToast.info(message, {
    description,
  });
};

export const showWarning = (message: string, description?: string) => {
  sonnerToast.warning(message, {
    description,
  });
};
