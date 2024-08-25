import './App.css'
import Forecast from './components/Forecast'
import Search from './components/Search'
import { useForecast } from './hooks/useForecast'

export interface IOptions {
    country: string
    lat: number
    lon: number
    name: string
    state: string
    local_names?: { ru: string }
}
export interface IForecast {
    name: string
    country: string
    sunrise: number
    sunset: number
    list: [
        {
            dt: number
            main: {
                feels_like: number
                temp_max: number
                temp_min: number
                humidity: number
                pressure: number
                temp: number
            }
            weather: [
                {
                    main: string
                    icon: string
                    description: string
                }
            ]
            wind: { speed: number; gust: number; deg: number }
            clouds: { all: number }
            pop: number
            visibility: number
        }
    ]
}

function App(): JSX.Element {
    const {
        term,
        options,
        forecast,
        onInputChange,
        onSubmit,
        onOptionSelect,
        backToMenu,
    } = useForecast()

    return (
        <main className="w-full flex justify-center items-center h-[100vh]  bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400">
            {forecast ? (
                <Forecast forecast={forecast} backToMenu={backToMenu} />
            ) : (
                <Search
                    term={term}
                    options={options}
                    onInputChange={onInputChange}
                    onSubmit={onSubmit}
                    onOptionSelect={onOptionSelect}
                />
            )}
        </main>
    )
}

export default App
