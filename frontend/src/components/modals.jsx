import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../slices/modalSlice.js";
import { useSocketContext } from "../contexts/index.jsx";
import { useEffect, useRef } from "react";

const NewChannelModal = () => {
  const { addChannel } = useSocketContext();
  const { isOpened } = useSelector((state) => state.modal);
  const { channels } = useSelector((state) => state.channelsInfo);
  const channelsNames = channels.map((channel) => channel.name);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      channelName: "",
    },
    validationSchema: Yup.object({
      channelName: Yup
      .string()
      .trim()
      .required()
      .min(3)
      .max(20)
      .notOneOf(channelsNames),
    }),
    onSubmit: async (values) => {
      const channel = { name: values.channelName };
      try {
      await addChannel(channel);
      formik.resetForm();
      handleClose();
      } catch(error) {
          throw error;
      }
    },
  });

  const handleClose = () => {
    dispatch(closeModal())
  };

  return (
      <Modal show={isOpened} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Control
                name='channelName'
                id='name'
                className="mb-2"
                disabled={formik.isSubmitting}
                onBlur={formik.handleBlur}
                value={formik.values.channelName}
                onChange={formik.handleChange}
                autoFocus
              />
              <label htmlFor="channelName"></label>
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Отправить
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

const RemoveChannelModal = () => {
  const { removeChannel } = useSocketContext();
  const { isOpened } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const id = useSelector(state => state.modal.extra);

  const handleRemove = async () => {
      try {
      await removeChannel({ id });
      handleClose();
      } catch(error) {
          throw error;
      }
    };

  const handleClose = () => {
    dispatch(closeModal())
  };

  return (
    <>
      <Modal show={isOpened} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Уверены?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const RenameChannelModal = () => {
  const { renameChannel } = useSocketContext();
  const { isOpened } = useSelector((state) => state.modal);
  const { channels } = useSelector((state) => state.channelsInfo);
  const id = useSelector((state) => state.modal.extra);
  const channelsNames = channels.map((channel) => channel.name);
  const dispatch = useDispatch();
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: {
      channelName: "",
    },
    validationSchema: Yup.object({
      channelName: Yup
      .string()
      .trim()
      .required()
      .min(3)
      .max(20)
      .notOneOf(channelsNames),
    }),
    onSubmit: async (values) => {
      const channel = { name: values.channelName, id };
      console.log(channel);
      try {
      await renameChannel(channel);
      formik.resetForm();
      handleClose();
      } catch(error) {
          throw error;
      }
    },
  });

  const handleClose = () => {
    dispatch(closeModal())
  };

  useEffect(() => {
    setTimeout(() => inputRef.current.focus());
  }, []);

  return (
      <Modal show={isOpened} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Переименовать канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Control
                name='channelName'
                id='name'
                className="mb-2"
                disabled={formik.isSubmitting}
                onBlur={formik.handleBlur}
                value={formik.values.channelName}
                onChange={formik.handleChange}
                ref={inputRef}
              />
              <label htmlFor="channelName"></label>
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Отправить
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

const map = {
  addChannel: NewChannelModal,
  removeChannel: RemoveChannelModal,
  renameChannel: RenameChannelModal,
};

const ModalComponent = () => {
  const type = useSelector(state => state.modal.type);
  console.log(type);
  const Component = map[type];
  return (Component === undefined ? null : <Component />);
};

export default ModalComponent;