import NotaFiscal from "../components/Nota";

export default function PedidoContext() {
    const cliente = JSON.parse(localStorage.getItem('cliente'));
    const produtosSelecionados = JSON.parse(localStorage.getItem('produtosSelecionados')) || []; // Recupera os produtos
    const pagamento = JSON.parse(localStorage.getItem('pagamento')) || []; // Recupera o pagamento
    const dinheiro = JSON.parse(localStorage.getItem('dinheiro')) || 0; // Recupera o valor em dinheiro

    // Calcular o total dos produtos selecionados
    const calcularTotal = () => {
        return produtosSelecionados.reduce((acc, produto) => {
            return acc + (produto.valor * produto.quantidade);
        }, 0);
    };

    const totalProdutos = calcularTotal();
    
    // Calcular o troco
    const troco = dinheiro - totalProdutos;

    return (
        <div className="flex h-screen w-full justify-center items-center pl-[270px] pt-[68px]">
            <section className="border-2 border-black flex flex-col p-20 justify-center items-center text-center rounded-xl bg-gray-200 gap-4">
                {/* Renderizando o componente NotaFiscal */}
                <NotaFiscal cliente={cliente} produtos={produtosSelecionados} pagamento={pagamento} total={totalProdutos} troco={troco} />
            </section>
        </div>
    );
}
