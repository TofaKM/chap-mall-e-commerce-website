import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export function AuthContextProvider({children}){
   const [user,setUser] = useState(null)
   const [loading, setLoading] = useState(true)
    //checkloggedin
   useEffect(()=>{
    const fetchUser = async () =>{
        try{
            const res = await axios.get("http://localhost:3000/user/loggedIn",{withCredentials:true})
            if (res.data.loggedIn){
                setUser(res.data.user)
            }
        }
        catch(error){
            console.error("ERROR FETCHING USER",error)
        }
        finally{
            setLoading(false)
        }
    }
    fetchUser()
   },[])
   //login
   const login = async (email, password, user = null) => {
    try {
        if (user) {
            // If user is passed (from registration), set directly
            setUser(user);
        } else {
            // Otherwise, perform login request
            const res = await axios.post("http://localhost:3000/user/login", { email, password }, { withCredentials: true });
            setUser(res.data.user);
        }
    } catch (error) {
        throw new Error(error.response?.data?.message || "Login Failed");
    }
};
   //logout
   const logoutUser = async () =>{
        try{
            await axios.post("http://localhost:3000/user/logout",{},{withCredentials:true})
            setUser(null)
        }
        catch(error){
            console.error("Logout failed",error)
        }
   }

    return(
        <AuthContext.Provider value={{user,loading,login,logoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}