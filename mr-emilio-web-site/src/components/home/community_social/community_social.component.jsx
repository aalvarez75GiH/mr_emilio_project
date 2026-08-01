import { FiInstagram, FiStar } from "react-icons/fi";

import {
  CommunitySocialSection,
  CommunitySocialGrid,
  ReviewsPanel,
  ReviewsHeader,
  ReviewsTitle,
  ReviewsRating,
  RatingStars,
  RatingText,
  TestimonialsGrid,
  Testimonial,
  QuoteMark,
  TestimonialText,
  TestimonialAuthor,
  TestimonialStars,
  ReviewsAction,
  SocialPanel,
  SocialHeader,
  SocialHeading,
  SocialTitle,
  SocialHandle,
  InstagramIcon,
  SocialGallery,
  SocialImageLink,
  SocialImage,
  SocialAction,
} from "./community_social.styles";
import { testimonials, socialImages } from "./community_social.data";

const Stars = ({ decorative = true }) => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <FiStar key={index} aria-hidden={decorative} />
      ))}
    </>
  );
};

export const CommunitySocial = () => {
  return (
    <CommunitySocialSection>
      <CommunitySocialGrid>
        <ReviewsPanel>
          <ReviewsHeader>
            <ReviewsTitle>Loved by our community</ReviewsTitle>

            <ReviewsRating>
              <RatingStars aria-label="Five out of five stars">
                <Stars decorative={false} />
              </RatingStars>

              <RatingText>4.9/5 average rating</RatingText>
            </ReviewsRating>
          </ReviewsHeader>

          <TestimonialsGrid>
            {testimonials.map((testimonial) => (
              <Testimonial key={testimonial.id}>
                <QuoteMark aria-hidden="true">“</QuoteMark>

                <TestimonialText>{testimonial.quote}</TestimonialText>

                <TestimonialAuthor>— {testimonial.author}</TestimonialAuthor>

                <TestimonialStars aria-hidden="true">
                  <Stars />
                </TestimonialStars>
              </Testimonial>
            ))}
          </TestimonialsGrid>

          <ReviewsAction
            href="/reviews"
            aria-label="Read more customer reviews"
          >
            Read more reviews
          </ReviewsAction>
        </ReviewsPanel>

        <SocialPanel>
          <SocialHeader>
            <SocialHeading>
              <SocialTitle>Follow our journey</SocialTitle>
              <SocialHandle>@mr.emilio.us</SocialHandle>
            </SocialHeading>

            <InstagramIcon
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Mr. Emilio on Instagram"
            >
              <FiInstagram />
            </InstagramIcon>
          </SocialHeader>

          <SocialGallery>
            {socialImages.map((item) => (
              <SocialImageLink
                key={item.id}
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="View this post on Instagram"
              >
                <SocialImage src={item.image} alt={item.alt} loading="lazy" />
              </SocialImageLink>
            ))}
          </SocialGallery>

          <SocialAction
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            View more on Instagram
          </SocialAction>
        </SocialPanel>
      </CommunitySocialGrid>
    </CommunitySocialSection>
  );
};
