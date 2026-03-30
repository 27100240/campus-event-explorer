import { useEffect, useMemo, useState } from "react";
import Hero from "./components/Hero";
import FilterBar from "./components/FilterBar";
import EventCard from "./components/EventCard";
import SavedEvents from "./components/SavedEvents";
import { events, categories } from "./data/events";

export default function App() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [saved, setSaved] = useState([]);
  const [sortBy, setSortBy] = useState("earliest");

  useEffect(() => {
    const stored = localStorage.getItem("saved-events");
    if (stored) {
      setSaved(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("saved-events", JSON.stringify(saved));
  }, [saved]);

  const filteredEvents = useMemo(() => {
    let result = events.filter((event) => {
      const matchesCategory =
        activeCategory === "All" || event.category === activeCategory;

      const q = query.toLowerCase();
      const matchesQuery =
        event.title.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });

    if (sortBy === "earliest") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "latest") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [query, activeCategory, sortBy]);

  const savedEvents = events.filter((event) => saved.includes(event.id));

  function toggleSave(eventId) {
    setSaved((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  }

  return (
    <div className="app-shell">
      <div className="container">
        <Hero savedCount={saved.length} />

        <FilterBar
          query={query}
          setQuery={setQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
        />

        <div className="section-header section-header-top">
          <h2>Explore events</h2>

          <div className="sort-wrap">
            <label htmlFor="sort" className="sort-label">
              Sort by
            </label>
            <select
              id="sort"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="earliest">Earliest date</option>
              <option value="latest">Latest date</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>

        <div className="content-grid">
          <main>
            <div className="section-header">
              <p>{filteredEvents.length} result(s)</p>
            </div>

            <div className="event-list">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isSaved={saved.includes(event.id)}
                  onToggleSave={toggleSave}
                />
              ))}
            </div>
          </main>

          <SavedEvents savedEvents={savedEvents} />
        </div>
      </div>
    </div>
  );
}