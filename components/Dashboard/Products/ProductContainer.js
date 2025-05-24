import ProductList from "./ProdList"

export default function ProductContainer(props) {
    return (
        <div>
            <ProductList {...props}/>
        </div>   
    )
}