import moment from 'moment';

const admins = [
    {
        "id": 1,
        "email": "test@admin.com",
        "password": "$2b$08$evaYLEyaFVwKU7UXmMIbcOACrBZcsMMCJ6fmvwthCZaw3ToaXFpkK",
        "createdOn": "Friday, September 6, 2019 7:33 AM"
    }
];
class Admin{
    constructor(id, email, password){
            this.id = id;
            this.email = email;
            this.password = password;
            this.createdOn = moment().format('LLLL');
    }
}
export default {Admin, admins};