import { useEffect, useState } from "react";

const usePrints = () => {
    const [allPrint, setAllPrint] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/allPrint`)
            .then(res => res.json())
            .then(data => setAllPrint(data))
    }, [allPrint]);
    return { allPrint }
};

export default usePrints;