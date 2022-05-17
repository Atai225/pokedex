import './App.css';
import {Route, Routes} from 'react-router-dom';
import Main from './containers/Main/Main';
import Layout from './components/Layout/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Main/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
