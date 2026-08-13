require("dotenv").config();

const warehousesControllers = require("../api/warehousesCatalog/warehouses.controllers");

const warehousesCatalogData = require("../api/warehousesCatalog/warehouses.data");

const seedWarehousesCatalog = async () => {
  console.log("Starting warehousesCatalog seed...");
  console.log("");

  let createdCount = 0;
  let updatedCount = 0;
  let failedCount = 0;

  for (const warehouse of warehousesCatalogData) {
    try {
      const existingWarehouse = await warehousesControllers.getWarehouseById(
        warehouse.id
      );

      if (existingWarehouse) {
        await warehousesControllers.updateWarehouseById(
          warehouse.id,
          warehouse
        );

        console.log(`UPDATED: ${warehouse.id}`);

        updatedCount += 1;

        continue;
      }

      await warehousesControllers.createWarehouse(warehouse);

      console.log(`CREATED: ${warehouse.id}`);

      createdCount += 1;
    } catch (error) {
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
  console.log(`Updated: ${updatedCount}`);
  console.log(`Failed: ${failedCount}`);

  if (failedCount > 0) {
    process.exitCode = 1;
  }
};

seedWarehousesCatalog()
  .then(() => {
    process.exit();
  })
  .catch((error) => {
    console.error("WAREHOUSES SEED ERROR:", error);

    process.exit(1);
  });
