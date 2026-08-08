import { Skeleton } from "../../common/skeleton/skeleton.styles";

import {
  ShopProductsSection,
  ShopProductsContainer,
  ShopProductsHeader,
  SectionTitle,
  CarouselLayout,
  CarouselViewport,
  ProductsTrack,
} from "./shop_products_carousel.styles";

import styled from "styled-components";

const SkeletonHeaderAction = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const SkeletonCard = styled.article`
  flex: 0 0 clamp(220px, 15vw, 270px);

  min-width: 0;

  padding-bottom: 18px;

  overflow: hidden;

  border: 1px solid rgba(22, 70, 172, 0.1);
  border-radius: 16px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    flex-basis: clamp(240px, 14.5vw, 290px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-basis: clamp(210px, 20vw, 250px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    flex-basis: clamp(205px, 27vw, 235px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-basis: clamp(220px, 43vw, 280px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;

    padding-bottom: 20px;
  }
`;

const SkeletonImageArea = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 210px;

  padding: 22px;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    height: 230px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: 200px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    height: 190px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 220px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 330px;

    padding: 34px 28px 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    height: 290px;

    padding: 30px 22px 16px;
  }
`;

const SkeletonCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 0 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    padding: 0 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 0 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSmall}) {
    padding: 0 14px;
  }
`;

const SkeletonBenefitsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 10px;

  padding: 12px 0;

  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const SkeletonBenefit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const SkeletonDetailsPanel = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 14px;

  width: 100%;

  padding: 12px 14px;

  border-radius: 10px;

  background: rgba(22, 70, 172, 0.035);
`;

const SkeletonDetailsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const SkeletonPurchaseRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;

  width: 100%;
`;

const SkeletonCardItem = () => {
  return (
    <SkeletonCard aria-hidden="true">
      <SkeletonImageArea>
        <Skeleton $width="68%" $height="68%" $radius="18px" />
      </SkeletonImageArea>

      <SkeletonCardContent>
        <Skeleton $width="78%" $height="28px" />

        <Skeleton $width="88%" $height="14px" />

        <SkeletonBenefitsRow>
          {Array.from({ length: 3 }, (_, index) => (
            <SkeletonBenefit key={index}>
              <Skeleton $width="24px" $height="24px" $radius="50%" />

              <Skeleton $width="70%" $height="9px" $radius="5px" />
            </SkeletonBenefit>
          ))}
        </SkeletonBenefitsRow>

        <SkeletonDetailsPanel>
          <SkeletonDetailsColumn>
            <Skeleton $width="42px" $height="10px" />
            <Skeleton $width="58px" $height="14px" />
          </SkeletonDetailsColumn>

          <SkeletonDetailsColumn>
            <Skeleton $width="60px" $height="10px" />
            <Skeleton $width="74px" $height="14px" />
            <Skeleton $width="86px" $height="20px" $radius="6px" />
          </SkeletonDetailsColumn>
        </SkeletonDetailsPanel>

        <Skeleton $width="120px" $height="16px" />

        <SkeletonPurchaseRow>
          <Skeleton $width="64px" $height="20px" />

          <Skeleton $width="116px" $height="44px" $radius="999px" />
        </SkeletonPurchaseRow>
      </SkeletonCardContent>
    </SkeletonCard>
  );
};

export const ShopProductsCarouselSkeleton = ({
  title = "Buy our products",
}) => {
  return (
    <ShopProductsSection aria-busy="true" aria-label="Loading products">
      <ShopProductsContainer>
        <ShopProductsHeader>
          <SectionTitle>{title}</SectionTitle>

          <SkeletonHeaderAction aria-hidden="true">
            <Skeleton $width="150px" $height="16px" $radius="8px" />
          </SkeletonHeaderAction>
        </ShopProductsHeader>

        <CarouselLayout>
          <CarouselViewport>
            <ProductsTrack>
              {Array.from({ length: 6 }, (_, index) => (
                <SkeletonCardItem key={index} />
              ))}
            </ProductsTrack>
          </CarouselViewport>
        </CarouselLayout>
      </ShopProductsContainer>
    </ShopProductsSection>
  );
};
