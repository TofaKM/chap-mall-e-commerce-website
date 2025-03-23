const db = require("../db")

//view
const viewCart = async (req, res) => {
    const user_id = req.session.user?.id

    try{
        const [cartItems] = await db.query('SELECT c.cart_id,c.prod_id,c.quantity,p.title,p.price,p.imgUrl FROM cart c JOIN product p ON c.prod_id = p.prod_id WHERE c.user_id = ?',
        [user_id])
        res.status(200).json(cartItems)
    }
    catch(error){
        console.error("View cart error:", error)
        res.status(500).json({ message: "Internal server error ❌" })
    }
}
//add
const addCart = async (req, res) => {
    const {prod_id,quantity} = req.body
    const user_id = req.session.user?.id

    console.log("Session Data in addCart:", req.session.user)
    
    if (!user_id) {
        return res.status(401).json({ message: "User not logged in ❌" })
    }

    try{
        await db.query(
            'INSERT INTO cart (user_id,prod_id,quantity) VALUES (?,?,?) ON DUPLICATE KEY UPDATE quantity = quantity + ?',
            [user_id,prod_id,quantity,quantity])
            res.status(200).json({message:"PRODUCT ADDED ✅"})
    }
    catch(error){
        console.error("add to cart",error)
        res.status(500).json({message:"INTERNAL SERVER ERROR ❌"})
    }

}
//increase
const increaseCart = async (req, res) => {
   const user_id = req.session.user?.id; 
   const {prod_id} = req.body
   
   try{
        await db.query("UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND prod_id = ?",
        [user_id,prod_id])
        res.status(200).json({ message: "Product quantity increased ✅" })
   }
   catch(error){
    console.error("Increase quantity error:", error)
    res.status(500).json({ message: "Internal server error ❌" })
   }
}
//decrease
const decreaseCart = async (req, res) => {
    const user_id = req.session.user?.id;

    const {prod_id} = req.body
    try{
        await db.query("UPDATE cart SET quantity = GREATEST(quantity -1, 0) WHERE user_id =? AND prod_id = ?",
        [user_id,prod_id])
        res.status(200).json({message:"PRODUCT DECREASED"})
    }
    catch(error){
        console.error("DECREASE QUANTITY ERROR",error)
        res.status(500).json({message:"Internal server error ❌"})
    }
}
//remove
const removeCart = async (req, res) => {
    const user_id = req.session.user?.id;

    const {prod_id} = req.body
    try{
        await db.query("DELETE FROM cart WHERE user_id = ? AND prod_id = ?",
        [user_id,prod_id])
        res.status(200).json({ message: "Product removed from cart ✅" })
    }
    catch(error){
        console.error("Remove item error:", error)
        res.status(500).json({ message: "Internal server error ❌" })
    }
}
//clear
const clearCart = async (req, res) => {
    const user_id = req.session.user?.id;

    try{
        await db.query("DELETE FROM cart WHERE user_id = ?",
        [user_id])
        res.status(200).json({ message: "Cart cleared ✅" })
    }
    catch(error){
        console.error("Clear cart error:", error)
        res.status(500).json({ message: "Internal server error ❌" })
    }
}

module.exports = { viewCart, addCart, removeCart, increaseCart, decreaseCart, clearCart }
