import { ContextProvider } from './contexts/context.js';
import NodeTree from './components/ideatree.js';
import ChatBot from './components/ideatree.js';
import './App.css';

function App() {
  return (
    <ContextProvider>
      <NodeTree />
    </ContextProvider>
  );
}

export default App;
