import { Router } from 'express';
import { getUsers, updateUser} from '../controllers/users.controller.js';
import { isAdmin } from '../middlewares/authMiddleware.js';
import { addLogger } from '../utils/logger.js';
import toAsyncRouter from 'async-express-decorator';


const router = toAsyncRouter(Router());

//? Construcción de nuestro servicio o endpoint MongoDB
router.get('/', addLogger, isAdmin, getUsers); // EP1. Obtener Productos
router.put('/:id', addLogger, isAdmin, updateUser); //EP4. Actualizar un Producto por Id isAdmin

export default router;