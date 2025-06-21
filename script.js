const apiKey = "6cc718ddda9c843f29174c3fdff03f9f"; 
const newsContainer = document.getElementById("newsContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

async function fetchNews(query = "India") {
  const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&token=${apiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No news found.</p>";
      return;
    }
    displayNews(data.articles);
  } catch (error) {
    newsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    console.error(error);
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    const div = document.createElement("div");
    div.classList.add("news-card");
    div.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.description || "No description available."}</p>
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


async function fetchNewsQuery(Query)
{
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${Query}&pageSize=20&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
     }
     catch(error){
          console.error("Error fetching random news",error);
          return [];
     }
}

function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article)=>{
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length >30? article.title.slice(0,30)+"....":article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        description.textContent = article.description;
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click",()=>{
            window.open(article.url,"_blank");
        })
        blogContainer.appendChild(blogCard);
    });
}

(async ()=>{
    try{
       const articles = await fetchRandomNews();
       displayBlogs(articles);
    }
    catch(error){
        console.error("Error fetching random news",error);
    }
})();
