import { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import { BsFillCheckSquareFill, BsFillTrashFill, BsFillArrowDownSquareFill, BsFillHandThumbsUpFill, BsFillExclamationOctagonFill } from "react-icons/bs";
import './style/wash-list.css'
import PdfDocument from "./PdfDocument";
import { PDFDownloadLink } from '@react-pdf/renderer';


const WashList = () => {

      const [wash, setWash] = useState([]);

      const history = useHistory();

      useEffect(() => {
            axios.get('/api/wash-cycle')
                  .then(res => {
                        setWash(res.data)
                  }).catch(err => Swal.fire('Error al listar lavados', 'favor comunicar al admin', 'error'));
      }, []);

      const deleteWash = (id) => {
            Swal.fire({
                  title: 'Eliminar ciclo de Lavado',
                  text: 'eliminar?',
                  confirmButtonText: 'Si',
                  cancelButtonText: 'No',
                  showCancelButton: true,
                  icon: 'warning'
            }).then(resp => {
                  if (resp.value) {
                        axios.delete('/api/wash-cycle/' + id)
                              .then(res => {
                                    const wash_ = wash.filter(w => w._id != id);
                                    setWash(wash_);
                                    Swal.fire('Ciclo eliminado', 'El registro fue eliminado', 'success');
                              })
                              .catch(err => Swal.fire('Eliminar ciclo de Lavado', 'error al tratar de eliminar', 'error'));
                  }
            })
      }

      const finishWash = (id) => {
            Swal.fire({
                  title: 'Finalizar ciclo de Lavado',
                  text: 'desea finalizar ciclo?',
                  confirmButtonText: 'Si',
                  cancelButtonText: 'No',
                  showCancelButton: true,
                  icon: 'warning'
            }).then(res => {
                  if (res.value) {
                        axios.put('/api/wash-cycle/' + id, { state: "FINISHED" })
                              .then(() => {
                                    updateTable();
                              }).catch(err => {
                                    Swal.fire('Error al finalizar lavado', 'favor comunicar al admin', 'error: ' + err)
                              });
                  }
            })
      }

      const updateTable = () => {
            axios.get('/api/wash-cycle')
                  .then(res => {
                        setWash(res.data)
                  }).catch(err => Swal.fire('Error al actualizar tabla', 'Error al tratar de listar', 'error'));
      }

      const newWash = () => {
            history.push('/main/new');
      }

      return (
            <>
                  <div className="wash-container">
                        <h3>Ciclos de lavado</h3>
                        <br />
                        <Table hover responsive style={{ textAlign: 'center' }}>
                              <thead>
                                    <tr>
                                          <th>N° Cargas</th>
                                          <th>Fecha</th>
                                          <th>Cliente</th>
                                          <th>Precio unitario</th>
                                          <th>Precio total</th>
                                          <th>Estado</th>
                                          <th>Finalizar ciclo</th>
                                          <th>Boleta</th>
                                          <th>Eliminar</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {wash.map((item, i) =>
                                          <tr key={i}>
                                                <td>{item.charge}</td>
                                                <td>{moment(item.date).format('DD-MM-YYYY')}</td>
                                                <td>{item.customer[0]?.firstName} {item.customer[0]?.lastName}</td>
                                                <td>{item.amount}</td>
                                                <td>{item.totalAmount}</td>
                                                <td>{item.state == 'IN_PROGRESS' ? 'En Progreso' : 'Finalizado'}</td>
                                                <td>
                                                      {item.state == 'IN_PROGRESS' && <a onClick={e => finishWash(item.id)}><BsFillCheckSquareFill /></a>}
                                                      {item.state == 'FINISHED' && <BsFillHandThumbsUpFill />}
                                                </td>
                                                <td>
                                                      {item.state == 'FINISHED' && <PDFDownloadLink document={<PdfDocument data={item} />} fileName="boleta-laundromat.pdf"><BsFillArrowDownSquareFill /></PDFDownloadLink>}
                                                      {item.state == 'IN_PROGRESS' && <BsFillExclamationOctagonFill />}
                                                </td>
                                                <td><a onClick={e => deleteWash(item.id)}><BsFillTrashFill /></a></td>
                                          </tr>
                                    )}
                              </tbody>
                        </Table>
                  </div>
                  <br />
                  <Button size="lg" className="add-wash" onClick={newWash}>Agregar lavado</Button>
            </>
      )
}

export default WashList;