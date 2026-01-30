const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      unique: true,
    },
    title: String,
    description: String,
    category: String,
    price: {
        type:Number
    },
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    brand: String,
    images: [String],
    thumbnail: String,
    tags: [String],
  },
  { timestamps: true },
);

// productSchema.index({title:"text", description:"text"})
productSchema.index({title:1})
productSchema.index({price:1})
productSchema.index({rating:1})
productSchema.index({category:1, price:-1})
productSchema.index({stock:1})


const Product = mongoose.model("Product", productSchema);

module.exports = Product;
