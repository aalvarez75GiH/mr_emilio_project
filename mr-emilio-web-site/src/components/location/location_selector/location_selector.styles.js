import styled from "styled-components";

const BRAND_BLUE = "#1746A2";
const TEXT_PRIMARY = "#121A2A";
const TEXT_SECONDARY = "#566176";

export const LocationSelectorSection = styled.section`
  width: 100%;
  padding: 0 3.5rem;

  margin-top: 1.65rem;
  margin-bottom: 0.35rem;

  scroll-margin-top: 90px;

  @media (min-width: 1440px) {
    padding-inline: 4.5rem;

    margin-top: 1.9rem;
    margin-bottom: 0.4rem;

    scroll-margin-top: 100px;
  }

  @media (max-width: 1280px) {
    padding-inline: 3rem;

    margin-top: 1.5rem;
    margin-bottom: 0.35rem;

    scroll-margin-top: 90px;
  }

  @media (max-width: 1024px) {
    padding-inline: 2rem;

    margin-top: 1.35rem;
    margin-bottom: 0.3rem;

    scroll-margin-top: 82px;
  }

  @media (max-width: 768px) {
    padding-inline: 1.25rem;

    margin-top: 1.25rem;
    margin-bottom: 0.25rem;

    scroll-margin-top: 78px;
  }

  @media (max-width: 480px) {
    padding-inline: 1rem;

    margin-top: 1.1rem;
    margin-bottom: 0.2rem;

    scroll-margin-top: 72px;
  }

  @media (max-width: 375px) {
    padding-inline: 0.875rem;

    margin-top: 1rem;

    scroll-margin-top: 68px;
  }
`;
// export const LocationSelectorSection = styled.section`
//   width: 100%;
//   padding: 0 3.5rem;

//   margin-top: 1.65rem;
//   margin-bottom: 0.35rem;

//   @media (min-width: 1440px) {
//     padding-inline: 4.5rem;

//     margin-top: 1.9rem;
//     margin-bottom: 0.4rem;
//   }

//   @media (max-width: 1280px) {
//     padding-inline: 3rem;

//     margin-top: 1.5rem;
//     margin-bottom: 0.35rem;
//   }

//   @media (max-width: 1024px) {
//     padding-inline: 2rem;

//     margin-top: 1.35rem;
//     margin-bottom: 0.3rem;
//   }

//   @media (max-width: 768px) {
//     padding-inline: 1.25rem;

//     margin-top: 1.25rem;
//     margin-bottom: 0.25rem;
//   }

//   @media (max-width: 480px) {
//     padding-inline: 1rem;

//     margin-top: 1.1rem;
//     margin-bottom: 0.2rem;
//   }

//   @media (max-width: 375px) {
//     padding-inline: 0.875rem;

//     margin-top: 1rem;
//   }
// `;

export const LocationSelectorSectionInner = styled.div`
  width: 100%;
  max-width: 1840px;
  margin: 0 auto;
`;

export const LocationSelectorBannerContainer = styled.div`
  position: relative;

  width: 100%;
  min-height: 56px;
  padding: 0.7rem 1.1rem;

  display: grid;
  grid-template-columns:
    auto
    minmax(max-content, auto)
    minmax(220px, 1fr)
    auto;
  align-items: center;
  gap: 0.85rem;

  background: linear-gradient(
    90deg,
    rgba(235, 242, 253, 0.92) 0%,
    rgba(244, 247, 252, 0.96) 55%,
    rgba(238, 243, 251, 0.92) 100%
  );

  transition: border-color 180ms ease, box-shadow 180ms ease,
    background-color 180ms ease;

  ${({ $isRefreshing }) =>
    $isRefreshing &&
    `
    border-color: rgba(23, 70, 162, 0.18);
    box-shadow: 0 5px 18px rgba(23, 70, 162, 0.07);
  `}

  border: 1px solid rgba(23, 70, 162, 0.08);
  border-radius: 10px;

  @media (min-width: 1440px) {
    min-height: 60px;
    padding: 0.75rem 1.25rem;
    gap: 1rem;
  }

  @media (max-width: 1280px) {
    grid-template-columns:
      auto
      minmax(max-content, auto)
      minmax(160px, 1fr)
      auto;
  }

  @media (max-width: 1024px) {
    grid-template-columns:
      auto
      minmax(0, 1fr)
      auto;

    gap: 0.75rem;
  }

  @media (max-width: 768px) {
    min-height: 58px;
    padding: 0.7rem 0.85rem;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    grid-template-columns: auto minmax(0, 1fr);
    grid-template-rows: auto auto;
    align-items: start;
    column-gap: 0.7rem;
    row-gap: 0.25rem;

    min-height: 0;
    padding: 0.8rem 0.85rem;
  }

  @media (max-width: 375px) {
    column-gap: 0.6rem;
    padding: 0.75rem;
  }
`;

export const LocationSelectorBannerIcon = styled.div`
  width: 34px;
  height: 34px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  color: ${BRAND_BLUE};
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(23, 70, 162, 0.08);
  border-radius: 50%;

  box-shadow: 0 3px 10px rgba(23, 70, 162, 0.06);

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }

  @media (max-width: 375px) {
    width: 34px;
    height: 34px;
  }
`;

export const LocationSelectorBannerInformation = styled.div`
  min-width: 0;

  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem 0.6rem;

  text-align: left;

  animation: location-selector-store-enter 220ms ease both;

  @keyframes location-selector-store-enter {
    from {
      opacity: 0.18;
      transform: translateY(2px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 480px) {
    grid-column: 2;
    grid-row: 1;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.1rem;

    width: 100%;

    text-align: left;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
// export const LocationSelectorBannerInformation = styled.div`
//   min-width: 0;

//   display: flex;
//   align-items: center;
//   flex-wrap: wrap;
//   gap: 0.25rem 0.6rem;

//   @media (max-width: 480px) {
//     grid-column: 2;
//     grid-row: 1;

//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 0.1rem;

//     width: 100%;
//   }
// `;

export const LocationSelectorBannerPrimary = styled.span`
  min-width: 0;

  color: ${TEXT_PRIMARY};

  font-family: "DM Sans", sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  line-height: 1.35;

  white-space: nowrap;

  @media (min-width: 1440px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    width: 100%;

    color: ${BRAND_BLUE};

    font-size: 0.68rem;
    font-weight: 750;
    line-height: 1.25;

    letter-spacing: 0.07em;
    text-transform: uppercase;
    white-space: normal;
  }

  @media (max-width: 375px) {
    font-size: 0.65rem;
  }
`;

export const LocationSelectorBannerWarehouse = styled.strong`
  color: ${TEXT_PRIMARY};
  font-weight: 750;

  @media (max-width: 480px) {
    display: block;

    margin-top: 0.12rem;

    font-size: clamp(0.8rem, 3.5vw, 0.9rem);
    font-weight: 750;
    line-height: 1.25;

    letter-spacing: 0;
    text-transform: none;
  }
`;

export const LocationSelectorBannerSeparator = styled.span`
  color: rgba(86, 97, 118, 0.75);

  font-family: "DM Sans", sans-serif;
  font-size: 0.85rem;
  line-height: 1;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const LocationSelectorBannerLocation = styled.span`
  min-width: 0;

  color: ${TEXT_SECONDARY};

  font-family: "DM Sans", sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  line-height: 1.35;

  text-align: left;
  white-space: nowrap;

  @media (max-width: 480px) {
    width: auto;
    max-width: 100%;

    align-self: flex-start;

    font-size: clamp(0.69rem, 3vw, 0.75rem);
    line-height: 1.35;

    text-align: left;
    white-space: normal;
  }
`;

export const LocationSelectorBannerMessage = styled.span`
  min-width: 0;

  color: ${TEXT_SECONDARY};

  font-family: "DM Sans", sans-serif;
  font-size: 0.76rem;
  font-weight: 450;
  line-height: 1.35;

  text-align: left;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const LocationSelectorBannerAction = styled.button`
  min-width: 126px;
  min-height: 34px;
  padding: 0.42rem 0.65rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: ${BRAND_BLUE};
  background: transparent;

  border: none;
  border-radius: 999px;

  font-family: "DM Sans", sans-serif;
  font-size: 0.77rem;
  font-weight: 750;
  line-height: 1;

  white-space: nowrap;
  cursor: pointer;

  transition: background-color 180ms ease, opacity 180ms ease,
    transform 180ms ease;

  &:hover:not(:disabled) {
    background: rgba(23, 70, 162, 0.07);
    transform: translateX(1px);
  }

  &:focus-visible {
    outline: 3px solid rgba(23, 70, 162, 0.2);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.72;
    cursor: wait;
  }

  @media (max-width: 480px) {
    grid-column: 2;
    grid-row: 2;

    justify-self: start;

    min-width: 0;
    min-height: 28px;
    margin-top: 0.05rem;
    padding: 0.2rem 0;

    font-size: 0.72rem;
  }

  @media (max-width: 375px) {
    font-size: 0.69rem;

    svg {
      width: 15px;
      height: 15px;
    }
  }
`;

export const LocationSelectorBannerActionContent = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;

  animation: location-selector-action-enter 180ms ease both;

  @keyframes location-selector-action-enter {
    from {
      opacity: 0;
      transform: translateY(2px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

// export const LocationSelectorBannerAction = styled.button`
//   min-height: 34px;
//   padding: 0.42rem 0.65rem;

//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.3rem;

//   color: ${BRAND_BLUE};
//   background: transparent;

//   border: none;
//   border-radius: 999px;

//   font-family: "DM Sans", sans-serif;
//   font-size: 0.77rem;
//   font-weight: 750;
//   line-height: 1;

//   white-space: nowrap;
//   cursor: pointer;

//   transition: background-color 180ms ease, opacity 180ms ease,
//     transform 180ms ease;

//   &:hover:not(:disabled) {
//     background: rgba(23, 70, 162, 0.07);
//     transform: translateX(1px);
//   }

//   &:focus-visible {
//     outline: 3px solid rgba(23, 70, 162, 0.2);
//     outline-offset: 2px;
//   }

//   &:disabled {
//     opacity: 0.58;
//     cursor: wait;
//   }

//   @media (max-width: 480px) {
//     grid-column: 2;
//     grid-row: 2;

//     justify-self: start;

//     min-height: 28px;
//     margin-top: 0.05rem;
//     padding: 0.2rem 0;

//     font-size: 0.72rem;
//   }

//   @media (max-width: 375px) {
//     font-size: 0.69rem;

//     svg {
//       width: 15px;
//       height: 15px;
//     }
//   }
// `;

export const LocationSelectorBannerActionLabel = styled.span`
  display: inline-block;
`;

export const LocationSelectorBannerSpinner = styled.span`
  width: 14px;
  height: 14px;

  display: inline-block;
  flex-shrink: 0;

  border: 2px solid rgba(23, 70, 162, 0.24);
  border-top-color: ${BRAND_BLUE};
  border-radius: 50%;

  animation: location-selector-spin 700ms linear infinite;

  @keyframes location-selector-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 1400ms;
  }
`;

export const LocationSelectorBannerCheck = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: ${BRAND_BLUE};

  font-size: 0.95rem;
  font-weight: 750;
  line-height: 1;

  @keyframes location-selector-success {
    from {
      opacity: 0;
      transform: scale(0.7);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
export const LocationSelectorBannerError = styled.span`
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 3.9rem;
  z-index: 2;

  padding: 0.35rem 0.55rem;

  color: #9d3542;
  background: #fff5f6;
  border: 1px solid rgba(157, 53, 66, 0.15);
  border-radius: 6px;

  font-family: "DM Sans", sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1.35;

  @media (max-width: 480px) {
    right: 0;
    left: 0.75rem;
  }
`;
