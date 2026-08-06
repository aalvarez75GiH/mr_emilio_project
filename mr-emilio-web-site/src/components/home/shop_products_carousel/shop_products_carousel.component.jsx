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
  ProductCard,
  ProductLink,
  ProductImageContainer,
  ProductImage,
  ProductFavoriteButton,
  ProductInformation,
  ProductTextContent,
  ProductBadge,
  ProductName,
  ProductDescription,
  ProductDetailsPanel,
  ProductWarehouseData,
  ProductDetailColumn,
  ProductDetailHeading,
  ProductDetailValue,
  ProductAvailabilityValue,
  ProductDetailDivider,
  ProductInventoryStatusBadge,
  ProductStockDot,
  ProductPurchaseRow,
  ProductPrice,
  AddToCartButton,
  CarouselArrow,
  CarouselDots,
  CarouselDot,
  ProductQuantityBadge,
  ProductBenefits,
  ProductBenefitItem,
  ProductBenefitIcon,
  ProductBenefitLabel,
  AddToCartLabel,
} from "./shop_products_carousel.styles";

import {
  ArrowIcon,
  CartIcon,
  BenefitIcon,
  HeartIcon,
} from "../../../assets/shop_products_carousel/product_card/icons";

import {
  getHomepageCarouselProducts,
  getStockLabel,
  getInventoryStatus,
} from "./shop_products_carousel.helpers";

import { ProductRating } from "./product_rating.component";
import { useProductFavorites } from "./use-product-favorites.hook";
import { useShopProductsCarousel } from "./use-shop-products-carousel.hook";

export const ShopProductsCarousel = ({
  title = "Best Sellers",
  viewAllLabel = "View all best sellers",
  viewAllHref = "/products",
  onAddToCart,
}) => {
  // const { homepageProducts, isProductsLoading, productsError } = useProducts();
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
    return null;
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
                const productStock = Number.isFinite(product.stock)
                  ? product.stock
                  : 0;

                const inventoryStatus = getInventoryStatus(productStock);

                const displayProduct = {
                  ...product,
                  stock: productStock,
                };

                const quantityHighlight =
                  displayProduct.quantityHighlight || displayProduct.sizeLabel;

                const displayedPrice =
                  displayProduct.sellingPriceLabel ||
                  displayProduct.manufacturerPriceLabel ||
                  "—";

                return (
                  <ProductCard key={displayProduct.id} data-product-card>
                    <ProductLink to={displayProduct.href}>
                      <ProductImageContainer>
                        {displayProduct.badgeLabel && (
                          <ProductBadge>
                            {displayProduct.badgeLabel}
                          </ProductBadge>
                        )}

                        <ProductFavoriteButton
                          type="button"
                          $favorite={isProductFavorite(displayProduct.id)}
                          disabled={isFavoriteRequestPending(displayProduct.id)}
                          aria-label={
                            isProductFavorite(displayProduct.id)
                              ? `Remove ${displayProduct.name} from favorites`
                              : `Add ${displayProduct.name} to favorites`
                          }
                          aria-pressed={isProductFavorite(displayProduct.id)}
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();

                            toggleProductFavorite(displayProduct);
                          }}
                        >
                          <HeartIcon
                            filled={isProductFavorite(displayProduct.id)}
                          />
                        </ProductFavoriteButton>
                        {/* <ProductFavoriteButton
                          type="button"
                          $favorite={favoriteProductIds.has(displayProduct.id)}
                          disabled={favoriteRequestIds.has(displayProduct.id)}
                          aria-label={
                            favoriteProductIds.has(displayProduct.id)
                              ? `Remove ${displayProduct.name} from favorites`
                              : `Add ${displayProduct.name} to favorites`
                          }
                          aria-pressed={favoriteProductIds.has(
                            displayProduct.id
                          )}
                          onClick={(event) =>
                            handleFavoriteToggle(event, displayProduct)
                          }
                        >
                          <HeartIcon
                            filled={favoriteProductIds.has(displayProduct.id)}
                          />
                        </ProductFavoriteButton> */}

                        <ProductImage
                          src={displayProduct.image}
                          alt={displayProduct.alt}
                          loading="lazy"
                          $imageScale={displayProduct.imageScale}
                          $imageOffsetX={displayProduct.imageOffsetX}
                          $imageOffsetY={displayProduct.imageOffsetY}
                        />

                        {quantityHighlight && (
                          <ProductQuantityBadge>
                            <strong>{quantityHighlight}</strong>
                          </ProductQuantityBadge>
                        )}
                      </ProductImageContainer>

                      <ProductInformation>
                        <ProductTextContent>
                          <ProductName>{displayProduct.name}</ProductName>

                          <ProductDescription>
                            {displayProduct.description}
                          </ProductDescription>

                          {displayProduct.benefits?.length > 0 && (
                            <ProductBenefits>
                              {displayProduct.benefits.map((benefit) => (
                                <ProductBenefitItem
                                  key={`${displayProduct.id}-${benefit.type}`}
                                >
                                  <ProductBenefitIcon $type={benefit.icon}>
                                    <BenefitIcon type={benefit.icon} />
                                  </ProductBenefitIcon>

                                  <ProductBenefitLabel>
                                    {benefit.label}
                                  </ProductBenefitLabel>
                                </ProductBenefitItem>
                              ))}
                            </ProductBenefits>
                          )}
                          <ProductWarehouseData
                            key={`details-${displayProduct.warehouseId}-${displayProduct.id}`}
                          >
                            <ProductDetailsPanel>
                              <ProductDetailColumn>
                                <ProductDetailHeading>
                                  Size
                                </ProductDetailHeading>

                                <ProductDetailValue>
                                  {displayProduct.sizeLabel || "—"}
                                </ProductDetailValue>
                              </ProductDetailColumn>

                              <ProductDetailDivider aria-hidden="true" />

                              <ProductDetailColumn>
                                <ProductDetailHeading>
                                  {displayProduct.stock <= 0
                                    ? "Availability"
                                    : "In stock"}
                                </ProductDetailHeading>

                                <ProductAvailabilityValue
                                  $status={inventoryStatus.key}
                                >
                                  <ProductStockDot
                                    $status={inventoryStatus.key}
                                  />

                                  {getStockLabel(displayProduct)}
                                </ProductAvailabilityValue>

                                <ProductInventoryStatusBadge
                                  $status={inventoryStatus.key}
                                >
                                  {inventoryStatus.label}
                                </ProductInventoryStatusBadge>
                              </ProductDetailColumn>
                            </ProductDetailsPanel>
                          </ProductWarehouseData>

                          <ProductRating review={displayProduct.review} />

                          <ProductWarehouseData
                            key={`purchase-${displayProduct.warehouseId}-${displayProduct.id}`}
                          >
                            <ProductPurchaseRow>
                              <ProductPrice>{displayedPrice}</ProductPrice>

                              <AddToCartButton
                                type="button"
                                aria-label={
                                  displayProduct.stock > 0
                                    ? `Add ${displayProduct.name} to cart`
                                    : `${displayProduct.name} is sold out`
                                }
                                disabled={displayProduct.stock <= 0}
                                onClick={(event) =>
                                  handleAddToCart(event, displayProduct)
                                }
                              >
                                <CartIcon />

                                <AddToCartLabel>
                                  {displayProduct.stock > 0
                                    ? "Add to cart"
                                    : "Sold out"}
                                </AddToCartLabel>
                              </AddToCartButton>
                            </ProductPurchaseRow>
                          </ProductWarehouseData>
                        </ProductTextContent>
                      </ProductInformation>
                    </ProductLink>
                  </ProductCard>
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
