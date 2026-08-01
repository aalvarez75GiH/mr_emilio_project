import storyBackground from "../../../assets/brand_story/section_background.png";

import { Button } from "../../layout/button/button.component";

import {
  StorySection,
  StoryContainer,
  StoryContent,
  StoryTitle,
  StoryTitleLine,
  StoryDescription,
  StoryActions,
  StoryImage,
} from "./brand_story.styles";

export const BrandStory = () => {
  return (
    <StorySection>
      <StoryContainer $backgroundImage={storyBackground}>
        <StoryContent>
          <StoryTitle>
            <StoryTitleLine>Made the traditional way.</StoryTitleLine>
            <StoryTitleLine>Loved every day.</StoryTitleLine>
          </StoryTitle>

          <StoryDescription>
            From our family to yours, Mr. Emilio brings you the flavors that
            have been part of Venezuelan tables for generations.
          </StoryDescription>

          <StoryActions>
            <Button variant="primary" size="large">
              Our Story
            </Button>
          </StoryActions>
        </StoryContent>

        <StoryImage
          src={storyBackground}
          alt="Traditional Venezuelan white cheese served on a wooden board"
        />
      </StoryContainer>
    </StorySection>
  );
};
