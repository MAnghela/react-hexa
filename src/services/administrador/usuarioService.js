import axios from "axios";
const API = "http://localhost:8080/api/empleados";

const getAuth = () => {
    const token = localStorage.getItem("accessToken");
    console.log("TOKEN ENVIADO:", token);
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const listarUsuarios = () =>
    axios.get(`${API}/listar`, getAuth());

export const crearUsuario = (usuario) =>
    axios.post(`${API}/crear`, usuario, getAuth());

export const actualizarUsuario = (id, usuario) =>
    axios.put(`${API}/actualizar/${id}`, usuario, getAuth());

export const eliminarUsuario = (id) =>
    axios.delete(`${API}/eliminar/${id}`, getAuth());