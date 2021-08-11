import { networkRequest } from "./NetworkRequestsManager";

export const stateListNetworkRequest = async (): Promise<any> => {
  try {
    return await networkRequest("GET", "http://pos.idtretailsolutions.com/countytest/states");
  } catch (error) {
    throw error;
  }
};

export const stateDetailsNetworkRequest = async (url: string): Promise<any> => {
  try {
    return await networkRequest("GET", url);
  } catch (error) {
    throw error;
  }
};
