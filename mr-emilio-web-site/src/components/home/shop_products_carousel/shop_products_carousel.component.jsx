import { useMemo } from "react";
import { useCustomerCatalog } from "../../../infrastructure/services/catalog/use-customer_catalog.hook";

import {
  ShopProductsSection,
  ShopProductsContainer,
  ShopProductsHeader,
  SectionTitle,
  ViewAllLink,
  ViewAllIcon,
  CarouselLayout,
  CarouselViewport,
  ProductsTrack,
  CarouselArrow,
  CarouselDots,
  CarouselDot,
} from "./shop_products_carousel.styles";

import { ArrowIcon } from "../../../assets/shop_products_carousel/product_card/icons";

import {
  getHomepageCarouselProducts,
  getDisplayProduct,
} from "./shop_products_carousel.helpers";

import { ShopProductCard } from "./product_card.component";
import { useProductFavorites } from "./use-product-favorites.hook";
import { useShopProductsCarousel } from "./use-shop-products-carousel.hook";
import { ShopProductsCarouselSkeleton } from "./shop_products_carousel_skeleton.component";

export const ShopProductsCarousel = ({
  title = "Best Sellers",
  viewAllLabel = "View all best sellers",
  viewAllHref = "/products",
  onAddToCart,
}) => {
  const {
    customerCatalogProducts,
    isCustomerCatalogLoading,
    customerCatalogError,
  } = useCustomerCatalog();

  const carouselProducts = useMemo(
    () => getHomepageCarouselProducts(customerCatalogProducts),
    [customerCatalogProducts]
  );

  const { viewportRef, activeIndex, pageCount, scrollCarousel, scrollToPage } =
    useShopProductsCarousel({
      productCount: carouselProducts.length,
    });

  const { isProductFavorite, isFavoriteRequestPending, toggleProductFavorite } =
    useProductFavorites();

  const handleAddToCart = (event, product) => {
    event.preventDefault();
    event.stopPropagation();

    if (product.stock <= 0) {
      return;
    }

    if (onAddToCart) {
      onAddToCart(product);
      return;
    }

    console.log("Add to cart:", product);
  };

  if (isCustomerCatalogLoading) {
    return (
      <ShopProductsCarouselSkeleton title={title} viewAllLabel={viewAllLabel} />
    );
  }

  if (customerCatalogError) {
    console.error("Unable to render customer catalog:", customerCatalogError);

    return null;
  }

  return (
    <ShopProductsSection>
      <ShopProductsContainer>
        <ShopProductsHeader>
          <SectionTitle>{title}</SectionTitle>

          <ViewAllLink to={viewAllHref}>
            {viewAllLabel}

            <ViewAllIcon aria-hidden="true">
              <ArrowIcon />
            </ViewAllIcon>
          </ViewAllLink>
        </ShopProductsHeader>

        <CarouselLayout>
          <CarouselArrow
            type="button"
            $position="left"
            onClick={() => scrollCarousel("previous")}
            aria-label="View previous products"
            disabled={activeIndex === 0}
          >
            <ArrowIcon direction="left" />
          </CarouselArrow>

          <CarouselViewport ref={viewportRef}>
            <ProductsTrack>
              {carouselProducts.map((product) => {
                const displayProduct = getDisplayProduct(product);

                return (
                  <ShopProductCard
                    key={displayProduct.id}
                    product={displayProduct}
                    isFavorite={isProductFavorite(displayProduct.id)}
                    isFavoritePending={isFavoriteRequestPending(
                      displayProduct.id
                    )}
                    onFavoriteToggle={toggleProductFavorite}
                    onAddToCart={handleAddToCart}
                  />
                );
              })}
            </ProductsTrack>
          </CarouselViewport>

          <CarouselArrow
            type="button"
            $position="right"
            onClick={() => scrollCarousel("next")}
            aria-label="View more products"
            disabled={activeIndex >= pageCount - 1}
          >
            <ArrowIcon direction="right" />
          </CarouselArrow>
        </CarouselLayout>

        {pageCount > 1 && (
          <CarouselDots aria-label={`${title} carousel navigation`}>
            {Array.from({ length: pageCount }, (_, index) => (
              <CarouselDot
                key={index}
                type="button"
                $active={index === activeIndex}
                aria-label={`Go to ${title} page ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => scrollToPage(index)}
              />
            ))}
          </CarouselDots>
        )}
      </ShopProductsContainer>
    </ShopProductsSection>
  );
};
