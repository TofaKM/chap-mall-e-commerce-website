import { motion } from "framer-motion";
import { Container, Button, Row, Col } from "react-bootstrap";
import {Link} from 'react-router-dom'

export default function Home() {
    return (
        <>
        
        <Container fluid className="text-center py-5 bg-light min-h-screen">
            {/* Hero Section */}
            <motion.div 
                initial={{ opacity: 0, y: -50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1 }}
                className="py-5"
            >
                <h1 className="text-4xl font-bold">Welcome to Our Platform</h1>
                <p className="text-lg text-gray-600 my-3">Experience the best solutions with us.</p>
                <Button variant="outline-primary" size="lg"><Link to='/register'>GET STARTED</Link></Button>
            </motion.div>

            {/* Features Section */}
            <Container className="py-5">
                <Row>
                    {["Fast", "Secure", "Reliable"].map((feature, index) => (
                        <Col key={feature} md={4}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="p-4 border rounded shadow-sm"
                            >
                                <h3 className="text-2xl font-semibold">{feature}</h3>
                                <p className="text-gray-600">Our service is {feature.toLowerCase()} and efficient.</p>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Call-to-Action Section */}
            <motion.div 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1 }} 
                transition={{ duration: 0.5, yoyo: Infinity }}
                className="my-5"
            >
                <Button variant="success" size="lg"><Link to='/register'>Join Us</Link></Button>
            </motion.div>
        </Container>
        </>
        
    );
}
