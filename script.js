// Your existing riskData and riskMessages arrays go here

function createRiskTable() {
      // ... (your existing createRiskTable function)
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Risk Category</th>
        <th>Risk Level 1</th>
        <th>Risk Level 2</th>
        <th>Risk Level 3</th>
        <th>Risk Level 4</th>
        <th>Risk Score</th>
        <th></th>
      </tr>
    </thead>
    <tbody id="riskTableBody"></tbody>
  `;
  
  const tbody = table.querySelector('#riskTableBody');
  riskData.forEach(item => {
    const row = document.createElement('tr');
    row.className = 'risk-row';
    row.innerHTML = `
      <td>${item.category}</td>
      ${item.levels.map(level => `
        <td>
          <input type="checkbox" data-score="${level.value}">
          ${level.description}
        </td>
      `).join('')}
      <td class="risk-score">0</td>
      <td><button class="expand-btn">+</button></td>
    `;
    tbody.appendChild(row);

    // Create expandable row
    const expandableRow = document.createElement('tr');
    expandableRow.className = 'expandable-row';
    expandableRow.style.display = 'none';
    expandableRow.innerHTML = `
      <td colspan="7">
        <div class="expandable-content">
          <h4>${item.category} - Additional Information</h4>
          <ul>
            ${item.levels.map(level => `
              <li><strong>${level.description}</strong>: 
                ${level.additionalInfo || 'No additional information available.'}
              </li>
            `).join('')}
          </ul>
        </div>
      </td>
    `;
    tbody.appendChild(expandableRow);
  });

  return table;

}

function toggleExpandRow(button) {
  // ... (your existing toggleExpandRow function)
  const row = button.closest('tr');
  const expandableRow = row.nextElementSibling;
  if (expandableRow.style.display === 'none') {
    expandableRow.style.display = 'table-row';
    button.textContent = '-';
  } else {
    expandableRow.style.display = 'none';
    button.textContent = '+';
  }

}

function updateRiskScore() {
    const rows = document.querySelectorAll('#riskTableBody tr.risk-row');
    let totalScore = 0;
    const selectedRisks = [];
  
    rows.forEach((row, index) => {
      const checkboxes = row.querySelectorAll('input[type="checkbox"]');
      const scoreCell = row.querySelector('.risk-score');
      let rowScore = 0;
  
      checkboxes.forEach((checkbox, level) => {
        if (checkbox.checked) {
          rowScore = parseInt(checkbox.dataset.score);
          selectedRisks.push({ category: riskData[index].category, level: level });
        }
      });
  
      scoreCell.textContent = rowScore;
      totalScore += rowScore;
    });
  
    document.getElementById('totalRiskScore').textContent = totalScore;
    updateRiskSummary(selectedRisks);
    updateRiskBar(totalScore);
  
    // Add this line for debugging
    console.log('Total Score:', totalScore, 'Selected Risks:', selectedRisks);
  }

function updateRiskSummary(selectedRisks) {
  // ... (your existing updateRiskSummary function)
  const summaryList = document.getElementById('riskSummary');
      summaryList.innerHTML = '';

      riskMessages.forEach(riskMessage => {
        if (riskMessage.condition(selectedRisks)) {
          const listItem = document.createElement('li');
          listItem.textContent = riskMessage.message;
          listItem.style.color = 'red';
          summaryList.appendChild(listItem);
        }
      });

      if (summaryList.children.length === 0) {
        summaryList.innerHTML = '<li>No specific risk combinations detected.</li>';
      }

}

function updateRiskBar(totalScore) {
  // ... (your existing updateRiskBar function)
  const riskIndicator = document.getElementById('riskIndicator');
      let color, width;

      if (totalScore <= 49) {
        color = 'green';
        width = (totalScore / 49) * 25;
      } else if (totalScore <= 129) {
        color = 'blue';
        width = 25 + ((totalScore - 50) / 79) * 25;
      } else if (totalScore <= 235) {
        color = 'orange';
        width = 50 + ((totalScore - 130) / 105) * 25;
      } else {
        color = 'red';
        width = 75 + ((totalScore - 236) / 33) * 25;
      }

      riskIndicator.style.backgroundColor = color;
      riskIndicator.style.width = `${Math.min(width, 100)}%`;

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