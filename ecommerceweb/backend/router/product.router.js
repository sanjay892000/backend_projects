const express = require("express");
const ProductModel = require("../schema/product.model");
const product = require("../ecommerce_product.json");
const router = express.Router();

router.get("/add", async (req, res) => {
  console.log(product.products);
  try {
    await ProductModel.deleteMany({});
    const pdct = await ProductModel.insertMany(product.products);
    res.send({
      message: "All product add successfully!",
      total_product: pdct.length,
      product: pdct,
    });
  } catch (error) {
    res.send({
      message: "Internal server error!",
      total_product: null,
      product: null,
    });
  }
});

router.get("/all", async (req, res) => {
  const {
    page = 1,
    perpage = 10,
    category,
    maxPrice,
    minPrice,
    rating,
    search,
  } = req.query;
  console.log(page, perpage);

  let query = {};

  if (category) query.category = category;

  if (minPrice && maxPrice) {
    query.price = { $gte: minPrice, $lte: maxPrice };
  } else {
    if (maxPrice) query.price = { $lte: maxPrice };
    if (minPrice) query.price = { $gte: minPrice };
  }

  if (rating) query.rating = { $gte: rating };

  if (search)
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  console.log(query);

  try {
    const total = await ProductModel.countDocuments(query);
    const totalPage = Math.ceil(total / perpage);
    console.log(totalPage, page);
    if (page > totalPage) {
      return res.status(404).json({
        message: `Invalid page! total page is ${totalPage}`,
        total,
        page,
        totalPage,
      });
    }
    const product = await ProductModel.find(query)
      .limit(perpage)
      .skip(perpage * (page - 1));
    res.status(200).send({
      message: "Product fetched successfully!",
      total,
      product: product,
      page,
      totalPage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error!",
      total_product: null,
      product: null,
    });
  }
});

router.get("/category", async (req, res) => {
  const { category, page = 1, perpage = 10 } = req.query;

  try {
    const total = await ProductModel.countDocuments({ category: category });
    const totalPage = Math.ceil(total / perpage);
    if (page > totalPage) {
      return res.status(404).json({
        message: `Invalid page! total page is ${totalPage}`,
        total,
        result: [],
        page,
        totalPage,
      });
    }
    const product = await ProductModel.find({ category: category })
      .limit(perpage)
      .skip(perpage * (page - 1));
    res.status(200).send({
      message: "Product fetched successfully!",
      total,
      result: product.length,
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error!",
      total_product: null,
      product: null,
    });
  }
});

router.get("/search", async (req, res) => {
  const { q, page = 1, perpage = 10 } = req.query;

  const query = {
    $or: [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ],
  };

  try {
    const total = await ProductModel.countDocuments(query);
    const totalPage = Math.ceil(total / perpage);
    if (page > totalPage) {
      return res.status(404).json({
        message: `Invalid page! total page is ${totalPage}`,
        total,
        result: [],
        page,
        totalPage,
      });
    }
    const product = await ProductModel.find(query)
      .limit(perpage)
      .skip(perpage * (page - 1));
    res.status(200).send({
      message: "Product fetched successfully!",
      total,
      result: product.length,
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error!",
      total_product: null,
      product: null,
    });
  }
});

router.get("/rating", async () => { });

router.get("/price", async () => { });

router.get("/:productId", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.productId);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found!",
        product: null,
      });
    }
    res.status(200).send({
      success: true,
      message: "Product fetched successfully!",
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error!",
      product: null,
    });
  }
});

module.exports = router;
