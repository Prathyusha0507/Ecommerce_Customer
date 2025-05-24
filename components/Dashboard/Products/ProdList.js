import ProductCard from "./ProductCard";
import { ProdListContainer } from "../../Styles/ProdListContainer.styled";

export default function ProductList(props) {
    return (
        <ProdListContainer>
            {props.list.map((item) => (
                <ProductCard key={item._id} item={item} />
                ))}
        </ProdListContainer> 
    )
}