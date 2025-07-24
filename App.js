
// Clés API sandbox (gratuites)
const PAPPERS_KEY = "votre_cle_pappers";
const API_BASE = "https://api.pappers.fr/v2";

// Données dynamiques
async function loadDeals() {
    document.getElementById('dealList').innerHTML = "Chargement...";
    try {
        const params = {
            api_token: PAPPERS_KEY,
            par_page: 10,
            resultat_min: 300000
        };
        const res = await fetch(`${API_BASE}/recherche?${new URLSearchParams(params)}`);
        const data = await res.json();
        renderDeals(data.entreprises || []);
    } catch (e) {
        // Mode démo si API indisponible
        renderDeals([
            { nom: "SARL MécaPro", region: "Auvergne", chiffre_affaires: 3200000, resultat: 680000 },
            { nom: "SaaS CloudPro", region: "IDF", chiffre_affaires: 1500000, resultat: 420000 }
        ]);
    }
}

function renderDeals(deals) {
    document.getElementById('dealList').innerHTML = deals.map(d => `
        <div class="deal-card">
            <h3>${d.nom}</h3>
            <p>${d.region} • CA: €${d.chiffre_affaires.toLocaleString()} • EBITDA: €${d.resultat.toLocaleString()}</p>
            <button onclick="contactVendeur('${d.siren || d.id}')">📞 Contacter</button>
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
    `;
}

function contactVendeur(id) {
    alert(`Contact pour SIREN: ${id}`);
}

loadDeals();
