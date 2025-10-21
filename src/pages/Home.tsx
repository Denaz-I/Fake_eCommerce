import { useState } from "react";
import { Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ShoppingBasket } from "@mui/icons-material";


import Navbar from "../components/navbar"
import ProductList from "../components/productList";
import { Product } from "../types/Product.types"

interface Props {
    products: Product[]
}


function Home({ products }:Props){
    const [open, setOpen] = useState(false)
    return <Grid container spacing={2} fixed="true">
        <Grid item xs={12}>
            <Navbar setDrawerOpen={setOpen} />
        </Grid>
        <Grid item xs={0} md={2}></Grid>
        <Grid item xs={12} md={8}>
            {/* <Products /> questo da usare con redux */}
            {/* {products?.map((product:Product) => <div key={product.id}>{product.title}</div>)}  //stampa solo titolo */}
            <ProductList products={products} />
        </Grid>
        <Grid item xs={0} md={2}></Grid>
        <Drawer open={open} onClose={() => setOpen(false)}>
            <List>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <ShoppingBasket />
                        </ListItemIcon>
                        <ListItemText primary="Carrello" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    </Grid>
}

export default Home