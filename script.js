let form = document.querySelector("form");
let input = document.querySelector("#username");

form.addEventListener("submit", function (elem) {
    elem.preventDefault();
    let username = input.value.trim();
    if (!username) return;
    console.log(username)
    getUser(username)
    getRepos(username)
})


async function getUser(username) {

try {
    const response = await fetch(`https://api.github.com/users/${username}`)
    if (!response.ok) {
    document.querySelector("#error-msg").textContent = "User Not Found ❌"
    return
}
  document.querySelector("#error-msg").textContent = ""
    const data = await response.json()
document.querySelector("#profile").style.display = "flex"
document.querySelector("#repos").style.display = "block"

    document.querySelector("#avatar").src = data.avatar_url
    document.querySelector("#name").textContent = data.name
    document.querySelector("#bio").textContent = data.bio
 document.querySelector("#followers").textContent = `Followers: ${data.followers}`
document.querySelector("#following").textContent = `Following: ${data.following}`
document.querySelector("#repos-count").textContent = `Repos: ${data.public_repos}`
    document.querySelector("#github-link").href = data.html_url
    console.log(data)
    }
catch(err) {
    console.log(err.message)
    }
}

async function getRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`)
    const repos = await response.json();
    
    const list = document.querySelector("#repo-list")
    list.innerHTML = ""
    repos.forEach(repo => {
        const li = document.createElement("li")
        const a = document.createElement("a");
        
        a.textContent = repo.name;
        a.href = repo.html_url;
        a.target = "_blank";
        li.appendChild(a)
        list.appendChild(li)
    });
   
}


