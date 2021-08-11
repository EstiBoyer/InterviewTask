import { stateDetailsNetworkRequest, stateListNetworkRequest } from "./Requests";
import { CountyItemType, StateItemType } from "../UI/viewTypes";

export function stateListRequest(): Promise<StateItemType[]> {
  return stateListNetworkRequest()
    .then(statesResponse =>
      statesResponse.data && convertStatesToView(statesResponse.data)
    ).catch(err => {
      throw err;
    });
}

export function stateDetailsRequest(url: string): Promise<CountyItemType[]> {
  return stateDetailsNetworkRequest(url)
    .then(stateResponse =>
      stateResponse.data && convertStateDetailsToView(stateResponse.data)
    ).catch(err => {
      throw err;
    });
}


// conversions
export function convertStatesToView(statesResponse: any): StateItemType[] {
  return statesResponse.map(state => {
    return {
      name: state.state,
      population: state.population,
      numberOfCounties: state.counties,
      detailsLink: state.detail,
      highlighted: false
    };
  });
}

export function convertStateDetailsToView(stateDetailsResponse: any): CountyItemType[] {
  return stateDetailsResponse.map(county => {
    return {
      countyName: county.county,
      countyPopulation: county.population
    };
  });
}
