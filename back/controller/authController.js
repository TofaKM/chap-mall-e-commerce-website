const bcryptjs = require("bcryptjs");
const db = require("../db");

// Register
const userRegister = async (req, res) => {
    const { firstname, lastname, email, gender, phone, password } = req.body;

    if (!firstname || !lastname || !email || !gender || !phone || !password) {
        return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED" });
    }

    try {
        const [existUser] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
        if (existUser.length > 0) {
            return res.status(409).json({ message: "USER ALREADY EXISTS" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        await db.query(
            "INSERT INTO user (firstname, lastname, email, gender, phone, password) VALUES (?, ?, ?, ?, ?, ?)",
            [firstname, lastname, email, gender, phone, hashedPassword]
        );

        res.status(201).json({
            message: "USER REGISTERED ✅",
            user: { firstname, lastname, email, gender, phone }
        });
    } catch (error) {
        console.error("ERROR REGISTERING USER:", error);
        res.status(500).json({ message: "INTERNAL SERVER ERROR ❌" });
    }
};

// Login
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    
    console.log("🔍 Session Data After Login:", req.session);

    if (!email || !password) {
        return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED" });
    }

    try {
        const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "USER DOES NOT EXIST" });
        }

        const user = rows[0];
        console.log("✅ User Data from Database:", user)
        const passwordMatch = await bcryptjs.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: "INVALID PASSWORD" });
        }

        // Store user session
        req.session.user = {
            id: user.user_id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        };
       // req.session.userID = user.id;

        req.session.save((err) => {
            if (err) {
                console.error("SESSION SAVE ERROR:", err);
                return res.status(500).json({ message: "SESSION ERROR ❌" });
            }
            console.log("Session After Login",req.session)
            return res.status(200).json({ message: "USER LOGIN ✅", user: req.session.user });
        });
    } catch (error) {
        console.error("USER LOGIN ❌", error);
        res.status(500).json({ message: "INTERNAL SERVER ERROR ❌" });
    }
};

// Logout
const userLogout = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "NOT LOGGED IN ❌" });
    }

    req.session.destroy((err) => {
        if (err) {
            console.error("ERROR LOGGING OUT ❌", err);
            return res.status(500).json({ message: "ERROR LOGGING OUT ❌" });
        }
        res.clearCookie("connect.sid"); // Ensure session cookie is cleared
        res.status(200).json({ message: "SUCCESSFULLY LOGGED OUT ✅" });
    });
};

// Check if logged in
const checkLogged = async (req, res) => {
    console.log("SESSION DATA:", req.session); // 🔍 Debugging

    if (req.session?.user) {  // ✅ Check if user exists in session
        return res.status(200).json({
            message: "LOGGED IN ✅",
            loggedIn: true,   // ✅ Corrected lowercase "n"
            user: req.session.user
        });
    }

    return res.status(401).json({ 
        message: "NOT LOGGED IN ❌", 
        loggedIn: false 
    });
};


module.exports = { userRegister, userLogin, userLogout, checkLogged }
//to check later