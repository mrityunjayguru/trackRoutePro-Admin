export const DateAndTime = Array.from({ length: 49 }, (_, i) => {
  const hours = String(Math.floor(i / 2)).padStart(2, "0");
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hours}:${minutes}`;
});

// Ensure "24:00" is included explicitly
DateAndTime[48] = "24:00";

export const mindiff = ["00", "30"];
