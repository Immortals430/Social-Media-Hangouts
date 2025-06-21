import React from "react";
import { products } from "./products";
import { Link } from "react-router-dom";
import "./store.scss";
import { removeSkeleton } from "../../utility/removeSkeleton";

export default function Store() {
  return (
    <main className="store">
      <section>
        <div className="friend-req-head">
          <h2>Nearby Offers</h2>
        </div>

        <div className="grid store-grid">
          {products.map((product) => (
            <Link
              key={product._id}
              to="https://urbantrendz.pages.dev/search-result"
            >
              <div className="card product-card">
                <div className="product-image-container loading">
                  <img src={product.searchImage} alt="" onLoad={removeSkeleton} />
                </div>

                <div className="details">
                  <h3>{product.productName}</h3>
                  <h2> Rs {product.price}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
