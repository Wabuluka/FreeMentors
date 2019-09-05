import moment from 'moment';

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
export default SessionModel;