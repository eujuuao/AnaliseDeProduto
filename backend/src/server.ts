import express from 'express';
import productRoutes from './routes/productRoutes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

//registar as rotas 
app.use('/api', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});