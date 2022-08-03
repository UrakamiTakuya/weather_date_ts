export type WeatherData = {
    latitude:           number;
    longitude:          number;
    generationtime_ms:  number;
    utc_offset_seconds: number;
    elevation:          number;
    hourly_units:       HourlyUnits;
    hourly:             Hourly;
    daily_units:        DailyUnits;
    daily:              Daily;
}

export type Daily = {
    /** 1週間の日付 */
    time:                 Date[];
    /** 1週間の最高気温 */
    temperature_2m_max:   number[];
    /** 1週間の最低気温 */
    temperature_2m_min:   number[];
    /** 1週間の降水量 */
    precipitation_hours:  number[];
    /** 1週間の降水量 */
    weathercode:          number[];
    /** 日の出時間 */
    sunrise:              string[];
    /* 日没時間 */
    sunset:               string[];
    /* 毎日の降水量の合計（雨、にわか雨、降雪を含む） */
    precipitation_sum:    number[];
    /* 毎日の雨の合計 */
    rain_sum:             number[];
}

// TODO 使わないので後で削除
export type DailyUnits = {
    time:                 string;
    /** ℃ */
    temperature_2m_max:   string;
    /** ℃ */
    temperature_2m_min:   string;
    /**　h */
    precipitation_hours:  string;
    sunrise:              string;
    sunset:               string;
    precipitation_sum:    string;
    rain_sum:             string;
}

export type Hourly = {
    /* 1週間分の一時間毎の合計 */
    time:                 string[];
    /** 2時間毎の気温 */
    temperature_2m:       number[];
    /** 2時間毎の降水量 */
    rain:                 number[];
    /* 相対湿度 */
    relativehumidity_2m:  number[];
    /* 地上2メートルの露点温度 */
    dewpoint_2m:          number[];
    /* 体感温度 */ 
    apparent_temperature: number[];
    /* 1時間前の総降水量（雨、にわか雨、雪）の合計 */
    precipitation:        number[];
    /* にわか雨 */
    showers:              number[];
    weathercode:          number[];
    /* 総雲量(%) */
    cloudcover:           number[];
    cloudcover_high:      number[];
    /* 地上10、80、120または180メートルの風向 */
    winddirection_10m:    number[];
    winddirection_80m:    number[];
    winddirection_120m:   number[];
    winddirection_180m:   number[];
}

export type HourlyUnits = {
    time:                 string;
    temperature_2m:       string;
    relativehumidity_2m:  string;
    dewpoint_2m:          string;
    apparent_temperature: string;
    precipitation:        string;
    rain:                 string;
    showers:              string;
    weathercode:          string;
    cloudcover:           string;
    cloudcover_high:      string;
    winddirection_10m:    string;
    winddirection_80m:    string;
    winddirection_120m:   string;
    winddirection_180m:   string;
}
