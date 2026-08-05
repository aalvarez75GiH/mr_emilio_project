import { MainHeader } from "../../components/main_header/main_header.component";
import { Hero } from "../../components/home/hero/hero.component";
import { BrandBenefits } from "../../components/home/brand_benefits/brand_benefits.component";
import { BrandStory } from "../../components/home/brand_story/brand_story.component";
import { WhyFamiliesChooseUs } from "../../components/home/why_families_choose_us/why_families_choose_us.component";
import { FeaturedRecipes } from "../../components/home/featured_recipes/featured_recipes.component";
import { CommunitySocial } from "../../components/home/community_social/community_social.component";
import { NewsletterBanner } from "../../components/home/newsletter_banner/newsletter_banner.component";
import { ShopProductsCarousel } from "../../components/home/shop_products_carousel/shop_products_carousel.component";
// import { ShoppingContext } from "../../components/location/shopping_context/shopping_context.component";
import { LocationSelector } from "../../components/location/location_selector/location_selector.component";

import { shopProductsCarouselData } from "../../components/home/shop_products_carousel/shop_products_carousel.data";

export const HomeScreen = () => {
  return (
    <>
      <MainHeader />
      <Hero />
      <BrandBenefits />
      <LocationSelector />
      {/* <ShoppingContext /> */}
      <ShopProductsCarousel
        title="Best Sellers"
        viewAllLabel="View all best sellers"
        viewAllHref="/products"
        products={shopProductsCarouselData}
      />
      <BrandStory />
      <WhyFamiliesChooseUs />
      <FeaturedRecipes />
      <CommunitySocial />
      <NewsletterBanner />
    </>
  );
};
