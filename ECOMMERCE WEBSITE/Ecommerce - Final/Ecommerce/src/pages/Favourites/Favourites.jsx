import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ListingCard from "../../components/cards/ListingCard";
import { useFavourites } from "../../context/FavouritesContext";

export default function Favourites() {
  const { favourites } = useFavourites();

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <h4 className="fw-bold mb-3">My Favourites</h4>

        {favourites.length === 0 ? (
          <p>No liked listings yet.</p>
        ) : (
          <div className="row">
            {favourites.map((item) => (
              <div
                key={item.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <ListingCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
