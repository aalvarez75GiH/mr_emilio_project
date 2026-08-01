import { SectionWrapper } from "./section.styles";

export const Section = ({
  children,
  background = "transparent",
  spacing = "normal",
  ...props
}) => {
  return (
    <SectionWrapper $background={background} $spacing={spacing} {...props}>
      {children}
    </SectionWrapper>
  );
};
