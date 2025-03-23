const mysql = require("mysql2/promise")
const dotenv = require("dotenv")

dotenv.config()

let pool

try{
    pool = mysql.createPool({
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        database:process.env.DB_NAME,
        password:process.env.DB_PASSWORD,
        port:process.env.DB_PORT,
    })
    console.log("DATABASE CONNECTION ✅ ")
}catch(error){
    console.error("DATABASE CONNECTION ❌")
}
module.exports = pool