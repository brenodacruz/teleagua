import React from 'react';

export default function NotaFiscal({ cliente, produtos, pagamento, total, troco }) {
    const handleImprimir = () => {
        window.print(); // Chama a função de impressão do navegador
    };

    return (
        <div className="container">
            <div className="nota flex flex-col items-start w-full h-full text-3xl hidden-impressao">
                <header className='font-bold flex flex-col justify-center items-center w-full'>
                    <h1>COMPROVANTE DO PEDIDO</h1>
                    <h1>TELE-AGUA MINERAL</h1>
                    <h2>Vicente Risola 834 - Santa Inês</h2>
                    <h2>CNPJ: 52.642.660/0001-70</h2>
                </header>
                <p className="my-5">____________________________________________</p>

                <div className='flex flex-col items-start w-full'>
                    {cliente ? (
                            <div>
                                <p><strong>Cliente:</strong> {cliente.nome}</p>
                                <p><strong>Telefone 1:</strong> {cliente.telefone1}</p>
                                {cliente.telefone2 && <p><strong>Telefone 2:</strong> {cliente.telefone2}</p>}
                            </div>
                    ) : (
                        <p>Nenhum cliente selecionado.</p>
                    )}
                </div>
                <p className="my-5">____________________________________________</p>

                <div className='flex flex-col items-start'>
                    <h2 className='font-bold'>Produtos Selecionados:</h2>
                    {produtos.length > 0 ? (
                        produtos.map(produto => (
                            <div key={produto.id}>
                                <p className='mt-4 text-3xl'>{produto.nome} / Quantidade: {produto.quantidade} / Valor: R$ {produto.valor.toFixed(2).replace(".", ",")}</p>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum produto selecionado.</p>
                    )}
                </div>

                <p className="my-5">____________________________________________</p>
                <div className='flex flex-row items-start gap-56 w-full'>
                    <section>
                        <h2 className='font-bold'>Forma de Pagamento:</h2>
                        {pagamento ? (
                            <div>
                                <p className='font-bold'>{pagamento}</p>
                                <p>Total: R$ {total.toFixed(2).replace(".", ",")}</p>
                                {pagamento === 'Dinheiro' && troco > 0 ? (<p>Troco: R$ {troco.toFixed(2).replace(".", ",")}</p> ) : (<p></p>)}
                            </div>
                        ) : (
                            <p>Nenhuma forma de pagamento selecionada.</p>
                        )}
                    </section>
                    {pagamento === 'Pix' ?(<section><img src='/img/qrcode-pix.png' className='w-40'></img></section>) : (<p></p>)}
                </div>
                <p className="my-5">____________________________________________</p>
                <div className='flex flex-col items-center w-full gap-4'>
                    <h1>Endereço:</h1>
                    <h1 className='font-bold w-auto text-[100%] items-center text-center'>{cliente.endereco}</h1>
                </div>
            </div>

            <div><h1>Teste</h1></div>
            <button onClick={handleImprimir} className="imprimir">
                Imprimir Nota
            </button>

            <style jsx>{`
                .nota {
                    padding: 20px;
                    width: 100%;
                    height: 100%;
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

                /* Esconde a nota na visualização normal */
                .hidden-impressao {
                    display: none;
                }

                @media print {
                    @page {
                        size: auto;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                    }
                    body * {
                        visibility: hidden;
                    }
                    .nota, .nota * {
                        visibility: visible;
                    }
                    .nota {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100vw;
                        height: 100vh;
                    }
                    .imprimir {
                        display: none;
                    }

                    /* Mostra a nota apenas na impressão */
                    .hidden-impressao {
                        display: block;
                    }
                }
            `}</style>
        </div>
    );
}
