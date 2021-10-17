import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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

const CustomerForm = () => {

    const [errors, setErrors] = useState(initialErrors);
    const [newCustomer, setNewCustomer] = useState(initialState);

    const history = useHistory();


    const updateFormValue = (e) => {
        const { name, value } = e.target;
        setNewCustomer({
            ...newCustomer,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ''
        })
    }


    const save = (e) => {
        e.preventDefault();
        axios.post('/api/customer/', newCustomer)
            .then(() => {
                setNewCustomer(initialState);
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
    }

    const back = (e) => {
        history.push('/main/customer');
    }

    return (
        <div>
            <h3>Crear nuevo usuario</h3>
            <Form onSubmit={save}>
                <Row>
                    <Col md={10}>
                        <FormGroup>
                            <Label>Rut</Label>
                            <Input type="number" name="identification" value={newCustomer.identification} onChange={updateFormValue} required />
                            {errors.identification && <span style={{ color: 'red' }}>{errors.identification}</span>}
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label>DV</Label>
                            <Input type="text" name="dv" value={newCustomer.dv} onChange={updateFormValue} required />
                            {errors.dv && <span style={{ color: 'red' }}>{errors.dv}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <Input type="text" name="firstName" value={newCustomer.firstName} onChange={updateFormValue} required />
                            {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Apellido</Label>
                            <Input type="text" name="lastName" value={newCustomer.lastName} onChange={updateFormValue} required />
                            {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Correo</Label>
                            <Input type="email" name="email" value={newCustomer.email} onChange={updateFormValue} required />
                            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Movil</Label>
                            <Input type="number" name="numberPhone" value={newCustomer.numberPhone} onChange={updateFormValue} required />
                            {errors.numberPhone && <span style={{ color: 'red' }}>{errors.numberPhone}</span>}
                        </FormGroup>
                    </Col>

                    <Col xs={12} className="mt-3">
                        <Button type="submit" color="primary">Registrar</Button>
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