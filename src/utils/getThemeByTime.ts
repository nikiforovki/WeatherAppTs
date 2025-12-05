export function getThemeByTime(): "light" | "dark" {
    const now = new Date();
    const hour = now.getHours();
    const dayStart = 7;
    const nightStart = 19;

    if (hour >= dayStart && hour < nightStart) return "light";
    return "dark";
}