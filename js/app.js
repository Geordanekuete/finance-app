document.getElementById('finance-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const type = document.getElementById('type').value;
    const amount = parseFloat(document.getElementById('amount').value);
    addFinanceData(type, amount);
    updateChart();
    updateRecommendations();
});

const financeData = {
    income: [],
    expense: []
};

function addFinanceData(type, amount) {
    if (type === 'income') {
        financeData.income.push(amount);
    } else {
        financeData.expense.push(amount);
    }
}

function updateChart() {
    const ctx = document.getElementById('finance-chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Revenus', 'Dépenses'],
            datasets: [{
                label: 'Montant',
                data: [sum(financeData.income), sum(financeData.expense)],
                backgroundColor: ['#28a745', '#dc3545'],
                borderColor: ['#28a745', '#dc3545'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function sum(arr) {
    return arr.reduce((a, b) => a + b, 0);
}

function updateRecommendations() {
    const recommendations = document.getElementById('recommendations');
    const income = sum(financeData.income);
    const expense = sum(financeData.expense);
    
    let advice = '';
    if (income > expense) {
        advice = 'Bravo ! Vous avez un budget positif. Pensez à investir ou à épargner vos excédents.';
    } else {
        advice = 'Attention, vos dépenses dépassent vos revenus. Considérez de réduire certaines dépenses ou d\'augmenter vos revenus.';
    }
    
    recommendations.textContent = advice;
}
