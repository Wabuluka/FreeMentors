import User from '../models/user';
import dotenv from 'dotenv';
import validate from '../middleware/helper';

const users = [];
dotenv.config();

class UserController{
    static RegisterUser(req, res){
        const id = users.length +1;
        const password = validate.hashPassword(req.body.password)
        const status = "unverified";
        const isMentor = true;
        const userEmail = users.find(user => user.email === req.body.email);
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
        const user = new User(
            id, req.body.firstName, req.body.lastName,
            req.body.email, password, req.body.address, req.body.occupation,
            req.body.expertise, status, isMentor
        )
        const token = validate.generateToken(user.email)
        users.push(user);
        return res.status(201).json({
            status: 201,
            data:{
                token: token,
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                createdOn: user.createdOn
            }
        })
    }
}



export default {UserController, users};