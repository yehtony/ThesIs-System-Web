// /* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { Context } from '../contexts/context.js';
import { RiUser5Line } from 'react-icons/ri';
import { RiRobot2Line } from 'react-icons/ri';
import { RiSendPlane2Line } from 'react-icons/ri';
import robotStand from '../img/robotstand.gif';
import robotSay from '../img/robotsay.gif';

export default function ChatBot() {
  const { reflectionType } = useContext(Context);
  const { reflection } = useContext(Context);
  const [reflectionValue, setReflectionValue] = useState(null);
  const [selectedReflectionType, setSelectedReflectionType] = useState(null);
  const [selectedReflection, setSelectedReflection] = useState(null);
  const { reflectionSelf, setReflectionSelf } = useContext(Context);
  const { reflectionActivity, setReflectionActivity } = useContext(Context);
  const { reflectionGoal, setReflectionGoal } = useContext(Context);
  const { reflectionStrategy, setReflectionStrategy } = useContext(Context);

  // Robot Button
  const [clickRobot, setClickRobot] = useState(true);
  const handleClick = () => {
    setClickRobot(!clickRobot);
  };

  // Chat History
  const [message, setMessage] = useState({});
  const [messageLog, setMessageLog] = useState([]);
  const updateChatLog = async (message) => {
    const updatedMessageLog = [
      ...messageLog,
      { role: 'user', content: message },
    ];
    setMessageLog(updatedMessageLog);
    // await setChatlog(updatedChatlog);
    console.log(messageLog);
  };

  // const updateChatLog = async (message) => {
  //   try {
  //     const [updatedChatlog, updatedMessagelog] = await updateChatLogUser(
  //       message
  //     );
  //     setMessage('');
  //     console.log(updatedChatlog, updatedMessagelog);
  //     const response = await callGPT(updatedChatlog, parameters);
  //     console.log(response);
  //     await setMessagelog([...updatedMessagelog, response]);
  //     await setChatlog([...updatedChatlog, response]);
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //   }
  // };

  // const handleReflectionTypeClick = (type) => {
  //   // 當使用者點擊按鈕時，更新 selectedReflectionType 狀態
  //   setSelectedReflectionType(type);
  //   // 同時重置已選擇的反思項目
  //   setSelectedReflection(null);
  //   // 這裡你可以執行其他相關邏輯，例如發送機器人的回覆等等
  // };

  // const handleReflectionItemClick = (item) => {
  //   // 當使用者點擊反思項目時，更新 selectedReflection 狀態
  //   setSelectedReflection(item);
  //   // 這裡你可以執行其他相關邏輯，例如發送機器人的回覆等等

  //   setReflectionValue(reflectionSelf[item]);
  // };

  return (
    <div>
      <details className="dropdown dropdown-bottom">
        <summary
          className="m-1 btn btn-ghost hover:bg-transparent w-96 justify-end"
          onClick={handleClick}
        >
          <img
            src={clickRobot ? robotStand : robotSay}
            alt={clickRobot ? 'robotStand' : 'robotSay'}
            className="h-40 w-40"
          />
        </summary>

        <ul className="py-4 px-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-96 grid grid-rows-9-1 h-80vh ">
          <div
            className="card form-control overflow-auto border-2 p-2 mb-4 rounded-lg"
            style={{
              // backgroundImage: `url(${chatimage2})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            <ul>
              {messageLog.map((message, index) =>
                message.role !== 'system' ? (
                  <li key={index}>
                    <div
                      className={
                        message.role === 'assistant'
                          ? 'chat chat-start'
                          : 'chat chat-end'
                      }
                    >
                      <div className="chat-image avatar">
                        {message.role === 'assistant' ? (
                          <RiRobot2Line className="h-6 w-6" />
                        ) : (
                          <RiUser5Line className="h-6 w-6" />
                        )}
                      </div>
                      {/* <div className='chat-header'>
                  {message.role}
                </div> */}
                      <div className="chat-bubble text-sm items-center" >
                        {message.content}
                      </div>
                    </div>
                  </li>
                ) : null
              )}
            </ul>
          </div>
          <div className="form-control w-full">
            <div className="grid grid-cols-9-1 items-center">
              <textarea
                placeholder="使用者訊息"
                className="input input-bordered w-full text-md p-3 h-full"
                // value={message}
                style={{ lineHeight: '1.5' }}
                onChange={(e) => setMessage(e.target.value)}
              />
              <RiSendPlane2Line
                className="btn btn-ghost btn-xs h-10 w-10"
                onClick={() => updateChatLog(message)}
              ></RiSendPlane2Line>
            </div>
          </div>
        </ul>
      </details>
    </div>
  );
}
