const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

mongoose.connect(
    "mongodb+srv://lamegodb:cesar123@cluster0-vwi5a.mongodb.net/omnistack?retryWrites=true", 
    {
        useNewUrlParser: true
    }
);

app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(express.json()); //trocar de dados por json entre front e back 
app.use(express.urlencoded({ extended:true })); //permite envio de arquivos o json não permite
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require("./routes")); //pra selecionar que as rotas estão em um arquivo especifico

server.listen(process.env.PORT || 3333);  //rodar o server node src/server.js