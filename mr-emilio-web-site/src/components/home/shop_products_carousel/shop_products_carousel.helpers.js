export const getHomepageCarouselProducts = (products = []) => {
  if (!Array.isArray(products)) {
    return [];
  }

  return products
    .filter((product) => product?.showOnHomepage === true)
    .sort(
      (productA, productB) =>
        Number(productA?.homepageOrder ?? 0) -
        Number(productB?.homepageOrder ?? 0)
    );
};

export const getNormalizedProductStock = (product) => {
  const stock = Number(product?.stock);

  return Number.isFinite(stock) ? stock : 0;
};

export const getStockLabel = (product) => {
  const stock = getNormalizedProductStock(product);

  if (stock <= 0) {
    return "Sold out";
  }

  if (product?.stockUnit === "count" || product?.stockUnit === "ct") {
    return `${stock} count`;
  }

  if (stock === 1) {
    return "1 unit";
  }

  return `${stock} units`;
};

export const getInventoryStatus = (stockValue) => {
  const stock = Number(stockValue);

  if (!Number.isFinite(stock) || stock <= 0) {
    return {
      key: "soldOut",
      label: "Out of stock",
    };
  }

  if (stock <= 10) {
    return {
      key: "runningLow",
      label: "Running low",
    };
  }

  return {
    key: "plenty",
    label: "Plenty in stock",
  };
};

export const getQuantityHighlight = (product) =>
  product?.quantityHighlight || product?.sizeLabel || "";

export const getDisplayedPrice = (product) =>
  product?.sellingPriceLabel || product?.manufacturerPriceLabel || "—";

export const getDisplayProduct = (product) => {
  const stock = Number.isFinite(product?.stock) ? product.stock : 0;

  return {
    ...product,

    stock,

    inventoryStatus: getInventoryStatus(stock),

    quantityHighlight: getQuantityHighlight(product),

    displayedPrice: getDisplayedPrice(product),
  };
};
