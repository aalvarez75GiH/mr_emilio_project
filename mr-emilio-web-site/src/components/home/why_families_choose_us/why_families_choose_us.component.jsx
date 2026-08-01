import { FiHeart } from "react-icons/fi";
import { LuChefHat, LuFlaskConical, LuSprout } from "react-icons/lu";

import {
  WhyChooseSection,
  WhyChooseContainer,
  WhyChooseTitle,
  ReasonsGrid,
  ReasonItem,
  ReasonIcon,
  ReasonText,
} from "./why_families_choose_us.styles";

const reasons = [
  {
    id: "recipes",
    icon: LuChefHat,
    lines: ["Authentic", "Venezuelan recipes"],
  },
  {
    id: "ingredients",
    icon: LuSprout,
    lines: ["High quality", "ingredients"],
  },
  {
    id: "natural",
    icon: LuFlaskConical,
    lines: ["No artificial", "colors or flavors"],
  },
  {
    id: "pride",
    icon: FiHeart,
    lines: ["Made with", "pride"],
  },
];

export const WhyFamiliesChooseUs = () => {
  return (
    <WhyChooseSection>
      <WhyChooseContainer>
        <WhyChooseTitle>Why families choose Mr. Emilio</WhyChooseTitle>

        <ReasonsGrid>
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <ReasonItem key={reason.id}>
                <ReasonIcon aria-hidden="true">
                  <Icon />
                </ReasonIcon>

                <ReasonText>
                  {reason.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </ReasonText>
              </ReasonItem>
            );
          })}
        </ReasonsGrid>
      </WhyChooseContainer>
    </WhyChooseSection>
  );
};
