import styled from "styled-components";

const panelBackground = ({ theme }) =>
  `linear-gradient(
    135deg,
    ${theme.colors.background.primary} 0%,
    ${theme.colors.background.softBlue} 100%
  )`;

export const CommunitySocialSection = styled.section`
  width: 100%;

  padding: 12px 24px 24px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 16px 32px 28px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 12px 24px 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 12px 24px 22px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 12px 24px 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 10px 20px 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 10px 16px 16px;
  }
`;
export const CommunitySocialGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 18px;

  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    gap: 22px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 16px;
  }
`;

export const ReviewsPanel = styled.article`
  display: flex;
  flex-direction: column;

  min-width: 0;
  min-height: 100%;

  padding: 28px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 20px;

  background: ${panelBackground};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 32px;

    border-radius: 22px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 26px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 22px 20px;

    border-radius: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 20px 16px;

    border-radius: 16px;
  }
`;

export const ReviewsHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-bottom: 28px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 22px;
  }
`;

export const ReviewsTitle = styled.h2`
  width: 100%;

  margin: 0 0 10px;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.55rem, 1.8vw, 2rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.1;
  letter-spacing: -0.035em;

  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.65rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 1.5rem;
  }
`;

export const ReviewsRating = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }
`;

export const RatingStars = styled.span`
  display: inline-flex;
  gap: 3px;

  color: #f5b800;

  svg {
    width: 17px;
    height: 17px;

    fill: currentColor;
    stroke: currentColor;
  }
`;

export const RatingText = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_12};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

export const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;

  width: 100%;

  margin-bottom: 28px;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    margin-bottom: 32px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    gap: 14px;

    width: calc(100% + 20px);

    margin-right: -20px;
    margin-bottom: 22px;
    padding-right: 20px;
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

export const Testimonial = styled.blockquote`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  min-width: 0;
  min-height: 0;

  margin: 0;
  padding: 0 22px;

  border-right: 1px solid ${({ theme }) => theme.colors.border.medium};

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;

    border-right: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 0 26px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex: 0 0 82%;

    min-height: 210px;

    padding: 18px;

    border: 1px solid ${({ theme }) => theme.colors.border.light};
    border-radius: 14px;

    background: ${({ theme }) => theme.colors.background.primary};

    scroll-snap-align: start;

    &:first-child,
    &:last-child {
      padding: 18px;

      border: 1px solid ${({ theme }) => theme.colors.border.light};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    flex-basis: 88%;
  }
`;

export const QuoteMark = styled.span`
  display: block;

  height: 30px;

  margin-bottom: 8px;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: Georgia, serif;
  font-size: 2.3rem;
  line-height: 1;
`;

export const TestimonialText = styled.p`
  width: 100%;

  margin: 0 0 24px;

  color: ${({ theme }) => theme.colors.text.primary};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_14};
  line-height: 1.6;

  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_13};
    line-height: 1.65;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
    line-height: 1.7;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.text_15};
    line-height: 1.7;
  }
`;

export const TestimonialAuthor = styled.footer`
  margin-top: 18px;
  margin-bottom: 10px;

  color: ${({ theme }) => theme.colors.text.primary};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_13};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    font-size: ${({ theme }) => theme.fontSizes.text_14};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: auto;
  }
`;

export const TestimonialStars = styled.span`
  display: inline-flex;
  gap: 3px;

  color: #f5b800;

  svg {
    width: 14px;
    height: 14px;

    fill: currentColor;
    stroke: currentColor;
  }
`;

export const ReviewsAction = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
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

  &:hover {
    background: ${({ theme }) => theme.colors.brand.primaryDark};

    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.brand.primaryLight};
    outline-offset: 3px;
  }
`;

export const SocialPanel = styled.article`
  display: flex;
  flex-direction: column;

  min-width: 0;

  padding: 28px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 20px;

  background: ${panelBackground};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 32px;

    border-radius: 22px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 26px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 22px 20px;

    border-radius: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 20px 16px;

    border-radius: 16px;
  }
`;

export const SocialHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;

  margin-bottom: 18px;
`;

export const SocialHeading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  min-width: 0;
`;

export const SocialTitle = styled.h2`
  margin: 0 0 5px;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.55rem, 1.8vw, 2rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.1;
  letter-spacing: -0.035em;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.65rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    font-size: 1.5rem;
  }
`;

export const SocialHandle = styled.p`
  margin: 4px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.text_12};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.4;

  text-align: left;
`;

export const InstagramIcon = styled.a`
  flex: 0 0 auto;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  height: 38px;

  border-radius: 50%;

  color: ${({ theme }) => theme.colors.brand.primary};

  font-size: 25px;

  transition: color 180ms ease, background 180ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.brand.primaryDark};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 2px;
  }
`;

export const SocialGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 10px;

  width: 100%;

  padding: 0;

  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    gap: 10px;

    width: calc(100% + 20px);

    margin-right: -20px;
    padding-right: 20px;
    padding-bottom: 8px;

    overflow-x: auto;

    scroll-snap-type: x mandatory;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const SocialImageLink = styled.a`
  display: block;

  overflow: hidden;

  border-radius: 10px;

  aspect-ratio: 1.18;

  background: ${({ theme }) => theme.colors.background.secondary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    border-radius: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border-radius: 10px;

    flex: 0 0 72%;

    scroll-snap-align: start;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    border-radius: 8px;

    flex-basis: 80%;
  }
`;

export const SocialImage = styled.img`
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;

  transition: transform 260ms ease;

  ${SocialImageLink}:hover & {
    transform: scale(1.035);
  }
`;

export const SocialAction = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  align-self: center;

  /* min-width: 220px; */
  min-width: 180px;
  padding: 0 18px;
  min-height: 42px;

  margin-top: 12px;
  padding: 0 22px;

  border-radius: 999px;

  background: ${({ theme }) => theme.colors.brand.primary};
  color: ${({ theme }) => theme.colors.text.inverse};

  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.text_12};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1;
  text-transform: uppercase;

  transition: background 180ms ease, transform 180ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.brand.primaryDark};

    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.brand.primaryLight};
    outline-offset: 3px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-self: stretch;

    width: 100%;
    min-width: 0;
  }
`;
