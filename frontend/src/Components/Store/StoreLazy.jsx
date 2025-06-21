import "./store.scss";

export default function StoreLazy() {
  return (
    <main className="store">
      <section>
        <div className="friend-req-head">
          <h2>Nearby Offers</h2>
        </div>

        <div className="grid store-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="product-card-loading" key={i}></div>
          ))}
        </div>
      </section>
    </main>
  );
}
