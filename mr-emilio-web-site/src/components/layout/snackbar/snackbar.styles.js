import styled from "styled-components";

export const SnackbarContainer = styled.div`
  position: fixed;
  z-index: 2000;

  top: ${({ theme }) => theme.sizes.header.desktopHeight};
  right: 0;
  left: 0;
  bottom: auto;

  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;

  width: 100%;
  min-height: 64px;

  padding: 12px 64px;

  border-top: 1px solid
    ${({ $type }) =>
      $type === "success"
        ? "rgba(255, 255, 255, 0.12)"
        : "rgba(176, 42, 42, 0.16)"};

  border-bottom: 1px solid
    ${({ $type }) =>
      $type === "success"
        ? "rgba(255, 255, 255, 0.18)"
        : "rgba(176, 42, 42, 0.18)"};

  border-right: none;
  border-left: none;
  border-radius: 0;

  background: ${({ $type, theme }) =>
    $type === "success"
      ? `linear-gradient(
          135deg,
          ${theme.colors.brand.primary} 0%,
          #0f55b8 100%
        )`
      : $type === "error"
      ? "#fff5f5"
      : "#fff9ed"};

  box-shadow: 0 10px 28px rgba(18, 26, 42, 0.14);

  animation: snackbar-enter 220ms ease both;

  @keyframes snackbar-enter {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding-inline: 80px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-inline: 48px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding-inline: 32px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: ${({ theme }) => theme.sizes.header.tabletHeight};

    padding-inline: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: auto;
    right: 16px;
    bottom: 18px;
    left: 16px;

    width: auto;
    min-height: 68px;

    padding: 13px 12px 13px 14px;

    border: 1px solid
      ${({ $type }) =>
        $type === "success"
          ? "rgba(255, 255, 255, 0.16)"
          : $type === "error"
          ? "rgba(176, 42, 42, 0.2)"
          : "rgba(182, 109, 0, 0.22)"};

    border-radius: 12px;

    box-shadow: 0 18px 48px rgba(18, 26, 42, 0.22);

    animation: snackbar-mobile-enter 220ms ease both;

    @keyframes snackbar-mobile-enter {
      from {
        opacity: 0;
        transform: translateY(10px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    right: 12px;
    bottom: 14px;
    left: 12px;

    padding: 12px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const SnackbarIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;

  flex: 0 0 auto;

  border-radius: 50%;

  background: ${({ $type }) =>
    $type === "success"
      ? "rgba(255, 255, 255, 0.14)"
      : $type === "error"
      ? "rgba(176, 42, 42, 0.1)"
      : "rgba(242, 169, 0, 0.12)"};

  color: ${({ $type }) =>
    $type === "success"
      ? "#ffffff"
      : $type === "error"
      ? "#a52a2a"
      : "#B66D00"};

  font-size: 20px;

  svg {
    display: block;

    width: 1em;
    height: 1em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 34px;
    height: 34px;

    font-size: 19px;
  }
`;

export const SnackbarTitle = styled.strong`
  color: ${({ $type }) =>
    $type === "success"
      ? "#ffffff"
      : $type === "error"
      ? "#8f2424"
      : "#8a5600"};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_14};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.25;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.86rem;
  }
`;

export const SnackbarMessage = styled.span`
  overflow: hidden;

  color: ${({ $type }) =>
    $type === "success"
      ? "rgba(255, 255, 255, 0.84)"
      : $type === "error"
      ? "#8f4242"
      : "#815b1c"};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.78rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.35;

  text-overflow: ellipsis;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.76rem;
  }
`;

export const SnackbarContent = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;

  text-align: left;
`;

export const SnackbarCloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;

  flex: 0 0 auto;

  padding: 0;

  border: none;
  border-radius: 50%;

  background: transparent;

  color: ${({ $type }) =>
    $type === "success"
      ? "rgba(255, 255, 255, 0.82)"
      : $type === "error"
      ? "#8f4242"
      : "#815b1c"};

  font-size: 18px;

  cursor: pointer;

  transition: background 180ms ease, color 180ms ease;

  svg {
    width: 1em;
    height: 1em;
  }

  &:hover {
    background: ${({ $type }) =>
      $type === "success"
        ? "rgba(255, 255, 255, 0.12)"
        : "rgba(0, 0, 0, 0.05)"};
  }

  &:focus-visible {
    outline: 2px solid
      ${({ $type }) => ($type === "success" ? "#ffffff" : "currentColor")};

    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 32px;
    height: 32px;

    font-size: 17px;
  }
`;
// export const SnackbarCloseButton = styled.button`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;

//   width: 34px;
//   height: 34px;

//   flex: 0 0 auto;

//   padding: 0;

//   border: none;
//   border-radius: 50%;

//   background: transparent;
//   color: rgba(255, 255, 255, 0.82);

//   font-size: 18px;

//   cursor: pointer;

//   transition: background 180ms ease, color 180ms ease;

//   svg {
//     width: 1em;
//     height: 1em;
//   }

//   &:hover {
//     background: rgba(255, 255, 255, 0.12);
//     color: #ffffff;
//   }

//   &:focus-visible {
//     outline: 2px solid #ffffff;
//     outline-offset: 2px;
//   }

//   @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
//     width: 32px;
//     height: 32px;

//     font-size: 17px;
//   }
// `;
