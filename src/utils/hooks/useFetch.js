// Exportam custom hook-ul useFetch care va fi folosit in toata aplicatia pentru a face call-uri catre server

import { useEffect, useState } from "react";

export function useFetch(url){
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then((dataJson) => {
                setData(dataJson);
            })
    }, [url]);

    return data;
}