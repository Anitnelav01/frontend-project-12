import { useFormik } from "formik";
import { Form, InputGroup, Button } from "react-bootstrap";
import * as Yup from 'yup';

const InputNewMessage = () => {
    const formik = useFormik({
        initialValues: {
            body: '',
        },
        validationSchema: Yup.object({
            body: Yup.string().required('Required'),
        }),
    });

    return (
        <Form className="py-1 border rounded-2">
            <InputGroup>
                <Form.Control
                    className="border-0 p-0 ps-2"
                    name="body"
                    aria-label="Новое сообщение"
                    onChange={formik.handleChange}
                    value={formik.values.body}
                    disabled={formik.isSubmitting}
                    placeholder="Введите сообщение..."
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