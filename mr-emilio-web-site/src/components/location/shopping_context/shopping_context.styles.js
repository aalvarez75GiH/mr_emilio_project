import styled from "styled-components";

const BRAND_BLUE = "#1746A2";
const TEXT_PRIMARY = "#121A2A";
const TEXT_SECONDARY = "#566176";
const BORDER_BLUE = "rgba(23, 70, 162, 0.16)";
const PANEL_BACKGROUND = "#FFFFFF";
const SUCCESS = "#22965B";
const UNAVAILABLE = "#D44A59";

export const ShoppingContextSection = styled.section`
  width: 100%;
  padding: 1.75rem 3.5rem 0;

  @media (min-width: 1440px) {
    padding-inline: 4.5rem;
  }

  @media (max-width: 1280px) {
    padding-inline: 3rem;
  }

  @media (max-width: 1024px) {
    padding-inline: 2rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1.25rem 0;
  }

  @media (max-width: 480px) {
    padding: 1.25rem 1rem 0;
  }

  @media (max-width: 375px) {
    padding-inline: 0.875rem;
  }
`;

export const ShoppingContextContainer = styled.div`
  width: 100%;
  max-width: 1840px;
  min-height: 108px;
  margin: 0 auto;
  padding: 1.25rem 1.5rem;

  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 1.25rem;

  background: ${PANEL_BACKGROUND};
  border: 1px solid ${BORDER_BLUE};
  border-radius: 20px;

  box-shadow: 0 10px 30px rgba(23, 70, 162, 0.045);

  @media (min-width: 1440px) {
    padding: 1.35rem 1.75rem;
    gap: 1.5rem;
  }

  @media (max-width: 1024px) {
    padding: 1.15rem 1.25rem;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: auto minmax(0, 1fr);
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 16px;
    align-items: start;
  }

  @media (max-width: 375px) {
    gap: 0.75rem;
    padding: 0.9rem;
  }
`;

export const LocationIconWrapper = styled.div`
  width: 48px;
  height: 48px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: ${BRAND_BLUE};
  background: rgba(23, 70, 162, 0.07);
  border-radius: 50%;

  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 42px;
    height: 42px;
  }

  @media (max-width: 375px) {
    width: 38px;
    height: 38px;

    svg {
      width: 21px;
      height: 21px;
    }
  }
`;

export const ShoppingContextContent = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ShoppingContextEyebrow = styled.span`
  margin-bottom: 0.2rem;

  color: ${BRAND_BLUE};

  font-family: "DM Sans", sans-serif;
  font-size: 0.72rem;
  font-weight: 750;
  line-height: 1.2;

  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const WarehouseInformation = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.35rem 0.75rem;
`;

export const WarehouseName = styled.h2`
  margin: 0;

  color: ${TEXT_PRIMARY};

  font-family: "Raleway", sans-serif;
  font-size: 1.3rem;
  font-weight: 750;
  line-height: 1.2;

  @media (min-width: 1440px) {
    font-size: 1.4rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.08rem;
  }

  @media (max-width: 375px) {
    font-size: 1rem;
  }
`;

export const WarehouseLocation = styled.span`
  color: ${TEXT_SECONDARY};

  font-family: "DM Sans", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.35;

  @media (max-width: 480px) {
    width: 100%;
    font-size: 0.82rem;
  }
`;

export const WarehouseStatusList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.45rem 1rem;

  margin-top: 0.45rem;

  @media (max-width: 480px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.3rem;
  }
`;

export const WarehouseStatusItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;

  color: ${TEXT_SECONDARY};

  font-family: "DM Sans", sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1.3;
`;

export const WarehouseStatusDot = styled.span`
  width: 7px;
  height: 7px;

  flex-shrink: 0;

  background: ${({ $available }) => ($available ? SUCCESS : UNAVAILABLE)};

  border-radius: 50%;
`;

export const ShoppingContextMessage = styled.p`
  max-width: 760px;
  margin: 0.45rem 0 0;

  color: ${TEXT_SECONDARY};

  font-family: "DM Sans", sans-serif;
  font-size: 0.84rem;
  font-weight: 450;
  line-height: 1.45;

  @media (max-width: 480px) {
    font-size: 0.78rem;
  }
`;

export const ShoppingContextError = styled.p`
  margin: 0.45rem 0 0;

  color: #a23b47;

  font-family: "DM Sans", sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1.4;
`;

export const ShoppingContextAction = styled.button`
  min-height: 44px;
  padding: 0.7rem 1rem 0.7rem 1.15rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;

  color: #ffffff;
  background: ${BRAND_BLUE};
  border: 1px solid ${BRAND_BLUE};
  border-radius: 999px;

  font-family: "DM Sans", sans-serif;
  font-size: 0.84rem;
  font-weight: 700;
  line-height: 1;

  white-space: nowrap;
  cursor: pointer;

  transition: transform 180ms ease, background-color 180ms ease,
    box-shadow 180ms ease, opacity 180ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    background: #103b8e;
    box-shadow: 0 8px 18px rgba(23, 70, 162, 0.18);
  }

  &:focus-visible {
    outline: 3px solid rgba(23, 70, 162, 0.22);
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.62;
    cursor: wait;
  }

  @media (max-width: 768px) {
    grid-column: 2;
    justify-self: start;

    margin-top: 0.15rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    min-height: 42px;
    margin-top: 0.3rem;
  }
`;

export const ShoppingContextActionLabel = styled.span`
  display: inline-block;
`;
