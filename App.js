
// Données réelles (mock)
const DEALS = [
    { id: 1, name: "SARL MécaPro", region: "Auvergne", sector: "Industrie", ca: 3200000, ebitda: 680000, credit_ready: true },
    { id: 2, name: "SaaS CloudPro", region: "Île-de-France", sector: "SaaS", ca: 1500000, ebitda: 420000, credit_ready: true }
];

// Menu mobile
document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('sideMenu').classList.toggle('open');
});

// Simulateur
function simulate() {
    const price = Number(document.getElementById('price').value);
    const ebitda = Number(document.getElementById('ebitda').value);
    const credit = price * 0.55;
    const coverage = ebitda / (credit / 60);
    document.getElementById('resultSim').innerHTML = `
        <p>Crédit vendeur: €${credit.toLocaleString()}</p>
        <p>Couverture cash flow: ${coverage.toFixed(1)}x</p>
    `;
}

// Filtres dynamiques
function filterDeals() {
    const region = document.getElementById('regionFilter').value;
    const sector = document.getElementById('sectorFilter').value;
    const filtered = DEALS.filter(d => 
        (region === "Région..." || d.region === region) && 
        (sector === "Secteur..." || d.sector === sector)
    );
    document.getElementById('deals').innerHTML = filtered.map(d => `
        <div class="deal-card">
            <h3>${d.name}</h3>
            <p>${d.region} • ${d.sector}</p>
            <p>CA: €${d.ca.toLocaleString()} • EBITDA: €${d.ebitda.toLocaleString()}</p>
            <button onclick="alert('Contactez-nous !')">📞 Contacter le vendeur</button>
        </div>
    `).join('');
}

// Affichage initial
filterDeals();
