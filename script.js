// script.js
document.addEventListener('DOMContentLoaded', () => {
    const transactionForm = document.getElementById('transactionForm');
    const transactionsList = document.getElementById('transactionsList');

    transactionForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(transactionForm);
        const amount = formData.get('amount');
        const type = formData.get('type');
        const category = formData.get('category');

        try {
            const response = await fetch('/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount, type, category })
            });

            if (!response.ok) {
                throw new Error('Failed to add transaction');
            }

            const transactionData = await response.json();
            console.log(transactionData);
            renderTransaction(transactionData);
        } catch (err) {
            console.error(err);
        }
    });

    async function fetchTransactions() {
        try {
            const response = await fetch('/transactions');
            const transactions = await response.json();
            transactionsList.innerHTML = '';
            transactions.forEach(transaction => renderTransaction(transaction));
        } catch (err) {
            console.error(err);
        }
    }

    function renderTransaction(transaction) {
        const transactionDiv = document.createElement('div');
        transactionDiv.classList.add('transaction');
        transactionDiv.innerHTML = `
            <p><strong>Amount:</strong> $${transaction.amount}</p>
            <p><strong>Type:</strong> ${transaction.type}</p>
            <p><strong>Category:</strong> ${transaction.category}</p>
            <p><strong>Date:</strong> ${new Date(transaction.date).toLocaleString()}</p>
        `;
        transactionsList.appendChild(transactionDiv);
    }

    fetchTransactions();
});
