// import heroProducts from "../../../assets/hero/hero_bg_1.png";
import heroProducts from "../../../assets/hero/hero_products_image_1.png";

import { Button } from "../../layout/button/button.component";
import { Text } from "../../../infrastructure/typography/text.component";

import {
  HeroSection,
  HeroContainer,
  HeroCopyContainer,
  HeroContent,
  HeroTitlePrimary,
  HeroTitleSecondary,
  HeroActions,
  HeroProductsContainer,
  HeroProductsImage,
} from "./hero.styles";

export const Hero = () => {
  const handleShopNowClick = (event) => {
    event.preventDefault();

    const locationSelector = document.getElementById("location-selector");

    if (!locationSelector) {
      return;
    }

    locationSelector.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <HeroSection spacing="none">
      <HeroContainer>
        <HeroCopyContainer>
          <HeroContent>
            <Text as="h1" variant="heroTitle">
              <HeroTitlePrimary>Bring Venezuelan</HeroTitlePrimary>

              <HeroTitleSecondary>flavors home.</HeroTitleSecondary>
            </Text>

            <Text as="p" variant="body">
              Authentic products made with tradition, quality ingredients and
              lots of care.
            </Text>

            <HeroActions>
              <Button
                variant="primary"
                size="large"
                href="#location-selector"
                onClick={handleShopNowClick}
              >
                Shop Now
              </Button>
            </HeroActions>
          </HeroContent>
        </HeroCopyContainer>

        <HeroProductsContainer>
          <HeroProductsImage
            src={heroProducts}
            alt="Mr. Emilio Venezuelan products"
          />
        </HeroProductsContainer>
      </HeroContainer>
    </HeroSection>
  );
};
