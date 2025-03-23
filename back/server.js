const express = require('express')
const pool = require("./db")
const dotenv = require("dotenv")
const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session)
const cors = require("cors")
const { userRegister, userLogin, userLogout, checkLogged } = require("./controller/authController")
const { getAll, getOne } = require("./controller/prodController")
const {viewCart,addCart,removeCart,increaseCart,decreaseCart,clearCart} = require("./controller/cartController")
const {checkOut,checkHistory} = require("./controller/purchaseController")
const port = 3000

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors({origin:"http://localhost:5173", credentials:true}))

//MtSQLStore session
const sessionStore = new MySQLStore({
    clearExpired:true,
    checkExpirationInterval:9000000,
    expiration:1000 * 60 * 60 * 24,
    createDatabaseTable:true
},pool)
const sessionMiddleware = session({
    key:"connect.sid",
    secret:process.env.SESSION_KEY,
    resave:false,
    saveUninitialized:false,
    store:sessionStore,
    cookie:{
        secure:false,
        httpOnly:true,
        maxAge:1000 * 60 * 60 * 24,
        sameSite:"lax",
        //domain:"localhost"
    }
})
app.use(sessionMiddleware)
//sesson
app.use((req, res, next) => {
    console.log("🔥 SESSION DATA:", req.session);
    next();
})

//is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next(); // ✅ User is logged in, continue
    } else {
        res.status(401).json({ error: "Unauthorized. Please log in." });
    }
};
//routes
//userRoutes
const userRoutes = express.Router()
userRoutes.post("/login",userLogin)
userRoutes.post("/register",userRegister)
userRoutes.post("/logout",userLogout)
userRoutes.get("/loggedIn",checkLogged)

app.use("/user",userRoutes)
//productRoutes
const prodRoutes = express.Router()
prodRoutes.get("/",isAuthenticated,getAll)
prodRoutes.get("/:id",isAuthenticated,getOne)

app.use("/api/product",prodRoutes)
//cartRoutes
const cartRoutes = express.Router()
cartRoutes.post("/add",isAuthenticated,addCart)
cartRoutes.post("/increase",isAuthenticated,increaseCart)
cartRoutes.post("/decrease",isAuthenticated,decreaseCart)
cartRoutes.get("/view",isAuthenticated,viewCart)
cartRoutes.delete("/clear",isAuthenticated,clearCart)
cartRoutes.delete("/remove",isAuthenticated,removeCart)

app.use("/cart",cartRoutes)
//purchaseRoutes
const purchaseRoutes = express.Router()
purchaseRoutes.post("/check",isAuthenticated,checkOut)
purchaseRoutes.get("/history",isAuthenticated,checkHistory)

app.use("/purchase",purchaseRoutes)

//server
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))