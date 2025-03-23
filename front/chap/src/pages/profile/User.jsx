import { useNavigate } from 'react-router-dom'
import Main from '../../component/body/Main'
import {useAuth} from '../../context/Auth'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'

function User (){
    const {user,logoutUser} = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user){
            navigate("/login")
        }
    },[user,navigate])

    if (!user) return null

    return(
        <>
        <Container>
            <div className="d-flex justify-content-center"> 
                <h2>Welcome, {user.firstname} 👋</h2>
                    <p>Email: {user.email}</p>
                    <button onClick={logoutUser}>Logout</button>
            </div>
        </Container>
        <Container>
        <Main /> 
        <button onClick={logoutUser}>Logout</button>
        </Container>

        </>
    )
}
export default User