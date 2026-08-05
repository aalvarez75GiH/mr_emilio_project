const { PRODUCT_BENEFIT_VALUES } = require("./products.constants");

const validateBenefits = (benefits = []) => {
  if (!Array.isArray(benefits)) {
    const error = new Error("Benefits must be an array");
    error.statusCode = 400;
    throw error;
  }

  benefits.forEach((benefit) => {
    if (!PRODUCT_BENEFIT_VALUES.includes(benefit?.type)) {
      const error = new Error(
        `Invalid product benefit type: "${benefit?.type}"`
      );
      error.statusCode = 400;
      throw error;
    }

    if (
      benefit.type === "pieceCount" &&
      (!Number.isFinite(benefit.value) || benefit.value <= 0)
    ) {
      const error = new Error(
        'Benefit "pieceCount" requires a positive numeric value'
      );
      error.statusCode = 400;
      throw error;
    }
  });
};
