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
    return [cartData, setCartData];
};

export default useShoppingCart;