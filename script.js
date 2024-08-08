// Your riskData and riskMessages arrays go here
const riskData = [
    // ... (your existing riskData array)
    {
      category: "Crew Composition",
      levels: [
        {
          value: 0,
          description: "Native Language",
          additionalInfo: "No communication problems"
        },
        {
          value: 15,
          description: "Other Language",
          additionalInfo: "Common language, other than native language"
        },
        {
          value: 40,
          description: "With Interpreter",
          additionalInfo:
            "Communication only possible with interpreter onboard for translation"
        },
        {
          value: 50,
          description: "Interpreter+1st Flight",
          additionalInfo:
            "First flight with trainee and interpreter. Communication only possible with interpreter onboard for translation"
        }
      ]
    },
    {
      category: "Flight Ops Difficulty",
      levels: [
        { value: 0, description: "Low", additionalInfo: "Navigation (VFR/IFR)" },
        {
          value: 15,
          description: "Normal",
          additionalInfo: "Various landings without emergencies"
        },
        {
          value: 35,
          description: "Medium",
          additionalInfo: "Specific training (Hoist, Swing, Fire Fighting)"
        },
        {
          value: 45,
          description: "High",
          additionalInfo:
            "Emergency procedure single or multi-engine. NVG, MHSD, SAR"
        }
      ]
    },
    {
      category: "Flight Ops Importance",
      levels: [
        {
          value: 0,
          description: "Low",
          additionalInfo:
            "Trainig on time, flight can be cancelled without any negative training impact."
        },
        {
          value: 15,
          description: "Normal",
          additionalInfo:
            "Training on time, flight could be cancelled with some impacts."
        },
        {
          value: 35,
          description: "Medium",
          additionalInfo:
            "Flight to be achieved due to personal contstraints (duty period, flight time, other training planned.)"
        },
        {
          value: 45,
          description: "High",
          additionalInfo:
            "Flight to be achieved due to external constraints (Environment, orgnisation or customer pressure.)"
        }
      ]
    },
    {
      category: "Flight Ops Pilot(s) Experience Status",
      levels: [
        {
          value: 0,
          description: "High Experience",
          additionalInfo: "over 500 hours on type or 1000h total flight time."
        },
        {
          value: 15,
          description: "Some Experience",
          additionalInfo:
            "over 100 hours on type or total flight time between 500 and 1000 hours"
        },
        {
          value: 30,
          description: "Low Experience",
          additionalInfo:
            "Below 50 hours flight time on type or flight time between 100 and 500 hours"
        },
        {
          value: 40,
          description: "Unfamiliar",
          additionalInfo:
            "No flight time on type (First flight on this aircraft type or total flight time below 1000 hours)"
        }
      ]
    },
    {
      category: "Flight Ops Crew Duty Status",
      levels: [
        {
          value: 0,
          description: "Excellent",
          additionalInfo: "First flight of the day, but not in the evening/night."
        },
        {
          value: 15,
          description: "Normal",
          additionalInfo: "Duty period <5 hours and <2 flight hours"
        },
        {
          value: 25,
          description: "Below Normal",
          additionalInfo:
            "Duty period >5 hours and < 10 hours or flight hours > 2hours and < 4 hours"
        },
        {
          value: 35,
          description: "Fatigue",
          additionalInfo: "Duty period >10 hours or >4  flight hours"
        }
      ]
    },
    {
      category: "PIC Duty Status",
      levels: [
        {
          value: 0,
          description: "Excellent",
          additionalInfo: "First flight of the day, but not in the evening/night."
        },
        {
          value: 15,
          description: "Normal",
          additionalInfo: "Duty period <6 hours and <4 flight hours"
        },
        {
          value: 20,
          description: "Below Normal",
          additionalInfo: "Duty period >6 hours and <10 hours or >4  flight hours"
        },
        {
          value: 30,
          description: "Fatigue",
          additionalInfo: "Duty period >10 hours or >6  flight hours"
        }
      ]
    },
    {
      category: "Operating Area",
      levels: [
        {
          value: 0,
          description: "Expert",
          additionalInfo:
            "Most of your flight are done in this area, you do not need map to navigate."
        },
        {
          value: 10,
          description: "Familiar",
          additionalInfo:
            "It is not your local area but you have done several flights and the environment is familiar."
        },
        {
          value: 20,
          description: "Unfamiliar",
          additionalInfo:
            "You are not familiar but it is not the first flight in this area."
        },
        {
          value: 25,
          description: "First time",
          additionalInfo: "First flight in this area."
        }
      ]
    },
    {
      category: "Airspace Traffic Status",
      levels: [
        { value: 0, description: "IFR Traffic" },
        { value: 10, description: "VFR-Low Traffic" },
        { value: 20, description: "VFR-Medium Traffic" },
        { value: 25, description: "VFR-High Traffic" }
      ]
    },
    {
      category: "Weather/NOTAMS",
      levels: [
        { value: 0, description: "Not a Factor" },
        { value: 10, description: "Partly a Factor" },
        { value: 15, description: "Mostly a Factor" },
        { value: 20, description: "A Factor" }
      ]
    },
    {
      category: "Day / Night",
      levels: [
        { value: 0, description: "Day" },
        { value: 10, description: "Dawn/Dusk" },
        { value: 15, description: "Night Unaided" },
        { value: 20, description: "Night unaided" }
      ]
    },
    {
      category: "Helicopter Status",
      levels: [
        {
          value: 0,
          description: "Excellent",
          additionalInfo: "CDN + Logbook + No technical limitation"
        },
        {
          value: 10,
          description: "Normal",
          additionalInfo:
            "CDN + Logbook + Good condition, or only a few minor technical limitations"
        },
        {
          value: 15,
          description: "With Constraints",
          additionalInfo:
            "CDN + Logbook + not normal aircraft state, major technical limitations"
        },
        {
          value: 20,
          description: "Unknown",
          additionalInfo: "CDN only or not fitted for the training"
        }
      ]
    }
  ];
  
  const riskMessages = [
    // ... (your existing riskMessages array)
    {
      condition: (selectedRisks) =>
        selectedRisks.some(
          (risk) => risk.category === "Crew Composition" && risk.level === 3
        ) &&
        selectedRisks.some(
          (risk) => risk.category === "Flight Ops Difficulty" && risk.level === 3
        ) &&
        selectedRisks.some(
          (risk) => risk.category === "Weather/NOTAMS" && risk.level === 2
        ),
      message: "NOGO\nIP workload is high - Too High Risk."
    },
    {
      condition: (selectedRisks) =>
        selectedRisks.some(
          (risk) => risk.category === "Crew Composition" && risk.level === 3
        ) &&
        selectedRisks.some(
          (risk) => risk.category === "Operating Area" && risk.level === 3
        ) &&
        selectedRisks.some(
          (risk) => risk.category === "Weather/NOTAMS" && risk.level === 2
        ),
      message: "NOGO\nIP workload is high - Too High Risk!"
    },
    {
      condition: (selectedRisks) =>
        selectedRisks.some(
          (risk) => risk.category === "PIC Duty Status" && risk.level === 3
        ),
      message: "NOGO\nFatigue status too high!."
    }
  ];
  
  // Your riskData and riskMessages arrays go here
  
  // Your riskData and riskMessages arrays remain unchanged
  
  function createRiskTable() {
    const table = document.createElement("table");
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
  
    const tbody = table.querySelector("#riskTableBody");
    riskData.forEach((item) => {
      const row = document.createElement("tr");
      row.className = "risk-row";
      row.innerHTML = `
        <td>${item.category}</td>
        ${item.levels
          .map(
            (level) => `
          <td>
            <label>
              <input type="checkbox" data-score="${level.value}">
              ${level.description}
            </label>
          </td>
        `
          )
          .join("")}
        <td class="risk-score">0</td>
        <td><button class="expand-btn">+</button></td>
      `;
      tbody.appendChild(row);
  
      const expandableRow = document.createElement("tr");
      expandableRow.className = "expandable-row";
      expandableRow.style.display = "none";
      expandableRow.innerHTML = `
        <td colspan="7">
          <div class="expandable-content">
            <h4>${item.category} - Additional Information</h4>
            <ul>
              ${item.levels
                .map(
                  (level) => `
                <li><strong>${level.description}</strong>: 
                  ${
                    level.additionalInfo || "No additional information available."
                  }
                </li>
              `
                )
                .join("")}
            </ul>
          </div>
        </td>
      `;
      tbody.appendChild(expandableRow);
    });
  
    return table;
  }
  
  function toggleExpandRow(button) {
    const row = button.closest("tr");
    const expandableRow = row.nextElementSibling;
    if (expandableRow.style.display === "none") {
      expandableRow.style.display = "table-row";
      button.textContent = "-";
    } else {
      expandableRow.style.display = "none";
      button.textContent = "+";
    }
  }
  
  function updateRiskScore() {
    const rows = document.querySelectorAll("#riskTableBody tr.risk-row");
    let totalScore = 0;
    const selectedRisks = [];
  
    rows.forEach((row, index) => {
      const checkboxes = row.querySelectorAll('input[type="checkbox"]');
      const scoreCell = row.querySelector(".risk-score");
      let rowScore = 0;
  
      checkboxes.forEach((checkbox, level) => {
        if (checkbox.checked) {
          rowScore = parseInt(checkbox.dataset.score);
          selectedRisks.push({
            category: riskData[index].category,
            level: level
          });
        }
      });
  
      scoreCell.textContent = rowScore;
      totalScore += rowScore;
    });
  
    updateRiskSummary(selectedRisks);
    updateRiskBar(totalScore);
  
    // Update the main total score display
    document.getElementById("totalRiskScore").textContent = totalScore;
  
    return totalScore;
  }
  
  function updateRiskSummary(selectedRisks) {
    const summaryList = document.getElementById("riskSummary");
    if (!summaryList) return;
  
    summaryList.innerHTML = "";
  
    riskMessages.forEach((riskMessage) => {
      if (riskMessage.condition(selectedRisks)) {
        const listItem = document.createElement("li");
        listItem.textContent = riskMessage.message;
        listItem.style.color = "red";
        summaryList.appendChild(listItem);
      }
    });
  
    if (summaryList.children.length === 0) {
      summaryList.innerHTML = "<li>No specific risk combinations detected.</li>";
    }
  }
  
  function updateRiskBar(totalScore) {
    const riskIndicator = document.getElementById("riskIndicator");
    let color, width;
  
    if (totalScore <= 49) {
      color = "#2ecc71";
      width = (totalScore / 49) * 25;
    } else if (totalScore <= 129) {
      color = "#3498db";
      width = 25 + ((totalScore - 50) / 79) * 25;
    } else if (totalScore <= 235) {
      color = "#f39c12";
      width = 50 + ((totalScore - 130) / 105) * 25;
    } else {
      color = "#e74c3c";
      width = 75 + ((totalScore - 236) / 33) * 25;
    }
  
    riskIndicator.style.backgroundColor = color;
    riskIndicator.style.width = `${Math.min(width, 100)}%`;
  }
  
  function initializeApp() {
    const app = document.getElementById("app");
    app.innerHTML = ""; // Clear existing content
  
    // Add total score element
    const totalScoreElement = document.createElement("h2");
    totalScoreElement.innerHTML =
      'Total Risk Score: <span id="totalRiskScore">0</span>';
  
    // Add risk table
    app.appendChild(createRiskTable());
    app.appendChild(totalScoreElement);
    // Add risk bar (without the extra text)
    const riskBarElement = document.createElement("div");
    riskBarElement.id = "riskBar";
    riskBarElement.className = "risk-bar";
    riskBarElement.innerHTML =
      '<div id="riskIndicator" class="risk-indicator"></div>';
    app.appendChild(riskBarElement);
  
    // Add risk summary element
    const summaryElement = document.createElement("div");
    summaryElement.innerHTML =
      '<h3>Summary of Selected Risks</h3><ul id="riskSummary"></ul>';
    app.appendChild(summaryElement);
  
    // Set current date and enable date picker
    const currentDateInput = document.getElementById("currentDate");
    if (currentDateInput) {
      currentDateInput.valueAsDate = new Date();
      currentDateInput.addEventListener("input", (e) => {
        e.target.valueAsDate = new Date(e.target.value);
      });
    }
  
    document
      .querySelectorAll("#riskTableBody input[type=checkbox]")
      .forEach((checkbox) => {
        checkbox.addEventListener("change", (e) => {
          const row = e.target.closest("tr");
          const checkboxes = row.querySelectorAll("input[type=checkbox]");
          checkboxes.forEach((cb) => {
            if (cb !== e.target) cb.checked = false;
          });
          updateRiskScore();
        });
      });
  
    document.querySelectorAll(".expand-btn").forEach((button) => {
      button.addEventListener("click", () => toggleExpandRow(button));
    });
  
    const sendButton = document.getElementById("sendButton");
    if (sendButton) {
      sendButton.addEventListener("click", sendRiskAssessment);
    }
  
    // Initialize the risk score
    updateRiskScore();
  }
  
  function sendRiskAssessment() {
    const userName = document.getElementById("userName").value;
    const userEmail = document.getElementById("userEmail").value;
    const totalScore = document.getElementById("totalRiskScore").textContent;
    const date = document.getElementById("currentDate").value;
    const trainingType = document.getElementById("trainingType").value;
    const location = document.getElementById("location").value;
  
    if (!userName || !userEmail) {
      alert("Please fill in your name and email before sending the assessment.");
      return;
    }
  
    // Simulate sending an email
    console.log(`Sending risk assessment to: ${userEmail}`);
    console.log(`CC: your-email@example.com`);
    console.log(`Subject: Risk Assessment for ${userName} - ${date}`);
    console.log(`Body: 
      Date: ${date}
      Name: ${userName}
      Training Type: ${trainingType}
      Location: ${location}
      Total Risk Score: ${totalScore}
      
      Please find the full assessment attached.`);
  
    alert(
      `Risk assessment sent to ${userEmail} and CC'd to you. (This is a simulation in CodePen)`
    );
  }
  
  // Initialize the app when the DOM is fully loaded
  document.addEventListener("DOMContentLoaded", initializeApp);
  