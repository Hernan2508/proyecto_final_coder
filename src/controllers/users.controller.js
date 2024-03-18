import * as usersService from '../services/users.service.js'

//EP1 Obtener el listado de Carritos
const getUsers = async (req, res) =>{
    try {
        const users = await usersService.getUsers(); 
        res.send({status: 'success', payload: users});
    } catch(error){
        req.logger.error('Error fetching users:', error);
        res.status(500).send({ status: 'error', message: error.message})
    }    
};


const updateUser = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const { id } = req.params;

        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).send({ status: 'error', message: 'Incomplete values' });
        }

        const result = await usersService.updateUser(id, {
            first_name,
            last_name,
            email,
            age,
            password
        });

        res.status(201).send({ status: 'success', payload: result });

    } catch (error) {
        req.logger.error('Error updating user:', error);
        res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
};

export {
    getUsers, updateUser
};