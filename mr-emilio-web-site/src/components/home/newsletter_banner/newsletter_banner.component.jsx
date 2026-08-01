import { FiMail } from "react-icons/fi";

import {
  NewsletterSection,
  NewsletterContainer,
  NewsletterMessage,
  NewsletterIcon,
  NewsletterCopy,
  NewsletterTitle,
  NewsletterDescription,
  NewsletterForm,
  NewsletterInput,
  NewsletterButton,
} from "./newsletter_banner.styles";

export const NewsletterBanner = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");

    if (!email) {
      return;
    }

    console.log("Newsletter email:", email);

    event.currentTarget.reset();
  };

  return (
    <NewsletterSection>
      <NewsletterContainer>
        <NewsletterMessage>
          <NewsletterIcon aria-hidden="true">
            <FiMail />
          </NewsletterIcon>

          <NewsletterCopy>
            <NewsletterTitle>
              Get recipes, offers &amp; new products
            </NewsletterTitle>

            <NewsletterDescription>
              Join our family and bring more Venezuelan flavors to your home.
            </NewsletterDescription>
          </NewsletterCopy>
        </NewsletterMessage>

        <NewsletterForm onSubmit={handleSubmit}>
          <NewsletterInput
            type="email"
            name="email"
            placeholder="Enter your email"
            aria-label="Email address"
            autoComplete="email"
            required
          />

          <NewsletterButton type="submit">Subscribe</NewsletterButton>
        </NewsletterForm>
      </NewsletterContainer>
    </NewsletterSection>
  );
};
