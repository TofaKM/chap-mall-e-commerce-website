import { useState } from 'react'
import { Button, Form, FormCheck, FormControl } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/Auth'
import axios from 'axios'

function Register() {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const { login } = useAuth() // auto login

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        
        try {
            const res = await axios.post("http://localhost:3000/user/register", {
                firstname,
                lastname,
                email,
                gender,
                phone,
                password
            })
            
            setSuccess("Registration successful! Redirecting...")

            // Auto-login the user
            await login(email, password, res.data?.user)

            setTimeout(() => navigate("/userpage"), 2000) // Redirect after success message
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed")
        }
    }

    return (
        <>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <Form className='border rounded shadow-sm p-4' onSubmit={handleRegister}>
                <h5>REGISTER</h5>

                {/* Firstname */}
                <Form.Group className='mb-3'>
                    <FormControl placeholder='Firstname' type='text' required value={firstname} onChange={(e) => setFirstname(e.target.value)}
                    />
                </Form.Group>

                {/* Lastname */}
                <Form.Group className='mb-3'>
                    <FormControl placeholder='Lastname' type='text' required value={lastname} onChange={(e) => setLastname(e.target.value)}
                    />
                </Form.Group>

                {/* Email */}
                <Form.Group className='mb-3'>
                    <FormControl placeholder='Email' type='email' required value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                {/* Gender */}
                <Form.Group className='d-flex gap-3 mb-3'>
                    <FormCheck 
                        type='radio' 
                        name='gender' 
                        label="Male" 
                        id='Male' 
                        required 
                        value="Male" 
                        onChange={(e) => setGender(e.target.value)} 
                        checked={gender === "Male"}
                    />
                    <FormCheck 
                        type='radio' 
                        name='gender' 
                        label="Female" 
                        id='Female' 
                        required 
                        value="Female" 
                        onChange={(e) => setGender(e.target.value)} 
                        checked={gender === "Female"}
                    />
                </Form.Group>

                {/* Phone */}
                <Form.Group className='mb-3'>
                    <FormControl placeholder='Phone No.' type='tel' required value={phone} onChange={(e) => setPhone(e.target.value)}
                    />
                </Form.Group>

                {/* Password */}
                <Form.Group className='mb-3'>
                    <FormControl placeholder='Password' type='password' required value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                {/* Buttons */}
                <div className='d-flex justify-content-between'>
                    <Button variant='success' type='submit'>SUBMIT</Button>
                    <Button variant='outline-success' type='reset' 
                        onClick={() => {
                            setFirstname("")
                            setLastname("")
                            setEmail("")
                            setGender("")
                            setPhone("")
                            setPassword("")
                        }}
                    >
                        RESET
                    </Button>
                </div>

                {/* Links */}
                <div className="mt-3 text-center">
                    <Link to="/login">Already have an account? Sign in</Link>
                </div>
            </Form>
        </>
    )
}

export default Register
