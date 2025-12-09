export type Coords = { lat: number; lon: number } | null;

export type MainProps = {
    city: string;
    coords: Coords;
    useGeo: boolean;
    onGeoSelect: (lat: number, lon: number) => void;
};