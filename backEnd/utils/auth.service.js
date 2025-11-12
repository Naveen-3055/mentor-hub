import User from "../models/user.model.js"


export const createUser = async (userName,email,password)=>{

    try {
        const newUser = await User.create({
            userName,
            email,
            password
        })
        return newUser;
    } catch (error) {
        console.log('failed to create user');
    }
}