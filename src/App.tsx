import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import About from "./pages/About"
import Home from "./pages/Home"
import PageNotFound from "./pages/PageNotFound"
import { createContext, useEffect, useState } from "react"

import { Product } from "./types/Product.types"

interface FetchProductsInterface {
    setProducts: (products: Product[]) => void 
}

async function fetchProducts({setProducts}: FetchProductsInterface) {
    const response = await fetch("https://dummyjson.com/products")
    const data = await response.json()
    setProducts(data.products)
}


export const ProductsContext = createContext<Product[]>([])

interface HomeContextProps {
  products: Product[]
}

function HomeContext({products} : Readonly<HomeContextProps>) {
  return <ProductsContext.Provider value={products} >
    <Home />
  </ProductsContext.Provider>
}

function App() {

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchProducts({setProducts})
  }, [])
  
  return <Router>
    <Routes>
      <Route path="/" element={<HomeContext products={products}/>} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </Router>

}
export default App
