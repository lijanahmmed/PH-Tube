function getTimeString (time){
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`
}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("btn-category")
    for(let btn of buttons){
        btn.classList.remove("active")
    }
}

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}

const loadVideos = (search = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`)
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
}

const loadCategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {
        removeActiveClass();
        const buttonDesign = document.getElementById(`btn-${id}`);
        buttonDesign.classList.add("active")
        displayVideos(data.category)
    })
}

const loadVideoDetails = (videoId) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
    .then(res => res.json())
    .then(data => displayVideoDetails(data.video))
}

const displayVideoDetails = (video) => {
    const modalContain = document.getElementById("modal-contain")
    modalContain.innerHTML = `
    <img src=${video.thumbnail}/>
    <h2 class="mt-2 text-xl font-bold">${video.title}</h2>
    <p class="mt-2 text-gray-400">${video.description}</p>
    `
    document.getElementById("customModal").showModal();
}

const displayVideos = (videos) => {
    const videosContainer = document.getElementById("videos");
    videosContainer.innerHTML = "";

    if(videos.length == 0){
        videosContainer.classList.remove("grid")
        videosContainer.innerHTML = `
        <div class="min-h-96 items-center flex flex-col justify-center gap-3">
        <img src="assets/Icon.png"/>
        <P class="text-xl font-bold">Opps!! Sorry. There is no content here.</p>
        </div>
        `
        return;
    }
    else{
        videosContainer.classList.add("grid")
    }
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
                <p class="text-sm text-gray-400">${video.others.views} views</><br>
                <button onclick="loadVideoDetails('${video.video_id}')" class="mt-2 btn btn-primary">Details</button>
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
    <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn btn-category">${item.category}</button>
    `
    categoryContainer.append(buttonContainer)    
    });
}

document.getElementById("search").addEventListener("keyup", (e) => {
    loadVideos(e.target.value)
})

loadCategories();
loadVideos();