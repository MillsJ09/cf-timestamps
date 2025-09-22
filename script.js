document.getElementById("briefTime").addEventListener("input", updateTimes);
document.getElementById("checkpointOverride").addEventListener("input", updateTimes);
document.getElementById("vehicleOverride").addEventListener("input", updateTimes);

function updateTimes() {
  const briefTime = document.getElementById("briefTime").value;
  if (!briefTime) return;

  const [hours, minutes] = briefTime.split(":").map(Number);
  const baseDate = new Date();
  baseDate.setHours(hours, minutes, 0, 0);

  updateField("checkpointOverride", "checkpointUnix", baseDate, 30);
  updateField("vehicleOverride", "vehicleUnix", baseDate, -15);
}

function updateField(inputId, outputId, baseDate, offsetMinutes) {
  const override = document.getElementById(inputId).value;
  const date = override ? parseTime(override) : new Date(baseDate.getTime() + offsetMinutes * 60000);
  const unix = Math.floor(date.getTime() / 1000);
  document.getElementById(outputId).textContent = unix;
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
