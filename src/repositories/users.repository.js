import UsersDao from "../dao/mongo/classes/users.dao.js"

export default class UsersRepository {
    constructor(){
        this.dao = new UsersDao();
    }

    getUsers = async() => {
        const result = await this.dao.getUsers();
        return result;
    }

    updateUser = async (user) => {
        const result = await this.dao.updateUser(user);
        return result
    }
}