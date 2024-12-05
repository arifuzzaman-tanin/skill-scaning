import './App.css';
import Scan from './Components/Scan/Scan';

function App() {
  return (
    <div>
      <div className="container-fluid">
        <div className='row'>
          <div className='col-lg-6 col-sm-12'>
            <p className='fs-5 ps-3 fw-bold'>skill aligner | scanning</p>
          </div>

          <div className='col-lg-6 col-sm-12'>
            <a
              href='https://arifuzzaman-tanin.github.io/personal-profile/'
              target='_blank'
              rel='noopener'
              className='ps-3 pe-3 text-primary mt-1 text-sm-start text-lg-end text-decoration-none'
            >
              Developed By Arifuzzaman Tanin
            </a>
          </div>

        </div>

        <Scan />
      </div>
    </div>
  );
}

export default App;
