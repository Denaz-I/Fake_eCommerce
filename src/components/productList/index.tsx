import { Grid } from "@mui/material"
import ProductCard from "../productCard";
import { Product } from "../../types/Product.types";

interface Props {
    products: Product[]
    setCartItem: (p: Product) => void
}


function ProductList({products, setCartItem}:Props) {

    return <Grid container spacing={2}>
            {products?.filter(product => product).map(product =>
                <Grid item sx={{px:{xs:3, sm:0}}} xs={12} md={6} lg={4} xl={3} key={product.id  }>
                    <ProductCard product={product} setCartItem={setCartItem}/>
                </Grid>
            )
            }
        </Grid>
}

export default ProductList;