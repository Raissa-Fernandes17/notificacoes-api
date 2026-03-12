
const express = require("express");
const app = express();

// 1. Importar as rotas (Remova os // daqui!)
const eventoRoutes = require("./routes/EventoRoutes"); 
const participanteRoutes = require("./routes/ParticipanteRoutes"); 
const inscricaoRoutes = require("./routes/InscricaoRoutes");


// 2. Usar (Remova os // daqui!)
app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use(express.json());
app.use("/inscricoes", inscricaoRoutes);


// 3. Rota raiz para teste rápido
app.get("/", (req, res) => {
  res.json({
    mensagem: "API de Notificações",
    rotas: {
      eventos: "/eventos",
      participantes: "/participantes",
      inscricoes: "/inscricoes"
    }
  });
});


module.exports = app;