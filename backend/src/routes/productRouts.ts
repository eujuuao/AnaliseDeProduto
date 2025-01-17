import { Router } from 'express';

const router = Router(); 


// Inserir iformação (POST)
router.post('/products', (req, res) => {
    res.send('Criar informações');
});

// Puxar informações (GET)
router.get('/products', (req, res) => {
    res.send('Listar informações');
});
