// Creating project installing packages 'express mongoose nodemon'
// mongoose - библиотека для работы с базой данных mongo. ODM аналог ORM для документо-ориентированный бд
// youtube tutorial - https://www.youtube.com/watch?v=d_aJdcDq6AY

const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');

const PORT = process.env.PORT || '5000';


const app = express();

app.use(express.json());
app.use("/auth", authRouter);


const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://idaveee:idaveee5455@cluster0.2ulgv.mongodb.net/auth-learn?retryWrites=true&w=majority`);
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e)
  }
}

start();