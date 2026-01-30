import { createContext, useCallback, useContext, useState } from "react"

export const ProductContext = createContext(null)

function ProductState({ children }) {

  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [reloadKey, setReloadKey] = useState(0);


  const fetchProduct = useCallback(async (category) => {
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/v3.2/product/all?page=${page}&perpage=12&category=${category}`,
      );
      const data = await response.json();
      setTotalPage(data.totalPage);
      setProduct([...product, ...data.product]);
      console.log(data)
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
    
  }, [page, category, reloadKey]);

  return (
    <ProductContext.Provider value={{ product, setProduct, page, setPage, totalPage, loading, category, setCategory, fetchProduct, reloadKey, setReloadKey }}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductState;

export const useProduct = () => useContext(ProductContext);

