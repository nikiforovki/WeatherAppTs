export type InputProps = {
    onSearch: (city: string) => void;
};

export type FavoriteCity = {
    id: string;
    name: string;
    country: string;
};