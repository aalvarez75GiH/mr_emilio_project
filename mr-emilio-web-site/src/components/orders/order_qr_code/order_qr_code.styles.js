import styled from "styled-components";

export const OrderQrCodeCard = styled.section`
  width: 100%;

  padding: 26px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 16px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 28px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 26px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 22px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 20px 18px;

    border-radius: 14px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 18px 16px;
  }
`;

export const OrderQrCodeHeader = styled.div`
  width: 100%;

  text-align: center;
`;

export const OrderQrCodeEyebrow = styled.span`
  display: block;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: 0.72rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  line-height: 1.2;
  letter-spacing: 0.045em;

  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.68rem;
  }
`;

export const OrderQrCodeTitle = styled.h2`
  margin: 8px 0 0;

  color: ${({ theme }) => theme.colors.text.primary};

  font-family: ${({ theme }) => theme.fonts.heading};

  font-size: 1.35rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.18rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 1.08rem;
  }
`;

export const OrderQrCodeDescription = styled.p`
  max-width: 430px;

  margin: 10px auto 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: 0.88rem;
  line-height: 1.5;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 320px;

    font-size: 0.82rem;
  }
`;

export const OrderQrCodeVisual = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  margin-top: 22px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 20px;
  }
`;

export const OrderQrCodeFrame = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 14px;

  border: 1px solid rgba(22, 70, 172, 0.14);
  border-radius: 18px;

  background: #ffffff;

  box-shadow: 0 8px 24px rgba(18, 41, 82, 0.08);

  svg {
    display: block;

    width: 220px;
    height: 220px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    svg {
      width: 210px;
      height: 210px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 12px;

    border-radius: 16px;

    svg {
      width: min(54vw, 200px);
      height: min(54vw, 200px);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    svg {
      width: min(56vw, 180px);
      height: min(56vw, 180px);
    }
  }
`;

export const OrderQrCodeOrderNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  width: 100%;

  margin-top: 16px;

  font-family: ${({ theme }) => theme.fonts.body};
`;

export const OrderQrCodeOrderLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 0.76rem;
  line-height: 1.2;
`;

export const OrderQrCodeOrderValue = styled.strong`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: 0.82rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  line-height: 1.2;
`;

export const OrderQrCodeHelpText = styled.p`
  max-width: 440px;

  margin: 16px auto 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-family: ${({ theme }) => theme.fonts.body};

  font-size: 0.75rem;
  line-height: 1.5;

  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 330px;

    font-size: 0.7rem;
  }
`;
