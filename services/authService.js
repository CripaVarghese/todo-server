import User from "../models/user";
import bcrypt from "bcryptjs";

export const getUserByEmail = async (email) => {
    return User.findOne({ email });
}

export const authenticateUser = async (dbUser, userData) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userData.password, salt);
    if (dbUser.username === userData.username) {
        return bcrypt.compare(userData.password, hash);
    } else {
        console.log('Invalid Username');
        return false
    }
}

export const createUser = async (userData) => {
    const user = await getUserByEmail(userData.email);
    
    if (user) {
        return {
            success: false,
            message: "Already registered"
        }
    }else{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(userData.password, salt);
        userData.password = hash;
        try {
            const newUser = new User(userData);
            await newUser.save()
            console.log("registered")
            return {
                success: true,
                message: "Registered"
            }
        } 
        catch (error) {
            console.error(`ERROR:: While trying to create user`, error)
        }
    }
}

// {
//     "username" : "rintu",
//     "email":"rintu@gmail.com",
//     "passsword":"testtest",
//     "confirmedPassword":"testtest"
//   }