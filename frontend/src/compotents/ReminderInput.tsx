// import React, {useRef} from "react";
import "../App.css"
import {Button, Form, Input, Select, Space} from "antd";


const { Option } = Select;

interface Props {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    handleCreate: (e: React.FormEvent)=>void
}
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};



const TaskInput=  ({message, setMessage, handleCreate}: Props) => {
    // const inputRef = useRef<HTMLInputElement>(null);
    const [form] = Form.useForm();


    const onFinish = (values: any) =>
    {
        console.log(values);
        form.resetFields();
        // handleCreate(e);
    }

    const onReset = () => {
        form.resetFields();
    };
    return (
        <div className="inputBox">
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
            >
                <Form.Item name="message" label="Название" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="before" label="Сообщить за" rules={[{ required: true }]} style={{ minWidth: 300}}>
                    <Select
                        placeholder="за сколько дней сообщить"
                        allowClear
                    >
                        <Option value="1">1</Option>
                        <Option value="3">3</Option>
                        <Option value="5">5</Option>
                    </Select>
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
            {/*<form className="inputPanel" onSubmit={(e) => {*/}
            {/*    handleCreate(e);*/}
            {/*    inputRef.current?.blur()*/}
            {/*}}>*/}
            {/*    <input ref={inputRef} className="taskInput" type="text" placeholder={"Что будет?..."} value={reminder}*/}
            {/*           onChange={(event) => setReminder(event.target.value)}></input>*/}
            {/*    <button className="taskInputButton" type="submit"> Create</button>*/}

            {/*</form>*/}
        </div>

    )

}

export default TaskInput;