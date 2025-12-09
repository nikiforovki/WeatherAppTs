export type FavoriteCity = {
    id: string;
    name: string;
    country: string;
};

export type Coords = {
    lat: number;
    lon: number } | null;

export type TodayProps = {
    city: string;
    coords: Coords;
    useGeo: boolean;
    onGeoSelect: (lat: number, lon: number) => void;
};