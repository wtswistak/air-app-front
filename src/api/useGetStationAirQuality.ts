import useSWR from "swr";
import api from ".";
import { IStationAirQuality } from "../interfaces/IStation";

const fetcher = (url: string) => api.get(url).then((res) => res.data);
export const useGetStationAirQuality = (stationId: number) => {
  const { data, error } = useSWR<IStationAirQuality>(
    `/air-quality/${stationId}`,
    fetcher,
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};