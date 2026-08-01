import styled from "styled-components";

import { Section } from "../../layout/section/section.component";

export const HeroSection = styled(Section)`
  width: 100%;
  overflow: hidden;

  background: ${({ theme }) => theme.colors.background.primary};
`;

export const HeroContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(620px, 47%) minmax(0, 53%);

  width: 100%;
  min-height: 610px;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: minmax(760px, 48%) minmax(0, 52%);

    min-height: 650px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(540px, 46%) minmax(0, 54%);

    min-height: 570px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: minmax(460px, 46%) minmax(0, 54%);

    min-height: 540px;
  }
  /* @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: minmax(400px, 43%) minmax(0, 57%);

    min-height: 520px;
  } */

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;

    min-height: auto;
  }
`;

export const HeroCopyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 0;

  padding: 56px 44px 56px 64px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 64px 56px 64px 80px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 48px 36px 48px 48px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 44px 24px 44px 32px;
  }
  /* @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 40px 32px;
  } */

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: flex-start;

    padding: 48px 48px 32px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-content: flex-start;

    padding: 36px 20px 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 28px 16px 20px;
  }
`;

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  max-width: 720px;

  h1 {
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 720px;

    margin: 0;

    color: ${({ theme }) => theme.colors.brand.primary};

    font-size: clamp(4.2rem, 4.8vw, 5.5rem);
    line-height: 0.88;
    letter-spacing: -0.055em;
  }

  p {
    width: 100%;
    max-width: 440px;

    margin-top: 38px;

    color: ${({ theme }) => theme.colors.text.primary};

    font-size: ${({ theme }) => theme.fontSizes.text_16};
    line-height: 1.65;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    max-width: 720px;

    h1 {
      max-width: 720px;

      font-size: clamp(4.35rem, 4.6vw, 5rem);
      line-height: 0.9;
    }

    p {
      max-width: 470px;

      margin-top: 38px;

      font-size: ${({ theme }) => theme.fontSizes.text_18};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 590px;

    h1 {
      max-width: 590px;
      font-size: clamp(3.7rem, 4.5vw, 4.35rem);
      line-height: 0.9;
    }

    p {
      max-width: 400px;

      margin-top: 32px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    max-width: 430px;

    h1 {
      max-width: 430px;

      font-size: clamp(3.25rem, 5.4vw, 3.75rem);
      line-height: 0.9;
      letter-spacing: -0.055em;
    }

    p {
      max-width: 360px;

      margin-top: 30px;

      font-size: ${({ theme }) => theme.fontSizes.text_14};
      line-height: 1.65;
    }
  }
  /* @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    max-width: 380px;

    h1 {
      max-width: 380px;
      font-size: clamp(2.7rem, 4.2vw, 3.3rem);
      line-height: 0.94;
    }

    p {
      max-width: 340px;

      margin-top: 26px;

      font-size: ${({ theme }) => theme.fontSizes.text_14};
    }
  } */

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-items: flex-start;

    width: 100%;
    max-width: 620px;

    margin: 0;

    text-align: left;

    h1 {
      max-width: 620px;
      font-size: clamp(3.2rem, 8vw, 4.3rem);
      line-height: 0.92;
    }

    p {
      max-width: 500px;

      margin-top: 30px;

      font-size: ${({ theme }) => theme.fontSizes.text_16};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;

    h1 {
      max-width: 440px;
      font-size: clamp(2.8rem, 11vw, 3.5rem);
      line-height: 0.94;
    }

    p {
      max-width: 370px;

      margin-top: 26px;

      font-size: ${({ theme }) => theme.fontSizes.text_14};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    h1 {
      max-width: 340px;
      font-size: clamp(2.35rem, 10.5vw, 2.8rem);
      line-height: 0.96;
    }

    p {
      max-width: 320px;

      margin-top: 22px;
    }
  }
`;

export const HeroTitlePrimary = styled.span`
  display: block;

  font-weight: ${({ theme }) => theme.fontWeights.bold};
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    white-space: normal;
  }
`;
// export const HeroTitlePrimary = styled.span`
//   display: block;

//   font-weight: ${({ theme }) => theme.fontWeights.bold};

//   @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
//     white-space: nowrap;
//   }
// `;

export const HeroTitleSecondary = styled.span`
  display: block;

  font-weight: ${({ theme }) =>
    theme.fontWeights.regular || theme.fontWeights.normal || 400};

  letter-spacing: -0.06em;
`;

export const HeroActions = styled.div`
  display: flex;
  justify-content: flex-start;

  width: 100%;

  margin-top: 26px;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    margin-top: 30px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    margin-top: 22px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    margin-top: 18px;
  }
`;

export const HeroProductsContainer = styled.div`
  position: relative;

  width: 100%;
  min-width: 0;
  height: 100%;

  overflow: hidden;

  background: ${({ theme }) => theme.colors.background.primary};

  &::before {
    content: "";

    position: absolute;
    z-index: 2;

    top: 0;
    bottom: 0;
    left: 0;

    width: 96px;

    pointer-events: none;

    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.background.primary} 0%,
      rgba(255, 255, 255, 0.86) 30%,
      rgba(255, 255, 255, 0.34) 68%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    &::before {
      width: 112px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    &::before {
      width: 88px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    &::before {
      width: 120px;

      background: linear-gradient(
        90deg,
        ${({ theme }) => theme.colors.background.primary} 0%,
        rgba(255, 255, 255, 0.94) 28%,
        rgba(255, 255, 255, 0.58) 60%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 460px;

    &::before {
      display: none;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 340px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    height: 300px;
  }
`;

export const HeroProductsImage = styled.img`
  display: block;

  width: 112%;
  max-width: none;
  height: 100%;

  object-fit: cover;
  object-position: right center;

  transform: translateX(-6%);

  user-select: none;
  pointer-events: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    width: 108%;

    transform: translateX(-4%);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 116%;

    transform: translateX(-8%);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 124%;

    object-position: 62% center;

    transform: translateX(-10%);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: center;

    transform: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 118%;

    object-fit: cover;
    object-position: 58% center;

    transform: translateX(-9%);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    width: 122%;

    object-position: 57% center;

    transform: translateX(-11%);
  }
`;
