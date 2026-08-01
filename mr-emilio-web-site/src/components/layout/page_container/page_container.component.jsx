import { PageContainerWrapper } from "./page_container.styles";

export const PageContainer = ({ children, ...props }) => {
  return <PageContainerWrapper {...props}>{children}</PageContainerWrapper>;
};
