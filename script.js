document.getElementById("simulateBtn")
    .addEventListener("click", calculateInvestment);

function calculateInvestment() {

    let initial = parseFloat(document.getElementById("initial").value) || 0;
    let monthly = parseFloat(document.getElementById("monthly").value) || 0;
    let annualRate = parseFloat(document.getElementById("returnRate").value) || 0;
    let years = parseInt(document.getElementById("years").value) || 0;

    if (years <= 0 || annualRate < 0) {
        alert("Please enter valid investment details.");
        return;
    }

    let monthlyRate = annualRate / 100 / 12;
    let totalMonths = years * 12;

    // ---- SIP Future Value ----
    let sipFutureValue = 0;

    if (monthlyRate === 0) {
        sipFutureValue = monthly * totalMonths;
    } else {
        sipFutureValue = monthly * 
            ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    }

    // ---- Lump Sum Future Value ----
    let lumpFutureValue = initial * 
        Math.pow(1 + monthlyRate, totalMonths);

    // ---- Year-wise Table ----
    let tableBody = document.getElementById("yearTable");
    tableBody.innerHTML = "";

    for (let year = 1; year <= years; year++) {

        let months = year * 12;

        let yearlySIP = monthly * 
            ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

        let yearlyInvested = monthly * months;

        let row = `
            <tr>
                <td>${year}</td>
                <td>₹ ${Math.round(yearlyInvested).toLocaleString()}</td>
                <td>₹ ${Math.round(yearlySIP).toLocaleString()}</td>
            </tr>
        `;

        tableBody.innerHTML += row;
    }

    // ---- Display Results ----
    document.getElementById("sipValue").innerText =
        "₹ " + Math.round(sipFutureValue).toLocaleString();

    document.getElementById("lumpValue").innerText =
        "₹ " + Math.round(lumpFutureValue).toLocaleString();
}

