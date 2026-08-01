import styled from "styled-components";

export const PageContainerWrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.layout.contentWidth};
  margin: 0 auto;
  padding: 0 48px;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    max-width: ${({ theme }) => theme.sizes.layout.maxWidth};
    padding: 0 64px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0 40px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 0 32px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 0 16px;
  }
`;
