function daysUntil(dateStr) {
  const today = new Date();
  const due = new Date(dateStr + "T00:00:00");
  today.setHours(0,0,0,0);
  due.setHours(0,0,0,0);
  const diff = Math.round((due - today) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function DueBadge({ dueDate }) {
  const d = daysUntil(dueDate);
  let label = d < 0 ? "Overdue" : 
  d === 0 ? "Due Today" : 
  d === 1 ? "1 day remaining"  :
  `${d} days remaining!`

  if (d < 0) {
    return <span className="badge danger">{label}</span>;
  }
  
  if (d === 0) {
    return <span className="badge warn">{label}</span>;
  }
  
  return <span className="badge">{label}</span>;
};

