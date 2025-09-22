document.getElementById("briefTime").addEventListener("input", function () {
  const briefTime = this.value;
  if (!briefTime) return;

  const [hours, minutes] = briefTime.split(":").map(Number);
  const briefDate = new Date();
  briefDate.setHours(hours, minutes, 0, 0);

  // Checkpoint Opens: +30 mins
  const checkpointDate = new Date(briefDate.getTime() + 30 * 60000);
  document.getElementById("checkpointOpens").textContent = formatTime(checkpointDate);

  // Vehicle Close: -15 mins
  const vehicleDate = new Date(briefDate.getTime() - 15 * 60000);
  document.getElementById("vehicleClose").textContent = formatTime(vehicleDate);
});

function formatTime(date) {
  return date.toTimeString().slice(0, 5);
}
