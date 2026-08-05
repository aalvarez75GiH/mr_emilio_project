const firebaseController = require("../fb");

const productsCatalogData = require("../api/productsCatalog/products.data");

const PRODUCTS_COLLECTION = "productsCatalog";

const seedProductsCatalog = async () => {
  console.log("Starting productsCatalog seed...");

  let createdCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const product of productsCatalogData) {
    try {
      if (!product?.id) {
        throw new Error("Product is missing id");
      }

      const productId = String(product.id);

      const productRef = firebaseController.db
        .collection(PRODUCTS_COLLECTION)
        .doc(productId);

      const existingProduct = await productRef.get();

      if (existingProduct.exists) {
        console.log(`SKIPPED: ${productId} already exists`);
        skippedCount += 1;
        continue;
      }

      const now = new Date().toISOString();

      const payload = {
        ...product,
        createdAt: product.createdAt || now,
        updatedAt: now,
      };

      await productRef.set(payload);

      console.log(`CREATED: ${productId}`);
      createdCount += 1;
    } catch (error) {
      console.error(
        `FAILED: ${product?.id || "unknown-product"}`,
        error.message
      );

      failedCount += 1;
    }
  }

  console.log("");
  console.log("Products catalog seed completed.");
  console.log(`Created: ${createdCount}`);
  console.log(`Skipped: ${skippedCount}`);
  console.log(`Failed: ${failedCount}`);
};

seedProductsCatalog()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("SEED ERROR:", error);
    process.exit(1);
  });
