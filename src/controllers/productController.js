import Product from "../models/productModel.js";

// GET /api/products  (public)
export const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: { $regex: req.query.keyword, $options: "i" },
        }
      : {};

    // sirf active products
    const products = await Product.find({ ...keyword, isActive: true }).sort({
      createdAt: -1,
    });

    return res.json(products);
  } catch (error) {
    console.error("Get products error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /api/products/:id (public)
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(product);
  } catch (error) {
    console.error("Get product by id error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// POST /api/products (admin only) – create
export const createProduct = async (req, res) => {
  try {
    const { name, description, image, brand, category, price, countInStock } =
      req.body;

    if (!name || !description || !image || !category || !price) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const product = await Product.create({
      name,
      description,
      image,
      brand,
      category,
      price,
      countInStock: countInStock || 0,
      // isActive ka default model me true hoga
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/products/:id (admin only) – update
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    const fields = [
      "name",
      "description",
      "image",
      "brand",
      "category",
      "price",
      "countInStock",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    const updatedProduct = await product.save();

    return res.json(updatedProduct);
  } catch (error) {
    console.error("Update product error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/products/:id (admin only) – soft delete
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    // soft delete: isActive = false
    product.isActive = false;
    await product.save();

    return res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
