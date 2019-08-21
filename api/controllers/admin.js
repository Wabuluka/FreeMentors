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
}
export default {AdminController, admins};