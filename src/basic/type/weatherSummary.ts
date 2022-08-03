import { WeatherData } from "./weatherReport";
import { Daily } from "./weatherReport";
import { DailyUnits } from "./weatherReport";
import { Hourly } from "./weatherReport";

export type DisplayData = {
    /** 1週間の平均気温 */
    averageTemperatureWeek: number;
    /** 1週間の最高気温 */
    maxTemperatureWeek: number;
    /** 1週間の最低気温 */
    minTemperatureWeek: number;
    /** 1週間の降水確率 */
    maxPrecipitationWeek: number;
    /** 1週間の平均最高気温 */
    averageMaxTemperatureWeek: number;
    /** 1週間の平均最低気温 */
    averageMinTemperatureWeek: number;
    /** 1週間の平均降水確率 */
    averageChanceOfPrecipitationWeek: number;
    /** 寒暖差が少なく、過ごしやすい日 */
    lowTemperatureDifferenceDay: string[];
    /** 1週間の内、の快晴日 */
    clearWeatherWeek: string[]
    /** 1週間の内、雨が降る曜日 */
    rainyDay: string;
    /** 1週間の内、最も暑い時間を7日分 */
    maxHotTime: number[];
    /** 1週間の内、最も気温が低い時間を7日分 */
    minCoolTime: number[];
    /** 1週間の日付 */
    dayWeek: string;
}