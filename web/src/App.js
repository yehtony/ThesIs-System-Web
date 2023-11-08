import { ContextProvider } from './contexts/context.js';
import NodeTree from './components/ideatree.js';
import './App.css';

function App() {
  return (
    <ContextProvider>
      <div className="h-screen px-5">
        <NodeTree />
      </div>
    </ContextProvider>
  );
}

export default App;
