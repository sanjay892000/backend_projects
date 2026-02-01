import { useParams } from "react-router-dom";
import { useProduct } from "../context/ProductState";
import { useEffect, useState } from "react";
import { useShopState } from "../context/ShopState";
import api from "../utils/api";

function ProductDetails() {

  const { addtoCart } = useShopState()
  const [currProduct, setCurrProduct] = useState({});
  const { product } = useProduct();
  const { pid } = useParams();
  console.log(pid);

  const findCurrProduct = async () => {
    if (product?.length === 0) {
      const data = await api.get(`/product/${pid}`)
      return setCurrProduct(data.data.product);
    }
    setCurrProduct(product.find((item) => item._id === pid));
  };

  useEffect(() => {
    findCurrProduct();
  }, [pid]);

  console.log(currProduct);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-600 mb-6">
        Home &gt; product &gt; {currProduct?.category || "Unknown Category"} &gt;{" "}
        <span className="text-black font-medium">{currProduct?.title}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Images */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col justify-center gap-3">
            {currProduct?.images?.map((img, i) => {
              return (
                <img
                  src={img}
                  alt={`thumbnail-${currProduct?.title}`}
                  className={`w-20 h-24 object-cover border cursor-pointer border-gray-300`}
                />
              );
            })}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <img
              src={currProduct?.thumbnail}
              alt="product"
              className="w-full max-h-[500px] object-contain"
            />
          </div>
        </div>

        {/* Right Content */}
        <div>
          <h1 className="text-2xl font-semibold mb-2">{currProduct?.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-orange-500 text-lg">★★★★★</span>
            <span className="text-sm text-gray-600">(3,045)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-bold">${currProduct?.price}</span>
            <span className="text-gray-400 line-through">
              ${currProduct?.price}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6">{currProduct?.description}</p>

          {/* Size Selector */}
          {/* <div className="mb-6">
                        <p className="font-medium mb-2">Select Your size</p>
                        <div className="flex gap-3">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setcurrSize(size)}
                                    className={`w-12 cursor-pointer h-10 border ${currSize === size
                                        ? "border-black bg-black text-white"
                                        : "border-gray-400"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div> */}

          {/* Add to Cart */}
          <button className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-10 py-4 rounded-full font-medium mb-6" onClick={() => addtoCart(currProduct)}>
            ADD TO CART
          </button>

          {/* Meta Info */}
          <div className="text-sm text-gray-700 space-y-5">
            <p className="capitalize">
              <span className="font-medium">Category:</span>{" "}
              {currProduct?.category}
            </p>
            <p className="capitalize">
              <span className="font-medium">Tag:</span> {currProduct?.tags?.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
