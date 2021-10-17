import { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";

const CustomerList = () => {

      const [customerList, setcustomerList] = useState([]);

      const history = useHistory();

      useEffect(() => {
            axios.get('/api/customer')
                  .then(res => {
                        setcustomerList(res.data)
                  }).catch(err => Swal.fire('Error al listar clientes', 'favor comunicar al admin', 'error'));
      }, []);

      const deleteCustomer = (id) => {
            Swal.fire({
                  title: 'Eliminar Cliente',
                  text: 'eliminar?',
                  confirmButtonText: 'Si',
                  cancelButtonText: 'No',
                  showCancelButton: true,
                  icon: 'warning'
            }).then(resp => {
                  if (resp.value) {
                        axios.delete('/api/customer/' + id)
                              .then(res => {
                                    const customerList_ = customerList.filter(c => c._id != id);
                                    setcustomerList(customerList_);
                                    Swal.fire('Cliente eliminado', 'El Cliente fue eliminado', 'success');
                              })
                              .catch(err => Swal.fire('Eliminar Cliente', 'error al tratar de eliminar', 'error'));
                  }
            })
      }


      const newCustomer = () => {
            history.push('/customer/new');
      }

      return (
            <>
            <h3>Mantenedor de Clientes</h3>
            <br/>
                  <Table hover responsive style={{ textAlign: 'center' }}>
                        <thead>
                              <tr>
                                    <th>Rut</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Correo</th>
                                    <th>Movil</th>
                              </tr>
                        </thead>
                        <tbody>
                              {customerList.map((item, i) =>
                                    <tr key={i}>
                                          <td>{item.identification}-{item.dv}</td>
                                          <td>{item.firstName}</td>
                                          <td>{item.lastName}</td>
                                          <td>{item.email}</td>
                                          <td>{item.numberPhone}</td>
                                          <td><a onClick={e => deleteCustomer(item._id)}><BsFillTrashFill /></a></td>
                                    </tr>
                              )}
                        </tbody>
                  </Table>
                  <br />
                  <Button size="lg" onClick={newCustomer}>Agregar Cliente</Button>
            </>
      )
}

export default CustomerList;