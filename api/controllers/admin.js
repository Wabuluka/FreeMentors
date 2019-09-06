import adminDetails from '../models/admin';
import User from '../models/user';
import dotenv from 'dotenv';
import validate from '../helpers/helper';



dotenv.config();
const admins = adminDetails.admins;
const userList = User.users;
const Admin = adminDetails.Admin;
class AdminController{
    static RegisterAdmin(req, res){
        const id = admins.length +1;
        
        const admin = new Admin(
            id, req.body.email, req.AuthorizePassword
        )
        const token = validate.generateToken(admin.id, admin.email)
        admins.push(admin);
        return res.status(201).json({
            status: 201,
            message: 'Account  was successfully created',
            data:{
                token: token,
                data: admin
            }
        })
    }

    static AdminLogin(req, res){
        const token = validate.generateToken(req.id, req.email)
        return res.status(200).send({
            status: 200,
            message: "You are logged in successfully",
            data: {
                token: token
            } 
        })
    }

    static GetAllUsers(req, res){
        const allusers = userList;
        
        return res.status(200).send({
            status: 200,
            data: allusers
        });
    }

    static GetOneUser(req, res){
        const one = req.oneuser
        return res.status(200).send({
            status: 200,
            data: one
        });
    }

    static CheckToMentor(req, res){
        const modified = req.modifieduser
        return res.status(202).send({
            status: 202,
            message: 'User account changed',
            data: modified 
        })
    }

    static DeleteOneUser(req, res){
        const deleted = req.deleted
        if(deleted){
            return res.status(200).send({
                deleted
            })
        }
        return res.status(400).send({
            status: 400,
            message: 'Unable to delete'
        })
        
    }
}
export default {AdminController, admins};