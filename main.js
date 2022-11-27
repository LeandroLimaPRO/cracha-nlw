let usuario = {
  git: 'leandrolimaPRO',
  nome: 'Leandro L.N',
  desc: 'Eu sou o melhor do mundo. Dominarei todos os programadores kkk. TOP',
  selo: 'images/build.png',
  avatar: 'images/avatar.png',
  medias: {
    Github: {
      alt: 'Github',

      link: 'https://github.com/leolimaa',
      img: 'images/github 2.png',
    },
    Instagram: {
      alt: 'Instagram',
      link: 'http://instagram.com/leolimaa',
      img: 'images/instagram.svg',
    },
    Facebook: {
      alt: 'Facebook',
      link: 'http://facebook.com/leolimaa',
      img: 'images/facebook.svg',
    },
    Twitter: {
      alto: 'twitter',
      link: 'http://twitter.com/leolimaa',
      img: 'images/twitter.svg',
    },
  },
}

obterGithubInfoUsario(usuario)

function mudarDados(usuario) {
  uNome.textContent = usuario.nome
  uDesc.textContent = usuario.desc
  imgSelo.src = usuario.selo
  imgAvatar.src = usuario.avatar

  console.log('MediasSociais')

  mudarMediasSociais(usuario.medias)
}
function mudarMediasSociais(medias) {
  linkGithub.src = usuario.medias.Github.link
  imgGithub.src = usuario.medias.Github.img
  uGit.textContent = usuario.git

  for (let li of mediasSociais.children) {
    let social = li.getAttribute('class')

    li.children[0].href = medias[social].link
    li.children[0].children[0].src = medias[social].img
    li.children[0].children[0].alt = medias[social].alt
  }
}

function obterGithubInfoUsario(usuario) {
  const url = `https://api.github.com/users/${usuario.git}`

  fetch(url)
    .then(resposta => resposta.json())
    .then(dados => {
      console.log(url, dados)
      console.log(dados.avatar_url)
      usuario.nome = dados.name
      usuario.desc = dados.bio
      usuario.avatar = dados.avatar_url
      mudarDados(usuario)
    })
}

function buscarRepositorios() {
  let params = {
    q: `user:${usuario.git}`,
    sort: 'name',
    order: 'asc',
  }
  let search = $('#form-q').val()
  let dataUpdated = $('#sort-by-data-commit').is(':checked')
  let order = $('#order').is(':checked')
  console.log('botão atualizado', dataUpdated)
  if (dataUpdated) {
    params.sort = 'updated'
  }
  if (order) {
    params.order = 'desc'
  }
  if (search.length !== null || search.length !== undefined) {
    let q = params.q
    params.q = search + ' ' + q
  }
  listarRepositorios(usuario, params)
}

function listarRepositorios(usuario, params) {
  let strParams = '?'
  Object.keys(params).forEach(key => {
    console.log('forEach', key, params[key])
    strParams += key + '=' + params[key] + '&'
    console.log(strParams)
  })

  const url = `https://api.github.com/search/repositories${strParams}`
  console.log(url)
  fetch(url)
    .then(resposta => resposta.json())
    .then(dados => {
      let html = ''
      $('#contentview').html(html)
      dados.items.forEach(function (item) {
        html += renderView(item)
        console.log('lista de repositorios', item)
      })
      html += ''
      $('#contentview').html(html)
    })
}
function formatarData(string) {
  return new Date(string).toLocaleDateString()
}

function renderView(key) {
  if (key.description === null) {
    console.log('nullo')
    key.description = ''
  }
  let h = `
        <div class="container-view">
            <h3>${key.name}</h3>
            <p>${key.description}</p>
            <div class="row"><div class="col col-sm-6"><span>Criado em: ${formatarData(
              key.created_at
            )}</span></div>
            
            <div class="col col-sm-6"><span>Atualizado em: ${formatarData(
              key.updated_at
            )}</span></div></div>
        </div>
        `
  return h
}
