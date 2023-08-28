import { useEffect, useState } from "react";

const usePrints = () => {
    const [prints, setPrints] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/prints`)
            .then(res => res.json())
            .then(data => setPrints(data))
    }, [prints])

    return [prints, setPrints];
};

export default usePrints;