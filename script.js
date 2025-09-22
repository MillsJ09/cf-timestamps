// wire up listeners
document.getElementById("briefTime").addEventListener("input", updateAll);
document.getElementById("checkpointOverride").addEventListener("input", updateAll);
document.getElementById("vehicleOverride").addEventListener("input", updateAll);

// copy buttons
document.querySelectorAll(".copy-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const outId = btn.dataset.target;
    const text = document.getElementById(outId).textContent;
    navigator.clipboard.writeText(text)
      .then(() => {
        btn.textContent = "Copied!";
        setTimeout(() => btn.textContent = "Copy", 1500);
      })
      .catch(() => {
        btn.textContent = "Failed";
        setTimeout(() => btn.textContent = "Copy", 1500);
      });
  });
});

function updateAll() {
  const brief = document.getElementById("briefTime").value;
  if (!brief) return;

  const [h, m] = brief.split(":").map(Number);
  const base = new Date();
  base.setHours(h, m, 0, 0);

  // two fields: [inputId, outputId, offsetMinutes]
  const rules = [
    ["checkpointOverride", "checkpointUnix", 30],
    ["vehicleOverride",   "vehicleUnix",   -15]
  ];

  rules.forEach(([inId, outId, offset]) => {
    const override = document.getElementById(inId).value;
    const dt = override
      ? parseTime(override)
      : new Date(base.getTime() + offset * 60000);
    document.getElementById(outId).textContent = Math.floor(dt.getTime() / 1000);
  });
}

function parseTime(str) {
  const [h, m] = str.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}
