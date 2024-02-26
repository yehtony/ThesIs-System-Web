import { RiUser5Line } from 'react-icons/ri';
import { RiRobot2Line } from 'react-icons/ri';
import { RiSendPlane2Line } from 'react-icons/ri';
import robotStand from '../img/robot_stand.gif';
import robotSay from '../img/robot_say.gif';
import React, { useContext, useState, useEffect } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import FaceIcon from '@mui/icons-material/Face';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import {
  Grid,
  Avatar,
  Button,
  TextareaAutosize,
  TextField,
  List,
  ListItem,
  Paper,
  Typography,
  Collapse,
} from '@mui/material';
import axios from 'axios';

export default function ChatBot() {
  // ... (unchanged code)
  const [message, setMessage] = useState('');
  const [userLog, setUserLog] = useState({});
  const [messageLog, setMessageLog] = useState([]);
  const [initial, setInitial] = useState(true);
  const [clickRobot, setClickRobot] = useState(false);

  const handleClick = () => {
    setClickRobot(!clickRobot);
  };

  const sendMessageToPython = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/react/chatbot/nextstep',
        {
          messages: [{ role: 'user', content: message }],
        }
      );
      console.log('Python response:', response.data);
      const updatedMessageLog = [...messageLog, response.data];
      setMessageLog(updatedMessageLog);
      setMessage('');
    } catch (error) {
      console.error('Error sending message to Python:', error);
    }
  };

  useEffect(() => {
    if (!initial) {
      sendMessageToPython();
    }
    setInitial(false);
  }, [userLog]);

  const updateChatLog = () => {
    const updatedMessageLog = [
      ...messageLog,
      { role: 'user', content: message },
    ];
    setUserLog(updatedMessageLog);
    setMessageLog(updatedMessageLog);
  };

  return (
    <div>
      <Avatar
        sx={{ width: 100, height: 100, cursor: 'pointer' }}
        alt={clickRobot ? 'robotStand' : 'robotSay'}
        src={clickRobot ? robotStand : robotSay}
        onClick={handleClick}
      />

      <Collapse in={clickRobot}>
        <Paper elevation={0}>
          <List>
            <Paper elevation={0}>
              <List>
                {messageLog.map((message, index) =>
                  message.role !== 'system' ? (
                    <ListItem
                      key={index}
                      style={{
                        justifyContent:
                          message.role === 'assistant'
                            ? 'flex-start'
                            : 'flex-end',
                        flexDirection: 'column', // 將排列方向改為垂直
                        alignItems:
                          message.role === 'assistant'
                            ? 'flex-start'
                            : 'flex-end', // 調整對齊方式
                      }}
                    >
                      <Avatar className="chat-image avatar">
                        {message.role === 'assistant' ? (
                          <SmartToyIcon />
                        ) : (
                          <FaceIcon />
                        )}
                      </Avatar>

                      <div>{message.content}</div>
                    </ListItem>
                  ) : null
                )}
              </List>
            </Paper>
            <Paper elevation={0} className="">
              {/* <div className="form-control w-full "> */}
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={11}>
                  <TextField
                    placeholder="使用者訊息"
                    variant="outlined"
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button variant="text" onClick={() => updateChatLog()}>
                    <SendRoundedIcon sx={{ fontSize: 40 }} />
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            {/* </div> */}
          </List>
        </Paper>
      </Collapse>
    </div>
  );
}
