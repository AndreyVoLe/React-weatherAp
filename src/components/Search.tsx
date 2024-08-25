import { ChangeEvent } from 'react'
import { IOptions } from '../App'

interface ISearch {
    term: string
    options: IOptions[]
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onSubmit: () => void

    onOptionSelect: (option: IOptions) => void
}

const Search = (props: ISearch) => {
    return (
        <section className="bg-white w-full md:w-[500px] flex flex-col justify-center items-center text-center p-4 md:px-10 lg:p-15 h-full lg:h-[500px] bg-opacity-20 backdrop-blur-lg drop-shadow-lg text-zinc-700 rounded">
            <h1 className="text-4xl mb-2 font-black">Прогноз погоды</h1>
            <p className="text-sm">
                Введите название города, погоду которого хотите узнать. Выберите
                вариант из раскрывающегося списка
            </p>
            <div className="relative flex mt-6 md:mt-4 ">
                <input
                    type="text"
                    value={props.term}
                    onChange={props.onInputChange}
                    className="rounded-l-md  px-2 py-1 indent-2 border-2 border-white"
                />

                <ul className="absolute top-9 w-[110px] bg-white ml-1 rounded-b-md">
                    {props.options.map((opt, index: number) => (
                        <li key={opt.name + '-' + index}>
                            <button
                                className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                                onClick={() => props.onOptionSelect(opt)}
                            >
                                {opt.name}
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    className="border-2 rounded-r-md px-2 py-1 border-zinc-100 hover:border-zinc-500 text-zinc-100 hover:text-zinc-500 cursor-pointer"
                    onClick={props.onSubmit}
                >
                    Поиск
                </button>
            </div>
        </section>
    )
}

export default Search
