const firebaseController = require("../../fb");

const SIGNED_URL_EXPIRATION_IN_DAYS = 7;

const getSignedUrlExpirationDate = () => {
  const expirationDate = new Date();

  expirationDate.setDate(
    expirationDate.getDate() + SIGNED_URL_EXPIRATION_IN_DAYS
  );

  return expirationDate;
};

const getProductImageUrl = async (storagePath) => {
  if (!storagePath || typeof storagePath !== "string") {
    return "";
  }

  try {
    const file = firebaseController.bucket.file(storagePath);

    const [exists] = await file.exists();

    if (!exists) {
      console.warn(
        `Product image was not found in Firebase Storage: ${storagePath}`
      );

      return "";
    }

    const [signedUrl] = await file.getSignedUrl({
      action: "read",
      expires: getSignedUrlExpirationDate(),
    });

    return signedUrl;
  } catch (error) {
    console.error(
      `Unable to resolve Firebase Storage image: ${storagePath}`,
      error
    );

    return "";
  }
};

const addImageUrlToProduct = async (product) => {
  if (!product || typeof product !== "object") {
    return product;
  }

  const storagePath = product.image?.storagePath;

  if (!storagePath) {
    return {
      ...product,
      image: {
        ...product.image,
        url: "",
      },
    };
  }

  const imageUrl = await getProductImageUrl(storagePath);

  return {
    ...product,

    image: {
      ...product.image,
      url: imageUrl,
    },
  };
};

const addImageUrlsToProducts = async (products = []) => {
  if (!Array.isArray(products)) {
    return [];
  }

  return Promise.all(products.map((product) => addImageUrlToProduct(product)));
};

module.exports = {
  getProductImageUrl,
  addImageUrlToProduct,
  addImageUrlsToProducts,
};
