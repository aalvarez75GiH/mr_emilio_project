import { FiChevronLeft } from "react-icons/fi";

import {
  BackHeaderContainer,
  BackButton,
  BackLabel,
} from "./back_header.styles";

export const BackHeader = ({
  label = "Back",
  ariaLabel = "Go back",
  onBack,
}) => {
  return (
    <BackHeaderContainer>
      <BackButton type="button" aria-label={ariaLabel} onClick={onBack}>
        <FiChevronLeft />

        <BackLabel>{label}</BackLabel>
      </BackButton>
    </BackHeaderContainer>
  );
};
