
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch } from 'react-redux';
import { ADD } from '../Components/redux/actions/action';
import axios from 'axios';

const Product = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const send = (item) => {
        dispatch(ADD(item));
        alert("Item added successfully");
    };

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error("There was an error fetching the product!", error);
        } finally {
            setLoading(false);
        }
    };

    const Loading = () => {
        return (
            <div className="mt-4">
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
                <Spinner animation="grow" />
            </div>
        );
    };

    const ShowProduct = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mt-5">
                        <img src={product.image} alt={product.image} height={400} width={500} />
                    </div>
                    <div className="col-lg-6 mt-5">
                        <h4 className='texr-uppercase'>{product.category}</h4>
                        <h1 className='display-5'>{product.title}</h1>
                        <p className='fw-bolder'>Rating {product.rating && product.rating.rate}</p>
                        <h3>$ {product.price}</h3>
                        <p>{product.description}</p>
                        <Button onClick={() => send(product)} variant="dark">Add to Cart</Button>
                        <Button className='ms-3' variant="dark">Go to Cart</Button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="container">
                {loading ? <Loading /> : <ShowProduct />}
            </div>
        </div>
    );
};

export default Product;
