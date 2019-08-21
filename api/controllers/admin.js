import Admin from '../models/admin';
import dotenv from 'dotenv';
import validate from '../middleware/helper';
import moment from 'moment';

const admins = [];
dotenv.config();

class AdminController{
    static RegisterAdmin(req, res){
        const id = admins.length +1;
        const password = validate.hashPassword(req.body.password)
        
        const userEmail = admins.find(admin => admin.email === req.body.email);
        if(!validate.isValidEmail(req.body.email)){
            return res.status(400).json({
                'status': 400,
                'error': 'The email you provided is not valid'
            })
        }
        if (userEmail){
            return res.status(400).send({
                status: 400,
                error: "User already registered with this email!"
            })
        }
        const admin = new Admin(
            id, req.body.email, password
        )
        const token = validate.generateToken(admin.email)
        admins.push(admin);
        return res.status(201).json({
            status: 201,
            data:{
                token: token,
                id: admin.id,
                email: admin.email,
                password: admin.password,
                createdOn: admin.createdOn
            }
        })
    }

    static AdminLogin(req, res){
        const loginAdmin = admins.find(admin => admin.email === req.body.email);
        if(!loginAdmin){
            return res.status(404).send({
                status: 404,
                error: `User with  was not found`
            })
        }
        const passwordCompared = validate.comparePassword(loginAdmin.password, req.body.password);
        if(!passwordCompared){
            return res.status(401).send({
                status: 401,
                error: "Login was denied"
            });
        }
        const token = validate.generateToken(loginAdmin.email)
        return res.status(200).send({
            status: 200,
            data: {
                token: token,
                id: loginAdmin.id,
                message: "You are logged in successfully"
            } 
        })
    }
}
export default {AdminController, admins};