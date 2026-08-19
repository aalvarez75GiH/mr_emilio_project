import styled from "styled-components";

export const MobileMenuRoot = styled.div`
  position: fixed;

  z-index: 2000;

  inset: 0;

  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};

  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};

  transition: visibility 0s linear
    ${({ $isOpen }) => ($isOpen ? "0s" : "320ms")};
`;

export const MobileMenuBackdrop = styled.button`
  position: absolute;

  inset: 0;

  width: 100%;
  height: 100%;

  padding: 0;

  border: none;

  background: ${({ theme }) => theme.colors.overlay.dark};

  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};

  cursor: default;

  transition: opacity 280ms ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    transition-duration: 260ms;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    transition-duration: 240ms;
  }
`;

export const MobileMenuPanel = styled.aside`
  position: absolute;

  top: 0;
  left: 0;

  width: min(78vw, 390px);
  height: 100%;

  display: flex;
  flex-direction: column;

  overflow-y: auto;

  background: ${({ theme }) => theme.colors.background.primary};

  box-shadow: ${({ theme }) => theme.sizes.shadow.floating};

  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-105%")});

  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: min(82vw, 390px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 84vw;

    transition-duration: 300ms;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 88vw;

    transition-duration: 280ms;
  }
`;

export const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  flex-shrink: 0;

  min-height: ${({ theme }) => theme.sizes.header.tabletHeight};

  padding: 0 ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: ${({ theme }) => theme.sizes.header.mobileHeight};

    padding-left: ${({ theme }) => theme.spacing.lg};
    padding-right: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding-left: ${({ theme }) => theme.spacing.md};
    padding-right: ${({ theme }) => theme.spacing.md};
  }
`;

export const MobileMenuLogo = styled.a`
  display: inline-flex;
  align-items: center;

  width: fit-content;

  img {
    display: block;

    width: auto;
    height: 68px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    img {
      height: 62px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    img {
      height: 58px;
    }
  }
`;

export const MobileMenuCloseButton = styled.button`
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: none;

  border-radius: ${({ theme }) => theme.sizes.radius.round};

  background: transparent;

  color: ${({ theme }) => theme.colors.text.primary};

  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background.softBlue};

    color: ${({ theme }) => theme.colors.brand.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};

    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 38px;
    height: 38px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const MobileMenuContent = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl}
    ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg}
      ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: ${({ theme }) => theme.spacing.md}
      ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  }
`;

export const MobileMenuSection = styled.section`
  width: 100%;
`;

export const MobileMenuSectionLabel = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.md};

  padding-left: calc(
    ${({ theme }) => theme.spacing.sm} + 24px +
      ${({ theme }) => theme.spacing.lg}
  );

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_12};

  font-weight: ${({ theme }) => theme.fontWeights.bold};

  text-transform: uppercase;

  letter-spacing: 0.04em;

  color: ${({ theme }) => theme.colors.brand.primary};

  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-left: calc(
      ${({ theme }) => theme.spacing.sm} + 24px +
        ${({ theme }) => theme.spacing.md}
    );
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding-left: calc(
      ${({ theme }) => theme.spacing.sm} + 22px +
        ${({ theme }) => theme.spacing.md}
    );

    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }
`;
// export const MobileMenuSectionLabel = styled.p`
//   margin: 0 0 ${({ theme }) => theme.spacing.md};

//   font-family: ${({ theme }) => theme.fonts.body};

//   font-size: ${({ theme }) => theme.fontSizes.text_12};

//   font-weight: ${({ theme }) => theme.fontWeights.bold};

//   text-transform: uppercase;

//   letter-spacing: 0.04em;

//   color: ${({ theme }) => theme.colors.brand.primary};

//   @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
//     font-size: ${({ theme }) => theme.fontSizes.text_10};
//   }
// `;

export const MobileMenuNavigation = styled.nav`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.xs};
`;

export const MobileMenuLink = styled.a`
  min-height: 50px;

  display: flex;
  align-items: center;

  gap: ${({ theme }) => theme.spacing.lg};

  padding: 0 ${({ theme }) => theme.spacing.sm};

  border-radius: ${({ theme }) => theme.sizes.radius.medium};

  color: ${({ theme }) => theme.colors.text.primary};

  text-decoration: none;

  transition: background 160ms ease, color 160ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background.softBlue};

    color: ${({ theme }) => theme.colors.brand.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};

    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 48px;

    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    min-height: 44px;

    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const MobileMenuLinkIcon = styled.span`
  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  color: ${({ theme }) => theme.colors.text.primary};

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 22px;
    height: 22px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const MobileMenuLinkLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_16};

  font-weight: ${({ theme }) => theme.fontWeights.medium};

  line-height: 1.3;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }
`;

export const MobileMenuDivider = styled.div`
  width: 100%;
  height: 1px;

  margin: ${({ theme }) => theme.spacing.lg} 0;

  background: ${({ theme }) => theme.colors.border.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    margin: ${({ theme }) => theme.spacing.md} 0;
  }
`;

export const MyOrdersLink = styled.a`
  min-height: 56px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: ${({ theme }) => theme.spacing.md};

  padding: 0 ${({ theme }) => theme.spacing.lg};

  border: 1px solid ${({ theme }) => theme.colors.border.brand};

  border-radius: ${({ theme }) => theme.sizes.radius.medium};

  background: ${({ theme }) => theme.colors.background.softBlue};

  color: ${({ theme }) => theme.colors.brand.primary};

  text-decoration: none;

  transition: background 160ms ease, border-color 160ms ease;

  svg {
    flex-shrink: 0;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.brand.primaryLight};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};

    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 54px;

    padding-left: ${({ theme }) => theme.spacing.md};
    padding-right: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    min-height: 50px;
  }
`;

export const MyOrdersLinkContent = styled.div`
  display: flex;
  align-items: center;

  gap: ${({ theme }) => theme.spacing.lg};

  ${MobileMenuLinkIcon} {
    color: ${({ theme }) => theme.colors.brand.primary};
  }

  ${MobileMenuLinkLabel} {
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const StoreCard = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};

  padding: ${({ theme }) => theme.spacing.lg};

  border-radius: ${({ theme }) => theme.sizes.radius.medium};

  background: ${({ theme }) => theme.colors.background.softBlue};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const StoreCardTop = styled.div`
  display: grid;

  grid-template-columns: auto minmax(0, 1fr);

  align-items: start;

  gap: ${({ theme }) => theme.spacing.md};
`;

export const StoreCardIcon = styled.div`
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: ${({ theme }) => theme.sizes.radius.round};

  background: ${({ theme }) => theme.colors.background.primary};

  color: ${({ theme }) => theme.colors.brand.primary};

  svg {
    width: 21px;
    height: 21px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 38px;
    height: 38px;

    svg {
      width: 19px;
      height: 19px;
    }
  }
`;

export const StoreCardContent = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;

  align-items: flex-start;

  text-align: left;
`;

export const StoreCardEyebrow = styled.span`
  margin-bottom: 2px;

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_12};

  color: ${({ theme }) => theme.colors.text.secondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }
`;

export const StoreCardName = styled.strong`
  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_16};

  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  line-height: 1.3;

  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }
`;

export const StoreCardLocation = styled.span`
  margin-top: 2px;

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_12};

  color: ${({ theme }) => theme.colors.text.secondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_10};
  }
`;

export const StoreCardAction = styled.button`
  width: calc(100% - 54px);

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: ${({ theme }) => theme.spacing.md};

  margin-top: ${({ theme }) => theme.spacing.lg};
  margin-left: 54px;

  padding: ${({ theme }) => theme.spacing.sm} 0;

  border: none;

  background: transparent;

  color: ${({ theme }) => theme.colors.brand.primary};

  cursor: pointer;

  &:disabled {
    opacity: 0.6;

    cursor: default;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};

    outline-offset: 3px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: calc(100% - 50px);

    margin-left: 50px;
  }
`;
// export const StoreCardAction = styled.button`
//   width: 100%;

//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   gap: ${({ theme }) => theme.spacing.md};

//   margin-top: ${({ theme }) => theme.spacing.lg};

//   padding: ${({ theme }) => theme.spacing.sm} 0;

//   border: none;

//   background: transparent;

//   color: ${({ theme }) => theme.colors.brand.primary};

//   cursor: pointer;

//   &:disabled {
//     opacity: 0.6;

//     cursor: default;
//   }

//   &:focus-visible {
//     outline: 2px solid ${({ theme }) => theme.colors.brand.primary};

//     outline-offset: 3px;
//   }

//   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
//     margin-top: ${({ theme }) => theme.spacing.md};
//   }
// `;

export const StoreCardActionLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};

  font-size: ${({ theme }) => theme.fontSizes.text_14};

  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: ${({ theme }) => theme.fontSizes.text_12};
  }
`;
