import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useCart } from "../../context/CartContext"; // ✅ Import Cart Context

const Details = () => {
    const [prod, setProd] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { addItem } = useCart(); // ✅ Use Cart Context

    

    useEffect(() => {
        const fetchProduct = async () => {
            console.log("Fetching product from:", `http://localhost:3000/api/product/${id}`)
            try {
                const response = await axios.get(`http://localhost:3000/api/product/${id}`, { withCredentials: true });
                setProd(response.data);
            } catch (error) {
                console.error("Error fetching product:", error.response ? error.response.data : error);
            }
        };

        const checkLogin = async () => {
            try {
                const response = await axios.get("http://localhost:3000/user/loggedIn", { withCredentials: true });
                if (response.data.loggedIn) {
                    setIsLoggedIn(true);
                    await fetchProduct();
                } else {
                    setIsLoggedIn(false);
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error checking login:", error);
                setIsLoggedIn(false);
                navigate("/login");
            }
        };
        checkLogin();
    }, [id, navigate]);

    if (!isLoggedIn) {
        return <p>Redirecting to login...</p>;
    }

    if (!prod) {
        return <div>Loading product...</div>;
    }

    
    return (
        <div className="container py-5">
            <Row className="g-4">
                <Col md={6}>
                    <div className="card shadow-sm p-3">
                        <h5 className="card-title text-center fw-bold">{prod.title}</h5>
                        <img src={prod.imgUrl} alt={prod.title} className="img-fluid rounded" style={{ height: "300px", objectFit: "cover" }} />
                        <p>{prod.description}</p>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="card shadow-sm p-3" style={{ height: "450px" }}>
                        <h5 className="card-title fw-bold">{prod.title}</h5>
                        <p>{prod.description}</p>
                        <p className="fw-bold">${prod.price}</p>
                        
                        <div className="mt-auto d-flex justify-content-center gap-3">
                            {/* Like */}
                            <Button variant="danger"><i className="bi bi-hand-thumbs-up"></i></Button>
                            {/* Dislike */}
                            <Button variant="dark"><i className="bi bi-hand-thumbs-down"></i></Button>
                            {/* Add to Cart */}
                            <Button variant="outline-success" onClick={() => addItem(prod.prod_id)}> {/* ✅ Pass prod_id */}
                                <i className="bi bi-cart-plus"></i>
                            </Button>
                            {/* Favorite */}
                            <Button variant="outline-danger"><i className="bi bi-heart"></i></Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Details;
