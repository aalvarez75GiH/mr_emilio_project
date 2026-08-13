import { FiAlertCircle, FiCheckCircle, FiX, FiXCircle } from "react-icons/fi";

import {
  SnackbarContainer,
  SnackbarIcon,
  SnackbarContent,
  SnackbarTitle,
  SnackbarMessage,
  SnackbarCloseButton,
} from "./snackbar.styles";

export const Snackbar = ({
  isOpen = false,
  type = "success",
  title,
  message,
  onClose,
}) => {
  if (!isOpen) {
    return null;
  }

  const isSuccess = type === "success";
  const isError = type === "error";

  const Icon = isSuccess ? FiCheckCircle : isError ? FiXCircle : FiAlertCircle;

  return (
    <SnackbarContainer
      $type={type}
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      aria-atomic="true"
    >
      <SnackbarIcon $type={type} aria-hidden="true">
        <Icon />
      </SnackbarIcon>

      <SnackbarContent>
        {title && <SnackbarTitle $type={type}>{title}</SnackbarTitle>}

        {message && <SnackbarMessage $type={type}>{message}</SnackbarMessage>}
      </SnackbarContent>

      <SnackbarCloseButton
        type="button"
        $type={type}
        aria-label="Dismiss notification"
        onClick={onClose}
      >
        <FiX />
      </SnackbarCloseButton>
    </SnackbarContainer>
  );
};
