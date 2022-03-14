import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movie from "./routes/Movie";
import Tv from "./routes/Tv";
import Search from "./routes/Search";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Movie />}>
          <Route path="/movies/:movieId" element={<Movie />}></Route>
        </Route>
        <Route path="/tv" element={<Tv />}>
          <Route path="/tv/:tvId" element={<Movie />}></Route>
        </Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
