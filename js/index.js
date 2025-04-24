function getTimeString (time){
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`
}

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

const loadCategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => displayVideos(data.category))
}

const displayVideos = (videos) => {
    const videosContainer = document.getElementById("videos")
    videos.forEach((video) => {
        const card = document.createElement("div")
        card.classList = "card"
        card.innerHTML = `
        <figure class="h-[200px] relative">
            <img class="h-full w-full object-cover"
            src=${video.thumbnail}
            alt="Shoes" />
            ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black p-1 text-white text-xs">${getTimeString(video.others.posted_date)}</span>`}
        </figure>
        <div class="px-0 py-2 flex gap-3">
            <div>
                <img class="h-10 w-10 rounded-full object-cover" src= ${video.authors[0].profile_picture} />
            </div>
            <div>
                <h2 class="text-xl font-bold">${video.title}</h2>
                <div class="flex gap-1 items-center">
                    <p class="text-gray-400">${video.authors[0].profile_name}</p>
                    ${video.authors[0].verified === true ? `<img class="h-4 w-4 rounded-full object-cover" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" />` : ""}
                </div>
                <p class="text-sm text-gray-400">${video.others.views} views</>
            </div>
         </div>
        `
        videosContainer.append(card)
    })
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories")
    categories.forEach((item) => {     
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button onclick="loadCategoryVideos(${item.category_id})" class="btn">${item.category}</button>
    `
    categoryContainer.append(buttonContainer)    
    });
}

loadCategories();
loadVideos();