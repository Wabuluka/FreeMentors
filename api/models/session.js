import moment from 'moment';

class SessionModel{
    constructor(sessionId, mentorId, menteeId, questions, menteeEmail, 
        status){
            this.sessionId = sessionId;
            this.mentorId = mentorId;
            this.menteeId = menteeId;
            this.questions = questions;
            this.menteeEmail = menteeEmail;
            this.status = status;
            this.createdOn = moment().format('LLLL');
            this.lastModified = moment().format('LLLL');
    }
}
export default SessionModel;