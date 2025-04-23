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


// {category_id: '1001', video_id: 'aaaa', thumbnail: 'https://i.ibb.co/L1b6xSq/shape.jpg', title: 'Shape of You', authors: Array(1), …}
// authors
// : 
// [{…}]
// category_id
// : 
// "1001"
// description
// : 
// "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// others
// : 
// {views: '100K', posted_date: '16278'}
// thumbnail
// : 
// "https://i.ibb.co/L1b6xSq/shape.jpg"
// title
// : 
// "Shape of You"
// video_id
// : 
// "aaaa"

const displayVideos = (videos) => {
    const videosContainer = document.getElementById("videos")
    videos.forEach((video) => {
        console.log(video)
        const card = document.createElement("div")
        card.classList = "card"
        card.innerHTML = `
        <figure>
            <img
            src=${video.thumbnail}
            alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${video.title}</h2>
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