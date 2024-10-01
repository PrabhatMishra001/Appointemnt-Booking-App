import Home from '../components/pages/Home';
import Services from '../components/pages/Services';
import Login from '../components/pages/Login';
import Signup from '../components/pages/Signup';
import Contact from '../components/pages/Contact';
import Doctors from '../components/pages/Doctors/Doctors';
import DoctorDetails from '../components/pages/Doctors/DoctorDetails';
import MyAccount from '../Dashboard/user-account/MyAccount';
import Dashboard from '../Dashboard/doctor-account/Dashboard';
import {Routes, Route} from 'react-router-dom';
import CheckoutSuccess from '../components/pages/Doctors/CheckoutSuccess';
const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home></Home>}> </Route>
      <Route path='/home' element={<Home></Home>}></Route>
      <Route path='/doctors' element={<Doctors></Doctors>}></Route>
      <Route path='/doctors/:id' element={<DoctorDetails></DoctorDetails>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Signup></Signup>}></Route>
      <Route path='/contact' element={<Contact></Contact>}></Route>
      <Route path='/services' element={<Services></Services>}></Route>
      <Route path='/users/profile/me' element={<MyAccount></MyAccount>}></Route>
      <Route path='/doctors/profile/me' element={<Dashboard></Dashboard>}></Route>
      <Route path='/checkout-success' element={<CheckoutSuccess></CheckoutSuccess>}></Route>
    </Routes>
  );
};

export default Routers;