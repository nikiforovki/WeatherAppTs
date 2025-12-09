import { normalizeForecast } from "./normalizeForecast";

describe("normalizeForecast", () => {
  it("should normalize forecast data correctly", () => {
    const mockData = {
      list: [
        {
          dt: 1609459200,
          dt_txt: "2021-01-01 12:00:00",
          main: { temp: 10.5 },
          weather: [{ icon: "01d", description: "clear sky" }],
        },
        {
          dt: 1609545600,
          dt_txt: "2021-01-02 12:00:00",
          main: { temp: 12.3 },
          weather: [{ icon: "02d", description: "few clouds" }],
        },
      ],
    };

    const result = normalizeForecast(mockData);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      date: expect.any(String),
      weekday: expect.any(String),
      temp: 11,
      icon: "01d",
      description: "clear sky",
    });
  });

  it("should handle forecast data without exact 12:00:00 time", () => {
    const mockData = {
      list: [
        {
          dt: 1609459200,
          dt_txt: "2021-01-01 13:00:00",
          main: { temp: 10.5 },
          weather: [{ icon: "01d", description: "clear sky" }],
        },
      ],
    };

    const result = normalizeForecast(mockData);

    expect(result).toHaveLength(1);
    expect(result[0].temp).toBe(11);
  });

  it("should limit results to 6 days", () => {
    const mockData = {
      list: Array.from({ length: 10 }, (_, i) => ({
        dt: 1609459200 + i * 86400,
        dt_txt: `2021-01-0${i + 1} 12:00:00`,
        main: { temp: 10 + i },
        weather: [{ icon: "01d", description: "clear sky" }],
      })),
    };

    const result = normalizeForecast(mockData);

    expect(result).toHaveLength(6);
  });
});
