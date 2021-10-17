import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Swal from 'sweetalert2';

const initialState = {
    charge: 0,
    amount: 0,
    userId: '',
    customerId: ''
}

const initialErrors = {
    charge: '',
    amount: '',
    userId: '',
    customerId: ''
}

const WashForm = () => {

    const [inputs, setInputs] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);
    const [customers, setCustomers] = useState([]);

    const hist = useHistory();


    const updateFormValue = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    useEffect(() => {
        axios.get('/api/customer')
            .then(res => {
                setCustomers(res.data)
            }).catch(err => Swal.fire('Error al llenar selector', 'favor comunicar al admin', 'error'));
    }, []);

    const save = (e) => {
        e.preventDefault();
        console.log(inputs)
        axios.post('/api/wash-cycle', inputs)
            .then(() => {
                hist.push('/main')
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
        hist.push('/main');
    }

    return (
        <div>
            <h3>Crear nuevo ciclo de lavado</h3>
            <Form onSubmit={save}>
                <Row>
                    <Col xs={12}>
                        <FormGroup>
                            <Label for="customerId">Cliente</Label>
                            <Input type="select" name="customerId" id="position" onChange={updateFormValue}>
                                <option>Seleccionar</option>
                                {
                                    customers.map((item, i) =>
                                        <option value={item._id} key={i}>{item.firstName} {item.lastName}</option>

                                    )}
                            </Input>
                            {errors.customer && <span style={{ color: 'red' }}>{errors.customer}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>N°Carga</Label>
                            <Input type="number" name="charge" value={inputs.charge} onChange={updateFormValue} required />
                            {errors.charge && <span style={{ color: 'red' }}>{errors.charge}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Precio por Carga</Label>
                            <Input type="number" name="amount" value={inputs.amount} onChange={updateFormValue} required />
                            {errors.amount && <span style={{ color: 'red' }}>{errors.amount}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12} className="mt-3">
                        <Button type="submit">Crear nuevo lavado</Button>
                    </Col>
                    <Col xs={12} className="mt-3">
                        <Button type="button" onClick={back}>Volver</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default WashForm;