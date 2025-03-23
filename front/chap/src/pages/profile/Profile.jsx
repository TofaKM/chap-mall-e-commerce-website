import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/Auth"
import { useEffect } from "react"


function Profile(){
    const navigate = useNavigate()
    const {user,logout} = useAuth()
    

    useEffect(()=>{
        if(!user){
            navigate("/login")// Redirect if not logged in
        }
    },[user,navigate])

    if (!user) return null // Prevent rendering before redirect

    return(
        <>
        <div>
            <h2>Welcome, {user.username} 👋</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <button onClick={logout}>Logout</button>
        </div>
        <div>
        <Button variant="info" className="mt-2" onClick={() => navigate("/history")}>Go to Purchase History 📜</Button>
        </div>
        </>
    )
}
export default Profile