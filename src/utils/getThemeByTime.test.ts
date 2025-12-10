import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getThemeByTime } from "./getThemeByTime";

describe("getThemeByTime", () => {
  beforeEach(() => {
    // Сбрасываем мок перед каждым тестом
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Восстанавливаем реальные таймеры после каждого теста
    vi.useRealTimers();
  });

  it("возвращает 'light' днём", () => {
    // Тестируем несколько дневных часов
    for (const hour of [7, 8, 9, 12, 15, 18]) {
      vi.setSystemTime(new Date(2025, 0, 1, hour, 0, 0, 0));
      expect(getThemeByTime()).toBe("light");
    }
  });

  it("возвращает 'dark' ночью", () => {
    // Тестируем несколько ночных часов
    for (const hour of [0, 1, 2, 3, 4, 5, 6, 19, 20, 21, 22, 23]) {
      vi.setSystemTime(new Date(2025, 0, 1, hour, 0, 0, 0));
      expect(getThemeByTime()).toBe("dark");
    }
  });

  it("возвращает 'dark' в начале дня (час 6)", () => {
    vi.setSystemTime(new Date(2025, 0, 1, 6, 0, 0, 0));
    expect(getThemeByTime()).toBe("dark");
  });

  it("возвращает 'light' в начале светлого времени (час 7)", () => {
    vi.setSystemTime(new Date(2025, 0, 1, 7, 0, 0, 0));
    expect(getThemeByTime()).toBe("light");
  });

  it("возвращает 'light' перед началом темного времени (час 18)", () => {
    vi.setSystemTime(new Date(2025, 0, 1, 18, 0, 0, 0));
    expect(getThemeByTime()).toBe("light");
  });

  it("возвращает 'dark' в начале темного времени (час 19)", () => {
    vi.setSystemTime(new Date(2025, 0, 1, 19, 0, 0, 0));
    expect(getThemeByTime()).toBe("dark");
  });
});
