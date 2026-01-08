
import Header from './components/Header.jsx'
import {BrowserRouter as Router , Routes ,Route} from "react-router-dom"
import Mens from './components/Mens.jsx'
import Home from './components/Home.jsx'
import Contact from './components/Contact.jsx'


function App() {

  return (
    <>
      <div className="min-h-screen bg-[#020a1c] pb-[env(safe-area-inset-bottom)]">
    
    <Router>
    <Header></Header>
      <Routes>
        <Route path='/mens' element={<Mens></Mens>}></Route>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
      </Routes>
    </Router>
        </div>

    </>
    
  )
}

export default App
