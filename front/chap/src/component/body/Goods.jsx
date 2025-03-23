import {Card} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

function Goods({id,title,imgUrl,description,price}){
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/product/${id}`);  // ✅ Match App.jsx route
    };
    
    return(
        <>
        <Card className="shadow-sm border-0" style={{ width: "18rem"}} onClick={handleClick}>
            <Card.Header className=" bg-dark text-white text-center">{title}</Card.Header>
            <br />
                <Card.Img variant="top" src={imgUrl} style={{ height: "250px", objectFit: "cover" }} />
                    <Card.Body>
                        <Card.Title className="text-dark">{title}</Card.Title>
                        
                        <Card.Text className="text-muted">{description}</Card.Text>
                        <Card.Text className="fw-bold text-dark">{price}</Card.Text>
                    </Card.Body>
        </Card>
        </>
    )
}
export default Goods