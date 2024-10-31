import {Button, Form, Input} from 'antd';
// import React from 'react';
import type { FormProps } from 'antd';
import {useState} from "react";


type FieldType = {
    username: string;
    password: string;
};


function LoginPage(){


    const [jwt, setJwt] = useState<string>();
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');




    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

        fetch('http://localhost:8081/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'login': values.username,
                'password': values.password,
            }
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('jwt', data.result);
                setJwt(`${data.result}`);
                console.log(data.result, jwt);
            })
            .catch(error => {
                console.error(error);
                setJwt('Произошла ошибка при выполнении поиска');
            });
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return(
        <div className="loginForm">

            <h3 style={{color: 'black', justifySelf: "start"}}>MemoMail</h3>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"

            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Введите имя пользователя' }]}
                >
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>

                {/*<Form.Item<FieldType>*/}
                {/*    name="remember"*/}
                {/*    valuePropName="checked"*/}
                {/*    wrapperCol={{ offset: 8, span: 16 }}*/}
                {/*>*/}
                {/*    <Checkbox>Remember me</Checkbox>*/}
                {/*</Form.Item>*/}

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>

    )
}

export default LoginPage;