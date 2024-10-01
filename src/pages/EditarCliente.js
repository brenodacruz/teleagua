import { Link, useParams, useNavigate } from "react-router-dom"; // Importar useNavigate
import Input from "../components/Input";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function EditarCliente() {
    const { id } = useParams();
    const navigate = useNavigate(); // Usar useNavigate para redirecionamento
    const [cliente, setCliente] = useState({
        nome: '',
        endereco: '',
        telefone1: '',
        telefone2: '',
        telefone3: ''
    });

    // Função para buscar os dados do cliente
    const fetchCliente = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/clientes/${id}`);
            setCliente(response.data);
        } catch (error) {
            console.error("Erro ao buscar dados do cliente:", error);
        }
    };

    useEffect(() => {
        fetchCliente();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCliente(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:5000/clientes/${id}`, cliente);
            alert("Cliente atualizado com sucesso!");
            navigate('/clientes'); // Redireciona para a tela /clientes após a atualização
        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
            alert("Erro ao atualizar cliente.");
        }
    };

    return (
        <div className="flex flex-col h-screen w-full justify-center items-center pl-[270px] pt-[68px] gap-10 bg-gray-300">
            <h1 className="text-5xl font-black">Editar Cliente:</h1>
            <section className="flex flex-col gap-5">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <Input placeholder="Nome" type="text" name="nome" value={cliente.nome} onChange={handleChange} />
                    <Input placeholder="Endereço" type="text" name="endereco" value={cliente.endereco} onChange={handleChange} />
                    <Input placeholder="Celular" type="text" name="telefone1" value={cliente.telefone1} onChange={handleChange} />
                    <Input placeholder="Celular 2 (Opcional)" type="text" name="telefone2" value={cliente.telefone2} onChange={handleChange} />
                    <Input placeholder="Celular 3 (Opcional)" type="text" name="telefone3" value={cliente.telefone3} onChange={handleChange} />

                    <section className="flex flex-row justify-center items-center gap-5">
                        <input type="submit" value="Confirmar" className="rounded-xl bg-green-400 px-5 py-2 cursor-pointer hover:bg-green-500" />
                        <Link to={'/clientes'}>
                            <input type="button" value="Cancelar" className="rounded-xl bg-red-400 px-5 py-2 cursor-pointer hover:bg-red-500" />
                        </Link>
                    </section>
                </form>
            </section>
        </div>
    );
}
