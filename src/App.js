import {
  BrowserRouter,
  Routes,
} from "react-router-dom";
import './scss/style.scss'
import routes, {getRoute} from "./lib/route/routes";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            {routes.map(getRoute)}
        </Routes>
      </BrowserRouter>
  );
}

export default App;