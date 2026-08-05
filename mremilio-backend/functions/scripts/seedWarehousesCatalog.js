require("dotenv").config();

console.log("GOOGLE MAPS KEY:", process.env.GOOGLE_MAPS_API_KEY);

const warehousesControllers = require("../api/warehousesCatalog/warehouses.controllers");

const warehousesCatalogData = require("../api/warehousesCatalog/warehouses.data");

const seedWarehousesCatalog = async () => {
  console.log("Starting warehousesCatalog seed...");

  let createdCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const warehouse of warehousesCatalogData) {
    try {
      await warehousesControllers.createWarehouse(warehouse);

      console.log(`CREATED: ${warehouse.id}`);
      createdCount += 1;
    } catch (error) {
      if (error.statusCode === 409) {
        console.log(`SKIPPED: ${warehouse.id} already exists`);

        skippedCount += 1;
        continue;
      }

      console.error(
        `FAILED: ${warehouse?.id || "unknown-warehouse"}`,
        error.message
      );

      if (error.details) {
        console.error("DETAILS:", JSON.stringify(error.details, null, 2));
      }

      failedCount += 1;
    }
  }

  console.log("");
  console.log("Warehouses catalog seed completed.");
  console.log(`Created: ${createdCount}`);
  console.log(`Skipped: ${skippedCount}`);
  console.log(`Failed: ${failedCount}`);
};

seedWarehousesCatalog()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("WAREHOUSES SEED ERROR:", error);

    process.exit(1);
  });
