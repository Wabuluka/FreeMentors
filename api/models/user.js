import moment from 'moment';

const users = [
    {
        "id": 1,
        "firstName": "Davies",
        "lastName": "Wabuluka",
        "email": "two@test.com",
        "password": "$2b$08$inOHeQ.SupoL7CDo5NFCEu/69r5oZEHp0UNAvLdbjKRGYK6PMaYXK",
        "address": "nalumunye",
        "bio": "teacher",
        "occupation": "cooking",
        "isMentor": "false",
        "createdOn": "Friday, September 6, 2019 7:30 AM",
        "lastModified": "Friday, September 6, 2019 7:30 AM"
    }
];
class User{
    constructor(id, firstName, lastName, email, password, 
        address, bio, occupation, expertise, status){
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.password = password;
            this.address = address;
            this.bio = bio;
            this.occupation = occupation;
            this.expertise = expertise;
            // this.status = "unverified";
            this.isMentor = "false";
            this.createdOn = moment().format('LLLL')
            this.lastModified = moment().format('LLLL');
    }    
}
export default {User, users};