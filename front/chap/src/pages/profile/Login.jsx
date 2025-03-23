import { useState } from 'react'
import {Button, Form, FormControl} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/Auth'

function Login (){
    const [email,setEmail] = useState("")
    const [password,setPassword]= useState("")
    const [error,setError]=useState("")

    const navigate = useNavigate()

    const {login} = useAuth()

    const handleLogin = async (e) =>{
        e.preventDefault()
        try{
            await login (email,password)
            navigate("/userpage")
        }
        catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
        }
        
    }

    return(
        <>
        {error && <p style={{color:"red",textAlign:"center"}}>{error}</p>}
        <Form className='border rounded shadow-sm p-4' onSubmit={handleLogin}>
            <h5>LOGIN</h5>
            {/*EMAIL*/}
            <Form.Group className='mb-3'>
                <FormControl placeholder='EMAIL' type='email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
            {/*password*/}
            <Form.Group className='mb-3'>
                <FormControl placeholder='PASSWORD' type='password' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            {/*button*/}
            <div className='d-block mt-auto md-auto'>
                <Button variant='success' type='submit'>SUBMIT</Button>
                <Button variant='outline-success' type='reset' onClick={()=>{
                    setEmail("")
                    setPassword("")
                }}>RESET</Button>
            </div>
            {/*links*/}
            <div className="mt-3 text-center justify-content-between">
                <Link to="/register">Don't have an account? Sign Up</Link>
            </div>
        </Form>
        </>
    )
}
export default Login