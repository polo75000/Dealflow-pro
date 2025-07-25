
/* Menu mobile */
function toggleMenu() {
  document.getElementById('sideMenu').classList.toggle('open');
}

/* API backend */
async function loadDeals() {
  document.getElementById('dealList').innerHTML = "Chargement...";
  const region = document.getElementById('regionFilter').value;
  const minCA = document.getElementById('minCA').value;
  try {
    const res = await fetch('/.netlify/functions/get-deals');
    const data = await res.json();
    renderDeals(data);
  } catch {
    // Mode démo si API indisponible
    renderDeals([
      { nom: "SARL Industrie", region: "Île-de-France", chiffre_affaires: 3200000, resultat: 680000 }
    ]);
  }
}

function renderDeals(deals) {
  document.getElementById('dealList').innerHTML = deals.map(d => `
    <div class="deal-card">
      <h3>${d.nom}</h3>
      <p>${d.region} • CA: €${d.chiffre_affaires?.toLocaleString()} • EBITDA: €${d.resultat?.toLocaleString()}</p>
      <button onclick="window.open('https://wa.me/+33600000000?text=Bonjour%20j%27ai%20vu%20votre%20annonce')">📞 Contacter</button>
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
