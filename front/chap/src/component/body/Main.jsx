import { Container, Row } from "react-bootstrap";
import Goods from "./Goods";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Main (){
    const [prod,setProd] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchProduct = async () =>{
            try{
                const res = await axios.get("http://localhost:3000/api/product",{withCredentials:true})
                setProd(res.data)
            }
            catch(error){
                console.error("ERROR FETCHING PRODUCT",error)
            }
        }
        const checkLogin = async () =>{
            try{
                const res =await axios.get("http://localhost:3000/user/loggedIn",{withCredentials:true})
                if (res.data.loggedIn){
                    setIsLoggedIn(true)
                    fetchProduct()
                } else {
                    setIsLoggedIn(false);
                    setTimeout(() => navigate("/login"), 100); // Redirect to login
                }
            }
            catch(error){
                console.error("Error checking login:", error);
                setIsLoggedIn(false);
                setTimeout(() => navigate("/login"), 100);
            }
        }
        checkLogin()
    },[navigate])

    if (!isLoggedIn) {
        return <p>Redirecting to login...</p>;
    }

    return(
        <>
        <Container className="py-5">
            <h4>PRODUCT</h4>
            <Row className="row-cols-1 row-cols-md-3 g-4">
                {
                    prod.map((item)=>(
                        <div className="col-md-4 d-flex justify-content-center" key={item.prod_id}>
                        <Goods id={item.prod_id} // ✅ Ensure id is passed
                        imgUrl={item.imgUrl} 
                        title={item.title} 
                        description={item.description} 
                        price={item.price}   />
                        </div>
                    ))
                }
            </Row>

        </Container>
        </>
    )
}
export default Main