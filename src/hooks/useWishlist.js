import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import usePrints from "./usePrints";

const useWishlist = () => {
    const [user] = useAuthState(auth);
    const [userInfo, setUserInfo] = useState({});
    const { allPrint } = usePrints();
    const navigate = useNavigate();

    // load user info 
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/myWishlist/${user?.email}`, {
                method: "GET",
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                        localStorage.removeItem('accessToken');
                        navigate('/login');
                    }
                    return res.json();
                })
                .then(data => setUserInfo(data))
        } else {
            setUserInfo([])
        }
    }, [user?.email, userInfo, navigate])

    // my wishlist 
    const myWishlistArray = [];
    if (userInfo.arrayOfWishlistIds) {
        for (const wishlistId of userInfo.arrayOfWishlistIds) {
            const findPrint = allPrint.find(wishlist => wishlist._id === wishlistId);
            myWishlistArray.push(findPrint);
        }
    }

    return { userInfo, myWishlistArray }
};

export default useWishlist;