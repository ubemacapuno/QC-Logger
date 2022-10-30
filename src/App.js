import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Login from "./pages/Login"


function App() {
  return (
    <BrowserRouter>
      <nav>
        <div className="flex-header">
          <i className="material-icons logo">biotech</i>
          <h1>QC Logger</h1>
        </div>
        <Link to="/">Home</Link>
        <Link to="/create">Enter QC Results</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
