import moment from 'moment';

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
export default User;