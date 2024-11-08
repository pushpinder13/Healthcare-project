const jwt = require('jsonwebtoken')
const generatetoken = (userdata) => {
    return jwt.sign(userdata, process.env.PRIVATE_KEY, { expiresIn: '1h' })
}

const validatetoken = (req, res, next) => {

    const checktoken = req.headers.authorization
    if (!checktoken) {
        return res.status(401).json({ err: 'Token not avaliable' });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ err: 'Invalid Token' });
    }
    try {
        const validate = jwt.verify(token, process.env.PRIVATE_KEY)
        req.user = validate;
        next();
    } catch (err) {
        return res.status(401).json(err.message);

    }
}