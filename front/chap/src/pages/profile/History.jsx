import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

function PurchaseHistory() {
    const { history, purchaseHist, error } = useCart();
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [sortOrder, setSortOrder] = useState("newest");
    const [minPrice, setMinPrice] = useState(0);

    useEffect(() => {
        purchaseHist(); // Fetch purchase history when the page loads
    }, []);

    useEffect(() => {
        let sortedHistory = [...history];

        if (sortOrder === "newest") {
            sortedHistory.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (sortOrder === "price-high") {
            sortedHistory.sort((a, b) => b.total_price - a.total_price);
        }

        sortedHistory = sortedHistory.filter(item => item.total_price >= minPrice);
        setFilteredHistory(sortedHistory);
    }, [history, sortOrder, minPrice]);

    return (
        <div className="container mt-4">
            <h2>📜 Purchase History</h2>
            {error && <p className="text-danger">{error}</p>}

            <div className="d-flex mb-3">
                <select className="form-select me-2" onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="newest">Sort by: Newest</option>
                    <option value="price-high">Sort by: Price (High to Low)</option>
                </select>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                />
            </div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredHistory.map(item => (
                        <tr key={item.purchase_id}>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price}</td>
                            <td>${item.total_price}</td>
                            <td>{new Date(item.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PurchaseHistory;
