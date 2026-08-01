import { Link } from "react-router-dom";
import { FiMenu, FiShoppingCart, FiUser } from "react-icons/fi";

import logo from "../../assets/branding/logo.jpeg";

import {
  Header,
  HeaderContainer,
  Logo,
  Navigation,
  NavigationLink,
  Actions,
  ActionButton,
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

          <ActionButton type="button" aria-label="Shopping cart">
            <FiShoppingCart />
          </ActionButton>

          <MobileMenuButton type="button" aria-label="Open navigation menu">
            <FiMenu />
          </MobileMenuButton>
        </Actions>
      </HeaderContainer>
    </Header>
  );
};
