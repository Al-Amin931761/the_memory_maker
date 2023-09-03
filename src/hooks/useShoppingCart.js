import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const useShoppingCart = () => {
    const [user] = useAuthState(auth);
    const [cartData, setCartData] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/temporaryData/${user?.email}`)
            .then(res => res.json())
            .then(data => setCartData(data))
    }, [user?.email, cartData]);

    // print quantity 
    const quantityArray = cartData.map(data => data.quantity);
    let printQuantity = 0;
    for (const quantity of quantityArray) {
        printQuantity = quantity + printQuantity;
    };

    // subtotal 
    const subtotalArray = cartData.map(data => parseInt(data.price) * data.quantity);
    let subTotal = 0;
    for (let amount of subtotalArray) {
        subTotal = amount + subTotal;
    };

    // shipping, tax and grand total calculation 
    let shipping = 50;
    let tax = subTotal * 0.05;
    let grandTotal = parseFloat((subTotal + tax + shipping).toFixed(2));

    return { cartData, setCartData, printQuantity, subTotal, grandTotal, tax, shipping };
};

export default useShoppingCart;