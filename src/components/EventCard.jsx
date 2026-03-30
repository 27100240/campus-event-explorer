import { Bookmark, BookmarkCheck, Clock3, MapPin } from "lucide-react";

export default function EventCard({ event, isSaved, onToggleSave }) {
  return (
    <div className="event-card">
      <div className="event-top">
        <div>
          <span className="event-category">{event.category}</span>
          <p className="event-date">{event.date}</p>
        </div>

        <button
          className={isSaved ? "save-btn saved" : "save-btn"}
          onClick={() => onToggleSave(event.id)}
        >
          {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          {isSaved ? "Unsave" : "Save"}
        </button>
      </div>

      <h3>{event.title}</h3>
      <p className="event-description">{event.description}</p>

      <div className="event-meta">
        <span>
          <Clock3 size={16} />
          {event.time}
        </span>
        <span>
          <MapPin size={16} />
          {event.location}
        </span>
      </div>
    </div>
  );
}