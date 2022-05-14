import mongoose from "mongoose";

const comentariosSchema = mongoose.Schema({
    titulo: {
        type: String,
        trim: true,
        required: true,
    },
    descripcion: {
        type: String,
        trim: true,
        required: true,
    },
    pelicula: {
        type: String,
        trim: true,
        required: true
    },
    creadorNombre: {
        type: String,
        trim: true,
        required: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
}, {
    timestamps: true,
});

const Comentario = mongoose.model('Comentario', comentariosSchema);
export default Comentario;