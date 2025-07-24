// Clés API sandbox
const API_BASE = "https://api.pappers.fr/v2";
const API_KEY = "YOUR_SANDBOX_KEY"; // à remplacer

// Fonction principale
async function loadDeals() {
    const region = document.getElementById('regionFilter').value;
    const minCA = document.getElementById('minCA').value;
    const params = {
        api_token: API_KEY,
        par_page: 20,
        resultat_min: minCA || 100000,
        ...(region !== "Région..." && { region })
    };
    const res = await fetch(`${API_BASE}/recherche?${new URLSearchParams(params)}`);
    const data = await res.json();
    renderDeals(data.entreprises || []);
}

function renderDeals(deals) {
    document.getElementById('dealList').innerHTML = deals.map(d => `
        <div class="deal-card">
            <h3>${d.nom}</h3>
            <p>${d.region} • CA: €${d.chiffre_affaires?.toLocaleString()} • EBITDA: €${d.resultat?.toLocaleString()}</p>
            <button onclick="window.open('https://wa.me/33612345678?text=Bonjour%20j%27ai%20vu%20votre%20annonce%20sur%20DealFlow%20Pro')">📞 Contacter</button>
        </div>
    `).join('');
}

function simulate() {
    const price = Number(document.getElementById('price').value);
    const ebitda = Number(document.getElementById('ebitda').value);
    const credit = price * 0.55;
    const coverage = ebitda / (credit / 60);
    document.getElementById('resultSim').innerHTML = `
        <p>Crédit vendeur: €${credit.toLocaleString()}</p>
        <p>Couverture cash flow: ${coverage.toFixed(1)}x</p>
        <p>${coverage >= 1.4 ? '✅ LBO ready' : '❌ Pas prêt'}</p>
    `;
}

loadDeals();
