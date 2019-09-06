import Sessions from '../models/session';

const sessionModel = Sessions.SessionModel;
const sessions = Sessions.SessionsData;

class SessionController{
    static createSession(req, res){
        const sessionId = sessions.length + 1;
        const status = "pending";
        const menteeId = req.params.token;
       

        const newSession = new sessionModel(
            sessionId, 
            req.Authorize.email,
            req.body.questions, 
            req.body.menteeEmail,
            status
        )
        sessions.push(newSession);
        console.log(menteeId)
        return res.status(201).send({
            status: 201,
            data: newSession
        })
    }
}

export default {SessionController};