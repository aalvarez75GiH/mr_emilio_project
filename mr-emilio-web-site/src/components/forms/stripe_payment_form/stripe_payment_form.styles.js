import styled from "styled-components";

export const StripePaymentFormContainer = styled.div`
  width: 100%;

  margin-top: 16px;
  padding: 18px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 10px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 17px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 14px;
    padding: 15px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 14px;
  }
`;
