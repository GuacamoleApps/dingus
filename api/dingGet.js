// Replace this with your GAS web app URL
const GAS_URL = "https://dingusproxy.barstaxjolster.workers.dev/dings/get";
const options = {
    method: "POST"
}

fetch(GAS_URL, options)
  .then(response => response.json())
  .then(data => {
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
      content.textContent = item.data;
      divider.className = "solid"
      card.appendChild(subject);
      card.appendChild(dinger);
      card.appendChild(divider);
      card.appendChild(content);
      container.appendChild(card);
    });

    document.body.appendChild(container);
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });
