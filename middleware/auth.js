const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_SECRET_TOKEN);
        const {userId} = decodedToken;
        if(!userId) {
            throw 'Unauthorized !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error || 'Requête non authentifiée !'});
    }
}