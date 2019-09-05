import User from '../controllers/user';
import Admin from '../models/admin';
import validator from '../helpers/helper';

const admins = Admin.admins;
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
            const AdminLoaded = admins.find(a => a.email === decodedAdmin.id);
            if(!AdminLoaded){
                return res.status(401).send({
                    status: 401,
                    error: 'You are not admin',
                    adim: decodedAdmin,
                    ad: AdminLoaded,
                    xx: admins
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