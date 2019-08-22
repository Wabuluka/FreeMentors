import moment from 'moment';

class Admin{
    constructor(id, email, password){
            this.id = id;
            this.email = email;
            this.password = password;
            this.createdOn = moment().format('LLLL');
    }
}
export default Admin;