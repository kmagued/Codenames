export default {
  primaryColor: "#adcd4f", //green
  secondary: "#851256", //purple
  blueTeam: "#1d4493",
  redTeam: "#b71d7d",
  neutral: "#f6da6d",
};

export const setColor = (team) => {
  if (team === 0) {
    return "#e1eac4";
  }
  if (team === 1) {
    return "#cbd3e3";
  }
  if (team === 2) {
    return "#eacadf";
  }
  return "white";
};

export const setTextColor = (team) => {
  if (team === 0) {
    return "black";
  }
  if (team === 1) {
    return "#1d4493";
  }
  if (team === 2) {
    return "#b71d7d";
  }
  return "black";
};

export const setBackgroundColor = (team) => {
  if (team === 0) {
    return "#adcd4f";
  }
  if (team === 1) {
    return "#1b4493";
  }
  if (team === 2) {
    return "#b71d7d";
  }
  return "black";
};
