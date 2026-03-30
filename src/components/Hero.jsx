export default function Hero({ savedCount }) {
  return (
    <section className="hero">
      <div className="hero-left">
        <span className="hero-badge">Campus events, simplified</span>
        <h1>Discover what’s happening without the chaos.</h1>
        <p>
          A cleaner event discovery experience for students to browse, filter,
          and save the events that actually matter to them.
        </p>

        <div className="stats">
          <div className="stat-card">
            <h3>6</h3>
            <span>Events listed</span>
          </div>
          <div className="stat-card">
            <h3>5</h3>
            <span>Categories</span>
          </div>
          <div className="stat-card">
            <h3>{savedCount}</h3>
            <span>Saved events</span>
          </div>
        </div>
      </div>
    </section>
  );
}