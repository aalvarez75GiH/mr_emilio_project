/* eslint-disable */

const productsCatalogControllers = require("../api/productsCatalog/products.controllers");

const productsCatalogData = require("../api/productsCatalog/products.data");

const seedProductsCatalog = async () => {
  console.log("Starting productsCatalog seed...");
  console.log("");

  let createdCount = 0;
  let updatedCount = 0;
  let failedCount = 0;

  for (const product of productsCatalogData) {
    try {
      if (!product?.id) {
        throw new Error("Product is missing id");
      }

      const productId = String(product.id);

      const existingProduct = await productsCatalogControllers.getProductById(
        productId
      );

      if (existingProduct) {
        await productsCatalogControllers.updateProductById(productId, product);

        console.log(`UPDATED: ${productId}`);

        updatedCount += 1;

        continue;
      }

      await productsCatalogControllers.createProduct(product);

      console.log(`CREATED: ${productId}`);

      createdCount += 1;
    } catch (error) {
      console.error(
        `FAILED: ${product?.id || "unknown-product"}`,
        error.message
      );

      if (error.details) {
        console.error("DETAILS:", JSON.stringify(error.details, null, 2));
      }

      failedCount += 1;
    }
  }

  console.log("");
  console.log("Products catalog seed completed.");
  console.log(`Created: ${createdCount}`);
  console.log(`Updated: ${updatedCount}`);
  console.log(`Failed: ${failedCount}`);

  if (failedCount > 0) {
    process.exitCode = 1;
  }
};

seedProductsCatalog()
  .then(() => {
    process.exit();
  })
  .catch((error) => {
    console.error("PRODUCTS CATALOG SEED ERROR:", error);

    process.exit(1);
  });
