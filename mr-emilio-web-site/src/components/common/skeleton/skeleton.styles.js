import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -450px 0;
  }

  100% {
    background-position: 450px 0;
  }
`;

export const Skeleton = styled.div`
  border-radius: ${({ $radius = "10px" }) => $radius};

  width: ${({ $width = "100%" }) => $width};
  height: ${({ $height = "20px" }) => $height};

  background: linear-gradient(
    90deg,
    #f3f5f8 0%,
    #ffffff 45%,
    #eef2f7 60%,
    #f3f5f8 100%
  );

  background-size: 900px 100%;

  animation: ${shimmer} 1.35s linear infinite;
`;
