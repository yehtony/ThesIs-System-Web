// /* eslint-disable no-unused-vars */
import { TbMessageChatbot } from 'react-icons/tb';
import { useContext, useState } from 'react';
import { Context } from '../contexts/context.js';
import { SiProbot } from 'react-icons/si';

export default function ChatBot() {
  const { reflectionType } = useContext(Context);
  const { reflection } = useContext(Context);
  const [selectedReflectionType, setSelectedReflectionType] = useState(null);
  const [selectedReflection, setSelectedReflection] = useState(null);

  //
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
  };

  return (
    <div>
      <details className="dropdown dropdown-end">
        <summary className="m-1 btn">
          <SiProbot className="h-8 w-8" />
        </summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-96">
          <div className="grid grid-rows-1-9 h-85vh gap-1 pb-3">
            <div className="grid grid-flow-col items-center justify-between">
              <div className="grid grid-flow-col justify-start items-center">
                <TbMessageChatbot className="h-6 w-6 mx-1" />
                <p className="text-xl">反思機器人</p>
              </div>
            </div>
            <div
              className="card form-control overflow-auto border-2 p-4 rounded-lg"
              style={{
                //   backgroundImage: `url(${chatimage2})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
              {/* 使用 map 渲染按鈕選項 */}
              <ul>
                {selectedReflectionType ? (
                  // 如果選擇了反思類型，顯示相應的反思項目
                  <div>
                    你想要我提供什麼資訊讓你進行{selectedReflectionType}反思呢？
                    <div className="grid grid-flow-col items-center gap-1">
                      {reflection[selectedReflectionType].map((item, index) => (
                        <li key={index}>
                          <button
                            className={`btn btn-sm ${
                              selectedReflection === item ? 'btn-primary' : ''
                            }`}
                            onClick={() => handleReflectionItemClick(item)}
                          >
                            <div className="items-center">{item}</div>
                          </button>
                        </li>
                      ))}
                    </div>
                  </div>
                ) : (
                  // 否則，顯示反思類型的按鈕選項
                  <div>
                    你現在要進行哪種類型的反思呢？
                    <div className="grid  grid-flow-col items-center gap-1">
                      {reflectionType.map((type, index) => (
                        <li key={index}>
                          <button
                            className={`btn btn-sm ${
                              selectedReflectionType === type
                                ? 'btn-primary'
                                : ''
                            }`}
                            onClick={() => handleReflectionTypeClick(type)}
                          >
                            <div className="items-center">{type}</div>
                          </button>
                        </li>
                      ))}
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
