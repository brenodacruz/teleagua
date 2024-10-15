import React from 'react';

export default function NotaFiscal({ cliente, produtos, pagamento }) {
    const handleImprimir = () => {
        window.print(); // Chama a função de impressão do navegador
    };

    return (
        <div className="nota">
            <h1>Nota Fiscal</h1>
            <h2>Cliente</h2>
            {cliente ? (
                <div>
                    <p><strong>Nome:</strong> {cliente.nome}</p>
                    <p><strong>Endereço:</strong> {cliente.endereco}</p>
                    <p><strong>Telefone 1:</strong> {cliente.telefone1}</p>
                    {cliente.telefone2 && <p><strong>Telefone 2:</strong> {cliente.telefone2}</p>}
                    {cliente.telefone3 && <p><strong>Telefone 3:</strong> {cliente.telefone3}</p>}
                </div>
            ) : (
                <p>Nenhum cliente selecionado.</p>
            )}
            
            <h2>Produtos Selecionados</h2>
            {produtos.length > 0 ? (
                produtos.map(produto => (
                    <div key={produto.id}>
                        <p>{produto.nome} - Quantidade: {produto.quantidade}</p>
                    </div>
                ))
            ) : (
                <p>Nenhum produto selecionado.</p>
            )}

            <h2>Forma de Pagamento</h2>
            {pagamento ? (
                <p>{pagamento}</p>
            ) : (
                <p>Nenhuma forma de pagamento selecionada.</p>
            )}

            <button onClick={handleImprimir} className="imprimir">
                Imprimir Nota
            </button>

            <style jsx>{`
                .nota {
                    padding: 20px;
                    border: 1px solid #000;
                    width: 8cm; /* Tamanho da nota */
                    margin: 0 auto;
                    text-align: left;
                    font-family: Arial, sans-serif;
                    position: relative;
                }
                .imprimir {
                    margin-top: 20px;
                    background-color: #000;
                    color: #fff;
                    border: none;
                    padding: 10px;
                    cursor: pointer;
                }

                @media print {
                    body * {
                        visibility: hidden; /* Oculta todo o conteúdo da página */
                    }
                    .nota, .nota * {
                        visibility: visible; /* Apenas a nota e seus elementos são visíveis */
                    }
                    .nota {
                        position: absolute; /* Garante que a nota ocupe toda a área visível na impressão */
                        top: 0;
                        left: 0;
                        width: 8cm; /* Largura da nota */
                    }
                }
            `}</style>
        </div>
    );
}
