import usersModel from '../models/users.model.js'

export default class Users {
    constructor(){
        console.log('Working Users with DB');
    }

    getUsers = async () =>{
        const users = await usersModel.find().lean() //transformar de BSON
        return users;
    }

    updateUser = async (id, user) => {
        const result = await usersModel.updateOne({ _id: id}, user);
        return result;
    };

}