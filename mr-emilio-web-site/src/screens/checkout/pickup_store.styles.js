import styled, { css } from "styled-components";

export const PickupStorePage = styled.main`
  width: 100%;

  min-height: calc(100vh - ${({ theme }) => theme.sizes.header.desktopHeight});

  background: ${({ theme }) => theme.colors.background.primary};
`;

export const PickupStoreContainer = styled.div`
  width: 100%;
  max-width: 620px;

  margin: 0 auto;
  padding: 42px 32px 56px;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding-top: 48px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-top: 40px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    max-width: 580px;

    padding-top: 36px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 540px;

    padding: 30px 24px 48px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: none;

    padding: 26px 20px 38px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 24px 16px 34px;
  }
`;

export const PickupStoreHeader = styled.header`
  margin-bottom: 26px;

  text-align: left;
`;

export const PickupStoreTitle = styled.h1`
  margin: 0;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.18;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.55rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 1.4rem;
  }
`;

export const PickupStoreSubtitle = styled.p`
  margin: 10px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.9rem;
  line-height: 1.45;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.82rem;
  }
`;

export const StoreSection = styled.section`
  width: 100%;

  & + & {
    margin-top: 14px;
  }
`;

export const StoreSectionLabel = styled.h2`
  margin: 0 0 9px;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.72rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.2;

  text-transform: uppercase;
  letter-spacing: 0.04em;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.68rem;
  }
`;

export const StoreCardLayout = styled.div`
  display: grid;
  grid-template-columns: 82px minmax(0, 1fr) 24px;
  align-items: start;
  gap: 18px;

  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: 88px minmax(0, 1fr) 24px;

    gap: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 80px minmax(0, 1fr) 24px;

    gap: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: 76px minmax(0, 1fr) 22px;

    gap: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 72px minmax(0, 1fr) 22px;

    gap: 15px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 58px minmax(0, 1fr) 22px;

    gap: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    grid-template-columns: 54px minmax(0, 1fr) 20px;

    gap: 10px;
  }
`;
export const StoreCard = styled.button`
  display: block;

  width: 100%;

  padding: 20px;

  border: 1.5px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.brand.primary : theme.colors.border.light};

  border-radius: 15px;

  background: ${({ $selected, theme }) =>
    $selected
      ? theme.colors.background.softBlue
      : theme.colors.background.primary};

  color: inherit;

  text-align: left;

  cursor: pointer;

  transition: border-color 180ms ease, background 180ms ease,
    transform 180ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 3px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 22px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 19px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 16px;

    border-radius: 13px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 14px;
  }
`;
export const StoreIconColumn = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
`;

export const StoreIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 82px;
  height: 82px;

  border-radius: 14px;

  background: ${({ theme }) => theme.colors.background.softBlue};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    width: 88px;
    height: 88px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 80px;
    height: 80px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 76px;
    height: 76px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 72px;
    height: 72px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 58px;
    height: 58px;

    border-radius: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 54px;
    height: 54px;
  }
`;

export const StoreIconImage = styled.img`
  display: block;

  width: 46px;
  height: 46px;

  object-fit: contain;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    width: 50px;
    height: 50px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 44px;
    height: 44px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 42px;
    height: 42px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 32px;
    height: 32px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 30px;
    height: 30px;
  }
`;
export const StoreMainContent = styled.div`
  min-width: 0;

  width: 100%;
`;
export const StoreSelectionColumn = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;

  padding-top: 2px;
`;

export const StoreCardHeader = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
`;

export const StoreRadio = styled.span`
  position: relative;

  width: 20px;
  height: 20px;

  flex: 0 0 auto;

  border: 1.5px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.brand.primary : theme.colors.border.light};

  border-radius: 50%;

  ${({ $selected, theme }) =>
    $selected &&
    css`
      &::after {
        position: absolute;

        top: 50%;
        left: 50%;

        width: 10px;
        height: 10px;

        border-radius: 50%;

        background: ${theme.colors.brand.primary};

        content: "";

        transform: translate(-50%, -50%);
      }
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 18px;
    height: 18px;

    ${({ $selected, theme }) =>
      $selected &&
      css`
        &::after {
          width: 9px;
          height: 9px;

          background: ${theme.colors.brand.primary};
        }
      `}
  }
`;

export const StoreInformation = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  min-width: 0;
  width: 100%;
`;

export const StoreName = styled.strong`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.25;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.94rem;
  }
`;

export const StoreRecommendedBadge = styled.span`
  display: inline-flex;
  align-items: center;

  min-height: 22px;

  padding: 0 8px;

  border-radius: 999px;

  background: ${({ theme }) => theme.colors.brand.primary};
  color: #ffffff;

  font-size: 0.62rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1;

  text-transform: uppercase;
  letter-spacing: 0.025em;
`;

export const StoreAddress = styled.div`
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr);
  align-items: start;
  gap: 8px;

  margin-top: 13px;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.82rem;
  line-height: 1.4;

  svg {
    width: 17px;
    height: 17px;

    margin-top: 1px;

    color: ${({ theme }) => theme.colors.brand.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.78rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.74rem;
  }
`;

export const StoreMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;

  margin-top: 11px;
`;

export const StoreMetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  svg {
    width: 16px;
    height: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.76rem;
  }
`;

export const StoreDistanceWarning = styled.div`
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr);
  align-items: start;
  gap: 10px;

  width: 100%;

  margin-top: 13px;
  padding: 11px 12px;

  border: 1px solid rgba(180, 120, 0, 0.24);
  border-radius: 9px;

  background: rgba(255, 248, 230, 0.92);

  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: 32px minmax(0, 1fr);

    gap: 11px;

    padding: 12px 13px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 30px minmax(0, 1fr);

    gap: 10px;

    padding: 11px 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: 30px minmax(0, 1fr);

    gap: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 10px 11px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 28px minmax(0, 1fr);

    gap: 9px;

    margin-top: 12px;
    padding: 10px;

    border-radius: 8px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    grid-template-columns: 26px minmax(0, 1fr);

    gap: 8px;

    padding: 9px;
  }
`;

export const StoreDistanceWarningIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;

  border-radius: 50%;

  background: rgba(180, 120, 0, 0.12);
  color: #9a6800;

  svg {
    width: 16px;
    height: 16px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    width: 32px;
    height: 32px;

    svg {
      width: 17px;
      height: 17px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 28px;
    height: 28px;

    svg {
      width: 15px;
      height: 15px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 26px;
    height: 26px;

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export const StoreDistanceWarningContent = styled.div`
  min-width: 0;

  text-align: left;
`;

export const StoreDistanceWarningTitle = styled.strong`
  display: block;

  color: #795200;

  font-size: 0.76rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.3;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: 0.78rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 0.76rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: 0.75rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.74rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.72rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.7rem;
  }
`;

export const StoreDistanceWarningText = styled.span`
  display: block;

  margin-top: 3px;

  color: #765f2c;

  font-size: 0.7rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.4;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    font-size: 0.72rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 0.7rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: 0.7rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 0.69rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.68rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 0.66rem;
  }
`;

export const StoreHours = styled.div`
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  align-items: center;
  gap: 10px;

  margin-top: 15px;
  padding: 11px 12px;

  border-radius: 9px;

  background: ${({ theme }) => theme.colors.background.softBlue};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 32px minmax(0, 1fr);

    gap: 9px;

    padding: 10px;
  }
`;

export const StoreHoursIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;

  border-radius: 50%;

  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.brand.primary};

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const StoreHoursContent = styled.div`
  min-width: 0;

  text-align: left;
`;

export const StoreHoursLabel = styled.span`
  display: block;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.68rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const StoreHoursValue = styled.strong`
  display: block;

  margin-top: 3px;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.82rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const PickupStoreEmptyState = styled.div`
  width: 100%;

  padding: 28px 20px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 14px;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.86rem;
  line-height: 1.5;
  text-align: center;
`;

export const PickupStoreContinueButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  width: 100%;
  min-height: 52px;

  margin-top: 22px;
  padding: 0 22px;

  border: none;
  border-radius: 10px;

  background: ${({ theme }) => theme.colors.brand.primary};
  color: #ffffff;

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.92rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  cursor: pointer;

  transition: opacity 180ms ease, transform 180ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.42;
    cursor: not-allowed;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 48px;

    font-size: 0.86rem;
  }
`;
