import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { ProductsContext } from "./products.context";

import {
  getProductByIdRequest,
  getProductsCatalogRequest,
} from "./products.requests";

import {
  getCatalogProducts,
  getHomepageProducts,
  normalizeProduct,
  normalizeProducts,
} from "./products.helpers";

export const ProductsProvider = ({ children }) => {
  const { t, i18n } = useTranslation();

  const [rawProducts, setRawProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);

  const currentLanguage = i18n.resolvedLanguage || i18n.language || "en";

  const normalizationOptions = useMemo(
    () => ({
      language: currentLanguage,
      locale: currentLanguage.startsWith("es") ? "es-US" : "en-US",
      currency: "USD",
      t,
    }),
    [currentLanguage, t]
  );

  const products = useMemo(
    () => normalizeProducts(rawProducts, normalizationOptions),
    [rawProducts, normalizationOptions]
  );

  const loadProducts = useCallback(async () => {
    const productsResponse = await getProductsCatalogRequest({
      active: true,
    });

    return Array.isArray(productsResponse) ? productsResponse : [];
  }, []);

  const refreshProducts = useCallback(async () => {
    setIsProductsLoading(true);
    setProductsError(null);

    try {
      const productsResponse = await loadProducts();

      setRawProducts(productsResponse);

      return normalizeProducts(productsResponse, normalizationOptions);
    } catch (error) {
      console.error("ERROR REFRESHING PRODUCTS CATALOG:", error);

      setProductsError(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          error?.message ||
          "Unable to load products."
      );

      return [];
    } finally {
      setIsProductsLoading(false);
    }
  }, [loadProducts, normalizationOptions]);

  const fetchProductById = useCallback(
    async (productId) => {
      try {
        const productResponse = await getProductByIdRequest(productId);

        return normalizeProduct(productResponse, normalizationOptions);
      } catch (error) {
        console.error(`ERROR FETCHING PRODUCT "${productId}":`, error);

        throw error;
      }
    },
    [normalizationOptions]
  );

  useEffect(() => {
    let isMounted = true;

    const initializeProducts = async () => {
      try {
        const productsResponse = await loadProducts();

        if (!isMounted) {
          return;
        }

        setRawProducts(productsResponse);
        setProductsError(null);
      } catch (error) {
        console.error("ERROR FETCHING PRODUCTS CATALOG:", error);

        if (!isMounted) {
          return;
        }

        setRawProducts([]);
        setProductsError(
          error?.response?.data?.error ||
            error?.response?.data?.message ||
            error?.message ||
            "Unable to load products."
        );
      } finally {
        if (isMounted) {
          setIsProductsLoading(false);
        }
      }
    };

    initializeProducts();

    return () => {
      isMounted = false;
    };
  }, [loadProducts]);

  const homepageProducts = useMemo(
    () => getHomepageProducts(products),
    [products]
  );

  const catalogProducts = useMemo(
    () => getCatalogProducts(products),
    [products]
  );

  const getProductById = useCallback(
    (productId) => products.find((product) => product.id === productId) || null,
    [products]
  );

  const getProductBySlug = useCallback(
    (slug) => products.find((product) => product.slug === slug) || null,
    [products]
  );

  const contextValue = useMemo(
    () => ({
      products,
      homepageProducts,
      catalogProducts,

      isProductsLoading,
      productsError,

      refreshProducts,
      fetchProductById,

      getProductById,
      getProductBySlug,
    }),
    [
      products,
      homepageProducts,
      catalogProducts,
      isProductsLoading,
      productsError,
      refreshProducts,
      fetchProductById,
      getProductById,
      getProductBySlug,
    ]
  );

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
