import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import path from "path";
import fs from 'fs/promises';
import { IProduct } from "../../model/models";

const ProductDetailPage : NextPage<IProduct> = (props) => {    
    return <>
        <h1>[{props.id?.toString()}] { props.title }</h1>
        <h2>{ props.description }</h2>
    </>;
}

const getData = async(): Promise<IProduct[]> => {
    const dataFilePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(dataFilePath);
    const data: IProduct[] = JSON.parse(jsonData.toString())?.products;    

    return data;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await getData();

    const pathParams = data?.map(product => ({params: {productId: product?.id?.toString()}}));

    return {
        paths: pathParams,
        fallback: false // 'blocking' value should be used unless checking the productDetails fully loaded
    };
  }

  export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context;

    const productId = params?.productId;

    const data = await getData()
    if (!data){
        return { 
            redirect: {
                destination: 'no-data',
                permanent: false,
                statusCode: 404
            }
        };
    }

    if (data.length === 0){
        return { notFound: true};
    }

    const product = data.find(product => product.id === productId);

    if (!product){
        return { notFound: true};
    }

    return {
        props: {
            ...product,
        }
    }
  }

  export default ProductDetailPage;