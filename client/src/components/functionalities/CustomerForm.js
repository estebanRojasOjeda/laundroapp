import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Swal from 'sweetalert2';

const initialState = {
    identification: '',
    dv: '',
    firstName: '',
    lastName: '',
    email: '',
    numberPhone: ''
}

const initialErrors = {
    identification: '',
    dv: '',
    firstName: '',
    lastName: '',
    email: '',
    numberPhone: ''
}

const CustomerForm = (props) => {

    const [errors, setErrors] = useState(initialErrors);
    const [inputs, setInputs] = useState(initialState);

    const history = useHistory();

    const { id } = useParams();

    const updateFormValue = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ''
        })
    }


    const save = (e) => {
        e.preventDefault();
        if (props.new) {
            axios.post('/api/customer/', inputs)
                .then(() => {
                    setInputs(initialState);
                    history.push('/main/customer');
                    Swal.fire('Cliente registrado con éxito', 'Datos almacenados', 'success');
                }).catch(err => {
                    for (let field in err.response.data.errors) {
                        setErrors({
                            ...errors,
                            [field]: err.response.data.errors[field].message
                        });
                    }
                });
        } else if (props.edit) {
            axios.put('/api/customer/' + id, inputs)
                .then(resp => {
                    history.push('/main/customer')
                    Swal.fire('Cliente actualizado con éxito', 'Datos actualizados', 'success');
                }).catch(err => {
                    for (let field in err.response.data.errors) {
                        setErrors({
                            ...errors,
                            [field]: err.response.data.errors[field].message
                        });
                    }
                });
        }
    }

    useEffect(() => {
        if (props.edit) {
            axios.get('/api/customer/' + id)
                .then(resp => {
                    setInputs(resp.data);
                }).catch(err => console.log(err));
        }
    }, []);

    const back = (e) => {
        history.push('/main/customer');
    }
    
    var title = '';
    
    if (props.new) {
        title = 'Crear nuevo cliente';
    } else if (props.edit) {
        title = 'Editar datos del cliente';
    }

    return (
        <div>
            <h3>{title}</h3>
            <Form onSubmit={save}>
                <Row>
                    <Col md={10}>
                        <FormGroup>
                            <Label>Rut</Label>
                            <Input type="number" name="identification" value={inputs.identification} onChange={updateFormValue} required />
                            {errors.identification && <span style={{ color: 'red' }}>{errors.identification}</span>}
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label>DV</Label>
                            <Input type="text" name="dv" value={inputs.dv} onChange={updateFormValue} required />
                            {errors.dv && <span style={{ color: 'red' }}>{errors.dv}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <Input type="text" name="firstName" value={inputs.firstName} onChange={updateFormValue} required />
                            {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Apellido</Label>
                            <Input type="text" name="lastName" value={inputs.lastName} onChange={updateFormValue} required />
                            {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Correo</Label>
                            <Input type="email" name="email" value={inputs.email} onChange={updateFormValue} required />
                            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Movil</Label>
                            <Input type="number" name="numberPhone" value={inputs.numberPhone} onChange={updateFormValue} required />
                            {errors.numberPhone && <span style={{ color: 'red' }}>{errors.numberPhone}</span>}
                        </FormGroup>
                    </Col>

                    <Col xs={12} className="mt-3">
                        <Button type="submit" color="primary">Guardar</Button>
                    </Col>
                    <Col xs={12} className="mt-3">
                        <Button type="button" onClick={back}>Volver</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default CustomerForm;