import { useCallback, useEffect, useRef, useState } from "react";

import { shopProductsCarouselData } from "./shop_products_carousel.data";

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
  ProductDetailColumn,
  ProductDetailHeading,
  ProductDetailValue,
  ProductAvailabilityValue,
  ProductDetailDivider,
  ProductInventoryStatusBadge,
  ProductStockDot,
  ProductRatingContainer,
  ProductStars,
  ProductStar,
  ProductReviewCount,
  ProductNotReviewed,
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

const ArrowIcon = ({ direction = "right" }) => {
  const isLeft = direction === "left";

  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={isLeft ? "M15 18L9 12L15 6" : "M9 18L15 12L9 6"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const CartIcon = () => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 4.5H5.5L7.2 15.2C7.3 15.9 7.9 16.4 8.6 16.4H17.6C18.3 16.4 18.9 15.9 19 15.2L20.2 8H6.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="9.2"
        cy="19.2"
        r="1.2"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="17.3"
        cy="19.2"
        r="1.2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
};
const BenefitIcon = ({ type }) => {
  if (type === "snowflake") {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 2V22M4.2 6.5L19.8 17.5M4.2 17.5L19.8 6.5M8.5 4L12 7.5L15.5 4M8.5 20L12 16.5L15.5 20M3.5 10L8 12L3.5 14M20.5 10L16 12L20.5 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="8.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />

        <path
          d="M12 7.5V12L15.2 14"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "heart") {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="venezuela-heart-gradient"
            x1="12"
            y1="3"
            x2="12"
            y2="21"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#F4D000" />
            <stop offset="33.33%" stopColor="#F4D000" />

            <stop offset="33.34%" stopColor="#1646AC" />
            <stop offset="66.66%" stopColor="#1646AC" />

            <stop offset="66.67%" stopColor="#CF142B" />
            <stop offset="100%" stopColor="#CF142B" />
          </linearGradient>
        </defs>

        <path
          d="M20.8 4.8C18.7 2.7 15.3 2.7 13.2 4.8L12 6L10.8 4.8C8.7 2.7 5.3 2.7 3.2 4.8C1.1 6.9 1.1 10.3 3.2 12.4L12 21L20.8 12.4C22.9 10.3 22.9 6.9 20.8 4.8Z"
          fill="url(#venezuela-heart-gradient)"
        />
      </svg>
    );
  }

  if (type === "scale") {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 4V19M7 20H17M5 7H19M7 7L4 13H10L7 7ZM17 7L14 13H20L17 7Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 7.5L12 4L19 7.5V16.5L12 20L5 16.5V7.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M5 7.5L12 11L19 7.5M12 11V20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const HeartIcon = ({ filled = false }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      aria-hidden="true"
    >
      <path
        d="M20.8 4.8C18.7 2.7 15.3 2.7 13.2 4.8L12 6L10.8 4.8C8.7 2.7 5.3 2.7 3.2 4.8C1.1 6.9 1.1 10.3 3.2 12.4L12 21L20.8 12.4C22.9 10.3 22.9 6.9 20.8 4.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const StarIcon = ({ filled }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.75L14.86 8.55L21.26 9.48L16.63 13.99L17.72 20.37L12 17.36L6.28 20.37L7.37 13.99L2.74 9.48L9.14 8.55L12 2.75Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ProductRating = ({ review }) => {
  if (!review || review.count <= 0) {
    return (
      <ProductRatingContainer>
        <ProductNotReviewed>Not reviewed yet</ProductNotReviewed>
      </ProductRatingContainer>
    );
  }

  const normalizedAverage = Math.max(0, Math.min(5, review.average));
  const filledStars = Math.round(normalizedAverage);

  return (
    <ProductRatingContainer
      aria-label={`${normalizedAverage} out of 5 stars from ${review.count} reviews`}
    >
      <ProductStars aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <ProductStar key={index} $filled={index < filledStars}>
            <StarIcon filled={index < filledStars} />
          </ProductStar>
        ))}
      </ProductStars>

      <ProductReviewCount>({review.count})</ProductReviewCount>
    </ProductRatingContainer>
  );
};
const getStockLabel = (product) => {
  if (product.stock <= 0) {
    return "Sold out";
  }

  if (product.stockUnit === "count" || product.stockUnit === "ct") {
    return `${product.stock} count`;
  }

  if (product.stock === 1) {
    return "1 unit";
  }

  return `${product.stock} units`;
};

const getInventoryStatus = (stock) => {
  if (stock <= 0) {
    return {
      key: "soldOut",
      label: "Out of stock",
    };
  }

  if (stock <= 10) {
    return {
      key: "runningLow",
      label: "Running low",
    };
  }

  return {
    key: "plenty",
    label: "Plenty in stock",
  };
};

export const ShopProductsCarousel = ({
  title = "Best Sellers",
  viewAllLabel = "View all best sellers",
  viewAllHref = "/products",
  products = shopProductsCarouselData,
  onAddToCart,
}) => {
  const viewportRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [favoriteProductIds, setFavoriteProductIds] = useState(() => {
    return new Set(
      products
        .filter((product) => product.isFavorite)
        .map((product) => product.id)
    );
  });

  const [favoriteRequestIds, setFavoriteRequestIds] = useState(() => new Set());

  const getScrollStep = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return 0;
    }

    const firstCard = viewport.querySelector("[data-product-card]");

    if (!firstCard) {
      return viewport.clientWidth;
    }

    const track = firstCard.parentElement;
    const trackStyles = window.getComputedStyle(track);

    const gap =
      Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;

    return firstCard.getBoundingClientRect().width + gap;
  }, []);

  const updateCarouselState = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const maximumScroll = viewport.scrollWidth - viewport.clientWidth;
    const scrollStep = getScrollStep();

    if (maximumScroll <= 1 || scrollStep <= 0) {
      setActiveIndex(0);
      setPageCount(1);
      return;
    }

    const calculatedPageCount = Math.max(
      1,
      Math.ceil(maximumScroll / scrollStep) + 1
    );

    const calculatedIndex = Math.min(
      calculatedPageCount - 1,
      Math.round(viewport.scrollLeft / scrollStep)
    );

    setPageCount(calculatedPageCount);
    setActiveIndex(calculatedIndex);
  }, [getScrollStep]);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return undefined;
    }

    let animationFrameId = null;

    const handleScroll = () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = window.requestAnimationFrame(updateCarouselState);
    };

    const handleResize = () => {
      updateCarouselState();
    };

    updateCarouselState();

    viewport.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleResize);

    return () => {
      viewport.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [updateCarouselState, products.length]);

  const scrollCarousel = (direction) => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const scrollStep = getScrollStep();

    viewport.scrollBy({
      left: direction === "next" ? scrollStep : -scrollStep,
      behavior: "smooth",
    });
  };

  const scrollToPage = (index) => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    viewport.scrollTo({
      left: getScrollStep() * index,
      behavior: "smooth",
    });
  };
  const updateProductFavoriteRequest = async ({ productId, isFavorite }) => {
    // The backend connection will be added here later.
    //
    // Example:
    //
    // const response = await fetch(
    //   `/api/products/${productId}/favorite`,
    //   {
    //     method: isFavorite ? "POST" : "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    //
    // if (!response.ok) {
    //   throw new Error("Unable to update product favorite status.");
    // }
    //
    // return response.json();

    console.log("Favorite request prepared:", {
      productId,
      isFavorite,
    });

    return {
      productId,
      isFavorite,
    };
  };

  const handleFavoriteToggle = async (event, product) => {
    event.preventDefault();
    event.stopPropagation();

    if (favoriteRequestIds.has(product.id)) {
      return;
    }

    const wasFavorite = favoriteProductIds.has(product.id);
    const nextFavoriteState = !wasFavorite;

    // Optimistically update the interface.
    setFavoriteProductIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (nextFavoriteState) {
        nextIds.add(product.id);
      } else {
        nextIds.delete(product.id);
      }

      return nextIds;
    });

    setFavoriteRequestIds((currentIds) => {
      const nextIds = new Set(currentIds);
      nextIds.add(product.id);

      return nextIds;
    });

    try {
      await updateProductFavoriteRequest({
        productId: product.id,
        isFavorite: nextFavoriteState,
      });
    } catch (error) {
      console.error("Unable to update favorite product:", error);

      // Roll back the optimistic update if the future request fails.
      setFavoriteProductIds((currentIds) => {
        const nextIds = new Set(currentIds);

        if (wasFavorite) {
          nextIds.add(product.id);
        } else {
          nextIds.delete(product.id);
        }

        return nextIds;
      });
    } finally {
      setFavoriteRequestIds((currentIds) => {
        const nextIds = new Set(currentIds);
        nextIds.delete(product.id);

        return nextIds;
      });
    }
  };

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

  if (!products.length) {
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
              {products.map((product) => {
                const inventoryStatus = getInventoryStatus(product.stock);

                return (
                  <ProductCard key={product.id} data-product-card>
                    {/* {products.map((product) => ( */}
                    {/* <ProductCard key={product.id} data-product-card> */}
                    <ProductLink to={product.href}>
                      <ProductImageContainer>
                        {product.badge && (
                          <ProductBadge>{product.badge}</ProductBadge>
                        )}

                        <ProductFavoriteButton
                          type="button"
                          $favorite={favoriteProductIds.has(product.id)}
                          disabled={favoriteRequestIds.has(product.id)}
                          aria-label={
                            favoriteProductIds.has(product.id)
                              ? `Remove ${product.name} from favorites`
                              : `Add ${product.name} to favorites`
                          }
                          aria-pressed={favoriteProductIds.has(product.id)}
                          onClick={(event) =>
                            handleFavoriteToggle(event, product)
                          }
                        >
                          <HeartIcon
                            filled={favoriteProductIds.has(product.id)}
                          />
                        </ProductFavoriteButton>
                        <ProductImage
                          src={product.image}
                          alt={product.alt}
                          loading="lazy"
                          $imageScale={product.imageScale}
                          $imageOffsetX={product.imageOffsetX}
                          $imageOffsetY={product.imageOffsetY}
                        />
                        {product.quantityHighlight && (
                          <ProductQuantityBadge>
                            <strong>{product.quantityHighlight}</strong>
                          </ProductQuantityBadge>
                        )}
                      </ProductImageContainer>
                      <ProductInformation>
                        <ProductTextContent>
                          <ProductName>{product.product_name.es}</ProductName>

                          <ProductDescription>
                            {product.description}
                          </ProductDescription>

                          {product.benefits?.length > 0 && (
                            <ProductBenefits>
                              {product.benefits.map((benefit) => (
                                <ProductBenefitItem key={benefit.id}>
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

                          <ProductDetailsPanel>
                            <ProductDetailColumn>
                              <ProductDetailHeading>Size</ProductDetailHeading>

                              <ProductDetailValue>
                                {product.size || "—"}
                              </ProductDetailValue>
                            </ProductDetailColumn>

                            <ProductDetailDivider aria-hidden="true" />

                            <ProductDetailColumn>
                              <ProductDetailHeading>
                                {product.stock <= 0
                                  ? "Availability"
                                  : "In stock"}
                              </ProductDetailHeading>

                              <ProductAvailabilityValue
                                $status={inventoryStatus.key}
                              >
                                <ProductStockDot
                                  $status={inventoryStatus.key}
                                />

                                {getStockLabel(product)}
                              </ProductAvailabilityValue>

                              <ProductInventoryStatusBadge
                                $status={inventoryStatus.key}
                              >
                                {inventoryStatus.label}
                              </ProductInventoryStatusBadge>
                            </ProductDetailColumn>
                          </ProductDetailsPanel>

                          <ProductRating review={product.review} />

                          <ProductPurchaseRow>
                            <ProductPrice>{product.priceLabel}</ProductPrice>

                            <AddToCartButton
                              type="button"
                              aria-label={
                                product.stock > 0
                                  ? `Add ${product.name} to cart`
                                  : `${product.name} is sold out`
                              }
                              disabled={product.stock <= 0}
                              onClick={(event) =>
                                handleAddToCart(event, product)
                              }
                            >
                              <CartIcon />

                              <AddToCartLabel>
                                {product.stock > 0 ? "Add to cart" : "Sold out"}
                              </AddToCartLabel>
                            </AddToCartButton>
                          </ProductPurchaseRow>
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
