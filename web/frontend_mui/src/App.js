// import { ContextProvider } from './contexts/context.js';
// import NodeTree from './components/ideatree.js';
// import ChatBot from './components/chatbot.js';
// import './App.css';

// function App() {
//   return (
//     <ContextProvider>
//       <NodeTree />
//     </ContextProvider>
//   );
// }

import {
  Grid,
} from '@mui/material';
import ChatBotIdeaImprove from "./components/chatbot_ideaimprove.js";
import ChatBotNextStep from "./components/chatbot_nextstep.js";

function App() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}><ChatBotIdeaImprove /></Grid>
      <Grid item xs={6}><ChatBotNextStep /></Grid>
    </Grid>
  );
}

export default App;
