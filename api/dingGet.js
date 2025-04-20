// Replace this with your GAS web app URL
const GAS_URL = "https://dingusproxy.barstaxjolster.workers.dev/dings/get";

fetch(GAS_URL)
  .then(response => response.json())
  .then(data => {
    const container = document.createElement('div');
    container.className = 'dingus-container';

    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'dingus-card';

      const subject = document.createElement('h2');
      subject.textContent = item.subject;

      const content = document.createElement('p');
      content.textContent = item.data;

      card.appendChild(subject);
      card.appendChild(content);
      container.appendChild(card);
    });

    document.body.appendChild(container);
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });
