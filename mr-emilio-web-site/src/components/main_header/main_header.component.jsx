import { Link } from "react-router-dom";
import { FiMenu, FiShoppingCart, FiUser } from "react-icons/fi";

import { useCart } from "../../infrastructure/services/cart/use-cart.hook";

import logo from "../../assets/branding/logo.jpeg";

import {
  Header,
  HeaderContainer,
  Logo,
  Navigation,
  NavigationLink,
  Actions,
  ActionButton,
  CartActionContainer,
  CartQuantityBadge,
  MobileMenuButton,
} from "./main_header.styles";

const navigation = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Products",
    path: "/products",
  },
  {
    label: "Recipes",
    path: "/recipes",
  },
  {
    label: "About Us",
    path: "/about",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];

export const MainHeader = () => {
  const { cartQuantity } = useCart();

  const cartAriaLabel =
    cartQuantity > 0
      ? `Shopping cart, ${cartQuantity} ${
          cartQuantity === 1 ? "item" : "items"
        }`
      : "Shopping cart";

  return (
    <Header>
      <HeaderContainer>
        <Logo as={Link} to="/" aria-label="Mr. Emilio home">
          <img src={logo} alt="Mr. Emilio" />
        </Logo>

        <Navigation>
          {navigation.map((item) => (
            <NavigationLink key={item.path} as={Link} to={item.path}>
              {item.label}
            </NavigationLink>
          ))}
        </Navigation>

        <Actions>
          <ActionButton type="button" aria-label="Account">
            <FiUser />
          </ActionButton>

          <CartActionContainer>
            <ActionButton as={Link} to="/cart" aria-label={cartAriaLabel}>
              <FiShoppingCart />
            </ActionButton>

            {cartQuantity > 0 && (
              <CartQuantityBadge aria-hidden="true">
                {cartQuantity > 99 ? "99+" : cartQuantity}
              </CartQuantityBadge>
            )}
          </CartActionContainer>
          {/* <CartActionContainer>
            <ActionButton type="button" aria-label={cartAriaLabel}>
              <FiShoppingCart />
            </ActionButton>

            {cartQuantity > 0 && (
              <CartQuantityBadge aria-hidden="true">
                {cartQuantity > 99 ? "99+" : cartQuantity}
              </CartQuantityBadge>
            )}
          </CartActionContainer> */}

          <MobileMenuButton type="button" aria-label="Open navigation menu">
            <FiMenu />
          </MobileMenuButton>
        </Actions>
      </HeaderContainer>
    </Header>
  );
};
