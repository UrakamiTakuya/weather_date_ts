import { DisplayData } from "./type/weatherSummary";
import { WeatherData } from "./type/weatherReport";
import { calcAverageType } from "./type/functionType";
import { rainTemperatureObjectType } from "./type/functionType";
import { createWeeklyDataList } from "./type/functionType";
import { cloudAndPrecipitationHoursObjectType } from "./type/functionType";

export default function weather() {
    // 現在の時刻を表示
    // 
    const useMakeWeatherData = async() => {
        try {
            const weatherData = await fetchData();
            displayData(weatherData);
        } catch (error) {
            console.error('エラーが発生しました (${error})')
        }
    }

    const fetchData = (): Promise<WeatherData> => {
        return fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation,rain,showers,weathercode,cloudcover,cloudcover_high,winddirection_10m,winddirection_80m,winddirection_120m,winddirection_180m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,precipitation_hours&timezone=Asia%2FTokyo`)
            .then(response => {
                return response.json()
            })
    }

    const displayData = (weatherData: WeatherData) => {
        const hourlyUnits = weatherData.hourly_units;
        const hourly = weatherData.hourly;
        const dailyUnits = weatherData.daily_units;
        const daily = weatherData.daily;

        return {
            averageTemperatureWeek: calculateAverageWeek(hourly.temperature_2m),
            averageMaxTemperatureWeek: calculateAverageWeek(daily.temperature_2m_max),
            averageMinTemperatureWeek: calculateAverageWeek(daily.temperature_2m_min),
            averageChanceOfPrecipitationWeek: calculateAverageWeek(daily.precipitation_hours),
            maxTemperatureWeek: Math.max(...daily.temperature_2m_max),
            minTemperatureWeek: Math.max(...daily.temperature_2m_min),
            maxPrecipitationWeek: Math.max(...daily.precipitation_hours),
            lowTemperatureDifferenceDay: makeTemperatureDifferenceList(daily.precipitation_hours, daily.temperature_2m_max, daily.temperature_2m_min),
            clearWeatherWeek: makeClearWeatherDayList(hourly.cloudcover, daily.precipitation_hours)
        }
    }

    const calculateAverageWeek: calcAverageType = (weekList: number[]): number => {
        const calcAverage = weekList.reduce((total: number, num: number) => {
            return total + num;
        }, 0) / weekList.length
        return calcAverage
    }

    const makeTemperatureDifferenceList = (
        precipitationHours: number[],
        temperatureMax: number[],
        temperatureMin: number[]
    ): Array<string> => {
        let rainTemperatureList: Array<rainTemperatureObjectType> = new Array(); 
        for (let i = 0; i < precipitationHours.length; i ++) {
            rainTemperatureList.push({rain: precipitationHours[i], maxTemperature: temperatureMax[i], minTemperature: temperatureMin[i]})
        }
        return rainTemperatureList.map((rainTemperature: rainTemperatureObjectType) => {
            if (rainTemperature.rain >= 10 && 
                (rainTemperature.maxTemperature - rainTemperature.minTemperature <= 10)) {
                    return '過ごしやすい日です'
                } else {
                    return '急な気温変化にご注意ください。体調に気をつけましょう。'
                }
        })
    }

    const makeClearWeatherDayList = (
        cloudCover: number[],
        precipitationHours: number[]
    ) => {
        const SUNNY_DAY = 10
        const CLOUDY_DAY = 90
        const averageCloudDate = createWeeklyDataList(cloudCover, 24).map((cloudDate) => {
            let sumCloudDate = 0;
            for (let i = 0; i < cloudDate.length; i++) {
                sumCloudDate += cloudDate[i];
            }
            return Math.floor(sumCloudDate / cloudDate.length)
        })
        createCloudAndPrecipitationHoursObjectList(averageCloudDate, precipitationHours).map((obj: cloudAndPrecipitationHoursObjectType) => {

        })
        

    }

    const createCloudAndPrecipitationHoursObjectList = (
        averageCloudDate: number[],
        precipitationHours: number[]
    ): cloudAndPrecipitationHoursObjectType[] => {
        const cloudAndPrecipitationHoursObjectList: Array<cloudAndPrecipitationHoursObjectType> = new Array()
        for (let i = 0; i < averageCloudDate.length; i++ ) {
            cloudAndPrecipitationHoursObjectList.push({cloudDate: averageCloudDate[i], precipitationDate: precipitationHours[i]})
        }
        // console.log(cloudAndPrecipitationHoursObjectList)
        return cloudAndPrecipitationHoursObjectList
    }

    useMakeWeatherData();
}