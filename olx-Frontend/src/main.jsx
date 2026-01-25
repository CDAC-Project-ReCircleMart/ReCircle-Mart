import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { FavouritesProvider } from "./context/FavouritesContext";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap FIRST
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavouritesProvider>
        <App />
      </FavouritesProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";
// import { FavouritesProvider } from "./context/FavouritesContext";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <FavouritesProvider>
//       <App />
//     </FavouritesProvider>
//   </BrowserRouter>
// );
