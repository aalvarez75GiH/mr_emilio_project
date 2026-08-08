import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useCustomerCatalog } from "../../../infrastructure/services/catalog/use-customer_catalog.hook";
import { useCart } from "../../../infrastructure/services/cart/use-cart.hook";

import { CART_ACTION_RESULTS } from "../../../infrastructure/services/cart/cart.helpers";

import {
  ShopProductsSection,
  ShopProductsContainer,
  ShopProductsHeader,
  SectionTitle,
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

import { Snackbar } from "../../layout/snackbar/snackbar.component";

import { ShopProductCard } from "./product_card.component";
import { useProductFavorites } from "./use-product-favorites.hook";
import { useShopProductsCarousel } from "./use-shop-products-carousel.hook";
import { ShopProductsCarouselSkeleton } from "./shop_products_carousel_skeleton.component";

const SNACKBAR_DURATION_MS = 2800;

export const ShopProductsCarousel = ({
  title = "Buy our products",
  onAddToCart,
}) => {
  const {
    customerCatalogProducts,
    isCustomerCatalogLoading,
    customerCatalogError,
  } = useCustomerCatalog();

  const { addProductToCart, clearCart } = useCart();

  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  const snackbarTimeoutRef = useRef(null);

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

  const closeSnackbar = useCallback(() => {
    if (snackbarTimeoutRef.current) {
      window.clearTimeout(snackbarTimeoutRef.current);
      snackbarTimeoutRef.current = null;
    }

    setSnackbar((currentSnackbar) => ({
      ...currentSnackbar,
      isOpen: false,
    }));
  }, []);

  const showSnackbar = useCallback(
    ({ type, title: snackbarTitle, message }) => {
      if (snackbarTimeoutRef.current) {
        window.clearTimeout(snackbarTimeoutRef.current);
      }

      setSnackbar({
        isOpen: true,
        type,
        title: snackbarTitle,
        message,
      });

      snackbarTimeoutRef.current = window.setTimeout(() => {
        setSnackbar((currentSnackbar) => ({
          ...currentSnackbar,
          isOpen: false,
        }));

        snackbarTimeoutRef.current = null;
      }, SNACKBAR_DURATION_MS);
    },
    []
  );

  useEffect(() => {
    return () => {
      if (snackbarTimeoutRef.current) {
        window.clearTimeout(snackbarTimeoutRef.current);
      }
    };
  }, []);

  const handleAddToCart = (event, product) => {
    event.preventDefault();
    event.stopPropagation();

    if (product.stock <= 0) {
      return;
    }

    const result = addProductToCart(product);

    if (result?.ok) {
      showSnackbar({
        type: "success",
        title: "Added to cart",
        message: `${product.name} was added to your cart.`,
      });
    } else if (result?.type === CART_ACTION_RESULTS.STOCK_LIMIT) {
      showSnackbar({
        type: "warning",
        title: "Maximum quantity reached",
        message: `Only ${result.availableStock} ${
          result.availableStock === 1 ? "unit is" : "units are"
        } available for ${product.name}.`,
      });
    } else if (result?.type === CART_ACTION_RESULTS.SOLD_OUT) {
      showSnackbar({
        type: "warning",
        title: "Sold out",
        message: `${product.name} is currently unavailable.`,
      });
    }

    if (onAddToCart) {
      onAddToCart(product, result);
    }
  };

  if (isCustomerCatalogLoading) {
    return <ShopProductsCarouselSkeleton />;
  }

  if (customerCatalogError) {
    console.error("Unable to render customer catalog:", customerCatalogError);

    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={clearCart}
        style={{
          position: "fixed",
          bottom: "100px",
          left: "20px",
          zIndex: 9999,
          padding: "10px 14px",
        }}
      >
        Clear cart
      </button>
      <ShopProductsSection>
        <ShopProductsContainer>
          <ShopProductsHeader>
            <SectionTitle>{title}</SectionTitle>
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

      <Snackbar
        isOpen={snackbar.isOpen}
        type={snackbar.type}
        title={snackbar.title}
        message={snackbar.message}
        onClose={closeSnackbar}
      />
    </>
  );
};
