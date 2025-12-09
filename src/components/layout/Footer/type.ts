export type Coords = { lat: number; lon: number } | null;

export type FooterProps = {
    city: string;
    coords: Coords;
    useGeo: boolean;
};