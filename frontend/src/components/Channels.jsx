import { useSelector } from "react-redux";
import { Button, Col } from "react-bootstrap";

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);

    return (
        <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <Button
                    type="button"
                    variant="vertical"
                    className="p-0 text-primary"
                >
                    <span>+</span>
                </Button>
            </div>
            <ul id="channels-list" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                {channels.map(({ id, name }) => (
                    <li className="nav-item w-100" key={id}>
                        <Button 
                            className="w-100 rounded-0 text-start text-truncate"
                            variant={currentChannelId === id ? 'secondary' : null}
                            key={id}
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