import Comentario from "../models/Comentario.js"
import Usuario from "../models/Usuario.js"

const obtenerComentarios = async (req, res) => {
    const comentarios = await Comentario.find();
    res.json(comentarios)
}

const nuevoComentario = async (req, res) => {
    const comentario = new Comentario(req.body)
    comentario.creador = req.usuario._id

    try {
        const comentarioAlmacenado = await comentario.save()
        res.json(comentarioAlmacenado)
        console.log(comentarioAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const obtenerComentario = async (req, res) => {
    const {id} = req.params
    if (id.length === 12 || id.length === 24) {
    } else {
      const error = new Error("Comentario No Encontrado");
      return res.status(404).json({ msg: error.message });
    }

    const comentario = await Comentario.findById(id)

    if(!comentario) {
        const error = new Error("No encontrado")
        return res.status(404).json({msg: error.message})
    }

    if ( comentario.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida")
        return res.status(401).json({msg: error.message})
    }

    res.json(comentario)
}

const editarComentario = async (req, res) => {
    const {id} = req.params
    if (id.length === 12 || id.length === 24) {
    } else {
      const error = new Error("Comentario No Encontrado");
      return res.status(404).json({ msg: error.message });
    }

    const comentario = await Comentario.findById(id)

    if(!comentario) {
        const error = new Error("No encontrado")
        return res.status(404).json({msg: error.message})
    }

    if ( comentario.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida")
        return res.status(401).json({msg: error.message})
    }

    comentario.titulo = req.body.titulo || comentario.titulo;
    comentario.descripcion = req.body.descripcion || comentario.descripcion;

    try {
        const comentarioAlmacenado = await comentario.save()
        res.json(comentarioAlmacenado)
    } catch (error) {
        console.log(error)
    }

}

const eliminarComentario = async (req, res) => {
    const {id} = req.params
    if (id.length === 12 || id.length === 24) {
    } else {
      const error = new Error("Comentario No Encontrado");
      return res.status(404).json({ msg: error.message });
    }

    const comentario = await Comentario.findById(id)

    if(!comentario) {
        const error = new Error("No encontrado")
        return res.status(404).json({msg: error.message})
    }

    if ( comentario.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida")
        return res.status(401).json({msg: error.message})
    }

    try {
        await comentario.deleteOne();
        res.json({ msg: "Comentario Eliminado" });
      } catch (error) {
        console.log(error);
      }
}

export {
    obtenerComentarios,
    nuevoComentario,
    obtenerComentario,
    editarComentario,
    eliminarComentario
}