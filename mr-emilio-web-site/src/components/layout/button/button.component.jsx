import { ButtonWrapper } from "./button.styles";

export const Button = ({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  type = "button",
  ...props
}) => {
  return (
    <ButtonWrapper
      type={type}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      {...props}
    >
      {children}
    </ButtonWrapper>
  );
};
