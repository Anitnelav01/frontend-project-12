import React, { useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import InputNewMessage from './InputNewMessage.jsx';
import useAuth from '../hooks/useAuth.jsx';

const Messages = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const currentUser = auth.user.username;
  console.log(currentUser);
  const { channels, currentChannelId } = useSelector((state) => state.channelsInfo);
  const { messages } = useSelector((state) => state.messagesInfo);
  const messagesCurrentChannel = messages.filter(({ channelId }) => channelId === currentChannelId);
  const currentChannel = channels.find(({ id }) => id === currentChannelId);

  useEffect(() => {
    animateScroll.scrollToBottom({ containerId: 'messages-box', duration: 0 });
  }, [messagesCurrentChannel]);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannel?.name}`}</b>
          </p>
          <span className="text-mutted">{`${messagesCurrentChannel.length} ${t('chat.messageCount', { count: messagesCurrentChannel.length })}`}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messagesCurrentChannel.map(({ body, user, id }) => (
            <div key={id} className={user === currentUser ? 'text-break mb-2 bg-secondary' : 'text-break mb-2'}>
              <b>{user}</b>
              :
              {` ${body}`}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <InputNewMessage />
        </div>
      </div>

    </Col>
  );
};

export default Messages;
