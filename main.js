let usuario = {
    git:"leandrolimaPRO",
    nome: "Leandro L.N",
    desc: "Eu sou o melhor do mundo. Dominarei todos os programadores kkk. TOP",
    selo: "images/build.png",
    avatar: "images/avatar.png",
    medias: {
        Github:{
            alt: "Github",
            
            link: "https://github.com/leolimaa",
            img: "images/github 2.png"
        },
        Instagram: {
            alt: "Instagram",
            link: "http://instagram.com/leolimaa",
            img: "images/instagram.svg"
        },
        Facebook: {
            alt: "Facebook",
            link: "http://facebook.com/leolimaa",
            img: "images/facebook.svg"
        },
        Twitter: {
            alto: "twitter",
            link: "http://twitter.com/leolimaa",
            img: "images/twitter.svg"
        } ,
    }

};


obterGithubInfoUsario(usuario);

function mudarDados(usuario){
    uNome.textContent = usuario.nome;
    uDesc.textContent = usuario.desc;
    imgSelo.src = usuario.selo;
    imgAvatar.src = usuario.avatar;
    
    console.log("MediasSociais");

    mudarMediasSociais(usuario.medias);
};
function mudarMediasSociais(medias){
    linkGithub.src = usuario.medias.Github.link;
    imgGithub.src = usuario.medias.Github.img;
    uGit.textContent = usuario.git;

    for(let li of mediasSociais.children){
        social = li.getAttribute('class');

        li.children[0].href = medias[social].link;
        li.children[0].children[0].src =  medias[social].img;
        li.children[0].children[0].alt =  medias[social].alt;
    }

};

function obterGithubInfoUsario(usuario){
    const url = `https://api.github.com/users/${usuario.git}`;

    fetch(url)
        .then(resposta => resposta.json())
        .then(dados => {
            usuario.nome = dados.name;
            usuario.desc = dados.bio;
            mudarDados(usuario);
        });
   
}