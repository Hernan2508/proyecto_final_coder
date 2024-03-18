import UsersRepository from "../repositories/users.repository.js";
import { Users } from "../dao/factory.js";

const usersDao = new Users();
const usersRepository = new UsersRepository(usersDao);

const getUsers = async() => {
    const result = await usersRepository.getUsers();
    //Logica de negocio
    return result;
}

const updateUser = async (id, user) => {
    const result = await usersRepository.updateUser(id, user);
    return result;
}

export {
    getUsers,
    updateUser
};
