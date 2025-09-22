document.getElementById("briefTime").addEventListener("input", updateTimes);
document.getElementById("checkpointOverride").addEventListener("input", updateTimes);
document.getElementById("vehicleOverride").addEventListener("input", updateTimes);

function updateTimes() {
  const briefTime = document.getElementById("briefTime").value;
  if (!briefTime) return;

  const [hours, minutes] = briefTime.split(":").map(Number);
  const baseDate = new Date();
  baseDate.setHours(hours, minutes, 0, 0);

  // Checkpoint Opens (+30 mins)
  const checkpointInput = document.getElementById("checkpointOverride").value;
  const checkpointDate = checkpointInput
    ? parseTime(checkpointInput)
    : new Date(baseDate.getTime() + 30 * 60000);
  document.getElementById("checkpointUnix").textContent = Math.floor(checkpointDate.getTime() / 1000);

  // Vehicle Close (-15 mins)
  const vehicleInput = document.getElementById("vehicleOverride").value;
  const vehicleDate = vehicleInput
    ? parseTime(vehicleInput)
    : new Date(baseDate.getTime() - 15 * 60000);
  document.getElementById("vehicleUnix").textContent = Math.floor(vehicleDate.getTime() / 1000);
}

function parseTime(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

function copyUnix(id) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text);
}
