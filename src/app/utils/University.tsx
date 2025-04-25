export interface University {
    id: number;
    name: string;
    domains: string[],
    webPages: string[];
    country: string;
    alphaTwoCode: string;
    stateProvince: string;
    favorite: boolean;
}