import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export type DailyForecast = {
    date: string;
    weekday: string;
    temp: number;
    icon: string;
    description: string;
};

export function normalizeForecast(data: any): DailyForecast[] {
    const byDate: Record<string, any[]> = {};

    data.list.forEach((item: any) => {
        const dateStr = item.dt_txt.slice(0, 10);
        if (!byDate[dateStr]) byDate[dateStr] = [];
        byDate[dateStr].push(item);
    });

    const days = Object.keys(byDate)
        .sort()
        .slice(0, 6)
        .map((dateStr) => {
            const items = byDate[dateStr];
            const target =
                items.find((i) => i.dt_txt.includes('12:00:00')) ?? items[0];

            const dateObj = new Date(target.dt * 1000);

            const weekdayRaw = format(dateObj, 'EEEE', { locale: ru });
            const weekday =
                weekdayRaw.charAt(0).toUpperCase() + weekdayRaw.slice(1);

            return {
                date: format(dateObj, 'd MMMM', { locale: ru }),
                weekday,
                temp: Math.round(target.main.temp),
                icon: target.weather[0].icon,
                description: target.weather[0].description,
            };
        });

    console.log('Сколько дней после нормализации:', days.length);

    return days;
}