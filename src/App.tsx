import './App.css';
import Scan from './Components/Scan/Scan';

function App() {
  return (
    <div>
      <div className="container-fluid">
          <div className='row'>
              <div className='col-6'>
                  <p className='fs-5 ps-3 fw-bold'>Vasding skill scanning!</p>
              </div>
              <div className='col-6 pt-2'>
                  <p className='float-end pe-3 cursor-pointer'>Login | Register</p>
              </div>
          </div>
          <Scan/>
        </div>
    </div>
  );
}

export default App;
