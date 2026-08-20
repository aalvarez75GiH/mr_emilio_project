import styled, { css } from "styled-components";

export const ScreenTransition = styled.div`
  width: 100%;
  min-height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    animation: ${({ $isExiting, $direction }) => {
      if (!$isExiting) {
        return css`
          screen-enter 260ms cubic-bezier(0.22, 1, 0.36, 1) both
        `;
      }

      if ($direction === "back") {
        return css`
          screen-exit-back 260ms cubic-bezier(0.22, 1, 0.36, 1) both
        `;
      }

      return css`
        screen-exit-forward 260ms cubic-bezier(0.22, 1, 0.36, 1) both
      `;
    }};

    @keyframes screen-enter {
      from {
        opacity: 0.96;
        transform: translateX(100%);
      }

      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes screen-exit-forward {
      from {
        opacity: 1;
        transform: translateX(0);
      }

      to {
        opacity: 0.96;
        transform: translateX(-100%);
      }
    }

    @keyframes screen-exit-back {
      from {
        opacity: 1;
        transform: translateX(0);
      }

      to {
        opacity: 0.96;
        transform: translateX(100%);
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
