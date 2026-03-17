const express = require("express");
const swaggerUi = require("swagger-ui-express"); // Verifique o '=' aqui
const swaggerSpec = require("./swagger");
const app = express();


// Middlewares
app.use(express.json());
// Documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Rotas
const eventoRoutes = require("./routes/EventoRoutes");
app.use("/eventos", eventoRoutes);

const participanteRoutes = require("./routes/ParticipanteRoutes");
app.use("/participantes", participanteRoutes);


const inscricaoRoutes = require("./routes/InscricaoRoutes");
app.use("/inscricoes", inscricaoRoutes);



// Rota raiz
app.get("/", (req, res) => {
  res.json({
    mensagem: "API de Notificações",
    documentacao: "/api-docs",
    rotas: {
      eventos: "/eventos",
      participantes: "/participantes",
      inscricoes: "/inscricoes",
    },
  });
});


module.exports = app;