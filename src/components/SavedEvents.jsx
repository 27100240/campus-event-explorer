export default function SavedEvents({ savedEvents }) {
  return (
    <aside className="saved-panel">
      <h2>Saved events</h2>
      {savedEvents.length === 0 ? (
        <div className="empty-box">Save an event to build your shortlist.</div>
      ) : (
        savedEvents.map((event) => (
          <div key={event.id} className="saved-item">
            <h4>{event.title}</h4>
            <p>
              {event.date} · {event.time}
            </p>
            <p>{event.location}</p>
          </div>
        ))
      )}
    </aside>
  );
}