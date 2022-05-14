import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });
  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.json({msg: 'Usuario creado correctamente!'});
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req,res) => {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      const error = new Error("El usuario no existe");
      return res.status(404).json({ msg: error.message });
    }

    if (await usuario.comprobarPassword(password)) {
        res.json({
          _id: usuario._id,
          nombre: usuario.nombre,
          email: usuario.email,
          token: generarJWT(usuario._id),
        });
      } else {
        const error = new Error("La contraseña ingresada no es correcta");
        return res.status(403).json({ msg: error.message });
      }
  
}

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      const error = new Error("El usuario no existe");
      return res.status(404).json({ msg: error.message });
    }
    try {
      usuario.token = generarId();
      await usuario.save();

      res.json({ token: usuario.token });
    } catch (error) {
      console.log(error);
    }      

  };

  const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Usuario.findOne({ token });
    if (tokenValido) {
      res.json({ msg: "Token valido y el usuario existe" });
    } else {
      const error = new Error("Token no valido");
      return res.status(404).json({ msg: error.message });
    }
  };
  
  const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    const usuario = await Usuario.findOne({ token });
    if (usuario) {
      usuario.password = password;
      usuario.token = "";
      try {
        await usuario.save();
        res.json({ msg: "Password modificado correctamente" });
      } catch (error) {
        console.log(error);
      }
    } else {
      const error = new Error("Token no valido");
      return res.status(404).json({ msg: error.message });
    }
  };

  
const perfil = async (req, res) => {
    const { usuario } = req;
    res.json(usuario);
  };
  

export { registrar, autenticar, olvidePassword, comprobarToken, nuevoPassword, perfil };
