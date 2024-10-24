import axios from 'axios';

export const handleImprimir = async (cliente) => { // Recebe o cliente como parâmetro
    const today = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato yyyy-mm-dd
    try {
        await axios.put(`http://localhost:5000/clientes/${cliente.id}`, {
            ...cliente, // Envia os dados do cliente
            data_ultima_compra: today // Atualiza a data da última compra com a data de hoje
        });
        console.log('Data de última compra atualizada com sucesso.');
    } catch (error) {
        console.error('Erro ao atualizar data da última compra:', error);
    }
    
    window.print(); // Chama a função de impressão do navegador
};
