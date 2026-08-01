import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Raleway:wght@500;600;700;800&display=swap");

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    width: 100%;
    min-width: 320px;

    scroll-behavior: smooth;
  }

  body {
    width: 100%;
    min-width: 320px;
    min-height: 100vh;

    margin: 0;

    overflow-x: hidden;

    background: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.text.primary};

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 16px;
    line-height: 1.6;

    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    width: 100%;
    min-height: 100vh;

    margin: 0;
    padding: 0;
  }

  body,
  button,
  input,
  textarea,
  select {
    font-family: ${({ theme }) => theme.fonts.body};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
  }

  img,
  picture,
  svg {
    display: block;
    max-width: 100%;
  }

  button,
  a {
    -webkit-tap-highlight-color: transparent;
  }

  button {
    border: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul,
  ol {
    margin: 0;
    padding: 0;

    list-style: none;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.brand.primaryLight};
    color: ${({ theme }) => theme.colors.brand.primaryDark};
  }
`;
