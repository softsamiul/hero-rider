import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from './Checkout/Checkout';

const stripePromise = loadStripe('pk_test_51KD2g5SBvY5Yhfjc08HBiEE24SaSh8miN2e86sHi2IW1G5ClgudPdTTZMHdz4BjrXrZ6W0axNq0YAW7LJb3V1fTW00YPfMOe3O')



const Payment = () => {
    const {id} = useParams();
    const [order, setOrder] = useState({})

    const {price, title} = order;

    useEffect(()=>{
        fetch(`http://localhost:7000/packages/${id}`)
        .then(res => res.json())
        .then(data => setOrder(data))
    },[])




    console.log(id)
    console.log(order)
    return (
        <div>
            
            <h2>Paying for {title}</h2>
            <button>Pay Now ${price}</button>

            {order?.price && <Elements stripe={stripePromise}>
                <Checkout order={order}>
                </Checkout>
               
            </Elements>}
        </div>
    );
};

export default Payment;