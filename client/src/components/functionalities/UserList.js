import { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";

const UserList = () => {

      const [userList, setUserList] = useState([]);

      const history = useHistory();

      useEffect(() => {
            axios.get('/api/user')
                  .then(res => {
                        setUserList(res.data)
                  }).catch(err => Swal.fire('Error al listar usuarios', 'favor comunicar al admin', 'error'));
      }, []);

      const deleteUser = (id) => {
            Swal.fire({
                  title: 'Eliminar Usuario',
                  text: 'eliminar?',
                  confirmButtonText: 'Si',
                  cancelButtonText: 'No',
                  showCancelButton: true,
                  icon: 'warning'
            }).then(resp => {
                  if (resp.value) {
                        axios.delete('/api/user/' + id)
                              .then(res => {
                                    const userList_ = userList.filter(u => u._id != id);
                                    setUserList(userList_);
                                    Swal.fire('Usuario eliminado', 'El usuario fue eliminado', 'success');
                              })
                              .catch(err => Swal.fire('Eliminar Usuario', 'error al tratar de eliminar', 'error'));
                  }
            })
      }


      const newUser = () => {
            history.push('/user/new');
      }

      const updateUser = (id) => {
            history.push('/user/edit/'+id);
      }

      return (
            <>
            <h3>Mantenedor de Usuarios</h3>
            <br/>
                  <Table hover responsive style={{ textAlign: 'center' }}>
                        <thead>
                              <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Correo</th>
                                    <th>Rol</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                              </tr>
                        </thead>
                        <tbody>
                              {userList.map((item, i) =>
                                    <tr key={i}>
                                          <td>{item._id}</td>
                                          <td>{item.firstName}</td>
                                          <td>{item.lastName}</td>
                                          <td>{item.email}</td>
                                          <td>{item.rol}</td>
                                          <td><a onClick={e => updateUser(item._id)}><BsPencil /></a></td>
                                          <td><a onClick={e => deleteUser(item._id)}><BsFillTrashFill /></a></td>
                                    </tr>
                              )}
                        </tbody>
                  </Table>
                  <br />
                  <Button size="lg" onClick={newUser}>Agregar Usuario</Button>
            </>
      )
}

export default UserList;