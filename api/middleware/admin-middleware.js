import Admin from '../models/admin';
import User from '../models/user';
import validate from '../helpers/helper';
import moment from 'moment';

const adminList = Admin.admins;
const userList = User.users;

const signup = (req, res, next) =>{
    const password = validate.hashPassword(req.body.password)
        
        const userEmail = adminList.find(admin => admin.email === req.body.email);
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
    req.AuthorizePassword = password;
    next();
}

const login = (req, res, next) => {
    const loginAdmin = adminList.find(admin => admin.email === req.body.email);
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
    req.id = loginAdmin.id;
    req.email = loginAdmin.email;
    next();
}

const getallusers = (req, res, next) => {
    if(userList.length <= 0){
        return res.status(404).send({
            status: 404,
            message: 'No users found'
        })
    }
    next()
}

const getoneuser = (req, res, next) =>{
    const oneUser = userList.find(user => user.id == req.params.id);
    if(!oneUser){
        return res.status(404).send({
            status: 404,
            error: 'User not found'
        });
    }
    req.oneuser = oneUser
    next();
}

const usertomentor = (req, res, next) =>  {
    const oneUser = userList.find(user => user.id == req.params.id);
    if(!oneUser){
        return res.status(404).send({
            status: 404,
            error: 'User not found'
        });
    }
    const modified = moment().format('LLLL')
    oneUser.isMentor = req.body.isMentor;
    oneUser.lastModified = modified;
    req.modifieduser = oneUser
    next();
}
const deleteuser = (req, res, next) => {
    const oneUser = userList.find(user => user.id == req.params.id);
    if(!oneUser){
        return res.status(404).send({
            status: 404,
            error: 'Not Found'
        })
    }
    const index = userList.indexOf(oneUser)
    const removeOne = userList.splice(index, 1)
    if(removeOne){
        return res.status(200).send({
            status: 200,
            message: 'Successfully Deleted a User'
        })
    } 
    
    req.deleted = {message: 'deleted successfully'}
    next();
}
export default {signup, login, getallusers, getoneuser, usertomentor, deleteuser};