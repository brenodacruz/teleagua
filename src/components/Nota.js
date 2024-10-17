import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleImprimir } from '../components/Impressao'; 

export default function NotaFiscal({ cliente, produtos, pagamento, total, troco }) {
    const navigate = useNavigate();

    const handleCancelar = () => {
        navigate('/');
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
                                {pagamento === 'Dinheiro' && troco > 0 ? (<p>Troco: R$ {troco.toFixed(2).replace(".", ",")}</p>) : (<p></p>)}
                            </div>
                        ) : (
                            <p>Nenhuma forma de pagamento selecionada.</p>
                        )}
                    </section>
                    {pagamento === 'Pix' ? (<section><img src='/img/qrcode-pix.png' alt='qrcode' className='w-40'></img></section>) : (<p></p>)}
                </div>
                <p className="my-5">____________________________________________</p>
                <div className='flex flex-col items-center w-full gap-4'>
                    <h1>Endereço:</h1>
                    <h1 className='font-bold w-auto text-[100%] items-center text-center'>{cliente.endereco}</h1>
                </div>
            </div>

            <section className='flex flex-col gap-5'>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-6xl font-bold'>Finalizar Pedido</h1>
                    <p>Para finalizar o pedido e imprimir a notinha só clicar no botão verde abaixo ou apertar a tecla "Enter"<br /> e para cancelar pedido basta apertar na tecla vermelha ou apertar a tecla "Esc"</p>
                </div>
                <div className='flex felx-row gap-5 justify-center'>
                    <button onClick={handleImprimir} className="imprimir w-32 bg-green-400 px-5 py-2 rounded-xl">Imprimir Nota</button>
                    <button onClick={handleCancelar} className="w-32 bg-red-400 px-5 py-2 rounded-xl">Cancelar</button>
                </div>
            </section>

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
