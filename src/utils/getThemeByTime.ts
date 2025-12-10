import {
  DAY_START as DAY_START_HOUR,
  NIGHT_START as NIGHT_START_HOUR,
} from "../constants";

export function getThemeByTime(): "light" | "dark" {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= DAY_START_HOUR && hour < NIGHT_START_HOUR) {
    return "light";
  }
  return "dark";
}
