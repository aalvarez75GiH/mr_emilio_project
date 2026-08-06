import { useCallback, useState } from "react";

const updateProductFavoriteRequest = async ({ productId, isFavorite }) => {
  console.log("Favorite request prepared:", {
    productId,
    isFavorite,
  });

  return {
    productId,
    isFavorite,
  };
};

export const useProductFavorites = () => {
  const [favoriteProductIds, setFavoriteProductIds] = useState(() => new Set());

  const [favoriteRequestIds, setFavoriteRequestIds] = useState(() => new Set());

  const isProductFavorite = useCallback(
    (productId) => favoriteProductIds.has(productId),
    [favoriteProductIds]
  );

  const isFavoriteRequestPending = useCallback(
    (productId) => favoriteRequestIds.has(productId),
    [favoriteRequestIds]
  );

  const toggleProductFavorite = useCallback(
    async (product) => {
      const productId = product?.id;

      if (!productId || favoriteRequestIds.has(productId)) {
        return;
      }

      const wasFavorite = favoriteProductIds.has(productId);
      const nextFavoriteState = !wasFavorite;

      setFavoriteProductIds((currentIds) => {
        const nextIds = new Set(currentIds);

        if (nextFavoriteState) {
          nextIds.add(productId);
        } else {
          nextIds.delete(productId);
        }

        return nextIds;
      });

      setFavoriteRequestIds((currentIds) => {
        const nextIds = new Set(currentIds);

        nextIds.add(productId);

        return nextIds;
      });

      try {
        await updateProductFavoriteRequest({
          productId,
          isFavorite: nextFavoriteState,
        });
      } catch (error) {
        console.error("Unable to update favorite product:", error);

        setFavoriteProductIds((currentIds) => {
          const nextIds = new Set(currentIds);

          if (wasFavorite) {
            nextIds.add(productId);
          } else {
            nextIds.delete(productId);
          }

          return nextIds;
        });
      } finally {
        setFavoriteRequestIds((currentIds) => {
          const nextIds = new Set(currentIds);

          nextIds.delete(productId);

          return nextIds;
        });
      }
    },
    [favoriteProductIds, favoriteRequestIds]
  );

  return {
    isProductFavorite,
    isFavoriteRequestPending,
    toggleProductFavorite,
  };
};
