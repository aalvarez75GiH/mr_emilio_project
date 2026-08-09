import { FiChevronLeft } from "react-icons/fi";

import {
  CheckoutBackHeaderContainer,
  CheckoutBackButton,
  CheckoutBackLabel,
} from "./checkout_back_header.styles";

export const CheckoutBackHeader = ({
  label = "Back",
  ariaLabel = "Go back",
  onBack,
}) => {
  return (
    <CheckoutBackHeaderContainer>
      <CheckoutBackButton type="button" aria-label={ariaLabel} onClick={onBack}>
        <FiChevronLeft />

        <CheckoutBackLabel>{label}</CheckoutBackLabel>
      </CheckoutBackButton>
    </CheckoutBackHeaderContainer>
  );
};
