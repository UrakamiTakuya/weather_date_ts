export type calcAverageType = (weekList: number[]) => number;

export type rainTemperatureObjectType = {
    rain: number,
    maxTemperature: number,
    minTemperature: number
}

export type cloudAndPrecipitationHoursObjectType = {
    cloudDate: number,
    precipitationDate: number
}

export const arraySplit = <T>(array: T[], n: number) => {
    array.reduce((acc: T[][], c, i: number) => (i % n ? acc : [...acc, ...[array.slice(i, i + n)]]), [])
}

export const createWeeklyDataList = <T>(array: T[], num: number) => {
    return array.reduce(
        (arr, _, i) => (i % num ? arr : [...arr, array.slice(i, i + num)]), [] as T[][]
    )
}





const array = ['apple', 'banana', 'strawberry', true , 1] as const

type Arr = typeof array 
type Fruits = Arr[number]