
/* Menu mobile */
function toggleMenu() {
  document.getElementById('sideMenu').classList.toggle('open');
}

/* Appel backend API */
async function loadDeals() {
  document.getElementById('dealList').innerHTML = "Chargement...";
  const res = await fetch('/.netlify/functions/get-deals');
  const data = await res.json();
  document.getElementById('dealList').innerHTML = data.map(d => `
    <div class="deal-card">
      <h3>${d.nom}</h3>
      <p>${d.region} • CA: €${d.chiffre_affaires?.toLocaleString()} • EBITDA: €${d.resultat?.toLocaleString()}</p>
      <button onclick="window.open('https://wa.me/+33600000000?text=Bonjour%20j%27ai%20vu%20votre%20annonce')">📞 Contacter</button>
    </div>
  `).join('');
}

/* Simulateur LBO */
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
