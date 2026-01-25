// src/pages/Profile/Profile.jsx
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useAuth } from "../../providers/AuthProvider";
const getDisplayAddress = (addresses) => {
  if (!addresses || addresses.length === 0) return null;


  // 1️⃣ Try to find HOME address
  const homeAddressObj = addresses.find(
    (item) => item.addressType === "HOME"
  );


  // 2️⃣ If HOME exists, return it
  if (homeAddressObj) {
    return homeAddressObj.address;
  }


  // 3️⃣ Else return first available address
  return addresses[0].address;
};
export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user)

  // const user = user_detail.user
  // TEMP – later replace with backend listings
  const userListings = []; // empty = no products
  console.log(user)
  if (!user) {
    navigate("/login");
    return null;
  }
  const address = getDisplayAddress(user.user.profile?.addresses);

  return (

    <div className="profile-container">
      {/* LEFT SIDE - USER INFO */}
      <div className="profile-left">
        <img
          src="https://thumbs.dreamstime.com/b/h-alphabetic-design-letter-can-be-made-initial-image-profile-picture-can-also-be-made-symbol-logo-116910441.jpg"
          // src={user.profilePhoto || "/default-user.png"}
          alt="profile"
          className="profile-big-img"
        />

        <h2 className="profile-name">
          {user.user.fullName}
        </h2>

        <p className="profile-email">{user.user.email}</p>

        {user.user.profile.bio && (
          <p className="profile-bio">asdf{user.user.profile.bio}</p>
        )}

        <div className="profile-details">
          <p>
            <strong>📞 Phone:</strong> {user.user.phone || "Not added"}
          </p>

          <p>
            <strong>🏠 Address:</strong>{" "}
            {address ? (
              <>
                {address.street}, {address.city}, {address.state} -{" "}
                {address.pincode}
              </>
            ) : (
              "Address not added"
            )}
          </p>
        </div>

        <button
          className="edit-profile-btn"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </button>
      </div>


      {/* RIGHT SIDE - USER LISTINGS */}
      <div className="profile-right">
        {userListings.length === 0 ? (
          <div className="no-listing-box">
            <img
              src="/start-selling.png" // add any illustration in public folder
              alt="start selling"
              className="no-listing-img"
            />

            <h3>You haven't listed anything yet</h3>
            <p>Start selling now</p>

            <button className="sell-now-btn" onClick={() => navigate("/sell")}>
              Start Selling
            </button>
          </div>
        ) : (
          <div className="listing-grid">
            {userListings.map((item) => (
              <div key={item.id} className="listing-card">
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
                <p>₹ {item.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
