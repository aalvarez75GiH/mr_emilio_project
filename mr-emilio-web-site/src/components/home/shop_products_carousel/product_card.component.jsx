import {
  BenefitIcon,
  CartIcon,
  HeartIcon,
} from "../../../assets/shop_products_carousel/product_card/icons";

import { ProductRating } from "./product_rating.component";

import { getStockLabel } from "./shop_products_carousel.helpers";

import {
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
  ProductQuantityBadge,
  ProductBenefits,
  ProductBenefitItem,
  ProductBenefitIcon,
  ProductBenefitLabel,
  AddToCartButton,
  AddToCartLabel,
} from "./shop_products_carousel.styles";

export const ShopProductCard = ({
  product,
  isFavorite = false,
  isFavoritePending = false,
  onFavoriteToggle,
  onAddToCart,
}) => {
  const inventoryStatus = product.inventoryStatus;

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    onFavoriteToggle?.(product);
  };

  const handleAddToCartClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (product.stock <= 0) {
      return;
    }

    onAddToCart?.(event, product);
  };

  return (
    <ProductCard data-product-card>
      <ProductLink to={product.href}>
        <ProductImageContainer>
          {product.badgeLabel && (
            <ProductBadge>{product.badgeLabel}</ProductBadge>
          )}

          <ProductFavoriteButton
            type="button"
            $favorite={isFavorite}
            disabled={isFavoritePending}
            aria-label={
              isFavorite
                ? `Remove ${product.name} from favorites`
                : `Add ${product.name} to favorites`
            }
            aria-pressed={isFavorite}
            onClick={handleFavoriteClick}
          >
            <HeartIcon filled={isFavorite} />
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
            <ProductName>{product.name}</ProductName>

            <ProductDescription>{product.description}</ProductDescription>

            {product.benefits?.length > 0 && (
              <ProductBenefits>
                {product.benefits.map((benefit) => (
                  <ProductBenefitItem key={`${product.id}-${benefit.type}`}>
                    <ProductBenefitIcon $type={benefit.icon}>
                      <BenefitIcon type={benefit.icon} />
                    </ProductBenefitIcon>

                    <ProductBenefitLabel>{benefit.label}</ProductBenefitLabel>
                  </ProductBenefitItem>
                ))}
              </ProductBenefits>
            )}

            <ProductWarehouseData
              key={`details-${product.warehouseId}-${product.id}`}
            >
              <ProductDetailsPanel>
                <ProductDetailColumn>
                  <ProductDetailHeading>Size</ProductDetailHeading>

                  <ProductDetailValue>
                    {product.sizeLabel || "—"}
                  </ProductDetailValue>
                </ProductDetailColumn>

                <ProductDetailDivider aria-hidden="true" />

                <ProductDetailColumn>
                  <ProductDetailHeading>
                    {product.stock <= 0 ? "Availability" : "In stock"}
                  </ProductDetailHeading>

                  <ProductAvailabilityValue $status={inventoryStatus.key}>
                    <ProductStockDot $status={inventoryStatus.key} />

                    {getStockLabel(product)}
                  </ProductAvailabilityValue>

                  <ProductInventoryStatusBadge $status={inventoryStatus.key}>
                    {inventoryStatus.label}
                  </ProductInventoryStatusBadge>
                </ProductDetailColumn>
              </ProductDetailsPanel>
            </ProductWarehouseData>

            <ProductRating review={product.review} />

            <ProductWarehouseData
              key={`purchase-${product.warehouseId}-${product.id}`}
            >
              <ProductPurchaseRow>
                <ProductPrice>{product.displayedPrice}</ProductPrice>

                <AddToCartButton
                  type="button"
                  aria-label={
                    product.stock > 0
                      ? `Add ${product.name} to cart`
                      : `${product.name} is sold out`
                  }
                  disabled={product.stock <= 0}
                  onClick={handleAddToCartClick}
                >
                  <CartIcon />

                  <AddToCartLabel>
                    {product.stock > 0 ? "Add to cart" : "Sold out"}
                  </AddToCartLabel>
                </AddToCartButton>
              </ProductPurchaseRow>
            </ProductWarehouseData>
          </ProductTextContent>
        </ProductInformation>
      </ProductLink>
    </ProductCard>
  );
};
