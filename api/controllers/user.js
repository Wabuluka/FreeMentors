import User from '../models/user';
import Sessions from '../models/session';
import dotenv from 'dotenv';
import validate from '../helpers/helper';


const sessions = Sessions.SessionsData;


dotenv.config();

const userClass = User.User
const userList = User.users

class UserController{
    static RegisterUser(req, res){
        const id = userList.length +1;
        const user = new userClass(
            id, req.body.firstName, req.body.lastName,
            req.body.email, req.AuthorizePassword, req.body.address, req.body.occupation,
            req.body.expertise
        )
        const token = validate.generateToken(user.email)
        userList.push(user);
        return res.status(201).json({
            status: 201,
            message: 'User created successfully',
            data:{
                token: token,
                id: user.id
            }
        })
    }


    static UserLogin(req, res){    
        const token = validate.generateToken(req.userId, req.email);
        return res.status(200).send({
            status: 200,
            message: "You are logged in successfully",
            data: {
                token: token
            } 
        });
    }

    static GetAvailableMentors(req, res){
        const availableMentors = req.availableMentors
        return res.status(200).send({
            status: 200,
            data: availableMentors
        });
         
    }

    static GetOneMentor(req, res){
        const availableMentor = req.onementor
        return res.status(200).send({
            status: 200,
            data: availableMentor
        })    
    }

    static mentorViewSessionRequests(req, res){
        const sessionRequests = sessions.filter(session => session.mentorId === 1)
        if(sessionRequests <= 0){
            return res.status(404).send({
                status: 404,
                error: 'No sessions for you'
            })
        }
        return res.status(200).send({
            status: 200,
            data: sessionRequests
        })  
    }

    static mentorViewSingleSessionRequest(req, res){
        const sessionId = req.body.id
        const sessionRequests = sessions.filter(session => session.mentorId === 1, session => session.id === sessionId)
        if(sessionRequests <= 0){
            return res.status(404).send({
                status: 404,
                error: 'No sessions for you'
            })
        }
        return res.status(200).send({
            status: 200,
            data: sessionRequests
        })  
    }

    static mentorAcceptsRequest(req, res){
        const sessionId = req.body.id
        const sessionRequest = Sessions.SessionsData.find(
            session => session.mentorId === 1, 
            session => session.id === sessionId,
            session => session.status === "pending")
        if(sessionRequest <= 0){
            return res.status(404).send({
                status: 404,
                error: 'No sessions for you'
            })
        }
        sessionRequest.status = "accepted";
        return res.status(200).send({
            status: 200,
            data: sessionRequest
        })  
    }

    static mentorDeclinesRequest(req, res){
        const sessionId = req.body.id
        const sessionRequest = Sessions.SessionsData.find(
            session => session.mentorId === 1, 
            session => session.id === sessionId,
            session => session.status === "pending")
        if(sessionRequest <= 0){
            return res.status(404).send({
                status: 404,
                error: 'No sessions for you'
            })
        }
        sessionRequest.status = "declined";
        return res.status(200).send({
            status: 200,
            data: sessionRequest
        })  
    }
}



export default {UserController};