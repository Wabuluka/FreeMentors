import User from '../controllers/user';
import Admin from '../controllers/admin';
import validator from '../helpers/helper';

class Auth{
    static verifyAdmin(req, res, next){
        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(400).send({
                'message': 'Token not provided'
            });
        }
        try{
            const decodedAdmin = validator.verifyToken(token);
            const AdminLoaded = Admin.admins.find(a => a.email === decodedAdmin.userEmail);
            if(!AdminLoaded){
                return res.status(401).send({
                    status: 401,
                    error: 'You are not admin'
                })
            }
            next()

        }catch(error){
            return res.status(401).send({
                status: 401,
                error: 'Invalid Token '
            }) 
        } 
    }

    static verifyUser(req, res, next){
        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(400).send({
                'message': 'Token not provided'
            });
        }
        try{
            const decodedUser = validator.verifyToken(token);
            const loadedUser = User.users.find(u => u.email === decodedUser.email);
            if(!loadedUser){
                return res.status(401).send({
                    status: 401,
                    error: 'You are not authorized'
                })
            }
            req.Authorize = decodedUser
            // return res.send(req.Authorize)
            next();

        }catch(error){
            return res.status(401).send({
                status: 401,
                error: 'Invalid Token '
            }) 
        } 
    }
}


export default Auth;