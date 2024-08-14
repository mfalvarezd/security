require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
/* 1. Módulo express-session */
const session = require("express-session");

/* 1. Referencia a los middlewares */
var authenticateSession = require("./middleware/authentication_session");
var authorizationSession = require("./middleware/authorization_session");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var tokenRouter = require("./routes/token");
var createError = require("http-errors");
var express = require("express");

var app = express();

// Configurar el motor de vistas EJS
/* 2. Agregue el middleware al router */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
/* 2. Configuración del middleware */
app.use(
  session({
    secret: process.env.TOKEN_SECRET,
    name: "session.security",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
/* 2. Agregue el middleware al router */
app.use('/users', authenticateSession, authorizationSession, usersRouter);
app.use('/token',authenticateSession,tokenRouter);

module.exports = app;
