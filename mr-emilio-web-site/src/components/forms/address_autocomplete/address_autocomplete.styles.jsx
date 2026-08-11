import styled from "styled-components";

export const AddressAutocompleteContainer = styled.div`
  position: relative;

  width: 100%;
`;

export const AddressInputWrapper = styled.div`
  position: relative;

  width: 100%;
`;

export const AddressInputIcon = styled.span`
  position: absolute;

  top: 50%;
  left: 15px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.brand.primary};

  pointer-events: none;

  transform: translateY(-50%);

  svg {
    width: 18px;
    height: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    left: 13px;

    svg {
      width: 17px;
      height: 17px;
    }
  }
`;

export const AddressInput = styled.input`
  width: 100%;
  height: 50px;

  padding: 0 14px 0 44px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};

  border-radius: 10px;

  background: ${({ theme }) => theme.colors.background.primary};

  color: ${({ theme }) => theme.colors.text.primary};

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: 0.9rem;

  transition: border-color 180ms ease, box-shadow 180ms ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};

    opacity: 0.7;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.brand.primary};

    outline: none;

    box-shadow: 0 0 0 3px rgba(22, 70, 172, 0.08);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    height: 52px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: 50px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    height: 49px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 48px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 48px;

    padding-left: 40px;

    font-size: 0.88rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding-right: 12px;
    padding-left: 38px;

    font-size: 0.84rem;
  }
`;

export const SuggestionsList = styled.ul`
  position: absolute;
  z-index: 30;

  top: calc(100% + 6px);
  left: 0;

  width: 100%;
  max-height: 280px;

  margin: 0;
  padding: 6px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};

  border-radius: 10px;

  background: ${({ theme }) => theme.colors.background.primary};

  box-shadow: 0 12px 30px rgba(17, 32, 61, 0.1);

  list-style: none;

  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-height: 240px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    max-height: 220px;
  }
`;

export const SuggestionButton = styled.button`
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr);
  align-items: start;
  gap: 10px;

  width: 100%;

  padding: 11px 10px;

  border: none;
  border-radius: 8px;

  background: transparent;
  color: inherit;

  text-align: left;

  cursor: pointer;

  svg {
    width: 17px;
    height: 17px;

    margin-top: 2px;

    color: ${({ theme }) => theme.colors.brand.primary};
  }

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.background.softBlue};

    outline: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 10px 9px;
  }
`;

export const SuggestionMainText = styled.strong`
  display: block;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.82rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  line-height: 1.3;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.8rem;
  }
`;

export const SuggestionSecondaryText = styled.span`
  display: block;

  margin-top: 3px;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.72rem;
  line-height: 1.35;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.69rem;
  }
`;

export const SelectedAddress = styled.div`
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr);
  align-items: start;
  gap: 10px;

  margin-top: 10px;
  padding: 11px 12px;

  border-radius: 9px;

  background: ${({ theme }) => theme.colors.background.softBlue};

  text-align: left;
`;

export const SelectedAddressIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;

  border-radius: 8px;

  background: ${({ theme }) => theme.colors.background.primary};

  color: ${({ theme }) => theme.colors.brand.primary};

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const SelectedAddressContent = styled.div`
  min-width: 0;
`;

export const SelectedAddressLabel = styled.span`
  display: block;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.66rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const SelectedAddressText = styled.span`
  display: block;

  margin-top: 3px;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.76rem;
  line-height: 1.4;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.72rem;
  }
`;

export const AddressAutocompleteError = styled.div`
  margin-top: 8px;

  color: #a52a2a;

  font-size: 0.72rem;
  line-height: 1.4;

  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.69rem;
  }
`;
