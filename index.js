const apikey = '.....................';
const blogcontainer = document.getElementById("blog-container");

const searchfield = document.getElementById("search-input");
const searchbutton = document.getElementById("search-button");
async function fetchrandom() {
    try {
        const apiurl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apikey}`;
        const response = await fetch(apiurl);
        const data = await response.json();

        return data.articles;
    } catch (error) {
        console.error("error-cannot fetch", error);
        return [];
    }
}
    searchbutton.addEventListener("click",async()=>{
        const query= searchfield.value.trim();
        if (query !== ""){
            try{
                const articles = await fetchNewsQuery(query);
                displayblogs(articles);

            }catch(error){
                console.log("error",error);

            }
        }
    }); 
    async function fetchNewsQuery(query){
        
           
                try {
                    const apiurl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apikey}`;
                    const response = await fetch(apiurl);
                    const data = await response.json();

                    return data.articles;
                } catch (error) {
                    console.error("error-cannot fetch", error);
                    return [];
                }
            }
        

        

function displayblogs(articles) {
    blogcontainer.innerHTML = "";
    articles.forEach((article) => {
        const blogcard = document.createElement("div");
        blogcard.classList.add("blog-card");

        if (article.urlToImage) {
            const img = document.createElement("img");
            img.src = article.urlToImage;
            img.alt = article.title;
            blogcard.appendChild(img);
        }

        const title = document.createElement("h2");
        
        title.textContent = article.title;
        const truncatedtitle = article.title.length >30? article.title.slice(0,30) + "..." :article.title;

        const description = document.createElement("p");
        description.textContent = article.description;

        blogcard.appendChild(title);
        blogcard.appendChild(description);
        blogcard.addEventListener('click',()=>{
          window.open(article.url,"_blank"); 

        })
        blogcontainer.appendChild(blogcard);
    });
}

(async () => {
    try {
        const articles = await fetchrandom();
        displayblogs(articles);
    } catch (error) {
        console.error("error fetching random news", error);
    }
})();
