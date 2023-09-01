import { createContext, useState } from "react";

export const CUSTOMER_INFORMATION_CONTEXT = createContext();

const CustomerInformation = ({ children }) => {
    const [details, setDetails] = useState({});
    return (
        <CUSTOMER_INFORMATION_CONTEXT.Provider value={{ details, setDetails }}>
            {children}
        </CUSTOMER_INFORMATION_CONTEXT.Provider>
    )
};

export default CustomerInformation;