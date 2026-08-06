import { StarIcon } from "../../../assets/shop_products_carousel/product_card/icons";

import {
  ProductRatingContainer,
  ProductStars,
  ProductStar,
  ProductReviewCount,
  ProductNotReviewed,
} from "./shop_products_carousel.styles";

export const ProductRating = ({ review }) => {
  if (!review || review.count <= 0) {
    return (
      <ProductRatingContainer>
        <ProductNotReviewed>
          Not reviewed yet
        </ProductNotReviewed>
      </ProductRatingContainer>
    );
  }

  const normalizedAverage = Math.max(
    0,
    Math.min(5, review.average)
  );

  const filledStars = Math.round(
    normalizedAverage
  );

  return (
    <ProductRatingContainer
      aria-label={`${normalizedAverage} out of 5 stars from ${review.count} reviews`}
    >
      <ProductStars aria-hidden="true">
        {Array.from(
          { length: 5 },
          (_, index) => (
            <ProductStar
              key={index}
              $filled={index < filledStars}
            >
              <StarIcon
                filled={index < filledStars}
              />
            </ProductStar>
          )
        )}
      </ProductStars>

      <ProductReviewCount>
        ({review.count})
      </ProductReviewCount>
    </ProductRatingContainer>
  );
};