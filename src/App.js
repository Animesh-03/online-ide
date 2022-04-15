import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [inputCode,setInputCode] = useState([]);
  const [inputParams,setInputParams] = useState([]);
  const [output,setOutput] = useState("");
  const [compileError,setCompileError] = useState("");

  function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

  const compile = (e) => {
    e.preventDefault();

    setOutput("Compiling");
    setCompileError("");

    axios.post("https://judge0-ce.p.rapidapi.com/submissions",{language_id:54, // C++ GCC 9.2.0
    source_code: b64EncodeUnicode(inputCode),
    stdin: b64EncodeUnicode(inputParams)},{
      params:{
        base64_encoded: 'true',
        fields: '*'
      },
      headers:{
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        'X-RapidAPI-Key': 'da7974e0d0msh7ff64810abe6ba6p17f803jsn77c80edad026'
      },
    }).then(res => {
      console.log(res);

      setOutput("Running...");

      const options = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/' + res.data.token,
        params: {base64_encoded: 'true', fields: '*'},
        headers: {
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          'X-RapidAPI-Key': 'da7974e0d0msh7ff64810abe6ba6p17f803jsn77c80edad026'
        }
      };
      
      axios.request(options).then(function (res1) {
        console.log(atob(res1.data.stdout))
        console.log((res1.data.stderr))
        console.log(atob(res1.data.compile_output));

        if(res1.data.stdout != null)
        {
          //Get Ouput of Code
          setOutput(b64DecodeUnicode(res1.data.stdout));
          console.log("Compiled");
        }
        else if(res1.stderr)
        {
          //Get error
          console.log("Error");
        }
        else
        {
          //Compilation error
          setCompileError(b64DecodeUnicode(res1.data.compile_output));
          setOutput("");
          console.log("Compiler Error");
        }

      }).catch(function (error) {
        console.error(error);
      });
    })
  }

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
              <button className='btn btn-primary' onClick={e => compile(e)}>Compile</button>
          </div>

          <div className='output-area'>
            <h4>Output</h4>
              {output !== "" && <p>{output}</p>}
              {compileError !== "" && <p className='compile-error'>{compileError}</p>}
          </div>
      </div>
    </div>
  );
}

export default App;
