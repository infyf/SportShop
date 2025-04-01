import React, { useState } from "react";

const AIForSearch = ({ production }) => {
    const [nameQuery, setNameQuery] = useState("");  
    const [price, setPrice] = useState("");
    const [sizeQuery, setSizeQuery] = useState(""); 
    const [filtProd, setFilterProd] = useState([]);

    const handleSearch = () => {
        if (Array.isArray(production)) {
            const results = production.filter((product) =>
                (nameQuery === "" || product.name.toLowerCase().includes(nameQuery.toLowerCase())) &&
                (price === "" || product.price === Number(price.toLowerCase())) ||
                (sizeQuery === "" || product.size === Number(sizeQuery))
            );
            setFilterProd(results);
        } else {
            setFilterProd([]);
        }
    };

    return (
    

            <div style={{ width: "30%", border: "5px solid ", padding: "1px", background: "linear-gradient(to right, #2328ff, #a1ffaa)", borderRadius: "10px" }}>
                <label>Назва товару:</label>
                <input
                    type="text"
                    placeholder="Що ви шукаєте?"
                    value={nameQuery}
                    onChange={(e) => setNameQuery(e.target.value)}
                    style={{ width: "100%", padding: "5px", marginBottom: "10px", border:" 1px solid #2328ff #a1ffaa" }}
                />
                <label>Ціна товару:</label>
                <input
                    type="text"
                    placeholder="Введіть ціну (наприклад, 50)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
                />
                <label>Розмір товару:</label>
                <input
                    type="number"
                    placeholder="Введіть розмір (наприклад, 42)"
                    value={sizeQuery}
                    onChange={(e) => setSizeQuery(e.target.value)}
                    style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
                />
                <button
                    type="submit"
                    onClick={handleSearch}
                    style={{ width: "100%", padding: "5px", marginTop: "5px" }} 
                    className="active-4"
                >
                    Пошук
                </button>
                {filtProd.length > 0 ? (
                    <ul>
                        {filtProd.map((product) => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p></p>
                )}
            </div>  
    
    );
};

export default AIForSearch;
