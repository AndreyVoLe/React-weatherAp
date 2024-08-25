import { ChangeEvent, useEffect, useState } from 'react'

import { IForecast, IOptions } from '../App'
import axios from 'axios'

export const useForecast = () => {
    const [term, setTerm] = useState<string>('')
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit=10&appid={API key}
    // import.meta.env.VITE_REACT_APP_API_KEY
    const [options, setOptions] = useState<IOptions[]>([])
    const [city, setCity] = useState<IOptions | null>(null)
    const [forecast, setForecast] = useState<IForecast | null>(null)

    useEffect(() => {
        if (term === '') return
        const fetchOptions = async () => {
            try {
                const response = await axios.get(
                    `http://api.openweathermap.org/geo/1.0/direct`,
                    {
                        params: {
                            q: term.trim(),
                            limit: 3,
                            appid: import.meta.env.VITE_REACT_APP_API_KEY,
                        },
                    }
                )
                setOptions(response.data)
            } catch (error) {
                console.error('Ошибка при запросе данных:', error)
            }
        }
        // const fetchOptions = async () => {
        //     try {
        //         const response = await fetch(
        //             `http://api.openweathermap.org/geo/1.0/direct?q=${term.trim()}&limit=3&appid=${
        //                 import.meta.env.VITE_REACT_APP_API_KEY
        //             }`
        //         )
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok')
        //         }
        //         const data = await response.json()
        //         setOptions(data)
        //     } catch (error) {
        //         console.error('Ошибка при запросе данных:', error)
        //     }
        // }

        fetchOptions()
    }, [term])

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setTerm(value)
    }

    const getForecast = async (city: IOptions): Promise<void> => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast`,
                {
                    params: {
                        lat: city.lat,
                        lon: city.lon,
                        units: 'metric',
                        appid: import.meta.env.VITE_REACT_APP_API_KEY,
                    },
                }
            )
            const forecastData = {
                ...response.data.city,
                list: response.data.list.slice(0, 16),
            }
            setForecast(forecastData)
        } catch (error) {
            console.log('Ошибка при запросе данных в getForecast', error)
        }
    }
    // const getForecast = async (city: IOptions): Promise<void> => {
    //     try {
    //         const response = await fetch(
    //             `https://api.openweathermap.org/data/2.5/forecast?lat=${
    //                 city.lat
    //             }&lon=${city.lon}&units=metric&appid=${
    //                 import.meta.env.VITE_REACT_APP_API_KEY
    //             }`
    //         )
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok')
    //         }
    //         const data = await response.json()
    //         const forecastData = { ...data.city, list: data.list.slice(0, 16) }
    //         setForecast(forecastData)
    //     } catch (error) {
    //         console.log('Ошибка при запросе данных в getForecast', error)
    //     }
    // }

    const onSubmit = () => {
        if (!city) return

        getForecast(city)
    }

    const onOptionSelect = (option: IOptions) => setCity(option)

    const backToMenu = () => {
        setForecast(null)
    }

    useEffect(() => {
        if (!city) return

        setTerm(city.name)
        setOptions([])
    }, [city])
    return {
        term,
        options,
        forecast,
        onInputChange,
        onSubmit,
        onOptionSelect,
        backToMenu,
    }
}
