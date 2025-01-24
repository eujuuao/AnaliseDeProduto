import { Router } from 'express';
import ProductController from '../controllers/product.controller';

// Criar um roteador
const router = Router();

// Definir as rotas
router.post('/', ProductController.insertProduct); // POST para inserir um produto

// router.get('/', ProductController.getProduct); 

export default router;
