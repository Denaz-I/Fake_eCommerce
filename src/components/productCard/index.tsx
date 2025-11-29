import { ShoppingBasket } from "@mui/icons-material"
import { Card, CardHeader, CardContent, CardActions, Button, Typography, CardMedia, useMediaQuery, useTheme } from "@mui/material"
import styled from "@emotion/styled"

import "./style.scss"
import { Product } from "../../types/Product.types"

interface Props {
    product: Product
    setCartItem?: (p: Product) => void
}

const shortText = (text: string, max: number) =>
    text.length > max ? text.slice(0, max) + "...":text;

const MECCardMedia = styled(CardMedia)`
    height: 300px
    `
const MECCardHeader = styled(CardHeader)`
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
`

function ProductCard({product, setCartItem}: Readonly<Props>)  {
    const theme  = useTheme();
    const { title, description, thumbnail} = product
    const isMD  = useMediaQuery(theme.breakpoints.up("md"));
    const headerClassName = isMD ? "cardHeadrMD" : "cardHeaderXS"

    return <Card className="card" sx={{height:{xs:"420px", md:"600px"}}}>
        <MECCardHeader title={shortText(title, 20)} className={headerClassName} />
        <MECCardMedia image={thumbnail} title={title}/>
        <CardContent sx={{height:"140px", display:{xs:"none", md:"block"}, textOverflow:"ellipsis"}} >
            <Typography>
                {description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button onClick={() => setCartItem?.(product)}>
                <ShoppingBasket color="primary" sx={{marginRight:"4px"}}/>Aggiungi
            </Button>
        </CardActions>
    </Card>
}

export  default ProductCard