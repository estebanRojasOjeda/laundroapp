import { useContext, useEffect, useState } from "react";
import { Table } from "reactstrap";
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import UserContext from "../../context/UserContext";
import { BsFillCheckSquareFill, BsFillTrashFill } from "react-icons/bs";

const WashList = (props) => {
      const context = useContext(UserContext);

      const [wash, setWash] = useState([]);

      useEffect(() => {
            axios.get('/api/wash-cycle')
                  .then(res => {
                        console.log('RESP', res.data);
                        setWash(res.data)
                  }).catch(err => Swal.fire('Error al listar lavados', 'favor comunicar al admin', 'error'));
      }, []);

      const deleteWash = (p) => {
            Swal.fire({
                  title: 'Eliminar ciclo de Lavado',
                  text: 'eliminar?',
                  confirmButtonText: 'Si',
                  cancelButtonText: 'No',
                  showCancelButton: true,
                  icon: 'warning'
            }).then(resp => {
                  if (resp.value) {
                        axios.delete('/api/wash-cycle/' + p.id)
                              .then(res => {
                                    const wash_ = wash.filter(w => w._id != p.id);
                                    setWash(wash_);
                                    Swal.fire('Ciclo eliminado', 'El registro fue eliminado', 'success');
                              })
                              .catch(err => Swal.fire('Eliminar ciclo de Lavado', 'error al tratar de eliminar', 'error'));
                  }
            })
      }




      return (

            <Table hover responsive style={{ textAlign: 'center' }}>
                  <thead>
                        <tr>
                              <th>N° Cargas</th>
                              <th>Fecha</th>
                              <th>Cliente</th>
                              <th>Precio unitario</th>
                              <th>Precio total</th>
                              <th>Estado</th>
                              <th>Finalizar</th>
                              <th>Eliminar</th>
                        </tr>
                  </thead>
                  <tbody>
                        {wash.map((item, i) =>
                              <tr key={i}>
                                    <td>{item.charge}</td>
                                    <td>{moment(item.date).format('DD-MM-YYYY')}</td>
                                    <td>{item.customer[0]?.firstName} {item.customer.lastName}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.totalAmount}</td>
                                    <td>{item.state}</td>
                                    <td><a onClick={e => deleteWash(item)}><BsFillCheckSquareFill /></a></td>
                                    <td><a onClick={e => deleteWash(item)}><BsFillTrashFill /></a></td>
                              </tr>
                        )}
                  </tbody>
            </Table>

      )
}

export default WashList;