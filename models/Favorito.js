import mongoose from "mongoose";

const favoritoSchema = mongoose.Schema({
    pelicula: {
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

const Favorito = mongoose.model('Favorito', favoritoSchema);
export default Favorito;