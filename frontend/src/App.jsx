
import Header from './components/Header.jsx'
import {BrowserRouter as Router , Routes ,Route} from "react-router-dom"
import Mens from './components/Mens.jsx'
import Home from './components/Home.jsx'
import Contact from './components/Contact.jsx'


function App() {

  return (
    <>
    
    <Router>
    <Header></Header>
      <Routes>
        <Route path='/mens' element={<Mens></Mens>}></Route>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
      </Routes>
    </Router>

    </>
    
  )
}

export default App
