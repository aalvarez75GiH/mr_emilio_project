import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import {
  RecipesSection,
  RecipesContainer,
  RecipesIntro,
  RecipesTitle,
  RecipesDescription,
  RecipesActions,
  RecipesGrid,
  RecipeCard,
  RecipeImageWrapper,
  RecipeImage,
  RecipeFooter,
  RecipeName,
  RecipeArrow,
} from "./featured_recipes.styles";

import { recipes } from "./featured_recipes.data";

export const FeaturedRecipes = () => {
  return (
    <RecipesSection>
      <RecipesContainer>
        <RecipesIntro>
          <RecipesTitle>Cook with Mr. Emilio</RecipesTitle>

          <RecipesDescription>
            Traditional recipes that bring Venezuela to your table.
          </RecipesDescription>

          <RecipesActions>
            <Link to="/recipes">
              View all recipes
              <FiArrowRight aria-hidden="true" />
            </Link>
          </RecipesActions>
        </RecipesIntro>

        <RecipesGrid>
          {recipes.map((recipe) => (
            <RecipeCard
              as={Link}
              to={recipe.path}
              key={recipe.id}
              aria-label={`View recipe: ${recipe.name}`}
            >
              <RecipeImageWrapper>
                <RecipeImage src={recipe.image} alt="" aria-hidden="true" />
              </RecipeImageWrapper>

              <RecipeFooter>
                <RecipeName>{recipe.name}</RecipeName>

                <RecipeArrow aria-hidden="true">
                  <FiArrowRight />
                </RecipeArrow>
              </RecipeFooter>
            </RecipeCard>
          ))}
        </RecipesGrid>
      </RecipesContainer>
    </RecipesSection>
  );
};
