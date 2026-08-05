const express = require("express");

const productsControllers = require("./products.controllers");

const productsCatalogRouter = express.Router();

const sendErrorResponse = (res, error) => {
  const statusCode = error.statusCode || 500;

  console.error("PRODUCTS CATALOG ERROR:", error);

  return res.status(statusCode).json({
    status: "Failed",
    error: error.message || "Something went wrong",
  });
};

/**
 * GET /api/products-catalog
 *
 * Available query parameters:
 *
 * ?active=true
 * ?category=refrigerated-cheese
 * ?showOnHomepage=true
 * ?featured=true
 */
productsCatalogRouter.get("/", async (req, res) => {
  try {
    const { active, category, showOnHomepage, featured } = req.query;

    const products = await productsControllers.getAllProducts({
      active,
      category,
      showOnHomepage,
      featured,
    });

    return res.status(200).json(products);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
});

/**
 * GET /api/products-catalog/:id
 *
 * Example:
 * GET /api/products-catalog/tequenos
 */
productsCatalogRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productsControllers.getProductById(id);

    if (!product) {
      return res.status(404).json({
        status: "Failed",
        error: `Product with id "${id}" was not found`,
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
});

/**
 * POST /api/products-catalog
 *
 * Creates one catalog product.
 */
productsCatalogRouter.post("/", async (req, res) => {
  try {
    const product = req.body;

    const createdProduct = await productsControllers.createProduct(product);

    return res.status(201).json({
      status: "Success",
      message: "Product created successfully",
      product: createdProduct,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
});

/**
 * PUT /api/products-catalog/:id
 *
 * Partially updates one catalog product.
 *
 * Nested objects must currently be sent as complete objects.
 */
productsCatalogRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await productsControllers.updateProductById(
      id,
      updates
    );

    if (!updatedProduct) {
      return res.status(404).json({
        status: "Failed",
        error: `Product with id "${id}" was not found`,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
});

/**
 * DELETE /api/products-catalog/:id
 *
 * Permanently deletes one catalog product.
 *
 * For normal catalog management, prefer setting:
 * active: false
 */
productsCatalogRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await productsControllers.deleteProductById(id);

    if (!result) {
      return res.status(404).json({
        status: "Failed",
        error: `Product with id "${id}" was not found`,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Product deleted successfully",
      ...result,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
});

module.exports = productsCatalogRouter;
