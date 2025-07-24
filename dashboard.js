const MOCK = [
    { name: "SARL MécaPro", region: "Auvergne", sector: "Industrie", ca: 3200000, ebitda: 680000, credit_ready: true },
    { name: "SaaS CloudPro", region: "IDF", sector: "Digital", ca: 1500000, ebitda: 420000, credit_ready: true }
];

function toggleMenu() {
    document.getElementById('menu').classList.toggle('hidden');
}

function simulate() {
    const price = Number(document.getElementById('price').value);
    const ebitda = Number(document.getElementById('ebitda').value);
    const credit = price * 0.55;
    const coverage = ebitda / (credit / 60);
    document.getElementById('result').innerHTML = `
        <p>Crédit vendeur: €${credit.toLocaleString()}</p>
        <p>Couverture cash flow: ${coverage.toFixed(1)}x</p>
    `;
}

document.getElementById('deals').innerHTML = MOCK.map(d => `
    <div class="deal-card">
        <h3>${d.name}</h3>
        <p>${d.region} • ${d.sector}</p>
        <p>CA: €${d.ca.toLocaleString()} • EBITDA: €${d.ebitda.toLocaleString()}</p>
        <p style="color: ${d.credit_ready ? 'green' : 'red'}">${d.credit_ready ? '✅ LBO ready' : '❌ Pas prêt'}</p>
    </div>
`).join('');
