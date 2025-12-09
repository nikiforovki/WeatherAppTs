export type DailyForecast = {
    date: string;
    weekday: string;
    temp: number;
    icon: string;
    description: string;
};

export type ForecastListItem = {
    dt: number;
    dt_txt: string;
    main: {
        temp: number;
    };
    weather: {
        icon: string;
        description: string;
    }[];
};

export type ForecastResponse = {
    list: ForecastListItem[];
};