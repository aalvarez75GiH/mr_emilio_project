import { FiAlertCircle, FiCheckCircle, FiX } from "react-icons/fi";

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

  return (
    <SnackbarContainer
      $type={type}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <SnackbarIcon $type={type} aria-hidden="true">
        {isSuccess ? <FiCheckCircle /> : <FiAlertCircle />}
      </SnackbarIcon>

      <SnackbarContent>
        {title && <SnackbarTitle>{title}</SnackbarTitle>}

        {message && <SnackbarMessage>{message}</SnackbarMessage>}
      </SnackbarContent>

      <SnackbarCloseButton
        type="button"
        aria-label="Dismiss notification"
        onClick={onClose}
      >
        <FiX />
      </SnackbarCloseButton>
    </SnackbarContainer>
  );
};
