import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const Helper = {
    /**
     * Hash Password Method
     * @param {string} password
     * @returns {string} returns hashed password
     */
    hashPassword(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    },
    /**
     * ComparePassword
     * @param {string} hashedPassword
     * @param {string} password
     * @returns {Boolean} return True or False
     */
    comparePassword(hashPassword, password){
        return bcrypt.compareSync(password, hashPassword);
    },
    /**
     * isValidEmail helper method
     */
    isValidEmail(email){
        return /\S+@\S+\.\S+/.test(email);
    },
    /**
     * isValidEmail helper method
     */
    checkPassword(password){
        if(password.length < 8){
            return res.status(400).send({
                status: 400,
                error: "Password to short"
            });
        }
    },
    /**
     * Generate token
     */
    generateToken(id){
        const token = jwt.sign({
            userEmail: id
        },
        process.env.SECRETKEY, { expiresIn: 60 }
        );
        return token;
    },
    /**
     * Verify Token
     */
    verifyToken(token) {
        return jwt.verify(token, process.env.SECRETKEY);
    }
}

export default Helper;