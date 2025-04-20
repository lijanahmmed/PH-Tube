const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
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