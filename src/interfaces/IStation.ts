import { ISensor } from "./ISensor";

export interface IStation {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  city: string;
  communeName: string;
  addressStreet: string;
}

export interface IStationWithIndex extends IStation {
  indexId: number;
  indexColor: string;
}

export interface IStationAirQuality extends IStationWithIndex {
  indexId: number;
  indexValue: number;
  indexName: string;
  indexColor: string;
  sensors: ISensor[];
  measurementTime: Date,
}