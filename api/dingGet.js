const GAS_URL = "https://dingus-api.vercel.app/dings/get";
const options = { method: "POST" };

let lastDataHash = ""; // We'll use this to detect changes

function hashData(data) {
  return JSON.stringify(data); // Simple hash using stringified data
}

function updateDingusCards(data) {
  // Clear previous content
  const oldContainer = document.querySelector('.dingus-container');
  if (oldContainer) oldContainer.remove();

  const container = document.createElement('div');
  container.className = 'dingus-container';

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'dingus-card';

    const subject = document.createElement('h2');
    subject.textContent = item.subject;

    const dinger = document.createElement('h1');
    dinger.textContent = item.dinger;

    const content = document.createElement('p');
    const divider = document.createElement('hr');
    divider.className = "solid";
    content.innerHTML = item.data;

    card.appendChild(subject);
    card.appendChild(dinger);
    card.appendChild(divider);
    card.appendChild(content);
    container.appendChild(card);
  });

  document.body.appendChild(container);
}

async function doTheLoop() {
  try {
    const response = await fetch(GAS_URL, options);
    const data = await response.json();
    const newDataHash = hashData(data);

    if (newDataHash !== lastDataHash) {
      console.log("🔄 Data has changed, updating UI");
      lastDataHash = newDataHash;
      updateDingusCards(data);
    } else {
      console.log("✅ No change in data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setTimeout(doTheLoop, 3000); // Loop every 3 seconds
  }
}

// Start the loop
doTheLoop();
