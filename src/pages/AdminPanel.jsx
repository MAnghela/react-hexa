import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useAdmin } from "../hooks/useAdmin";


function AdminPanel() {

  const {
    form,
    usuarios,
    editando,
    handleChange,
    registrar,
    actualizar,
    editar,
    eliminar,
    cancelarEdicion

  } = useAdmin();


  return (

    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-8">
        {/* TITULO */}
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Administración de Usuarios
        </h1>

        {/* FORMULARIO */}
        <div className="grid grid-cols-2 gap-4">
          <select
            name="tipoDoc"
            value={form.tipoDoc}
            onChange={handleChange}
            className="border p-3 rounded">

            <option value="DNI"> DNI </option>
            <option value="CE"> CE</option>

          </select>



          <input
            name="numDoc"
            placeholder="Número documento"
            value={form.numDoc}
            onChange={handleChange}
            className="border p-3 rounded"/>

          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="border p-3 rounded"/>

          <input
            name="apellidoP"
            placeholder="Apellido paterno"
            value={form.apellidoP}
            onChange={handleChange}
            className="border p-3 rounded"/>

          <input
            name="apellidoM"
            placeholder="Apellido materno"
            value={form.apellidoM}
            onChange={handleChange}
            className="border p-3 rounded"/>


          <input
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            className="border p-3 rounded"/>

          <input
            name="email"
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
            className="border p-3 rounded"/>

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="border p-3 rounded"/>

          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            className="border p-3 rounded">

            <option value="ADMIN"> ADMIN </option>
            <option value="VENDEDOR"> VENDEDOR </option>

          </select>


        </div>

        {/* BOTON REGISTRAR / ACTUALIZAR */}

<div className="flex flex-col gap-3 mt-6">
            <button
              onClick={editando ? actualizar : registrar}
              className="bg-pink-600 text-white p-3 rounded flex justify-center items-center gap-2 hover:bg-pink-700"
            >
              <FaPlus />
              {editando ? "Actualizar usuario" : "Registrar usuario"}
            </button>

            {editando && (
              <button
                onClick={cancelarEdicion}
                className="bg-gray-300 text-gray-800 p-3 rounded hover:bg-gray-400"
              >
                Cancelar edición
              </button>
            )}
          </div>


        {/* TABLA USUARIOS */}

        <div className="overflow-x-auto">
          <table className="w-full mt-8 border">
            <thead className="bg-gray-200">


              <tr>

                <th className="p-3">  Nombre</th>
                <th>  Documento</th>
                <th>  Email</th>
                <th>  Rol</th>
                <th>  Acciones</th>
                 </tr>


            </thead>

            <tbody>


              {
                usuarios.map((u)=>(


                  <tr key={u.id}  className="border text-center">
                    <td className="p-3">
                      {u.nombre} {u.apellidoP}
                    </td>

                    <td>
                      {u.tipoDoc} - {u.numDoc}
                    </td>

                    <td>
                      {u.email}
                    </td>

                    <td>
                      {u.rol}
                    </td>

                    <td>

                      <button onClick={()=>editar(u)} className="text-blue-600 mx-3">
                        <FaEdit />
                      </button>

                      <button onClick={()=>eliminar(u.id)} className="text-red-600">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>


  );

}



export default AdminPanel;