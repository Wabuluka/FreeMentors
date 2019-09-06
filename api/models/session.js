import moment from 'moment';
const SessionsData = [
    {
        "sessionId": 1,
        "mentorId": "two@test.com",
        "menteeEmail": "test@test.com",
        "questions": "what is the date today?",
        "status": "pending",
        "createdOn": "Friday, September 6, 2019 7:35 AM",
        "lastModified": "Friday, September 6, 2019 7:35 AM"
    }
];

class SessionModel{
    constructor(sessionId, mentorId, questions, menteeEmail, 
        status){
            this.sessionId = sessionId;
            this.mentorId = mentorId;
            this.menteeEmail = menteeEmail;
            this.questions = questions;
            this.status = status;
            this.createdOn = moment().format('LLLL');
            this.lastModified = moment().format('LLLL');
    }
}
export default {SessionModel, SessionsData};