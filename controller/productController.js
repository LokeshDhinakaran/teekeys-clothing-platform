const Products = require("../models/products");
const cloudinary = require("../config/cloudinary");

exports.getAllProducts = async (req, res) => {
  try {
    const { Page = 1, Limit = 5, category, minPrice, maxPrice } = req.query;

    let filter = {};

    if (category) filter.category = category;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const page = parseInt(Page);
    const limit = parseInt(Limit);
    const skip = (page - 1) * limit;

    const productsData = await Products.find(filter)
      .skip(skip)
      .limit(limit);

    const updatedProducts = productsData.map(product => {
      const thumbnailUrl = cloudinary.url(product.thumbnail.public_id, {
        type: "private",
        sign_url: true,
        expires_at: Math.floor(Date.now() / 1000) + 60
      });

      const imageUrls = product.images.map(img =>
        cloudinary.url(img.public_id, {
          type: "private",
          sign_url: true,
          expires_at: Math.floor(Date.now() / 1000) + 60
        })
      );

      return {
        ...product._doc,
        thumbnail: thumbnailUrl,
        images: imageUrls
      };
    });

    res.status(200).json(updatedProducts);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const product = await Products.findOne({ id: req.params.id });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    if (!req.files || !req.files.thumbnail) {
      return res.status(400).json({ error: "Thumbnail required" });
    }

    const thumbnail = {
      public_id: req.files.thumbnail[0].filename
    };

    const images = req.files.images
      ? req.files.images.map(file => ({
          public_id: file.filename
        }))
      : [];

    const product = new Products({
      title: req.body.title,
      category: req.body.category,
      price: req.body.price,
      thumbnail,
      images
    });

    await product.save();

    res.status(201).json({
      message: "product created",
      data: product
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};