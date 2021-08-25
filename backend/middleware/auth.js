const jwt = require( 'jsonwebtoken' );

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split( ' ' )[1];
        const decodedToken = jwt.verify( token, 'RANDOM_SECRET_KEY' );
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            res.status( 401 ).json( {
                error: new Error( 'Invalid request !' )
            } );
        } else {
            next();
        }
    } catch (error) {
        console.log( error );

        res.status( 500 ).json( {
            error: new Error( error )
        } );

    }
};
