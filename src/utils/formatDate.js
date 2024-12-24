export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const optionsDate = { day: "2-digit", month: "short", year: "numeric" };
  const optionsDateTime = {
    ...optionsDate,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  };

  const joiningDate = new Intl.DateTimeFormat("en-GB", optionsDate).format(
    date
  );
  let lastLogin = new Intl.DateTimeFormat("en-GB", optionsDateTime).format(
    date
  );

  // Capitalize AM/PM
  lastLogin = lastLogin.replace(/am|pm/i, (match) => match.toUpperCase());

  return { joiningDate, lastLogin };
};

export const getRandomTime = () => {
  let hours = Math.floor(Math.random() * 12) + 1; // Random hour between 1 and 12
  const minutes = Math.floor(Math.random() * 60);
  const period = Math.random() < 0.5 ? "AM" : "PM"; // Randomly choose AM or PM

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;
};

export const convertTimeToISOFormat = (timeStr) => {
  // Parse the time string
  const [time, period] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  // Convert to 24-hour format
  if (period.toUpperCase() === "PM" && hours !== 12) {
    hours += 12;
  } else if (period.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }

  // Construct the ISO time string
  const isoTime = `T${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:00.000Z`;

  return isoTime;
};

export const convertTo24HourFormat = (timeStr) => {
  const [time, period] = timeStr.split(" ");

  let [hours, minutes] = time.split(":").map(Number);

  if (period.toUpperCase() === "PM" && hours !== 12) {
    hours += 12;
  } else if (period.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};
