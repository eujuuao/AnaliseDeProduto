import { Router } from 'express';
import * as productController from './controllers/productController'; // Corrigido para importação nomeada

const router = Router();

// Inserir informações (POST)
router.post('/products', productController.createProduct);

// Puxar informações (GET)
router.get('/products', productController.getProducts);

// Editar informações (PUT)
router.put('/products/:id', productController.updateProduct);

// Excluir informações (DELETE)
router.delete('/products/:id', productController.deleteProduct);

export default router;