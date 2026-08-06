import {
  BenefitIcon,
  CartIcon,
  HeartIcon,
} from "../../../assets/shop_products_carousel/product_card/icons";

import { ProductRating } from "./product_rating.component";

import {
  getDisplayProduct,
  getDisplayedPrice,
  getInventoryStatus,
  getQuantityHighlight,
  getStockLabel,
} from "./shop_products_carousel.helpers";

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
  const displayProduct = getDisplayProduct(product);

  const inventoryStatus = getInventoryStatus(displayProduct.stock);

  const quantityHighlight = getQuantityHighlight(displayProduct);

  const displayedPrice = getDisplayedPrice(displayProduct);

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    onFavoriteToggle?.(displayProduct);
  };

  const handleAddToCartClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (displayProduct.stock <= 0) {
      return;
    }

    onAddToCart?.(displayProduct);
  };

  return (
    <ProductCard data-product-card>
      <ProductLink to={displayProduct.href}>
        <ProductImageContainer>
          {displayProduct.badgeLabel && (
            <ProductBadge>{displayProduct.badgeLabel}</ProductBadge>
          )}

          <ProductFavoriteButton
            type="button"
            $favorite={isFavorite}
            disabled={isFavoritePending}
            aria-label={
              isFavorite
                ? `Remove ${displayProduct.name} from favorites`
                : `Add ${displayProduct.name} to favorites`
            }
            aria-pressed={isFavorite}
            onClick={handleFavoriteClick}
          >
            <HeartIcon filled={isFavorite} />
          </ProductFavoriteButton>

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

                    <ProductBenefitLabel>{benefit.label}</ProductBenefitLabel>
                  </ProductBenefitItem>
                ))}
              </ProductBenefits>
            )}

            <ProductWarehouseData
              key={`details-${displayProduct.warehouseId}-${displayProduct.id}`}
            >
              <ProductDetailsPanel>
                <ProductDetailColumn>
                  <ProductDetailHeading>Size</ProductDetailHeading>

                  <ProductDetailValue>
                    {displayProduct.sizeLabel || "—"}
                  </ProductDetailValue>
                </ProductDetailColumn>

                <ProductDetailDivider aria-hidden="true" />

                <ProductDetailColumn>
                  <ProductDetailHeading>
                    {displayProduct.stock <= 0 ? "Availability" : "In stock"}
                  </ProductDetailHeading>

                  <ProductAvailabilityValue $status={inventoryStatus.key}>
                    <ProductStockDot $status={inventoryStatus.key} />

                    {getStockLabel(displayProduct)}
                  </ProductAvailabilityValue>

                  <ProductInventoryStatusBadge $status={inventoryStatus.key}>
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
                  onClick={handleAddToCartClick}
                >
                  <CartIcon />

                  <AddToCartLabel>
                    {displayProduct.stock > 0 ? "Add to cart" : "Sold out"}
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
