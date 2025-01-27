import { Router } from 'express';
import ProductController from '../controllers/product.controller';

// Criar um roteador
const router = Router();

// Definir as rotas
router.post('/', ProductController.insertProduct); // POST criar

router.get('/', ProductController.getAllProduct); // GET listar

router.get('/:id', ProductController.getProdutcById); // GET buscar produto pelo id 

router.put('/:id', ProductController.updateProduct); // PUT editar/atualizar 

router.delete('/:id', ProductController.deleteProduct); // DELETE deletar um produto

export default router;
