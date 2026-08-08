import styled from "styled-components";

export const SnackbarContainer = styled.div`
  position: fixed;
  z-index: 2000;

  right: 32px;
  bottom: 32px;

  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;

  width: min(420px, calc(100vw - 64px));
  min-height: 72px;

  padding: 14px 14px 14px 16px;

  border: 1px solid
    ${({ $type }) =>
      $type === "success"
        ? "rgba(255, 255, 255, 0.16)"
        : "rgba(182, 109, 0, 0.22)"};

  border-radius: 14px;

  background: ${({ $type, theme }) =>
    $type === "success"
      ? `linear-gradient(
          135deg,
          ${theme.colors.brand.primary} 0%,
          #0f55b8 100%
        )`
      : theme.colors.background.primary};

  box-shadow: 0 18px 48px rgba(18, 26, 42, 0.22);

  animation: snackbar-enter 220ms ease both;

  @keyframes snackbar-enter {
    from {
      opacity: 0;
      transform: translateY(10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    right: 24px;
    bottom: 24px;

    width: min(400px, calc(100vw - 48px));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: 16px;
    bottom: 18px;
    left: 16px;

    width: auto;
    min-height: 68px;

    padding: 13px 12px 13px 14px;

    border-radius: 12px;
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
      : "rgba(242, 169, 0, 0.12)"};

  color: ${({ $type }) => ($type === "success" ? "#ffffff" : "#B66D00")};

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

export const SnackbarContent = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;

  text-align: left;
`;
// export const SnackbarContent = styled.div`
//   min-width: 0;

//   display: flex;
//   flex-direction: column;
//   gap: 2px;
// `;

export const SnackbarTitle = styled.strong`
  color: #ffffff;

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

  color: rgba(255, 255, 255, 0.84);

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.78rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.35;

  text-overflow: ellipsis;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.76rem;
  }
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
  color: rgba(255, 255, 255, 0.82);

  font-size: 18px;

  cursor: pointer;

  transition: background 180ms ease, color 180ms ease;

  svg {
    width: 1em;
    height: 1em;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #ffffff;
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 32px;
    height: 32px;

    font-size: 17px;
  }
`;
