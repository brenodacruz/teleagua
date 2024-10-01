import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useState } from "react"; // Importa useState

export default function CadastrarCliente() {
    // Cria um estado para armazenar os dados do cliente
    const [cliente, setCliente] = useState({
        nome: '',
        endereco: '',
        telefone1: '',
        telefone2: '',
        telefone3: ''
    });

    // Função para lidar com a mudança nos campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita o comportamento padrão do formulário

        try {
            const response = await fetch('http://localhost:5000/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cliente),
            });

            if (response.ok) {
                // Se o cadastro foi bem-sucedido, pode redirecionar ou mostrar uma mensagem
                alert('Cliente cadastrado com sucesso!');
                // Limpa os campos após o cadastro
                setCliente({
                    nome: '',
                    endereco: '',
                    telefone1: '',
                    telefone2: '',
                    telefone3: ''
                });
            } else {
                // Se houver erro, mostra a mensagem de erro
                const error = await response.text();
                alert(`Erro ao cadastrar cliente: ${error}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro ao cadastrar cliente.');
        }
    };

    return (
        <div className="flex flex-col h-screen w-full justify-center items-center pl-[270px] pt-[68px] gap-10 bg-gray-300">
            <h1 className="text-5xl font-black">Cadastrar Cliente:</h1>
            <section className="flex flex-col gap-5">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <Input placeholder="Nome" type="text" name="nome" value={cliente.nome} onChange={handleChange} />
                    <Input placeholder="Endereço" type="text" name="endereco" value={cliente.endereco} onChange={handleChange} />
                    <Input placeholder="Celular" type="text" name="telefone1" value={cliente.telefone1} onChange={handleChange} />
                    <Input placeholder="Celular 2 (Opcional)" type="text" name="telefone2" value={cliente.telefone2} onChange={handleChange} />
                    <Input placeholder="Celular 3 (Opcional)" type="text" name="telefone3" value={cliente.telefone3} onChange={handleChange} />

                    <section className="flex flex-row justify-center items-center gap-5">
                        <input type="submit" value="Cadastrar" className="rounded-xl bg-green-400 px-5 py-2 cursor-pointer hover:bg-green-500" />
                        <Link to={'/produtos'}>
                            <input type="button" value="Cancelar" className="rounded-xl bg-red-400 px-5 py-2 cursor-pointer hover:bg-red-500" />
                        </Link>
                    </section>
                </form>
            </section>
        </div>
    );
}
