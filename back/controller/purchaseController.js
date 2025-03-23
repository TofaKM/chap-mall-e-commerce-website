const db = require("../db");

// Calculate total price
const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Create purchase
const createPurchase = async (connection, user_id, cartItems) => {
    const query = "INSERT INTO purchase (user_id, prod_id, quantity, total_price) VALUES ?";
    const values = cartItems.map(item => [
        user_id,
        item.prod_id,
        item.quantity,
        item.price * item.quantity
    ]);

    await connection.query(query, [values]);
};

// Clear cart after purchase
const clearCartAfterPurchase = async (connection, user_id) => {
    const query = "DELETE FROM cart WHERE user_id = ?";
    await connection.query(query, [user_id]);
};

// Main Checkout Function
const checkOut = async (req, res) => {
    const user_id = req.session.user?.id
    const { cartItems } = req.body;

    if (!user_id || !cartItems || cartItems.length === 0) {
        return res.status(400).json({ error: "Invalid request" });
    }

    const connection = await db.getConnection(); // Start MySQL connection

    try {
        await connection.beginTransaction(); // Start transaction
        
        // 1️⃣ Calculate total price
        const totalPrice = calculateTotalPrice(cartItems);

        // 2️⃣ Create purchase
        await createPurchase(connection, user_id, cartItems);

        // 3️⃣ Clear cart after purchase
        await clearCartAfterPurchase(connection, user_id);

        // ✅ Commit transaction
        await connection.commit();

        res.status(201).json({ message: "Purchase successful ✅", totalPrice });

    } catch (error) {
        await connection.rollback(); // ❌ Rollback if error
        console.error("Transaction Error:", error);
        res.status(500).json({ error: "Purchase failed ❌" });
    } finally {
        connection.release(); // ✅ Release connection
    }
};

// Fetch Purchase History
const checkHistory = async (req, res) => {
    const user_id = req.session.user?.id

    const query = `
        SELECT p.purchase_id, p.prod_id, p.quantity, p.total_price, p.created_at, pr.title 
        FROM purchase p 
        JOIN product pr ON p.prod_id = pr.prod_id 
        WHERE p.user_id = ? 
        ORDER BY p.created_at DESC
    `;

    try {
        const [results] = await db.query(query, [user_id]);
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching purchase history ❌" });
    }
};

module.exports = { checkOut, checkHistory };
