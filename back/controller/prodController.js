const db = require("../db")

// Get all products
const getAll = async (req, res) => {
    try {
        const [prod] = await db.query("SELECT * FROM product")
        res.json(prod)
    } catch (error) {
        console.error("ERROR FETCHING:", error)
        res.status(500).json({ message: "ERROR FETCHING" })
    }
}

// Get one product by ID
const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Fetching product with ID:", id);  // ✅ Debugging

        if (!id) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const [prod] = await db.query("SELECT * FROM product WHERE prod_id = ?", [id]);

        if (prod.length === 0) {
            return res.status(404).json({ message: "PRODUCT NOT FOUND" });
        }

        res.json(prod[0]);
    } catch (error) {
        console.error("❌ Error fetching product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = { getAll, getOne }
