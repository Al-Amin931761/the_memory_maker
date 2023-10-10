import { useEffect, useState } from "react";

const usePrints = () => {
    const [allPrint, setAllPrint] = useState([]);

    useEffect(() => {
        fetch(`https://the-memory-maker-server.vercel.app/allPrint`)
            .then(res => res.json())
            .then(data => setAllPrint(data))
    }, [allPrint]);
    return { allPrint }
};

export default usePrints;