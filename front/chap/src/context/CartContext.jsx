import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export function CartContextProvider ({ children }){
    const [cartItems, setCartItems] = useState([])
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [history, setHistory] = useState([])
    const [total,setTotal] = useState(0)

    //Fetch Cart for the logged-in user (from session)
    const fetchCart = async () => {
        try {
            const response = await axios.get('http://localhost:3000/cart/view', { withCredentials: true })
            setCartItems(response.data)
        } catch (err) {
            setError("Error fetching cart ❌")
            console.error(err)
        }
    }
    const calculateTotal = () =>{
        const totalQ = cartItems.reduce((acc,item)=> acc+ item.quantity,0)
        setTotal(totalQ)
    }
    //useffect
    useEffect(() => {
        fetchCart() // Fetch cart when user logs in
    }, [])

    useEffect(()=>{
        calculateTotal()
    },[cartItems])

    //add into cart
    const addItem = async (prod_id) => {
        try {
            await axios.post('http://localhost:3000/cart/add', { prod_id, quantity: 1 }, { withCredentials: true })
            fetchCart() // Refresh cart after adding item
            setSuccess("Product added to cart ✅")
        } catch (err) {
            setError("Error adding item ❌")
            console.error(err)
        }
    }

    //Increase Quantity
    const increaseItem = async (prod_id) => {
        try {
            await axios.post('http://localhost:3000/cart/increase', { prod_id }, { withCredentials: true })
            fetchCart()
        } catch (err) {
            setError("Error increasing quantity ❌")
            console.error(err)
        }
    };

    //  Decrease Quantity
    const decreaseItem = async (prod_id) => {
        try {
            await axios.post('http://localhost:3000/cart/decrease', { prod_id }, { withCredentials: true })
            fetchCart()
        } catch (err) {
            setError("Error decreasing quantity ❌")
            console.error(err)
        }
    }

    // Remove Single Item
    const removeItem = async (prod_id) => {
        try {
            await axios.delete('http://localhost:3000/cart/remove', { data: { prod_id }, withCredentials: true })
            fetchCart()
            setSuccess("Item removed from cart ✅")
        } catch (err) {
            setError("Error removing item ❌")
            console.error(err)
        }
    }

    //Clear Cart
    const clearCart = async () => {
        try {
            await axios.delete('http://localhost:3000/cart/clear', { withCredentials: true })
            setCartItems([])
            setSuccess("Cart cleared ✅")
        } catch (err) {
            setError("Error clearing cart ❌")
            console.error(err)
        }
    }

    //Checkout
    const checkout = async () => {
        try {
            
            await axios.post('http://localhost:3000/purchase/check', {cartItems}, { withCredentials: true })
            setCartItems([])
            setSuccess("Purchase successful ✅")
        } catch (err) {
            setError("Error during checkout ❌")
            console.error(err)
        }
    }

    // ✅ Fetch Purchase History
    const purchaseHist = async () => {
        try {
            const response = await axios.get('http://localhost:3000/purchase/history', { withCredentials: true })
            setHistory(response.data)
        } catch (err) {
            setError("Error fetching purchase history ❌")
            console.error(err)
        }
    }

    return (
        <CartContext.Provider value={{
            cartItems,
            addItem,
            increaseItem,
            decreaseItem,
            removeItem,
            clearCart,
            checkout,
            purchaseHist,
            fetchCart,
            error,
            success,
            history,
            total
        }}>
            {children}
        </CartContext.Provider>
    )
}


