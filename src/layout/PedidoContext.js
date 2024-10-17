import NotaFiscal from "../components/Nota";

export default function PedidoContext() {
    const cliente = JSON.parse(localStorage.getItem('cliente'));
    const produtosSelecionados = JSON.parse(localStorage.getItem('produtosSelecionados')) || []; // Recupera os produtos
    const pagamento = JSON.parse(localStorage.getItem('pagamento')) || []; // Recupera o pagamento

    // Calcular o total dos produtos selecionados
    const calcularTotal = () => {
        return produtosSelecionados.reduce((acc, produto) => {
            return acc + (produto.valor * produto.quantidade);
        }, 0);
    };

    const totalProdutos = calcularTotal();

    return (
        <div className="flex h-screen w-full justify-center items-center pl-[270px] pt-[68px]">
            <section className="border-2 border-black flex flex-col p-20 justify-center items-center text-center rounded-xl bg-gray-200 gap-4">
                <h1>Cliente Selecionado</h1>
                {cliente ? (
                    <div>
                        <p>Nome: {cliente.nome}</p>
                        <p>Endereço: {cliente.endereco}</p>
                        <p>Telefone 1: {cliente.telefone1}</p>
                        {cliente.telefone2 && <p>Telefone 2: {cliente.telefone2}</p>}
                        {cliente.telefone3 && <p>Telefone 3: {cliente.telefone3}</p>}
                    </div>
                ) : (
                    <p>Nenhum cliente selecionado.</p>
                )}

                <h1>Produtos Selecionados:</h1>
                {produtosSelecionados.length > 0 ? (
                    produtosSelecionados.map(produto => (
                        <div key={produto.id}>
                            <p>{produto.nome} - Quantidade: {produto.quantidade} - Valor: R$ {produto.valor.toFixed(2).replace(".", ",")}</p>
                        </div>
                    ))
                ) : (
                    <p>Nenhum produto selecionado.</p>
                )}

                <h1>Total dos Produtos: R$ {totalProdutos.toFixed(2).replace(".", ",")}</h1>

                <h1>Forma de Pagamento</h1>
                {pagamento ? (
                    <div>
                        <p>{pagamento}</p>
                    </div>
                ) : (
                    <p>Nenhuma forma de pagamento selecionada.</p>
                )}

                {/* Renderizando o componente NotaFiscal */}
                <NotaFiscal cliente={cliente} produtos={produtosSelecionados} pagamento={pagamento} total={totalProdutos} />
            </section>
        </div>
    );
}
