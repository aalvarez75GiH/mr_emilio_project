/* eslint-disable */

const firebaseController = require("../../fb");

const {
  PRODUCT_BENEFIT_TYPES,
  PRODUCT_BENEFIT_VALUES,
} = require("./products.constants");

const {
  addImageUrlToProduct,
  addImageUrlsToProducts,
} = require("./products.handlers");

const PRODUCTS_COLLECTION = "productsCatalog";

const STRIPE_TAX_BEHAVIORS = Object.freeze(["exclusive", "inclusive"]);

const createControllerError = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;

  return error;
};

const getTimestamp = () => new Date().toISOString();

const validateTranslatedField = (field, fieldName) => {
  if (!field || typeof field !== "object" || Array.isArray(field)) {
    throw createControllerError(
      `"${fieldName}" must be a translation object`,
      400
    );
  }

  if (!field.en || typeof field.en !== "string") {
    throw createControllerError(
      `"${fieldName}.en" is required and must be a string`,
      400
    );
  }

  if (!field.es || typeof field.es !== "string") {
    throw createControllerError(
      `"${fieldName}.es" is required and must be a string`,
      400
    );
  }
};

const validateSize = (size) => {
  if (!size || typeof size !== "object" || Array.isArray(size)) {
    throw createControllerError('"size" must be an object', 400);
  }

  if (!Number.isFinite(size.value) || size.value <= 0) {
    throw createControllerError('"size.value" must be a positive number', 400);
  }

  if (!size.unit || typeof size.unit !== "string") {
    throw createControllerError(
      '"size.unit" is required and must be a string',
      400
    );
  }
};

const validateTax = (tax) => {
  if (!tax || typeof tax !== "object" || Array.isArray(tax)) {
    throw createControllerError('"tax" must be an object', 400);
  }

  if (
    !tax.stripeTaxCode ||
    typeof tax.stripeTaxCode !== "string" ||
    !tax.stripeTaxCode.trim()
  ) {
    throw createControllerError(
      '"tax.stripeTaxCode" is required and must be a non-empty string',
      400
    );
  }

  if (!STRIPE_TAX_BEHAVIORS.includes(tax.behavior)) {
    throw createControllerError(
      `"tax.behavior" must be one of: ${STRIPE_TAX_BEHAVIORS.join(", ")}`,
      400
    );
  }
};

const validateBenefits = (benefits = []) => {
  if (!Array.isArray(benefits)) {
    throw createControllerError('"benefits" must be an array', 400);
  }

  benefits.forEach((benefit, index) => {
    if (!benefit || typeof benefit !== "object" || Array.isArray(benefit)) {
      throw createControllerError(
        `Benefit at index ${index} must be an object`,
        400
      );
    }

    if (!PRODUCT_BENEFIT_VALUES.includes(benefit.type)) {
      throw createControllerError(
        `Invalid product benefit type: "${benefit.type}"`,
        400
      );
    }

    if (
      benefit.type === PRODUCT_BENEFIT_TYPES.PIECE_COUNT &&
      (!Number.isFinite(benefit.value) || benefit.value <= 0)
    ) {
      throw createControllerError(
        'Benefit "pieceCount" requires a positive numeric value',
        400
      );
    }
  });
};

const validateImage = (image) => {
  if (!image || typeof image !== "object" || Array.isArray(image)) {
    throw createControllerError('"image" must be an object', 400);
  }

  if (typeof image.url !== "string") {
    throw createControllerError('"image.url" must be a string', 400);
  }

  if (!image.storagePath || typeof image.storagePath !== "string") {
    throw createControllerError(
      '"image.storagePath" is required and must be a string',
      400
    );
  }

  validateTranslatedField(image.alt, "image.alt");
};

const validatePresentation = (presentation) => {
  if (
    !presentation ||
    typeof presentation !== "object" ||
    Array.isArray(presentation)
  ) {
    throw createControllerError('"presentation" must be an object', 400);
  }

  const numericFields = ["imageScale", "imageOffsetX", "imageOffsetY"];

  numericFields.forEach((field) => {
    if (!Number.isFinite(presentation[field])) {
      throw createControllerError(
        `"presentation.${field}" must be a number`,
        400
      );
    }
  });
};

const validateMerchandising = (merchandising) => {
  if (
    !merchandising ||
    typeof merchandising !== "object" ||
    Array.isArray(merchandising)
  ) {
    throw createControllerError('"merchandising" must be an object', 400);
  }

  if (typeof merchandising.featured !== "boolean") {
    throw createControllerError(
      '"merchandising.featured" must be a boolean',
      400
    );
  }

  if (typeof merchandising.showOnHomepage !== "boolean") {
    throw createControllerError(
      '"merchandising.showOnHomepage" must be a boolean',
      400
    );
  }

  if (
    !Number.isInteger(merchandising.homepageOrder) ||
    merchandising.homepageOrder < 0
  ) {
    throw createControllerError(
      '"merchandising.homepageOrder" must be a non-negative integer',
      400
    );
  }

  if (
    !Number.isInteger(merchandising.catalogOrder) ||
    merchandising.catalogOrder < 0
  ) {
    throw createControllerError(
      '"merchandising.catalogOrder" must be a non-negative integer',
      400
    );
  }
};

const validateProduct = (product) => {
  if (!product || typeof product !== "object" || Array.isArray(product)) {
    throw createControllerError("Product must be an object", 400);
  }

  if (!product.id || typeof product.id !== "string") {
    throw createControllerError('"id" is required and must be a string', 400);
  }

  if (!product.slug || typeof product.slug !== "string") {
    throw createControllerError('"slug" is required and must be a string', 400);
  }

  validateTranslatedField(product.product_name, "product_name");
  validateTranslatedField(product.description, "description");

  if (!product.category || typeof product.category !== "string") {
    throw createControllerError(
      '"category" is required and must be a string',
      400
    );
  }

  validateSize(product.size);

  if (!product.stockUnit || typeof product.stockUnit !== "string") {
    throw createControllerError(
      '"stockUnit" is required and must be a string',
      400
    );
  }

  if (
    !Number.isInteger(product.manufacturerPriceInCents) ||
    product.manufacturerPriceInCents < 0
  ) {
    throw createControllerError(
      '"manufacturerPriceInCents" must be a non-negative integer',
      400
    );
  }

  validateTax(product.tax);

  validateImage(product.image);
  validatePresentation(product.presentation);
  validateBenefits(product.benefits);
  validateMerchandising(product.merchandising);

  if (typeof product.active !== "boolean") {
    throw createControllerError('"active" must be a boolean', 400);
  }
};

const createProductPayload = (product) => {
  const now = getTimestamp();

  return {
    ...product,
    createdAt: product.createdAt || now,
    updatedAt: now,
  };
};

const normalizeBooleanFilter = (value) => {
  if (value === undefined) {
    return undefined;
  }

  if (value === true || value === "true") {
    return true;
  }

  if (value === false || value === "false") {
    return false;
  }

  throw createControllerError(`Invalid boolean filter value: "${value}"`, 400);
};

const sanitizeProductUpdates = (updates = {}) => {
  const sanitizedUpdates = {
    ...updates,
  };

  delete sanitizedUpdates.id;
  delete sanitizedUpdates.createdAt;

  return sanitizedUpdates;
};

const createProduct = async (product) => {
  validateProduct(product);

  const productId = String(product.id);

  const productRef = firebaseController.db
    .collection(PRODUCTS_COLLECTION)
    .doc(productId);

  const existingProduct = await productRef.get();

  if (existingProduct.exists) {
    throw createControllerError(
      `Product with id "${productId}" already exists`,
      409
    );
  }

  const payload = createProductPayload(product);

  await productRef.set(payload);

  const createdProduct = await productRef.get();

  return createdProduct.data();
};

const getProductById = async (id) => {
  if (!id) {
    throw createControllerError("Product id is required", 400);
  }

  const productSnapshot = await firebaseController.db
    .collection(PRODUCTS_COLLECTION)
    .doc(String(id))
    .get();

  if (!productSnapshot.exists) {
    return null;
  }

  return addImageUrlToProduct(productSnapshot.data());
};

const getAllProducts = async ({
  active,
  category,
  showOnHomepage,
  featured,
} = {}) => {
  let reference = firebaseController.db.collection(PRODUCTS_COLLECTION);

  const activeFilter = normalizeBooleanFilter(active);
  const homepageFilter = normalizeBooleanFilter(showOnHomepage);
  const featuredFilter = normalizeBooleanFilter(featured);

  if (activeFilter !== undefined) {
    reference = reference.where("active", "==", activeFilter);
  }

  if (category) {
    reference = reference.where("category", "==", String(category));
  }

  if (homepageFilter !== undefined) {
    reference = reference.where(
      "merchandising.showOnHomepage",
      "==",
      homepageFilter
    );
  }

  if (featuredFilter !== undefined) {
    reference = reference.where("merchandising.featured", "==", featuredFilter);
  }

  const productsSnapshot = await reference.get();

  const products = productsSnapshot.docs.map((document) => document.data());

  const orderField = homepageFilter === true ? "homepageOrder" : "catalogOrder";

  const sortedProducts = products.sort((productA, productB) => {
    const orderA = productA.merchandising?.[orderField] ?? 0;
    const orderB = productB.merchandising?.[orderField] ?? 0;

    return orderA - orderB;
  });

  return addImageUrlsToProducts(sortedProducts);
};

const updateProductById = async (id, updates) => {
  if (!id) {
    throw createControllerError("Product id is required", 400);
  }

  if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
    throw createControllerError("Product updates must be an object", 400);
  }

  const productRef = firebaseController.db
    .collection(PRODUCTS_COLLECTION)
    .doc(String(id));

  const existingProduct = await productRef.get();

  if (!existingProduct.exists) {
    return null;
  }

  const sanitizedUpdates = sanitizeProductUpdates(updates);

  const candidateProduct = {
    ...existingProduct.data(),
    ...sanitizedUpdates,
    id: existingProduct.data().id,
  };

  validateProduct(candidateProduct);

  await productRef.set(
    {
      ...sanitizedUpdates,
      updatedAt: getTimestamp(),
    },
    {
      merge: true,
    }
  );

  const updatedProduct = await productRef.get();

  return updatedProduct.data();
};

const deleteProductById = async (id) => {
  if (!id) {
    throw createControllerError("Product id is required", 400);
  }

  const productRef = firebaseController.db
    .collection(PRODUCTS_COLLECTION)
    .doc(String(id));

  const existingProduct = await productRef.get();

  if (!existingProduct.exists) {
    return null;
  }

  await productRef.delete();

  return {
    deleted: true,
    id: String(id),
  };
};

module.exports = {
  createProduct,
  getProductById,
  getAllProducts,
  updateProductById,
  deleteProductById,
};
