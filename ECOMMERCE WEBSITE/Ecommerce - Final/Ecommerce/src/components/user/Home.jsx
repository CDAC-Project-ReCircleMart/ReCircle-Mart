import { Link } from "react-router-dom";
import { listings } from "../../data";
import ListingCard from "../../components/cards/ListingCard";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-wrapper">
      <h2 className="home-title">Fresh Recommendations</h2>

      <div className="list-wrapper">
        {listings.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="listing-link"
          >
            <ListingCard item={item} />
          </Link>
        ))}
      </div>
    </div>
  );
}
