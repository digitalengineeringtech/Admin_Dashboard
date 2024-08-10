const format = (dateString) => {
  const date = new Date(dateString);

  // Format the date as DD-MM-YYYY HH:mm:ss
  const formattedDate = date
    .toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(",", "")
    .replace(/\//g, "-");

  return formattedDate;
};

export default format;
