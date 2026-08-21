import { useMemo } from "react";

import { Link } from "react-router-dom";

import {
  FiChevronRight,
  FiHome,
  FiInfo,
  FiMail,
  FiPackage,
  FiShoppingBag,
  FiX,
} from "react-icons/fi";

import { StoreIcon } from "../icons/store_icon/store_icon.component";

import { useWarehouse } from "../../infrastructure/services/warehouse/use-warehouse.hook";

import { getWarehouseLocationLabel } from "../location/location_selector/location_selector.helpers";

import logo from "../../assets/branding/logo.jpeg";

import {
  MobileMenuRoot,
  MobileMenuBackdrop,
  MobileMenuPanel,
  MobileMenuHeader,
  MobileMenuLogo,
  MobileMenuCloseButton,
  MobileMenuContent,
  MobileMenuSection,
  MobileMenuSectionLabel,
  MobileMenuNavigation,
  MobileMenuLink,
  MobileMenuLinkIcon,
  MobileMenuLinkLabel,
  MobileMenuDivider,
  MyOrdersLink,
  MyOrdersLinkContent,
  StoreCard,
  StoreCardTop,
  StoreCardIcon,
  StoreCardContent,
  StoreCardEyebrow,
  StoreCardName,
  StoreCardLocation,
  StoreCardAction,
  StoreCardActionLabel,
} from "./mobile_menu.styles";

export const MobileMenu = ({ isOpen, onClose }) => {
  const { warehouse } = useWarehouse();

  const warehouseLocation = useMemo(
    () => getWarehouseLocationLabel(warehouse),
    [warehouse]
  );

  const handleNavigation = () => {
    onClose?.();
  };

  return (
    <MobileMenuRoot $isOpen={isOpen} aria-hidden={!isOpen}>
      <MobileMenuBackdrop
        $isOpen={isOpen}
        onClick={onClose}
        aria-hidden="true"
      />

      <MobileMenuPanel
        id="mr-emilio-mobile-menu"
        $isOpen={isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
      >
        <MobileMenuHeader>
          <MobileMenuLogo
            as={Link}
            to="/"
            onClick={handleNavigation}
            aria-label="Mr. Emilio home"
          >
            <img src={logo} alt="Mr. Emilio" />
          </MobileMenuLogo>

          <MobileMenuCloseButton
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <FiX />
          </MobileMenuCloseButton>
        </MobileMenuHeader>

        <MobileMenuContent>
          <MobileMenuSection>
            <MobileMenuSectionLabel>Shop</MobileMenuSectionLabel>

            <MobileMenuNavigation>
              <MobileMenuLink as={Link} to="/" onClick={handleNavigation}>
                <MobileMenuLinkIcon>
                  <FiHome />
                </MobileMenuLinkIcon>

                <MobileMenuLinkLabel>Home</MobileMenuLinkLabel>
              </MobileMenuLink>

              <MobileMenuLink
                as={Link}
                to="/products"
                onClick={handleNavigation}
              >
                <MobileMenuLinkIcon>
                  <FiShoppingBag />
                </MobileMenuLinkIcon>

                <MobileMenuLinkLabel>Products</MobileMenuLinkLabel>
              </MobileMenuLink>

              <MobileMenuLink
                as={Link}
                to="/recipes"
                onClick={handleNavigation}
              >
                <MobileMenuLinkIcon>
                  <FiPackage />
                </MobileMenuLinkIcon>

                <MobileMenuLinkLabel>Recipes</MobileMenuLinkLabel>
              </MobileMenuLink>
            </MobileMenuNavigation>
          </MobileMenuSection>

          <MobileMenuDivider />

          <MobileMenuSection>
            <MobileMenuSectionLabel>About</MobileMenuSectionLabel>

            <MobileMenuNavigation>
              <MobileMenuLink as={Link} to="/about" onClick={handleNavigation}>
                <MobileMenuLinkIcon>
                  <FiInfo />
                </MobileMenuLinkIcon>

                <MobileMenuLinkLabel>Our Story</MobileMenuLinkLabel>
              </MobileMenuLink>

              <MobileMenuLink
                as={Link}
                to="/contact"
                onClick={handleNavigation}
              >
                <MobileMenuLinkIcon>
                  <FiMail />
                </MobileMenuLinkIcon>

                <MobileMenuLinkLabel>Contact Us</MobileMenuLinkLabel>
              </MobileMenuLink>
            </MobileMenuNavigation>
          </MobileMenuSection>

          <MobileMenuDivider />

          <MyOrdersLink as={Link} to="/my-orders" onClick={handleNavigation}>
            <MyOrdersLinkContent>
              <MobileMenuLinkIcon>
                <FiPackage />
              </MobileMenuLinkIcon>

              <MobileMenuLinkLabel>My Orders</MobileMenuLinkLabel>
            </MyOrdersLinkContent>

            <FiChevronRight />
          </MyOrdersLink>

          {warehouse && (
            <StoreCard>
              <StoreCardTop>
                <StoreCardIcon>
                  <StoreIcon />
                </StoreCardIcon>

                <StoreCardContent>
                  <StoreCardEyebrow>Shopping from</StoreCardEyebrow>

                  <StoreCardName>{warehouse.warehouse_name}</StoreCardName>

                  {warehouseLocation && (
                    <StoreCardLocation>{warehouseLocation}</StoreCardLocation>
                  )}
                </StoreCardContent>
              </StoreCardTop>

              <StoreCardAction
                as={Link}
                to="/change-store"
                onClick={handleNavigation}
              >
                <StoreCardActionLabel>Change Store</StoreCardActionLabel>

                <FiChevronRight />
              </StoreCardAction>
            </StoreCard>
          )}
        </MobileMenuContent>
      </MobileMenuPanel>
    </MobileMenuRoot>
  );
};
