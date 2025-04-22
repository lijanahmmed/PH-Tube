const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}

const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
}


const displayVideos = (videos) => {
    const videosContainer = document.getElementById("videos")
    videos.forEach((video) => {
        // console.log(video)
        const card = document.createElement("div")
        card.classList = "card"
        card.innerHTML = `
        <figure>
            <img
            src=${video.thumbnail}
            alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">Card Title</h2>
            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
         </div>
        `
        videosContainer.append(card)
    })
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories")
    categories.forEach((item) => {     
    const button = document.createElement("button");
    button.classList = "btn btn-primary";
    button.innerText = item.category;
    categoryContainer.append(button)    
    });
}

loadCategories();
loadVideos();