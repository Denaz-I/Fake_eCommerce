import { Grid } from "@mui/material"
import ProductCard from "../productCard";
import { Product } from "../../types/Product.types";

interface Props {
    products: Product[]
}


function ProductList({products}:Props) {

    return <Grid container spacing={2}>
            {products?.filter(product => product).map(product =>
                <Grid item sx={{px:{xs:3, sm:0}}} xs={12} md={6} lg={4} xl={3} key={product}>
                    <ProductCard product={product} />
                </Grid>
            )
            }
        </Grid>
}

export default ProductList;