function isPastAugust18At2pm() {
  const targetDate = new Date("2023-08-18T14:00:00"); // This is August 18, 2023 at 2pm in the local time of the system.
  const currentDate = new Date();

  return currentDate > targetDate;
}

export function EventBanner() {
  const bannerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100px",
    backgroundColor: "#FF5733", // This will give a bright color. You can change it to your needs.
    color: "#fff",
    fontSize: "24px",
    fontWeight: "bold",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return !isPastAugust18At2pm() ? (
    <a
      href="https://www.meetup.com/d3-online/events/295248035/"
      style={bannerStyle}
      target="_blank"
      rel="noopener noreferrer"
    >
      Upcoming event August 18 - D3 and Hot Reloading with Vite
    </a>
  ) : null;
}
