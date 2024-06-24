import logo from './logo.svg';
import './App.css';
import ChatComp from './chatComp';
import FileUpload from './fileUpload';
import FullPageComponent from './FullPageComponent';
import { useState } from 'react';





function App() {
  
  const handleSelection = (role) => {
    setRole(role);
  };

  const [role, setRole] = useState("");
  
  return (
    <div className="App">
      <header className="App-header">
        {role==''?<FullPageComponent handleSelection={handleSelection}/>:<></>}
        {role=='Student'?<ChatComp/>:<></>}
        {role=='Professor'?(<><FileUpload/><ChatComp/></>):<></>}
        
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
