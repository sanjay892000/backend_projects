import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

function ProductCard({
    image,
    title,
    price,
    description,
    discountPercentage = 0,
    rating = 4.5,
    category,
    id
}) {
    const newPrice = (price - (price * discountPercentage) / 100).toFixed(2);

    return (
        <Link
            to={`/productdetails/${id}`}
            className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
        >
            {/* Image Section */}
            <div className="relative bg-gray-100 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
                />

                {/* Discount Badge */}
                {discountPercentage > 0 && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {discountPercentage}% OFF
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Title */}
                <h3 className="text-sm font-semibold text-slate-800 line-clamp-2">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                            key={i}
                            size={14}
                            className={`${rating >= i
                                ? "fill-red-500 text-red-500"
                                : "text-gray-300 fill-gray-300"
                                }`}
                        />
                    ))}
                    <span className="text-xs text-slate-600 ml-1">
                        ({rating})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mt-3">
                    <span className="text-lg font-bold text-slate-900">
                        ${newPrice}
                    </span>
                    {discountPercentage > 0 && (
                        <span className="text-sm text-gray-400 line-through">
                            ${price}
                        </span>
                    )}
                </div>

                <button className="mt-4 w-full bg-gray-700 text-white text-sm font-semibold py-2 rounded-lg transition">
                    Add to Cart
                </button>
            </div>
        </Link>
    );
}

export default ProductCard;
