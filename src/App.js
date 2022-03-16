import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Index from "./components/layout/Index";
import Lyrics from "./components/tracks/Lyrics";

import { Provider } from "./context";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <React.Fragment>
            <Navbar />
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Index />} />
                <Route exact path="/lyrics/track/:id" element={<Lyrics />} />
              </Routes>
            </div>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
