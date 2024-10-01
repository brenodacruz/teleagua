import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import ClientesComp from "../components/ClientesComp";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Clientes() {
    const [clientes, setClientes] = useState([]); // Estado para armazenar os clientes
    const [loading, setLoading] = useState(true); // Estado para indicar se os dados estão sendo carregados
    const [selectedClienteId, setSelectedClienteId] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de busca

    useEffect(() => {
        // Função para buscar clientes da API
        const fetchClientes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/clientes'); // URL da API
                setClientes(response.data); // Atualiza o estado com os dados recebidos
                setLoading(false); // Indica que o carregamento foi concluído
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
                setLoading(false); // Indica que o carregamento foi concluído, mesmo em caso de erro
            }
        };

        fetchClientes(); // Chama a função para buscar os clientes
    }, []); // O array vazio faz com que o efeito seja executado apenas uma vez ao montar o componente

    // Função para excluir um cliente
    const deleteCliente = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este cliente?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/clientes/${id}`); // Chama a API para deletar o cliente
                // Atualiza a lista de clientes após a exclusão
                setClientes(clientes.filter(cliente => cliente.id !== id));
            } catch (error) {
                console.error("Erro ao deletar cliente:", error);
            }
        }
    };

    const handleClienteSelect = (id) => {
        setSelectedClienteId(id); // Atualiza o ID do cliente selecionado
    };

    // Filtra os clientes com base no termo de busca
    const filteredClientes = clientes.filter(cliente => 
        cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.telefone1.includes(searchTerm) || // Inclui telefone1
        (cliente.telefone2 && cliente.telefone2.includes(searchTerm)) || // Inclui telefone2 se existir
        (cliente.telefone3 && cliente.telefone3.includes(searchTerm)) // Inclui telefone3 se existir
    );

    return (
        <div className="flex flex-col h-screen w-full justify-start items-start pl-[270px] pt-[68px]">
            <div className="flex items-center border-2 border-black w-full h-10">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="mx-2" />
                <input
                    type="search"
                    placeholder="Busque por nome do cliente, endereço ou telefone"
                    className="flex-1 h-full border-none p-2"
                    value={searchTerm} // Vincula o valor do input ao estado
                    onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado quando o valor mudar
                />
            </div>
            <Link to='/cadastrarcliente' className="flex flex-row justify-between bg-gray-200 text-black w-full px-10 items-center gap-5 cursor-pointer hover:bg-gray-400 py-2">
                <h1>Cadastrar Novo Cliente (F6)</h1>
                <FontAwesomeIcon icon={faSquarePlus} />
            </Link>
            <div className="flex flex-row w-full bg-black text-white justify-between px-20">
                <h1 className="w-52px text-center">Nome:</h1>
                <h1 className="w-60px text-center">Endereço:</h1>
                <h1 className="w-[480px] text-center">Telefone:</h1>
            </div>
            
            {loading ? (
                <p>Carregando clientes...</p> // Mensagem de carregamento
            ) : (
                filteredClientes.map(cliente => (
                    <div key={cliente.id} onClick={() => handleClienteSelect(cliente.id)} className="w-full">
                        <ClientesComp 
                            id={cliente.id} // Passa o id do cliente para exclusão
                            nome={cliente.nome} 
                            endereço={cliente.endereco} 
                            telefone1={cliente.telefone1}
                            telefone2={cliente.telefone2}
                            telefone3={cliente.telefone3}
                            onDelete={deleteCliente} // Passa a função de exclusão como propriedade
                            isSelected={selectedClienteId === cliente.id}
                        />
                    </div>
                ))
            )}
        </div>
    );
}
