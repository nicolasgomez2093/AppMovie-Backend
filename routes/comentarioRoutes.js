import express from "express";
import {
  obtenerComentarios,
  nuevoComentario,
  obtenerComentario,
  editarComentario,
  eliminarComentario,
} from "../controllers/comentarioController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, obtenerComentarios)
  .post(checkAuth, nuevoComentario);

router
  .route("/:id")
  .get(checkAuth, obtenerComentario)
  .put(checkAuth, editarComentario)
  .delete(checkAuth, eliminarComentario);

export default router;
