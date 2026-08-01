import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import cheesesImage from "../../../assets/shop_by_products/cheeses_2.png";
import tequenosImage from "../../../assets/shop_by_products/tequenos.png";
import dairyImage from "../../../assets/shop_by_products/dairy.png";
import arequipeImage from "../../../assets/shop_by_products/arequipe.png";

import {
  ShopSection,
  ShopHeader,
  ShopTitle,
  ViewAllLink,
  ProductsGrid,
  ProductCard,
  ProductImageWrapper,
  ProductImage,
  ProductCardFooter,
  ProductName,
  ProductArrow,
} from "./shop_by_product.styles";

const productCategories = [
  {
    id: "cheeses",
    name: "Cheeses",
    image: cheesesImage,
    path: "/products?category=cheeses",
  },
  {
    id: "tequenos",
    name: "Tequeños",
    image: tequenosImage,
    path: "/products?category=tequenos",
  },
  {
    id: "dairy",
    name: "Dairy",
    image: dairyImage,
    path: "/products?category=dairy",
  },
  {
    id: "arequipe",
    name: "Arequipe",
    image: arequipeImage,
    path: "/products?category=arequipe",
  },
];

export const ShopByProduct = () => {
  return (
    <ShopSection>
      <ShopHeader>
        <ShopTitle>Shop by Product</ShopTitle>

        <ViewAllLink as={Link} to="/products">
          View all products
          <FiArrowRight aria-hidden="true" />
        </ViewAllLink>
      </ShopHeader>

      <ProductsGrid>
        {productCategories.map((category) => (
          <ProductCard
            as={Link}
            to={category.path}
            key={category.id}
            aria-label={`Shop ${category.name}`}
          >
            <ProductImageWrapper>
              <ProductImage src={category.image} alt="" aria-hidden="true" />
            </ProductImageWrapper>

            <ProductCardFooter>
              <ProductName>{category.name}</ProductName>

              <ProductArrow aria-hidden="true">
                <FiArrowRight />
              </ProductArrow>
            </ProductCardFooter>
          </ProductCard>
        ))}
      </ProductsGrid>
    </ShopSection>
  );
};
