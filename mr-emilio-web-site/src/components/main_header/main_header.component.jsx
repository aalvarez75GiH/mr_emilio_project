import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { FiMenu, FiShoppingCart, FiUser } from "react-icons/fi";

import { useCart } from "../../infrastructure/services/cart/use-cart.hook";

import { MobileMenu } from "../main_menu/mobile_menu.component";

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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartAriaLabel =
    cartQuantity > 0
      ? `Shopping cart, ${cartQuantity} ${
          cartQuantity === 1 ? "item" : "items"
        }`
      : "Shopping cart";

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
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
            <ActionButton type="button" aria-label="Account" title="Account">
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

            <MobileMenuButton
              type="button"
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mr-emilio-mobile-menu"
              onClick={openMobileMenu}
            >
              <FiMenu />
            </MobileMenuButton>
          </Actions>
        </HeaderContainer>
      </Header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
};
