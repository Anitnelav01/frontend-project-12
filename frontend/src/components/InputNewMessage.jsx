import { useFormik } from "formik";
import { Form, InputGroup, Button } from "react-bootstrap";
import * as Yup from 'yup';
import { useEffect, useRef } from "react";
import { useSocketContext } from "../contexts/index.jsx";
import useAuth from '../hooks/useAuth.jsx';
import { useSelector } from "react-redux";

const InputNewMessage = () => {
    const { sendMessage } = useSocketContext();
    const channelId = useSelector((state) => state.channelsInfo.currentChannelId);
    const { user: username } = useAuth();
    const inputMessageRef = useRef();

    const formik = useFormik({
        initialValues: {
            body: '',
        },
        validationSchema: Yup.object({
            body: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            const message = { body: values.body, user: username.username, channelId };
            try {
                sendMessage(message);
                formik.resetForm();
            } catch(error) {
                throw error;
            }
        },
    });

    useEffect(() => {
        inputMessageRef.current.focus();
    }, []);

    return (
        <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
            <InputGroup>
                <Form.Control
                    className="border-0 p-0 ps-2"
                    name="body"
                    aria-label="Новое сообщение"
                    onChange={formik.handleChange}
                    value={formik.values.body}
                    disabled={formik.isSubmitting}
                    placeholder="Введите сообщение..."
                    ref={inputMessageRef}
                />
                <Button
                    type="submit"
                    variant="vertical"
                    disabled={!formik.isValid}
                >
                    Отправить
                </Button>
            </InputGroup>
        </Form>
    )
};

export default InputNewMessage;