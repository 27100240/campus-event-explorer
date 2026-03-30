export default function FilterBar({
  query,
  setQuery,
  activeCategory,
  setActiveCategory,
  categories,
}) {
  return (
    <section className="filter-bar">
      <input
        type="text"
        placeholder="Search events, venues, or keywords"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      <div className="filter-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? "filter active" : "filter"}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}