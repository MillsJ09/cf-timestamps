// 1) Define your events & offsets (in minutes)
const eventRules = [
  { id: 'checkpoint', offset: 30  },
  { id: 'vehicle',   offset: -15 },
  // { id: 'foot',     offset: XX },
  // { id: 'vessel',   offset: YY },
  // …add one line per event with your exact offsets
];

// 2) Wire up listeners
document.getElementById('briefTime').addEventListener('input', updateAll);
eventRules.forEach(ev => {
  document.getElementById(`${ev.id}Override`)
    .addEventListener('input', updateAll);
});

// 3) Copy-button feedback
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const txt = document.getElementById(btn.dataset.target).textContent;
    navigator.clipboard.writeText(txt)
      .then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy', 1200);
      })
      .catch(() => {
        btn.textContent = 'Err';
        setTimeout(() => btn.textContent = 'Copy', 1200);
      });
  });
});

function updateAll() {
  const baseVal = document.getElementById('briefTime').value;
  if (!baseVal) return;

  const [h, m] = baseVal.split(':').map(Number);
  const baseDate = new Date();
  baseDate.setHours(h, m, 0, 0);

  eventRules.forEach(ev => {
    const over = document.getElementById(`${ev.id}Override`).value;
    const dt = over
      ? parseTime(over)
      : new Date(baseDate.getTime() + ev.offset * 60000);
    const unix = Math.floor(dt.getTime() / 1000);
    document.getElementById(`${ev.id}Unix`).textContent = unix;
  });
}

function parseTime(str) {
  const [h, m] = str.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}
