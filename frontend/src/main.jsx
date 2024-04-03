import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Components
import NavBar from './components/Navbar/NavBar';
import ItemsList from './components/Items/ItemsList';
import ItemForm from './components/Items/ItemForm';
import FilteredList from './components/Items/FilteredList';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NavBar />
    <div className='container my-4'>
      <Routes>
        <Route exact path='/' Component={ItemsList}/>
        <Route exact path='/items' Component={ItemsList}/>
        <Route path='/item-form' Component={ItemForm}/>
        <Route path='/update-item/:id' Component={ItemForm}/>
        <Route path='/items-filtered' Component={FilteredList}/>
        {/* <Route path='/data' Component={ItemsData}/> */}
      </Routes>
    </div>
  </BrowserRouter>
)
