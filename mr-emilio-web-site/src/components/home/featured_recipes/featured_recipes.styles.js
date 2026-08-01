import styled from "styled-components";

export const RecipesSection = styled.section`
  width: 100%;

  padding: 12px 24px 72px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 16px 32px 80px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 12px 24px 64px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 12px 24px 58px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 12px 24px 52px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 10px 20px 46px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 10px 16px 42px;
  }
`;

export const RecipesContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(210px, 0.9fr) minmax(0, 3.1fr);
  gap: 20px;

  width: 100%;

  padding: 18px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 20px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: minmax(240px, 0.9fr) minmax(0, 3.1fr);
    gap: 24px;

    padding: 22px;

    border-radius: 22px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(200px, 0.85fr) minmax(0, 3.15fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
    gap: 24px;

    padding: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 20px;

    padding: 18px;

    border-radius: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 16px;

    border-radius: 16px;
  }
`;

export const RecipesIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  min-width: 0;

  padding: 16px 20px;

  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 20px 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    max-width: 560px;

    padding: 8px 4px 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 6px 2px 0;
  }
`;

export const RecipesTitle = styled.h2`
  width: 100%;

  margin: 0 0 12px;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.6rem, 1.8vw, 2.1rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.1;
  letter-spacing: -0.035em;

  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: 2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.75rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 1.6rem;
  }
`;

export const RecipesDescription = styled.p`
  width: 100%;
  max-width: 260px;

  margin: 0;

  color: ${({ theme }) => theme.colors.text.primary};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_14};
  line-height: 1.6;

  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    max-width: 420px;
  }
`;

export const RecipesActions = styled.div`
  display: flex;
  justify-content: flex-start;

  width: 100%;

  margin-top: 22px;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;

    min-height: 44px;

    padding: 0 20px;

    border-radius: 999px;

    background: ${({ theme }) => theme.colors.brand.primary};
    color: ${({ theme }) => theme.colors.text.inverse};

    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.text_12};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 1;
    text-transform: uppercase;

    transition: background 180ms ease, transform 180ms ease;

    svg {
      font-size: 16px;

      transition: transform 180ms ease;
    }

    &:hover {
      background: ${({ theme }) => theme.colors.brand.primaryDark};
      transform: translateY(-2px);
    }

    &:hover svg {
      transform: translateX(3px);
    }

    &:focus-visible {
      outline: 3px solid ${({ theme }) => theme.colors.brand.primaryLight};
      outline-offset: 3px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 18px;
  }
`;

export const RecipesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;

  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    gap: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    gap: 14px;

    width: calc(100% + 18px);

    margin-right: -18px;
    padding-right: 18px;
    padding-bottom: 8px;

    overflow-x: auto;

    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    overscroll-behavior-inline: contain;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const RecipeCard = styled.a`
  display: flex;
  flex-direction: column;

  min-width: 0;
  overflow: hidden;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 16px;

  background: ${({ theme }) => theme.colors.background.primary};

  transition: transform 180ms ease, border-color 180ms ease,
    box-shadow 180ms ease;

  &:hover {
    transform: translateY(-3px);

    border-color: ${({ theme }) => theme.colors.border.brand};

    box-shadow: 0 12px 30px rgba(8, 39, 95, 0.08);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.brand.primaryLight};
    outline-offset: 3px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex: 0 0 78%;

    scroll-snap-align: start;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    flex-basis: 84%;
  }
`;

export const RecipeImageWrapper = styled.div`
  width: 100%;
  height: 170px;

  overflow: hidden;

  background: ${({ theme }) => theme.colors.background.secondary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    height: 190px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: 160px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    height: 230px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 200px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 210px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    height: 190px;
  }
`;

export const RecipeImage = styled.img`
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;

  transition: transform 260ms ease;

  ${RecipeCard}:hover & {
    transform: scale(1.025);
  }
`;

export const RecipeFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;

  min-height: 64px;

  padding: 12px 14px 12px 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 66px;

    padding: 12px 14px;
  }
`;

export const RecipeName = styled.span`
  flex: 1;

  max-width: 180px;

  color: ${({ theme }) => theme.colors.text.primary};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.text_12};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.25;

  text-align: left;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    max-width: 200px;

    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    max-width: 240px;

    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }
`;

export const RecipeArrow = styled.span`
  flex: 0 0 auto;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;

  border-radius: 50%;

  background: ${({ theme }) => theme.colors.brand.primary};
  color: ${({ theme }) => theme.colors.text.inverse};

  svg {
    width: 17px;
    height: 17px;

    transition: transform 180ms ease;
  }

  ${RecipeCard}:hover & svg {
    transform: translateX(3px);
  }
`;
