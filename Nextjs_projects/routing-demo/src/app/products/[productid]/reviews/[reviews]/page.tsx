import { notFound } from "next/navigation";
export default function reviewdetails({
    params,
}:{
    params:{
        productid:string;
        reviews:string;
};
})
{
    if(parseInt(params.reviews)>1000){
        notFound();
    }
    return <h1>review {params.reviews} for product{params.productid}</h1>
}