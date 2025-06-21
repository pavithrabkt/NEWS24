const apiKey = "6cc718ddda9c843f29174c3fdff03f9f"; 

const newsContainer = document.getElementById("newsContainer");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

async function fetchNews(query = "India") {
  const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&country=in&apikey=${apiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.articles || []);
  } catch (err) {
    console.error("Failed to fetch news", err);
    newsContainer.innerHTML = `<p style="color:red;">Failed to fetch news. Check API key or network.</p>`;
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = "";
  if (articles.length === 0) {
    newsContainer.innerHTML = "<p>No news found!</p>";
    return;
  }

  articles.forEach(article => {
    const card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.description || "No description available"}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    newsContainer.appendChild(card);
  });
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) fetchNews(query);
});

window.addEventListener("load", () => fetchNews());


