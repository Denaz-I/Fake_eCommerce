import { useContext, useEffect, useMemo, useState } from "react";
import { Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { ShoppingBasket } from "@mui/icons-material";
import RemoveCircle from "@mui/icons-material/RemoveCircle";
import {v4 as uuidv4} from "uuid";


import Navbar from "../components/navbar"
import ProductList from "../components/productList";
import { Product } from "../types/Product.types"
import { ProductsContext } from "../App";



function Home(){
    interface CartItem{
        product: Product
        uuid: string
    }

    const shortText = (text: string, max: number) =>
    text.length > max ? text.slice(0, max) + "...":text;


    const [open, setOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")
    const [cart, setCart] = useState<CartItem[]>([])
    const products=useContext<Product[]>(ProductsContext)

    useEffect(() => {
        if(cart) {
            globalThis.localStorage.setItem("cart", JSON.stringify(cart))
        }
    }, [cart])

    function addToCart(product: Product) {
        setCart(prev => [...prev, {product, uuid: uuidv4()}]);
    }

    const filteredProducts = useMemo(() => {
            return products?.filter( (p: Product) => p.title.toLowerCase().includes(search.toLowerCase()))
    }, [search, products])

    function handleRemoveItem(uuid: string) {
        setCart(cart.filter(p => p.uuid !== uuid));
    }

        return <Grid container spacing={2} component="div">
        <Grid item xs={12}>
            <Navbar setDrawerOpen={setOpen} setSearch={setSearch} />
        </Grid>
        <Grid item xs={0} md={2}></Grid>
        <Grid item xs={12} md={8}>
            <ProductList products={filteredProducts} addToCart={addToCart}/>
        </Grid>
        <Grid item xs={0} md={2}></Grid>
        <Drawer open={open} onClose={() => setOpen(false)} sx={{maxWidth:"40vw"}}>
            <List>
                <ListItem>
                        <Typography variant="h5" sx={{marginRight:"16px"}}>Carrello</Typography>
                        <ListItemIcon>
                            <ShoppingBasket />
                        </ListItemIcon>
                </ListItem>
                {cart.map(
                    p => (<ListItem key={p.uuid}>
                        <ListItemText primary={shortText(p.product.title, 18)}/>
                        <ListItemText secondary={p.product.price} sx={{marginLeft:"16px", marginRight:"16px"}}/>
                        <IconButton onClick={() => handleRemoveItem(p.uuid)}><RemoveCircle /></IconButton>    
                    </ListItem> ))
                }
                <ListItem>
                    <ListItemText primary="Totale" />
                    <ListItemText sx={{fontWeight:"bold", color:"red"}}
                        primary={Math.round(cart.reduce((p, c:CartItem) => p+c.product.price, 0) * 100) / 100} />
                </ListItem>
            </List>

        </Drawer>
    </Grid>
}

export default Home
