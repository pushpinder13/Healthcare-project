// const jwt = require('jsonwebtoken')
// const generatetoken = (userdata) => {
//     return jwt.sign(userdata, process.env.PRIVATE_KEY, { expiresIn: '1h' })
// }

// const validatetoken = (req, res, next) => {

//     const checktoken = req.headers.authorization
//     if (!checktoken) {
//         return res.status(401).json({ err: 'Token not avaliable' });
//     }
//     const token = req.headers.authorization.split(" ")[1];
//     if (!token) {
//         return res.status(401).json({ err: 'Invalid Token' });
//     }
//     try {
//         const validate = jwt.verify(token, process.env.PRIVATE_KEY)
//         req.user = validate;
//         next();
//     } catch (err) {
//         return res.status(401).json(err.message);

//     }
// }
// module.exports = { generatetoken, validatetoken }


const jwt = require('jsonwebtoken');

// Generate a token for a user
const generatetoken = (userdata) => {
    return jwt.sign(userdata, process.env.PRIVATE_KEY, { expiresIn: '1h' });
};

// Validate the token middleware
const validatetoken = (req, res, next) => {
    // Get token from headers
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header not provided' });
    }

    // Token should be in the format: Bearer <token>
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token missing or invalid' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = decoded; // Attach decoded user info to the request
        next(); // Move to the next middleware/route
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = { generatetoken, validatetoken };
