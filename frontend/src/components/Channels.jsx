import { useSelector, useDispatch } from "react-redux";
import { Button, ButtonGroup, Col, Dropdown } from "react-bootstrap";
import { setCurrentChannel } from "../slices/channelsSlice.js";
import { openModal } from "../slices/modalSlice.js";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";

const Channels = () => {
    const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
    const dispatch = useDispatch();
    
    const handleNewChannel = () => {
        dispatch(openModal({ type: "addChannel" }));
    };

    const handleChangeChannel = (id) => () => {
        dispatch(setCurrentChannel({ id }));
    };

    const handleRemoveChannnel = (id) => () => {
        console.log('remove');
        dispatch(openModal({ type: "removeChannel", id }));

    };

    const handleRenameChannel = (id) => () => {
        console.log('rename')
        dispatch(openModal({ type: 'renameChannel', id }));
    };

    return (
        <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <Button
                    type="button"
                    variant="vertical"
                    className="p-0 text-primary btn btn-group-vertical"
                    onClick={handleNewChannel}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z">
                        </path>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z">
                        </path>
                    </svg>
                    <span className="visually-hidden">+</span>
                </Button>
            </div>
            <ul id="channels-list" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                {channels.map(({ id, name, removable }) => removable
                ? (
                    <li className="nav-item w-100" key={id}>
                        <Dropdown as={ButtonGroup} className="d-flex">
                            <Button 
                                className="w-100 rounded-0 text-start text-truncate"
                                variant={currentChannelId === id ? 'secondary' : null}
                                key={id}
                                onClick={handleChangeChannel(id)}
                            >
                                <span className="me-1">#</span>
                                {name}
                            </Button>
                            <DropdownToggle split className="flex-grow-0" variant="group-veritical">
                                <span className="visually-hidden">
                                    Управление каналом
                                </span>
                            </DropdownToggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleRemoveChannnel(id)}>
                                    Удалить
                                </Dropdown.Item>
                                <Dropdown.Item onClick={handleRenameChannel(id)}>
                                    Переименовать
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                )
                : (
                    <li className="nav-item w-100" key={id}>
                        <Button 
                            className="w-100 rounded-0 text-start text-truncate"
                            variant={currentChannelId === id ? 'secondary' : null}
                                key={id}
                                onClick={handleChangeChannel(id)}
                        >
                            <span className="me-1">#</span>
                            {name}
                        </Button>
                    </li>
                ))}
            </ul>
        </Col>
    );
};

export default Channels;