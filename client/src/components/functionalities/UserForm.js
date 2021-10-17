import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Swal from 'sweetalert2';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    pass: '',
    confirmPass: '',
    rol: ''
}

const initialErrors = {
    firstName: '',
    lastName: '',
    email: '',
    pass: '',
    confirmPass: '',
    rol: ''
}

const UserForm = () => {

    const [newUser, setNewUser] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);

    const history = useHistory();


    const updateFormValue = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ''
        })
    }


    const save = (e) => {
        e.preventDefault();
        axios.post('/api/user/register', newUser)
            .then(() => {
                setNewUser(initialState);
                history.push('/main/user');
                Swal.fire('Usuario registrado con éxito', 'Datos almacenados', 'success');
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
        history.push('/main/user');
    }

    return (
        <div>
            <h3>Crear nuevo usuario</h3>
            <Form onSubmit={save}>
                <Row>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <Input type="text" name="firstName" value={newUser.firstName} onChange={updateFormValue} required />
                            {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Apellido</Label>
                            <Input type="text" name="lastName" value={newUser.lastName} onChange={updateFormValue} required />
                            {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Correo</Label>
                            <Input type="email" name="email" value={newUser.email} onChange={updateFormValue} required/>
                            {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label for="rol">Rol</Label>
                            <Input type="select" name="rol" id="rol" onChange={updateFormValue}>
                                <option>Seleccionar</option>
                                <option value="ADMINISTRATHOR">Administradora/or</option>
                                <option value="ASSISTANT">Asistente</option>
                            </Input>
                            {errors.rol && <span style={{ color: 'red' }}>{errors.rol}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Contraseña</Label>
                            <Input type="password" name="pass" value={newUser.pass} onChange={updateFormValue} required />
                            {errors.pass && <span style={{ color: 'red' }}>{errors.pass}</span>}
                        </FormGroup>
                    </Col>
                    <Col xs={12}>
                        <FormGroup>
                            <Label>Confirmar contraseña</Label>
                            <Input type="password" name="confirmPass" value={newUser.confirmPass} onChange={updateFormValue} required />
                            {errors.confirmPass && <span style={{ color: 'red' }}>{errors.confirmPass}</span>}
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

export default UserForm;