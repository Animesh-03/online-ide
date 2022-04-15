import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [inputCode,setInputCode] = useState([]);
  const [inputParams,setInputParams] = useState([]);

  return (
    <div className="App">
      <div className='question-area'>
        Lorem Ipsum Dolor Sit Amet
        Lorem Ipsum Dolor Sit Amet
        Lorem Ipsum Dolor Sit Amet
        Lorem Ipsum Dolor Sit Amet
        Lorem Ipsum Dolor Sit Amet
        Lorem Ipsum Dolor Sit Amet
      </div>
      <div className='code-area'>
          <div className='input-area'>
              <textarea className='form-control' rows={25} placeholder='Enter C++ Code here' onChange={e => setInputCode(e.target.value)} />
              <br />
              <textarea className='form-control' rows={2} placeholder='Enter Input Parameters here' onChange={e => setInputParams(e.target.value)} />
              <br />  
              <button className='btn btn-primary'>Compile</button>
          </div>

          <div className='output-area'>
              Output here
          </div>
      </div>
    </div>
  );
}

export default App;
