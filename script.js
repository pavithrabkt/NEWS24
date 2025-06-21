const apiKey = "6cc718ddda9c843f29174c3fdff03f9f"; // Replace with your GNews key
const newsContainer = document.getElementById("newsContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

async function fetchNews(query = "India") {
  const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&token=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNews(data.articles);
}

function displayNews(articles) {
  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    const div = document.createElement("div");
    div.classList.add("news-card");
    div.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.description || "No description"}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    newsContainer.appendChild(div);
  });
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) fetchNews(query);
});

window.addEventListener("load", () => fetchNews());
