import { FiFeather, FiHeart, FiTruck, FiUsers } from "react-icons/fi";

import {
  BenefitsSection,
  BenefitsInner,
  BenefitItem,
  BenefitIcon,
  BenefitCopy,
  BenefitTitle,
  BenefitSubtitle,
  BenefitDivider,
} from "./brand_benefits.styles";

const benefits = [
  {
    id: "tradition",
    icon: FiHeart,
    title: "Venezuelan",
    subtitle: "Tradition",
  },
  {
    id: "ingredients",
    icon: FiFeather,
    title: "Made with",
    subtitle: "Quality Ingredients",
  },
  {
    id: "families",
    icon: FiUsers,
    title: "Trusted by",
    subtitle: "Families",
  },
  {
    id: "delivery",
    icon: FiTruck,
    title: "Delivered Fresh",
    subtitle: "to You",
  },
];

export const BrandBenefits = () => {
  return (
    <BenefitsSection aria-label="Why choose Mr. Emilio">
      <BenefitsInner>
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;

          return (
            <BenefitItem key={benefit.id}>
              <BenefitIcon aria-hidden="true">
                <Icon />
              </BenefitIcon>

              <BenefitCopy>
                <BenefitTitle>{benefit.title}</BenefitTitle>
                <BenefitSubtitle>{benefit.subtitle}</BenefitSubtitle>
              </BenefitCopy>

              {index < benefits.length - 1 && (
                <BenefitDivider aria-hidden="true" />
              )}
            </BenefitItem>
          );
        })}
      </BenefitsInner>
    </BenefitsSection>
  );
};
