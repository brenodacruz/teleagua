export default function ListaProdutos(props){

    return(
        <div className="flex flex-row justify-evenly items-center bg-gray-200 w-full h-36 mt-5">
            <div className="flex flex-row gap-5 justify-start items-center">
                <img src="../img/img.jpg" className="w-28 rounded-xl" alt="Icone conforme a página"></img>
                <h1 className="text-4xl w-[200px]">{props.texto}</h1>
            </div>
            <div className="border-r-2 border-black h-10">

            </div>
            <div className="flex flex-row gap-10 items-center">
                <p className="text-xl">R$ {props.valor}</p>
                <input type="button" value=">" className='bg-green-500 w-20 h-10 rounded-lg font-black border-2 border-black'></input>
            </div>
        </div>
    )
}