import Sessions from '../models/session';

const SessionsData = [];

class SessionController{
    static createSession(req, res){
        const sessionId = SessionsData.length + 1;
        const status = "pending";
        const menteeId = req.params.token;

        const newSession = new Sessions(
            sessionId, 
            req.Authorize.email,
            req.body.questions, 
            req.body.menteeEmail,
            status
        )
        SessionsData.push(newSession);
        console.log(menteeId)
        return res.status(201).send({
            status: 201,
            data: newSession
        })
    }
}

export default {SessionController, SessionsData};