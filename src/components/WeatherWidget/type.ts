export type Coords = {
    lat: number;
    lon: number } | null;

export type ForecastProps = {
    city: string;
    coords: Coords;
    useGeo: boolean;
};