import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// POST /api/orders  (user) – create order from cart
export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    let totalPrice = 0;
    const finalItems = [];

    // Har cart item ke liye product check + stock update + price calc
    for (const item of orderItems) {
      const product = await Product.findById(item.productId || item.product);

      if (!product || !product.isActive) {
        return res.status(400).json({
          message: `Product not available: ${item.name || item.productId}`,
        });
      }

      if (product.countInStock < item.qty) {
        return res.status(400).json({
          message: `Not enough stock for product: ${product.name}`,
        });
      }

      // Price backend se lo (secure)
      const price = product.price;
      const lineTotal = price * item.qty;
      totalPrice += lineTotal;

      // stock decrease
      product.countInStock -= item.qty;
      await product.save();

      finalItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        qty: item.qty,
        price,
      });
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems: finalItems,
      shippingAddress,
      totalPrice,
    });

    return res.status(201).json(order);
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /api/orders/my  (user) – current user orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    return res.json(orders);
  } catch (error) {
    console.error("Get my orders error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /api/orders  (admin) – all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .lean();

    return res.json(orders);
  } catch (error) {
    console.error("Get all orders error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/orders/:id/status  (admin) – update status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status || order.status;
    const updated = await order.save();

    return res.json(updated);
  } catch (error) {
    console.error("Update order status error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
