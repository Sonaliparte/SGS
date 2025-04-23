import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import About from "./components/About";
import Contact from "./components/Contact";
import Payment from "./payment/Payment";
import Footer from './components/Footer';
import AuthForm from '../signinsignup/signinsignup';

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div id="home"><Home /></div>
                <div id="about"><About /></div>
                <div id="contact"><Contact /></div>
                <Footer />
              </>
            }
          />
          <Route path="/payment" element={<Payment />} />
          <Route path="/auth" element={<AuthForm />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
