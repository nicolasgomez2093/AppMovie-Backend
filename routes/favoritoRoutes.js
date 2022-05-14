import express from "express";
import { nuevoFavorito, obtenerFavoritos, eliminarFavorito } from "../controllers/favoritoController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
.route("/")
.get(checkAuth, obtenerFavoritos)
.post(checkAuth, nuevoFavorito);

router
.route("/:id")
.delete(checkAuth, eliminarFavorito);

export default router;
