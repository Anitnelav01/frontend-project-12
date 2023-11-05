import { useFormik } from "formik";
import { Form, InputGroup, Button } from "react-bootstrap";
import * as Yup from 'yup';
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import leoProfanity from 'leo-profanity';
import { useSocketContext } from "../contexts/index.jsx";
import useAuth from '../hooks/useAuth.jsx';
import { useSelector } from "react-redux";

const InputNewMessage = () => {
    const { t } = useTranslation();
    const { sendMessage } = useSocketContext();
    const channelId = useSelector((state) => state.channelsInfo.currentChannelId);
    const { user: username } = useAuth();
    const inputMessageRef = useRef();

    const formik = useFormik({
        initialValues: {
            body: '',
        },
        validationSchema: Yup.object({
            body: Yup.string().trim().required('Required'),
        }),
        onSubmit: async ({ body }) => {
            const cleanedMessage = leoProfanity.clean(body);
            const message = { body: cleanedMessage, user:username.username, channelId };
            try {
                sendMessage(message);
                formik.resetForm();
            } catch(error) {
                if (!error.isAxiosError) {
                    toast.error(t('errors.unknown'));
                    return;
                } 
                else {
                    toast.error(t('errors.network'));
                }
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
                    className="btn btn-group-vertical"
                    variant="vertical"
                    disabled={!formik.isValid}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z">
                        </path>
                    </svg>
                    <span className="visually-hidden">{t('chat.send')}</span>
                </Button>
            </InputGroup>
        </Form>
    )
};

export default InputNewMessage;