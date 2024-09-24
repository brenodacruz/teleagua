export default function Finalizar(){
    return(
        <div className="flex h-screen w-full justify-center items-center pl-[270px] pt-[68px]">
            <section className="border-2 border-black flex flex-col p-20 justify-center items-center text-center rounded-xl bg-gray-200 gap-4">
                <h1 className="text-7xl">Finalizar pedido!</h1>
                <p>Para salvar o pedido aperte F10 ou clique no botão verde abaixo,<br/> para cancelar pedido e voltar para a página inicial clique no botão vermelho abaixo:</p>
                <div className="flex flex-row gap-5">
                    <input type="button" value="Salvar Pedido (F10)" className="rounded-xl py-2 px-10 bg-green-600 border-black border-2 text-white cursor-pointer w-52"></input>
                    <input type="button" value="Cancelar Pedido" className="rounded-xl py-2 px-10 bg-red-600 border-black border-2 text-white cursor-pointer w-52"></input>
                </div>
            </section>

        </div>
    )
}