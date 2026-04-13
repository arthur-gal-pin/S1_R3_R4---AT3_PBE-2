import {Router} from 'express';
const routes = Router();
import categoriaRoutes from './categoriaRoutes';
import produtoRoutes from './produtoRoutes';
import clienteRoutes from './clienteRoutes';

routes.use('/categorias', categoriaRoutes);
routes.use('/produtos', produtoRoutes);
routes.use('/clientes', clienteRoutes);

export default routes;