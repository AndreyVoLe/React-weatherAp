import { IForecast } from '../App'

interface IFore {
    forecast: IForecast
    backToMenu: () => void
}
interface IDegree {
    temp: number
}
const Degree = (props: IDegree): JSX.Element => (
    <span>
        {props.temp}
        <sup>o</sup>
    </span>
)

const Forecast = (props: IFore) => {
    const today = props.forecast.list[0]
    return (
        <div className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:p-15 h-auto lg:h-auto bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
            <div className="mx-auto w-[300px]">
                <section className="text-center">
                    <h2 className="text-2xl font-black">
                        {props.forecast.name}{' '}
                        <span className="font-thin">
                            {props.forecast.country}
                        </span>
                    </h2>
                    <h1 className="text-4xl font-extrabold">
                        <Degree temp={Math.round(today.main.temp)} />
                    </h1>
                    <p className="text-sm">
                        {today.weather[0].main} {today.weather[0].description}
                    </p>
                    <p className="text-sm">
                        H: <Degree temp={Math.ceil(today.main.temp_max)} /> L:{' '}
                        <Degree temp={Math.floor(today.main.temp_min)} />
                    </p>
                </section>

                <section className="flex overflow-x-scroll mt-4 pb-2 mb-5">
                    {props.forecast.list.map((item, i) => (
                        <div
                            key={i}
                            className="inline-block text-center w-[50px] flex-shrink-0"
                        >
                            <p className="text-sm">
                                {i === 0
                                    ? 'Сейчас'
                                    : new Date(item.dt * 1000).getHours()}
                            </p>
                            <img
                                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                alt={`weather-icon-${item.weather[0].description}`}
                            />
                            <p className="text-sm font-bold">
                                <Degree temp={Math.round(item.main.temp)} />
                            </p>
                        </div>
                    ))}
                </section>
            </div>
            <section>
                <div className="text-center mt-10">
                    <button
                        onClick={props.backToMenu}
                        className="border-2 rounded-r-md px-2 py-1 border-zinc-100 hover:border-zinc-500 text-zinc-100 hover:text-zinc-500 cursor-pointer"
                    >
                        Назад
                    </button>
                </div>
            </section>
        </div>
    )
}

export default Forecast
