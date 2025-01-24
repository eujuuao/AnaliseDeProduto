import express from 'express';
import productRoutes from './routes/product.routes';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//registar as rotas 
app.use('/produtos', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});