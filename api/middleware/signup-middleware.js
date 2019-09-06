import User from '../models/user';
import validate from '../helpers/helper';


const userList = User.users;

const signup = (req, res, next) =>{
    const passInput = req.body.password;
    if (passInput.length < 8){
        return res.status(400).send({
            status: 400,
            error: "Password too short"
        });
    }
    var pass1 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    const password = validate.hashPassword(passInput)
    // const isMentor = true;
    const userEmail = userList.find(user => user.email === req.body.email);
    if(!validate.isValidEmail(req.body.email)){
        return res.status(400).json({
            'status': 400,
            'error': 'The email you provided is not valid'
        })
    }
    if (userEmail){
        return res.status(409).send({
            status: 409,
            error: "User already registered with this email!"
        }) 
    }
    req.AuthorizePassword = password;
    next();
}
const signin = (req, res, next) => {
    const loginUser = userList.find(user => user.email === req.body.email);
    if(!loginUser){
        return res.status(404).send({
            status: 404,
            error: `User with  was not found`
        });
    }
    const passwordCompared = validate.comparePassword(loginUser.password, req.body.password);
    console.log(passwordCompared);
    if(!passwordCompared){
        return res.status(401).send({
            status: 401,
            error: "Login was denied"
        });
    }
    req.userId = loginUser.id;
    req.email = loginUser.email;
    next();
}

const getavialablementors = (req, res, next) =>{
    const availableMentors = userList.filter(user => user.isMentor == "true");
    if(availableMentors.length <= 0){
        return res.status(404).send({
            status: 404,
            message: "No available mentors"
        }); 
    }
    req.availableMentors = availableMentors
    next();
}

const getonementor = (req, res, next) => {
    const oneMentor = req.params.id;
    const availableMentor = userList.filter(user => user.isMentor == "true" &&  user.id == oneMentor);
    console.log(oneMentor)
    if(!availableMentor){    
        return res.status(404).send({
            status: 404,
            error: 'No mentors available at the moment'
        })
    }
    req.onementor = availableMentor
    next()
}

const mentorviewsessionrequests = (req, res, next) => {
    const sessionRequests = Sessions.SessionsData.filter(session => session.mentorId === req.Authorize.email)
    if(!sessionRequests){
        return res.status(404).send({
            status: 404,
            error: 'No sessions for you'
        })
    }
    req.sessionrequest = sessionRequests
    next();
}
export default {signup, signin, getavialablementors, getonementor, mentorviewsessionrequests };