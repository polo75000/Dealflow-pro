const MOCK = [
    { name: "SARL MécaPro", ca: 3200000, ebitda: 680000, credit_ready: true },
    { name: "SaaS CloudPro", ca: 1500000, ebitda: 420000, credit_ready: true }
];

document.getElementById('deals').innerHTML = MOCK.map(d => `
    <div class="deal-card">
        <h3>${d.name}</h3>
        <p>CA: €${d.ca.toLocaleString()} • EBITDA: €${d.ebitda.toLocaleString()}</p>
        <p style="color: ${d.credit_ready ? 'green' : 'red'}">${d.credit_ready ? '✅ LBO ready' : '❌ Pas prêt'}</p>
    </div>
`).join('');
