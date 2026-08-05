/* eslint-disable */

const express = require("express");

const warehousesControllers = require("./warehouses.controllers");

const warehousesCatalogRouter = express.Router();

const sendErrorResponse = (res, error) => {
  const statusCode = error.statusCode || 500;

  console.error("WAREHOUSES CATALOG ERROR:", error);

  return res.status(statusCode).json({
    status: "Failed",
    error: error.message || "Something went wrong",
    details: error.details || null,
  });
};

/**
 * GET /api/warehouses-catalog
 *
 * Query parameters:
 * ?active=true
 */
warehousesCatalogRouter.get("/", async (req, res) => {
  try {
    const { active } = req.query;

    let warehouses;

    if (active === "true") {
      warehouses = await warehousesControllers.getActiveWarehouses();
    } else if (active === "false") {
      const allWarehouses = await warehousesControllers.getAllWarehouses();

      warehouses = allWarehouses.filter(
        (warehouse) => warehouse.active === false
      );
    } else {
      warehouses = await warehousesControllers.getAllWarehouses();
    }

    return res.status(200).json(warehouses);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
});

/**
 * GET /api/warehouses-catalog/closest
 *
 * Example:
 * /api/warehouses-catalog/closest?lat=34.05&lng=-84.08
 */
warehousesCatalogRouter.get("/closest", async (req, res) => {
  try {
    const { lat, lng } = req.query;

    const result = await warehousesControllers.getClosestWarehouse({
      lat,
      lng,
    });

    if (!result) {
      return res.status(404).json({
        status: "Failed",
        error: "No active warehouses were found",
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
});

/**
 * GET /api/warehouses-catalog/:id
 */
warehousesCatalogRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const warehouse = await warehousesControllers.getWarehouseById(id);

    if (!warehouse) {
      return res.status(404).json({
        status: "Failed",
        error: `Warehouse with id "${id}" was not found`,
      });
    }

    return res.status(200).json(warehouse);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
});

/**
 * POST /api/warehouses-catalog
 *
 * Creates a new warehouse.
 *
 * The backend:
 * - validates the warehouse payload;
 * - forward-geocodes physical_address;
 * - normalizes inventory;
 * - validates selling prices against productsCatalog;
 * - creates timestamps;
 * - writes the warehouse to warehousesCatalog.
 */
warehousesCatalogRouter.post("/", async (req, res) => {
  try {
    const warehouse = req.body;

    const createdWarehouse = await warehousesControllers.createWarehouse(
      warehouse
    );

    return res.status(201).json({
      status: "Success",
      message: "Warehouse created successfully",
      warehouse: createdWarehouse,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
});

/**
 * PUT /api/warehouses-catalog/:id
 *
 * Updates warehouse metadata.
 *
 * Nested objects are safely merged by the controller.
 * If physical_address changes, the address is geocoded again.
 */
warehousesCatalogRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedWarehouse = await warehousesControllers.updateWarehouseById(
      id,
      updates
    );

    if (!updatedWarehouse) {
      return res.status(404).json({
        status: "Failed",
        error: `Warehouse with id "${id}" was not found`,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Warehouse updated successfully",
      warehouse: updatedWarehouse,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
});

/**
 * PATCH /api/warehouses-catalog/:id/inventory
 *
 * Partially updates inventory entries.
 *
 * Example body:
 *
 * {
 *   "tequenos": {
 *     "stock": 8
 *   },
 *
 *   "queso-gouda-small": {
 *     "stock": 3,
 *     "active": true
 *   }
 * }
 */
warehousesCatalogRouter.patch("/:id/inventory", async (req, res) => {
  try {
    const { id } = req.params;
    const inventoryUpdates = req.body;

    const result = await warehousesControllers.updateWarehouseInventory(
      id,
      inventoryUpdates
    );

    return res.status(200).json({
      status: "Success",
      message: "Warehouse inventory updated successfully",
      ...result,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
});

/**
 * POST /api/warehouses-catalog/:id/decrement-inventory
 *
 * Intended for the future order workflow.
 *
 * Example body:
 *
 * {
 *   "orderItems": [
 *     {
 *       "productId": "tequenos",
 *       "quantity": 2
 *     }
 *   ]
 * }
 */
warehousesCatalogRouter.post("/:id/decrement-inventory", async (req, res) => {
  try {
    const { id } = req.params;
    const { orderItems } = req.body;

    const updatedWarehouse =
      await warehousesControllers.decrementWarehouseInventoryFromOrder({
        warehouseId: id,
        orderItems,
      });

    return res.status(200).json({
      status: "Success",
      message: "Warehouse inventory decremented successfully",
      warehouse: updatedWarehouse,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
});

/**
 * DELETE /api/warehouses-catalog/:id
 *
 * Permanently deletes a warehouse.
 *
 * For normal operations, prefer:
 * active: false
 *
 * or:
 * status: "temporarilyClosed"
 */
warehousesCatalogRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await warehousesControllers.deleteWarehouseById(id);

    if (!result) {
      return res.status(404).json({
        status: "Failed",
        error: `Warehouse with id "${id}" was not found`,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Warehouse deleted successfully",
      ...result,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
});

module.exports = warehousesCatalogRouter;
