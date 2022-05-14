import Favorito from "../models/Favorito.js"
import Usuario from "../models/Usuario.js"

const obtenerFavoritos = async (req, res) => {
    const favoritos = await Favorito.find();
    res.json(favoritos)
}

const nuevoFavorito = async (req, res) => {
    const { creador } = req.body;

    const fav = await Favorito.findOne({ creador });
    if (fav) {
      const error = new Error("El like ya existe");
      return res.status(404).json({ msg: error.message });
    }

    const favorito = new Favorito(req.body)
    favorito.creador = req.usuario._id

    try {
        const favoritoAlmacenado = await favorito.save()
        res.json(favoritoAlmacenado)
        console.log(favoritoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const eliminarFavorito = async (req, res) => {
    const {id} = req.params
    if (id.length === 12 || id.length === 24) {
    } else {
      const error = new Error("Favorito No Encontrado");
      return res.status(404).json({ msg: error.message });
    }

    const favorito = await Favorito.findById(id)

    if(!favorito) {
        const error = new Error("No encontrado")
        return res.status(404).json({msg: error.message})
    }

    if ( favorito.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida")
        return res.status(401).json({msg: error.message})
    }

    try {
        await favorito.deleteOne();
        res.json({ msg: "Favorito Eliminado" });
      } catch (error) {
        console.log(error);
      }
}

export {
    obtenerFavoritos,
    nuevoFavorito,
    eliminarFavorito
}