import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Home from "./pages/Home";
import StreakGroupList from "./pages/StreakGroupList";
import StreakGroupAdd from "./pages/StreakGroupAdd";
import StreakGroupEdit from "./pages/StreakGroupEdit";
import StreakItemList from "./pages/StreakItemList";
import StreakItemAdd from "./pages/StreakItemAdd";
import StreakItemEdit from "./pages/StreakItemEdit";

function App() {
  return (
    <Router>
      <div className="App">
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/streak-groups" element={<StreakGroupList />} />
            <Route path="/streak-groups/add" element={<StreakGroupAdd />} />
            <Route
              path="/streak-groups/edit/:id"
              element={<StreakGroupEdit />}
            />
            <Route path="/streak-items" element={<StreakItemList />} />
            <Route path="/streak-items/add" element={<StreakItemAdd />} />
            <Route path="/streak-items/edit/:id" element={<StreakItemEdit />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
