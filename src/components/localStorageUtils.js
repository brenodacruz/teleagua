
export function updateLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value)); // Atualiza o valor no localStorage
    const event = new CustomEvent('localStorageUpdate', {
        detail: { key, value },
    });
    window.dispatchEvent(event); // Dispara o evento customizado
}
