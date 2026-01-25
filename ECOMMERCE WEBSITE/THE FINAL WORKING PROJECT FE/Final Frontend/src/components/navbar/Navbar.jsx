import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // 🔥 SEARCH STATES
  const [citySearch, setCitySearch] = useState("");
  const [mainSearch, setMainSearch] = useState("");

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleSell = () => {
    if (!user) navigate("/login");
    else navigate("/sell");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("favourites");
    navigate("/");
  };

  // 🔴 CITY SEARCH (LEFT BOX)
  const handleCitySearch = () => {
    if (!citySearch.trim()) return;
    navigate(`/?city=${encodeURIComponent(citySearch)}`);
  };

  // 🔴 MAIN SEARCH (RIGHT BOX)
  const handleMainSearch = () => {
    if (!mainSearch.trim()) return;
    navigate(`/?q=${encodeURIComponent(mainSearch)}`);
  };

  return (
    <>
      {/* TOP HEADER */}
      <header className="main-header">
        <div className="left-head">
          <div className="logo" onClick={() => navigate("/")}>
            ReCircle Mart
            <img
              className="logo-img mr-10"
              style={{ width: "50px", height: "auto" }}
              src="logo.png"
              alt="logo"
            />
          </div>

          {/* 🔥 CITY SEARCH BOX */}
          <div className="city-search">
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={handleCitySearch}
              style={{ cursor: "pointer" }}
            ></i>

            <input
              type="text"
              placeholder="Search location"
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCitySearch()}
            />
          </div>

          {/* 🔥 MAIN SEARCH BOX */}
          <div className="main-search">
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={handleMainSearch}
              style={{ cursor: "pointer" }}
            ></i>

            <input
              type="text"
              placeholder="Find Cars, Mobile Phones and more"
              value={mainSearch}
              onChange={(e) => setMainSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleMainSearch()}
            />
          </div>
        </div>

        <div className="right-head">
          <i
            className="fa-regular fa-comments icon"
            onClick={() => navigate("/messages")}
          ></i>

          <i
            className="fa-regular fa-bell icon"
            onClick={() => navigate("/notifications")}
          ></i>

          <i
            className="fa-regular fa-heart icon"
            onClick={() => navigate("/favourites")}
          ></i>

          {!user ? (
            <button className="nav-link" onClick={() => navigate("/login")}>
              Login
            </button>
          ) : (
            <div className="profile-nav">
              <img
                src={user.avatar || "profile.png"}
                alt="profile"
                className="nav-profile"
                onClick={() => navigate("/profile")}
              />

              <span>{user.first_name || user.firstName}</span>

              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}

          <div className="sell-border" onClick={handleSell}>
            <button className="sell-btn">
              <i className="fa-solid fa-plus"></i> SELL
            </button>
          </div>
        </div>
      </header>

      {/* CATEGORY BAR (UNCHANGED) */}
      <div className="category-wrapper">
        <div className="dropdown">
          <button className="dropdown-btn">
            ALL CATEGORIES <i className="fa-solid fa-chevron-down"></i>
          </button>

          <div className="dropdown-content">
            <span onClick={() => navigate("/sell/cars")}>Cars</span>
            <span onClick={() => navigate("/sell/bikes/scooters")}>
              Scooters
            </span>
            <span onClick={() => navigate("/sell/mobile")}>Mobile Phones</span>
            <span onClick={() => navigate("/sell/furniture")}>Furniture</span>
            <span onClick={() => navigate("/sell/electronics")}>
              Electronics
            </span>
          </div>
        </div>

        <span onClick={() => navigate("/sell/cars")}>Cars</span>
        <span onClick={() => navigate("/sell/bikes/scooters")}>
          Motorcycles
        </span>
        <span onClick={() => navigate("/sell/mobile")}>Mobile Phones</span>
        <span onClick={() => navigate("/sell/furniture")}>Furniture</span>
        <span onClick={() => navigate("/sell/electronics")}>Electronics</span>

        <span className="category-date">{today}</span>
      </div>
    </>
  );
}

// import { useNavigate } from "react-router-dom";
// import "./Navbar.css";

// export default function Navbar() {
//   const navigate = useNavigate();

//   // 🔴 FIX 1: Safely read user from localStorage (avoid crash if empty)
//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   const today = new Date().toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });

//   // 🔴 FIX 2: SELL button – redirect to login if not logged in
//   const handleSell = () => {
//     if (!user) navigate("/login");
//     else navigate("/sell");
//   };

//   // 🔴 FIX 3: Proper logout – clear BOTH user and token

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     localStorage.removeItem("favourites"); // clear old likes
//     navigate("/");
//   };

//   return (
//     <>
//       {/* TOP HEADER */}
//       <header className="main-header">
//         <div className="left-head">
//           {/* 🔴 FIX 4: Logo navigation using React Router (no reload) */}
//           <div className="logo" onClick={() => navigate("/")}>
//             ReCircle Mart
//             <img
//               className="logo-img mr-10"
//               style={{ width: "50px", height: "auto" }}
//               src="logo.png"
//               alt="logo"
//             />
//           </div>

//           <div className="city-search">
//             <i className="fa-solid fa-location-dot"></i>
//             <input type="text" placeholder="Search location" />
//           </div>

//           <div className="main-search">
//             <i className="fa-solid fa-magnifying-glass"></i>
//             <input
//               type="text"
//               placeholder="Find Cars, Mobile Phones and more"
//             />
//           </div>
//         </div>

//         <div className="right-head">
//           {/* 🔴 FIX 5: All icons use navigate() instead of <a href> */}
//           <i
//             className="fa-regular fa-comments icon"
//             onClick={() => navigate("/messages")}
//           ></i>

//           <i
//             className="fa-regular fa-bell icon"
//             onClick={() => navigate("/notifications")}
//           ></i>

//           <i
//             className="fa-regular fa-heart icon"
//             onClick={() => navigate("/favourites")}
//           ></i>

//           {/* AUTH SECTION */}
//           {!user ? (
//             <button className="nav-link" onClick={() => navigate("/login")}>
//               Login
//             </button>
//           ) : (
//             <div className="profile-nav">
//               {/* 🔴 FIX 6: Correct user fields (avatar + first_name safe) */}
//               <img
//                 src={user.avatar || "profile.png"}
//                 alt="profile"
//                 className="nav-profile"
//                 onClick={() => navigate("/profile")}
//               />

//               <span>{user.first_name || user.firstName}</span>

//               <button className="logout-btn" onClick={handleLogout}>
//                 Logout
//               </button>
//             </div>
//           )}

//           {/* SELL BUTTON */}
//           <div className="sell-border" onClick={handleSell}>
//             <button className="sell-btn">
//               <i className="fa-solid fa-plus"></i> SELL
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* CATEGORY BAR */}
//       <div className="category-wrapper">
//         <div className="dropdown">
//           <button className="dropdown-btn">
//             ALL CATEGORIES <i className="fa-solid fa-chevron-down"></i>
//           </button>

//           {/* 🔴 FIX 7 (VERY IMPORTANT):
//               REMOVED <a href="#"> which was breaking routing
//               Replaced with spans + navigate() */}
//           <div className="dropdown-content">
//             <span onClick={() => navigate("/sell/cars")}>Cars</span>
//             <span onClick={() => navigate("/sell/bikes/scooters")}>
//               Scooters
//             </span>
//             <span onClick={() => navigate("/sell/mobile")}>Mobile Phones</span>
//             <span onClick={() => navigate("/sell/furniture")}>Furniture</span>
//             <span onClick={() => navigate("/sell/electronics")}>
//               Electronics
//             </span>
//           </div>
//         </div>

//         {/* QUICK CATEGORY LINKS */}
//         <span onClick={() => navigate("/sell/cars")}>Cars</span>
//         <span onClick={() => navigate("/sell/bikes/scooters")}>
//           Motorcycles
//         </span>
//         <span onClick={() => navigate("/sell/mobile")}>Mobile Phones</span>
//         <span onClick={() => navigate("/sell/furniture")}>Furniture</span>
//         <span onClick={() => navigate("/sell/electronics")}>Electronics</span>

//         {/* DATE */}
//         <span className="category-date">{today}</span>
//       </div>
//     </>
//   );
// }
