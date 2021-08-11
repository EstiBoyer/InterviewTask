export interface StateItemType {
  name: string
  population: number
  numberOfCounties: number
  detailsLink: string
  counties?: CountyItemType[]
  highlighted: boolean
}

export interface CountyItemType {
  countyName: string
  countyPopulation: number
}
