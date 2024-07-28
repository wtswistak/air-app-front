import useSWR from "swr";
import api from ".";
import { IStationWithIndex } from "../interfaces/IStation";

const fetcher = (url: string) => api.get(url).then((res) => res.data);
export const useGetAirIndexes = () => {
  const { data, error } = useSWR<IStationWithIndex[]>(
    "/air-quality/stations-index",
    fetcher,
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};