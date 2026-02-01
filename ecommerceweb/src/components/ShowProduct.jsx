import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useProduct } from "../context/ProductState";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Loader2 } from "lucide-react";

function ShowProduct() {
  const { product, page, setPage, totalPage, loading, category = "", fetchProduct, reloadKey } = useProduct()

  useEffect(() => {
    fetchProduct(category);
  }, [page, category, reloadKey]);

  const loadMore = () => {
    if (page < totalPage) {
      setPage(page + 1)
    }
  }

  return (
    <section className="max-w-7xl mx-auto p-12 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
          : product.map((elm, i) => {
            return (
              <ProductCard
                key={elm.title + i}
                image={elm.thumbnail}
                title={elm.title}
                price={elm.price}
                rating={elm.rating}
                description={elm.description}
                discountPercentage={elm.discountPercentage}
                category={elm.category}
                id={elm._id}
                currProduct={elm}
              />
            );
          })}
      </div>

      <div className="flex justify-center items-center mt-15">
        <button
          className="font-medium bg-red-500 py-2 px-4 flex items-center gap-2 rounded-sm text-white cursor-pointer hover:bg-white hover:outline-1 hover:outline-red-500 hover:text-red-600"
          onClick={loadMore} disabled={loading || page >= totalPage}
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading...
            </>
          ) : (
            "Load More..."
          )}
        </button>
      </div>
    </section>
  );
}

export default ShowProduct;
