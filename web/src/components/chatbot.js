// /* eslint-disable no-unused-vars */
import { TbMessageChatbot } from 'react-icons/tb';
import { useContext, useState } from 'react';
import { Context } from '../contexts/context.js';
import { SiProbot } from 'react-icons/si';
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

  //
  const [clickRobot, setClickRobot] = useState(true);
  const handleClick = () => {
    setClickRobot(!clickRobot);
  };

  const handleReflectionTypeClick = (type) => {
    // 當使用者點擊按鈕時，更新 selectedReflectionType 狀態
    setSelectedReflectionType(type);
    // 同時重置已選擇的反思項目
    setSelectedReflection(null);
    // 這裡你可以執行其他相關邏輯，例如發送機器人的回覆等等
  };

  const handleReflectionItemClick = (item) => {
    // 當使用者點擊反思項目時，更新 selectedReflection 狀態
    setSelectedReflection(item);
    // 這裡你可以執行其他相關邏輯，例如發送機器人的回覆等等

    setReflectionValue(reflectionSelf[item]);
  };

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
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-96">
          <div>
            {/* <div className="grid grid-flow-col items-center justify-between">
              <div className="grid grid-flow-col justify-start items-center">
                <TbMessageChatbot className="h-6 w-6 mx-1" />
                <p className="text-xl">反思機器人</p>
              </div>
            </div> */}
            <div
              className="card form-control overflow-auto border-2 p-4 rounded-lg h-80vh"
              style={{
                //   backgroundImage: `url(${chatimage2})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
              {/* 使用 map 渲染按鈕選項 */}

              <ul>
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <TbMessageChatbot className="h-6 w-6 mx-1" />
                    </div>
                  </div>
                  <div className="chat-bubble">
                    你現在要進行哪種類型的反思呢？
                  </div>
                </div>
                <div className="grid  grid-flow-col items-center gap-1 py-3">
                  {reflectionType.map((type, index) => (
                    <li key={index}>
                      <button
                        className={`btn btn-sm ${
                          selectedReflectionType === type
                            ? 'btn-primary'
                            : 'btn-outline'
                        }`}
                        onClick={() => handleReflectionTypeClick(type)}
                      >
                        <div className="items-center">{type}</div>
                      </button>
                    </li>
                  ))}
                </div>

                {selectedReflectionType ? (
                  // 如果選擇了反思類型，顯示相應的反思項目
                  <div>
                    <div className="chat chat-start">
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <TbMessageChatbot className="h-6 w-6 mx-1" />
                        </div>
                      </div>
                      <div className="chat-bubble">
                        你想要我提供什麼資訊讓你進行{selectedReflectionType}
                        反思呢？
                      </div>
                    </div>

                    <div className="grid grid-flow-col items-center gap-1 py-3">
                      {reflection[selectedReflectionType].map((item, index) => (
                        <li key={index}>
                          <button
                            className={`btn btn-sm ${
                              selectedReflection === item
                                ? 'btn-primary'
                                : 'btn-outline'
                            }`}
                            onClick={() => handleReflectionItemClick(item)}
                          >
                            <div className="items-center">{item}</div>
                          </button>
                        </li>
                      ))}
                    </div>
                  </div>
                ) : null}
                {selectedReflection && (
                  <div className="py-3">
                    <div className="chat chat-start">
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <TbMessageChatbot className="h-6 w-6 mx-1" />
                        </div>
                      </div>
                      <div className="chat-bubble">
                        <p>
                          請參考我整理出來的{selectedReflection}進行反思哦！
                          在你們的探究活動討論過程中，有：
                        </p>
                        <ul>
                          {reflectionValue.map((value, index) => (
                            <li key={index} className="font-bold">
                              {value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </ul>
      </details>
    </div>
  );
}
