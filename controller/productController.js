import Products from "../models/products.js";
import cloudinary from "../config/cloudinary.js";

export const getAllProducts = async (req, res) => {
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


export const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if(!product) {
      return res.status(404).json({message:"Product not found"})
    }
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
    return res.status(200).json({
      ...product._doc,
      thumbnail: thumbnailUrl,
      images: imageUrls
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
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

      const sizes = req.body.sizes
     ? JSON.parse(req.body.sizes)
    : [];

    const product = new Products({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      brand: req.body.brand,
      availability: req.body.availability,
      sizes,
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


export const updateProduct = async(req,res) => {
  try {
    const product = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true},
    )
    if(!product){
      return res.status(404).json({message:"Product not found"});
    }
    res.json(product);
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
}


export const deleteProduct = async(req,res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({ message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCategories = async(req,res) => {
  try {
    const categories = await Products.distinct("category");
    if(!categories){
      return res.status(404).json({message:"No Categories found"})
    }
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
};

export const getByCategory = async(req,res) => {
  try {
    const products = await Products.find({
      category:req.params.category
    })
    if(!products){
      return res.status(404).json({message:"Products not found under the category"})
    }
    return res.json(products)
  } catch (error) {
    return res.status(500).json({message:error.message})
  }

};

export const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;
    const products = await Products.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } }
      ]
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};