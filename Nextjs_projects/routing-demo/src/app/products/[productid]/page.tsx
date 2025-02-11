export default function productid({
    params,
}:{
    params:{productid:string};}){
    return <h1>Details of the Product :{params.productid}</h1>
}