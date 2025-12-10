import type {Coords, DayForecast} from "../../types";

export type ForecastProps = {
  city: string;
  coords: Coords;
  useGeo: boolean;
};


export type WeatherDetailsModalProps = {
    isOpen: boolean;
    isLoading: boolean;
    dayData: DayForecast | null;
    locationLabel: string;
    onClose: () => void;
};