import { useEffect, useState } from "react";

import { listarUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario} from "../services/administrador/usuarioService";


export const useAdmin = ()=>{

const usuarioInicial = {

    id:null,
    tipoDoc:"DNI",
    numDoc:"",
    nombre:"",
    apellidoP:"",
    apellidoM:"",
    telefono:"",
    email:"",
    password:"",
    rol:"ADMIN"

};

const [usuarios,setUsuarios] = useState([]);
const [editando,setEditando] = useState(false);
const [form,setForm] = useState(usuarioInicial);



// LISTAR
const listar = async()=>{
    try{
        const respuesta = await listarUsuarios();
        setUsuarios(respuesta.data);
    }catch(error){
        console.log(error);
    }
};



// cargar usuarios al entrar
useEffect(()=>{
    listar();
},[]);


// cambiar inputs
const handleChange=(e)=>{
    const {name,value}=e.target;
    setForm({
        ...form,
        [name]:value
    });
};

// REGISTRAR

const registrar = async () => {

    //  Validar campos antes de enviar al backend
    if (
        !form.nombre ||
        !form.apellidoP ||
        !form.email ||
        !form.password
    ) {
        alert("Complete todos los campos");
        return;
    }

    try {
        const { id, ...usuario } = form;
        await crearUsuario(usuario);
        alert("Usuario registrado correctamente");
        setForm(usuarioInicial);
        setEditando(false);
        listar();

    } catch (error) {
    console.error("Error al registrar usuario:", error.response?.data || error.message);
    alert(error.response?.data?.message || error.message || "Error al registrar usuario");
}

};

// EDITAR
const editar = (usuario) => {
    setForm({
        id: usuario.id,
        tipoDoc: usuario.tipoDoc || "DNI",
        numDoc: usuario.numDoc || "",
        nombre: usuario.nombre || "",
        apellidoP: usuario.apellidoP || "",
        apellidoM: usuario.apellidoM || "",
        telefono: usuario.telefono || "",
        email: usuario.email || "",
        password: "",
        rol: usuario.rol || "ADMIN"
    });

    setEditando(true);
};

// ACTUALIZAR
const actualizar = async () => {

    try {
        const { id, password, ...usuarioActualizado } = form;
        if (password) {
            usuarioActualizado.password = password;
        }

        await actualizarUsuario(form.id, usuarioActualizado);
        alert("Usuario actualizado");
        setEditando(false);       // Vuelve al modo registrar
        setForm(usuarioInicial);  // Limpia el formulario
        listar();                 // Recarga la tabla

    } catch (error) {
        console.error("Error al actualizar usuario:", error.response?.data || error.message || error);
        alert(error.response?.data?.message || error.message || "Error al actualizar usuario");
    }

};

const cancelarEdicion = () => {
    setEditando(false);
    setForm(usuarioInicial);
};

// ELIMINAR

const eliminar = async (id) => {

    const confirmar = window.confirm("¿Desea eliminar este usuario?");
    if (!confirmar) return;
    try {
        await eliminarUsuario(id);
        alert("Usuario eliminado");
        listar();
    } catch (error) {
        console.log(error);
        alert("Error al eliminar");

    }

};
return{
    form,
    usuarios,
    editando,
    handleChange,
    registrar,
    actualizar,
    editar,
    eliminar,
    cancelarEdicion


};

};