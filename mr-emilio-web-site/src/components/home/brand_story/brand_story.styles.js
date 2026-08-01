import styled from "styled-components";

export const StorySection = styled.section`
  width: 100%;

  /* padding: 28px 24px 64px; */
  padding: 28px 24px 28px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 32px 32px 32px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 28px 24px 28px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 26px 24px 26px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 24px 24px 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 20px 20px 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 18px 16px 18px;
  }
`;

export const StoryContainer = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  width: 100%;
  min-height: 410px;

  overflow: hidden;

  border-radius: 22px;

  background-image: ${({ $backgroundImage }) => `url(${$backgroundImage})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  &::before {
    content: "";

    position: absolute;
    inset: 0;
    z-index: 1;

    pointer-events: none;

    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.99) 0%,
      rgba(255, 255, 255, 0.96) 28%,
      rgba(255, 255, 255, 0.72) 44%,
      rgba(255, 255, 255, 0.18) 61%,
      rgba(255, 255, 255, 0) 72%
    );
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    min-height: 440px;

    border-radius: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    min-height: 400px;

    background-position: 56% center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    min-height: 380px;

    background-position: 60% center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: grid;
    grid-template-columns: 1fr;

    min-height: 0;

    background-image: none;
    background-color: ${({ theme }) => theme.colors.background.primary};

    &::before {
      display: none;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    border-radius: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    border-radius: 16px;
  }
`;

export const StoryContent = styled.div`
  position: relative;
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 48%;
  max-width: 620px;
  gap: 20px;

  padding: 52px 48px;

  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    width: 46%;
    max-width: 680px;

    padding: 60px 64px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 51%;
    max-width: 600px;

    padding: 48px 44px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    width: 53%;
    max-width: 500px;
    gap: 18px;

    padding: 42px 36px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    max-width: none;

    padding: 44px 40px 38px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 16px;

    padding: 30px 20px 28px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    gap: 14px;

    padding: 26px 16px 24px;
  }
`;

export const StoryTitle = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  max-width: 620px;
  gap: 2px;

  margin: 0;

  color: ${({ theme }) => theme.colors.text.primary};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.4rem, 3vw, 3.45rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.06;
  letter-spacing: -0.045em;

  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    max-width: 660px;

    font-size: 3.65rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 560px;

    font-size: 2.85rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    max-width: 450px;

    font-size: 2.35rem;
    line-height: 1.08;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 600px;

    font-size: 2.75rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;

    font-size: 1.72rem;
    line-height: 1.08;
    letter-spacing: -0.04em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 1.55rem;
    line-height: 1.1;
  }
`;

export const StoryTitleLine = styled.span`
  display: block;

  width: fit-content;
  max-width: 100%;

  white-space: nowrap;
`;

export const StoryDescription = styled.p`
  width: 100%;
  max-width: 450px;

  margin: 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_16};
  line-height: 1.7;

  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    max-width: 480px;

    font-size: ${({ theme }) => theme.fontSizes.text_18};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 420px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    max-width: 370px;

    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 500px;

    font-size: ${({ theme }) => theme.fontSizes.text_16};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 360px;

    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    max-width: 270px;

    font-size: ${({ theme }) => theme.fontSizes.text_14};
    line-height: 1.65;
  }
`;

export const StoryActions = styled.div`
  display: flex;
  justify-content: flex-start;

  width: 100%;

  margin-top: 4px;
`;

export const StoryImage = styled.img`
  display: none;

  width: 100%;
  max-width: none;

  user-select: none;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;

    height: 390px;

    object-fit: cover;
    object-position: 68% center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 300px;

    object-position: 69% center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    height: 250px;

    object-fit: cover;
    object-position: 66% center;
  }
`;
