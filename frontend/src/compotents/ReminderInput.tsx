import React from "react";
import "../App.css"
import {Button, Checkbox, Col, Form, Input, Row, Space} from "antd";
import { RuleObject } from "antd/es/form";

// const { Option } = Select;

interface Props {
    message: string;
    date: string;
    befores: number[];
    setBefores: React.Dispatch<React.SetStateAction<number[]>>;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    setDate: React.Dispatch<React.SetStateAction<string>>;
    handleCreate: (e: React.FormEvent)=>void
}
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};



const TaskInput=  ({message, date,befores, setBefores, setMessage, setDate,handleCreate}: Props) => {
    // const inputRef = useRef<HTMLInputElement>(null);
    const [form] = Form.useForm();


    // const onFinish = (values: any) =>
    // {
    //     console.log(values);
    //     form.resetFields();
    //     // handleCreate(e);
    // }

    const handleFinish = (e: React.FormEvent) =>{
        console.log('Finish:', e);
        onReset();

    }

    const onReset = () => {
        form.resetFields();
    };

    const validateDate = (_rule: RuleObject, value: string) => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(value)) {
            return Promise.reject('Please enter a valid date in the format "yyyy-mm-dd".');
        }
        return Promise.resolve();
    };
    return (
        <div className="inputBox">
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={(e) => {handleCreate(e); handleFinish(e);}}
                style={{ maxWidth: 600 }}
            >
                <Form.Item name="message" label="Название" rules={[{ required: true }]}>
                    <Input onChange={ (e) => setMessage(e.target.value) } value={message}/>
                </Form.Item>
                <Form.Item name="dateInput" label="Дата" rules={[{ required: true }, { validator: validateDate }]}>
                    <Input  placeholder="1970-01-01" onChange={(e)=> setDate(e.target.value)} value = {date}/>
                </Form.Item>
                <Form.Item name="before" label="Сообщить за" rules={[{ required: true }]} style={{ minWidth: 300}}>
                        <Checkbox.Group onChange={(values) => setBefores(values)} value={befores}>
                            <Row>
                                <Col span={8}>
                                    <Checkbox value="1" style={{ lineHeight: '32px' }}>
                                        1
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="3" style={{ lineHeight: '32px' }} >
                                        3
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="5" style={{ lineHeight: '32px' }}>
                                        5
                                    </Checkbox>
                                </Col><Col span={8}>
                                <Checkbox value="30" style={{ lineHeight: '32px' }}>
                                    30
                                </Checkbox>
                            </Col>

                            </Row>
                        </Checkbox.Group>

                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Создать
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Стереть
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>

    )

}

export default TaskInput;