declare namespace NodeJS {
    interface ProcessEnv {
        readonly REACT_APP_WEATHER_API_KEY?: string;
    }
}

declare const process: {
    env: NodeJS.ProcessEnv;
};