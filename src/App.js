import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./componts/basic/Header";
import { Col, Row } from "react-bootstrap";
import LeftSide from "./componts/basic/LeftSide";
import Welcome from "./componts/basic/Welcome";
import SignIn from "./componts/basic/SignIn";
import SignUp from "./componts/basic/SignUp";
import ContactUs from "./componts/basic/ContactUs";
import About from "./componts/basic/About"
import ValidationForm from "./componts/basic/ValidationForm";
import ForgotPassword from "./componts/basic/ForgotPassword";
import NewCode from "./componts/basic/NewCode";
// Secured Import 
import Secured from "./componts/dummy/Secured";
import Profile from "./componts/user/Profile";
// Contact Import + Secured
import WelcomeContacts from "./componts/contact/WelcomeContacts";
import AllContacts from "./componts/contact/AllContacts";
import AddContact from "./componts/contact/AddContact";
import ContactLeftSide from "./componts/contact/ContactLeftSide";
import UpdateContact from "./componts/contact/UpdateContact";
function App() {
  return (
    <div className="container">
      <Router>
        <Header />
        <Row>
              { !localStorage.getItem("token") && 
              <>
          <Col>
            <LeftSide />
          </Col>
          <Col className="col-8 my-4 py-0 shadow">
            <Routes>
              <>
              <Route exact path="/" element={<Welcome></Welcome>} />
              <Route exact path="/sign-in" element={<SignIn></SignIn>} />
              <Route exact path="/sign-up" element={<SignUp />} />
              <Route exact path="/contact-us" element={<ContactUs></ContactUs>}/>
              <Route exact path="/about" element={<About></About>} />
              <Route exact path="/validation" element={<ValidationForm></ValidationForm>} />
              <Route exact path="/forgot-password"  element={<ForgotPassword />} />
              <Route exact path="/new-code"  element={<NewCode />} />
              <Route exact path="/sign-out"  element={<SignIn loggedOut = {"Logged-Out Success Fully"} />} />
              </>
            </Routes>
          </Col>
          </>
              }
                { localStorage.getItem("token") && <>
              <Col>
                <ContactLeftSide />
              </Col>
              <Col className="col-8 my-4 py-0 shadow">
                <Routes>

                <Route exact path="/secured" element={<Secured></Secured>} />
                <Route exact path="/contacts/profile" element={<Profile></Profile>} />
                <Route exact path="/contacts"  element={<WelcomeContacts />} />
                <Route exact path="/contacts/update/:cid"  element={<UpdateContact />} />
                <Route exact path="/contacts/add-contact"  element={<AddContact />} />
                <Route exact path="/contacts/all-contacts"  element={<AllContacts />} />
                <Route exact path="/contact-us" element={<ContactUs></ContactUs>}/>
                <Route exact path="/about" element={<About></About>} />
                
                
              
                </Routes>
              </Col>
              </>
            }
        </Row>
      </Router>
    </div>
  );
}

export default App;
