import React from "react";
import styles from "./Register.module.scss";
import { Card, Form, Input, Button } from "antd";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import notification from "../Notification/Notification";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            dui: "",
            email: "",
            password: "",
            password2: ""
        };
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    confirmPassword = (password, password2) => {
        return password === password2;
    };

    handleSubmit = (e, history) => {
        e.preventDefault();

        const { name, dui, email, password, password2 } = this.state;

        if (!this.confirmPassword(password, password2)) {
            notification("Las contraseñas no coinciden", "", "error", 2);
            return;
        }

        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                dui,
                email,
                password
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === "success") {
                    history.push("/signin");
                } else
                    notification(
                        "Error",
                        "Ha ocurrido un error creando el usuario. Por favor intente mas tarde",
                        "error",
                        2
                    );
            })
            .catch(error => console.log(error));
    };

    render() {
        const { history, location } = this.props;
        const { name, dui, email, password, password2 } = this.state;

        return (
            <div className={styles.wrapper}>
                <Card className={styles.card}>
                    <Button
                        className={styles.goBack}
                        onClick={() => {
                            console.log(location);
                            history.push("/");
                        }}
                    >
                        <div className={styles.icon}>
                            <FontAwesomeIcon icon="arrow-left" />
                        </div>
                    </Button>
                    <h3>Registrate</h3>
                    <p>Registrate y ordena desde la comodidad de tu mesa</p>
                    <Form className={styles.form} onSubmit={e => {}}>
                        <Form.Item
                            label="Nombre Completo"
                            className={styles.label}
                        >
                            <Input
                                type="text"
                                placeholder="Nombre Completo"
                                onChange={this.handleChange}
                                value={name}
                                name="name"
                            />
                        </Form.Item>
                        <Form.Item label="Email" className={styles.label}>
                            <Input
                                type="email"
                                placeholder="Email"
                                onChange={this.handleChange}
                                value={email}
                                name="email"
                            />
                        </Form.Item>
                        <Form.Item label="DUI" className={styles.label}>
                            <Input
                                type="text"
                                placeholder="DUI"
                                onChange={this.handleChange}
                                value={dui}
                                name="dui"
                            />
                        </Form.Item>
                        <Form.Item label="Contraseña" className={styles.label}>
                            <Input
                                type="password"
                                placeholder="Contraseña"
                                onChange={this.handleChange}
                                value={password}
                                name="password"
                            />
                        </Form.Item>
                        <Form.Item label="Confirme su contraseña" className={styles.label}>
                            <Input
                                type="password"
                                placeholder="Confirme su contraseña"
                                onChange={this.handleChange}
                                value={password2}
                                name="password2"
                            />
                        </Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={styles.signupBtn}
                        >
                            <strong>Registrate</strong>
                        </Button>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default withRouter(RegisterForm);