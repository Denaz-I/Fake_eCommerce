import { ShoppingBasket } from "@mui/icons-material"
import { Card, CardHeader, CardContent, CardActions, Button, Typography, CardMedia } from "@mui/material"
// import { useSelector } from "react-redux"
import styled from "@emotion/styled"
import {useMediaQuery, useTheme} from "@mui/material"

import "./style.scss"
import { Product } from "../../types/Product.types"

interface Props {
    product: Product
}

const MECCardMedia = styled(CardMedia)`
    height: 300px
    `
const MECCardHeader = styled(CardHeader)`
    & span {
        text-overflow: ${ props => props.isLong ? 'ellipsis': 'hidden'};
    }
`

function ProductCard({product}: Props)  {
    const theme  = useTheme();
    const { title, description, thumbnail} = product
    const isMD  = useMediaQuery(theme.breakpoints.up("md"));
    const headerClassName = isMD ? "cardHeadrMD" : "cardHeaderXS"

    return <Card className="card" sx={{height:{xs:"420px", md:"600px"}}}>
        <MECCardHeader title={title} className={headerClassName} isLong={title?.lenght > 22}  />
        <MECCardMedia component="img"
        image={thumbnail}
        alt = {title}
        />
        <CardContent sx={{height:"140px", display:{xs:"none", md:"block"}}}>
            <Typography>{description}</Typography>
        </CardContent>
        <CardActions>
            <Button>
                <ShoppingBasket color="primary" sx={{marginRight:"4px"}}/>Aggiungi
            </Button>
        </CardActions>
    </Card>
}

export  default ProductCard