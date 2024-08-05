// Your existing riskData and riskMessages arrays go here

function createRiskTable() {
    // Your existing createRiskTable function
}

function toggleExpandRow(button) {
    // Your existing toggleExpandRow function
}

function updateRiskScore() {
    // Your existing updateRiskScore function
}

function updateRiskSummary(selectedRisks) {
    // Your existing updateRiskSummary function
}

function updateRiskBar(totalScore) {
    // Your existing updateRiskBar function
}

function initializeApp() {
    const app = document.getElementById('app');
    app.innerHTML = ''; // Clear existing content
    app.appendChild(createRiskTable());

    const totalScoreElement = document.createElement('h2');
    totalScoreElement.innerHTML = 'Total Risk Score: <span id="totalRiskScore">0</span>';
    app.appendChild(totalScoreElement);

    const summaryElement = document.createElement('div');
    summaryElement.innerHTML = '<h3>Summary of Selected Risks</h3><ul id="riskSummary"></ul>';
    app.appendChild(summaryElement);

    // Set current date
    const currentDate = new Date().toLocaleDateString();
    document.getElementById('currentDate').textContent = currentDate;

    document.querySelectorAll('#riskTableBody input[type=checkbox]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const row = e.target.closest('tr');
            const checkboxes = row.querySelectorAll('input[type=checkbox]');
            checkboxes.forEach(cb => {
                if (cb !== e.target) cb.checked = false;
            });
            updateRiskScore();
        });
    });

    document.querySelectorAll('.expand-btn').forEach(button => {
        button.addEventListener('click', () => toggleExpandRow(button));
    });

    document.getElementById('saveButton').addEventListener('click', sendPdf);

    // Initialize the risk score
    updateRiskScore();
}

function generateStaticHtml() {
    // Your existing generateStaticHtml function
}

function sendPdf() {
    const staticHtml = generateStaticHtml();
    const date = new Date().toISOString().split('T')[0];
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const pdfName = `Risk_Matrix_${userName}_${date}.pdf`;

    fetch('/send-pdf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            html: staticHtml,
            fileName: pdfName,
            userEmail: userEmail,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('PDF sent successfully to your email!');
            } else {
                alert('Error sending PDF. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error sending PDF. Please try again.');
        });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('content').style.display = 'block';
    initializeApp();
});