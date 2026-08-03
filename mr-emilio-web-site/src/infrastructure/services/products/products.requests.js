import apiClient from "../../api/api.client";

const PRODUCTS_CATALOG_PATH = "/api/products-catalog";

export const getProductsCatalogRequest = async ({
  active,
  category,
  showOnHomepage,
  featured,
} = {}) => {
  console.log("REQUESTING PRODUCTS FROM:", PRODUCTS_CATALOG_PATH);

  const response = await apiClient.get(PRODUCTS_CATALOG_PATH, {
    params: {
      active,
      category,
      showOnHomepage,
      featured,
    },
  });

  console.log("PRODUCTS API STATUS:", response.status);
  console.log("PRODUCTS API RESPONSE:", response.data);

  return response.data;
};

export const getProductByIdRequest = async (productId) => {
  if (!productId || typeof productId !== "string") {
    throw new Error("A valid product id is required");
  }

  const { data } = await apiClient.get(
    `${PRODUCTS_CATALOG_PATH}/${encodeURIComponent(productId.trim())}`
  );

  return data;
};

export const createProductRequest = async (product) => {
  if (!product || typeof product !== "object" || Array.isArray(product)) {
    throw new Error("A valid product object is required");
  }

  const { data } = await apiClient.post(PRODUCTS_CATALOG_PATH, product);

  return data;
};

export const updateProductByIdRequest = async (productId, updates) => {
  if (!productId || typeof productId !== "string") {
    throw new Error("A valid product id is required");
  }

  if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
    throw new Error("A valid product updates object is required");
  }

  const { data } = await apiClient.put(
    `${PRODUCTS_CATALOG_PATH}/${encodeURIComponent(productId.trim())}`,
    updates
  );

  return data;
};

export const deleteProductByIdRequest = async (productId) => {
  if (!productId || typeof productId !== "string") {
    throw new Error("A valid product id is required");
  }

  const { data } = await apiClient.delete(
    `${PRODUCTS_CATALOG_PATH}/${encodeURIComponent(productId.trim())}`
  );

  return data;
};

// import apiClient from "../../api/api.client";
// console.log("API BASE URL:", import.meta.env.VITE_API_BASE_URL);
// export const getProductsCatalogRequest = async ({
//   active,
//   category,
//   showOnHomepage,
//   featured,
// } = {}) => {
//   const { data } = await apiClient.get("/", {
//     params: {
//       active,
//       category,
//       showOnHomepage,
//       featured,
//     },
//   });

//   return data;
// };

// export const getProductByIdRequest = async (productId) => {
//   if (!productId) {
//     throw new Error("Product id is required.");
//   }

//   const { data } = await apiClient.get(`/${productId}`);

//   return data;
// };

// export const createProductRequest = async (product) => {
//   if (!product) {
//     throw new Error("Product is required.");
//   }

//   const { data } = await apiClient.post("/", product);

//   return data;
// };

// export const updateProductByIdRequest = async (productId, updates) => {
//   if (!productId) {
//     throw new Error("Product id is required.");
//   }

//   const { data } = await apiClient.put(`/${productId}`, updates);

//   return data;
// };

// export const deleteProductByIdRequest = async (productId) => {
//   if (!productId) {
//     throw new Error("Product id is required.");
//   }

//   const { data } = await apiClient.delete(`/${productId}`);

//   return data;
// };
