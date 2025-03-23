import { Button, Offcanvas, Modal } from "react-bootstrap";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Bag({ bag, closeBag }) {
    const { checkout, error, cartItems, increaseItem, decreaseItem, removeItem, clearCart } = useCart();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    // Modal handlers
    const modelOpen = () => setOpenModal(true);
    const modelClose = () => {
        setCheckoutSuccess(false); // Reset success message
        setOpenModal(false);
    };

    // Final Checkout Handler
    const handleFinalCheckout = async () => {
        try {
            await checkout();
            clearCart();
            setCheckoutSuccess(true); // Show success message
        } catch (error) {
            console.error("Checkout failed:", error);
        }
    };

    return (
        <>
            {/* CART SIDEBAR */}
            <Offcanvas placement="end" show={bag} onHide={closeBag}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>CART</Offcanvas.Title>
                </Offcanvas.Header>
                <hr />
                <Offcanvas.Body>
                    {error && <p className="text-danger">{error}</p>}
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div className="d-flex justify-content-between align-items-center mb-3" key={item.id}>
                                <div className="d-block">
                                    <img src={item.imgUrl} alt={item.title} style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "10px" }} />
                                    <strong>{item.title}</strong>
                                    <br />
                                    <strong>${item.price * item.quantity}</strong>
                                </div>
                                {/* QUANTITY */}
                                <div className="item-quantity d-flex align-items-center">
                                    <Button variant="danger" size="sm" onClick={() => decreaseItem(item.prod_id)}>-</Button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <Button variant="success" size="sm" onClick={() => increaseItem(item.prod_id)}>+</Button>
                                </div>
                                <Button variant="danger" size="sm" onClick={() => removeItem(item.prod_id)}>Remove</Button>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty</p>
                    )}
                    {cartItems.length > 0 && (
                        <>
                            <Button variant="warning" onClick={clearCart}>Clear Cart</Button>
                            <Button variant="success" className="ms-2" onClick={modelOpen}>
                                Proceed to Checkout ✅
                            </Button>
                        </>
                    )}
                </Offcanvas.Body>
            </Offcanvas>

            {/* CHECKOUT MODAL */}
            <Modal show={openModal} onHide={modelClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{checkoutSuccess ? "Checkout Successful 🎉" : "Confirm Checkout"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {checkoutSuccess ? (
                        <p>Your purchase was successful! 🎊 Check your receipt in Purchase History.</p>
                    ) : (
                        <p>Are you sure you want to proceed with checkout?</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {!checkoutSuccess ? (
                        <>
                            <Button variant="secondary" onClick={modelClose}>
                                Cancel
                            </Button>
                            <Button variant="success" onClick={handleFinalCheckout}>
                                Confirm Purchase ✅
                            </Button>
                        </>
                    ) : (
                        <Button variant="info" onClick={() => navigate("/history")}>
                            View Purchase History 📜
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Bag;
