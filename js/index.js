document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('github-form')
  const userList = document.getElementById('user-list')
  const reposList = document.getElementById('repos-list')
  const onSubmit = (event) => {
    event.preventDefault()
    const fData = new FormData(event.target)
    const params = {
      search: fData.get('search')
    }
    fetch('https://api.github.com/search/users?q=' + params.search, {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    })
      .then(res => res.json())
      .then(data => {
        userList.innerHTML = ''
        const items = data.items 
        items.forEach(user => {
          userList.innerHTML += `
            <div onclick = 'getRepo("${user.login}")' class = 'card'>
            <img width = '100px' src = '${user.avatar_url}'/>
              <p>${user.login}</p>
              <a href = '${user.html_url}'>view profile</a>
             </div>
          `
        });
      })
  }
  form.addEventListener('submit', onSubmit)

  const getRepo =(userName) => {
  fetch('https://api.github.com/users/' + userName +'/repos', {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  })
    .then(res => res.json())
    .then(data => {
      reposList.innerHTML = ''
      console.log(data)
      data.forEach((repo)=>{
        reposList.innerHTML +=`
          <div> 
          <a href = '${repo.html_url}'>
            ${repo.name}
            </a>
          </div>
        `
      })
    })
  }
  window.getRepo = getRepo 
})