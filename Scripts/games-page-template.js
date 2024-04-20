// On récupère le fichier json
const fileUrl = "../Resources/gamesText.json";
fetch(fileUrl)
.then(response => 
{
    if (!response.ok) 
    {
        throw new Error("Le fichier n'a pas été trouvé.");
    }

    return response.json();
})
.then(data =>
{
    LoadData(data, 0);
})
.catch(error => 
{
    console.error("Il y a eu une erreur lors de la récupération du fichier json contenant les données des différents jeux :", error);
});

// La fonction permettant d'afficher la page
function LoadData(data, gameIndex = 0)
{
    if(gameIndex < 0 || gameIndex > data.games.length)
    {
        console.error("Le jeu à afficher n'est pas présent dans le fichier json.");
    }

    // On prépare le HTML à afficher
    let htmlToRender = "";

    // On crée la section du titre
    htmlToRender += "<section id='TitleSection'>";
    htmlToRender += "<a href='" + data.games[gameIndex].logo_redirect_url + "'><img src='" + data.games[gameIndex].logo_link + "' alt='Logo'></a>";
    htmlToRender +="<div id='TitleInfos'>";
    htmlToRender += "<h1 class='orangeName'>" + data.games[gameIndex].title + "</h1>";
    htmlToRender += "<div id='TitleDescription'>" + data.games[gameIndex].description + "</div>";
    htmlToRender += "</div>";
    htmlToRender += "</section>";

    htmlToRender += "<hr id='TitleHR'>";

    let hasRepoGithub = (data.games[gameIndex].infos.repoGithub_url != "");
    // On crée la section des informations
    htmlToRender += "<section id='InformationSection'>";
    htmlToRender += "<h1>Informations</h1>";

    htmlToRender += "<div id='InformationContainer'>";
    htmlToRender += "<div id='InformationData'>";
    htmlToRender += "<p><strong>Moteur de jeux :</strong> " + data.games[gameIndex].infos.engine + "</p>";
    htmlToRender += "<p><strong>Type :</strong> " + data.games[gameIndex].infos.type + "</p>";
    htmlToRender += "<p><strong>Status :</strong> " + data.games[gameIndex].infos.status + "</p>";
    htmlToRender += "<p><strong>Assets utilisées :</strong> " + data.games[gameIndex].infos.assets + "</p>";
    htmlToRender += "<p><strong>Durée de réalisation :</strong> " + data.games[gameIndex].infos.duration + "</p>";
    htmlToRender += "<p><strong>Plateformes :</strong> " + data.games[gameIndex].infos.platforms + "</p>";
    htmlToRender += "</div>";
    
    if(hasRepoGithub)
    {
        htmlToRender += "<a href='" + data.games[gameIndex].infos.repoGithub_url + "'><img src='./Resources/Images/Logos/GithubLogo.png' alt='Logo Github'></a>";
    }

    htmlToRender += "</div>";
    htmlToRender += "</section>";

    htmlToRender += "<hr id='InformationHR'>";

    htmlToRender += "<section id='GamesAdditionalSections'>";
    // On crée les différentes sections
    data.games[gameIndex].sections.forEach(section => 
    {
        // On crée la section
        htmlToRender += "<section class='gameSection'>";
        htmlToRender += "<h2>" + section.title + "</h2>";
        htmlToRender += "<p class='gameHeader'>" + section.description + "</p>";

        // On crée ses sous-sections
        let index = 0;
        section.subsections.forEach(subSection => 
        {
            htmlToRender += "<div>";
            htmlToRender += "<p>" + subSection.header + "</p>"

            htmlToRender += "<section class='gameVideos'>";
            // On ajoute d'abord toutes les vidéos
            subSection.videos.forEach(video =>
            {
                htmlToRender += "<figure>";
                htmlToRender += "<video controls>";
                htmlToRender += "<source src='" + video.src + "' type='" + video.type +"'>";
                htmlToRender += video.alt;
                htmlToRender += "</video>";
                htmlToRender += "<figcaption>" + video.caption + "</figcaption>";
                htmlToRender += "</figure>";
            });
            htmlToRender += "</section>";

            htmlToRender += "<section class='gameImages'>";
            // Puis toutes les images
            subSection.images.forEach(image =>
            {
                htmlToRender += "<figure>";
                htmlToRender += "<a id='image" + index + "' class='captionClickableImage'><img src='" + image.src + "' alt='" + image.alt + "'></a>";
                htmlToRender += "<figcaption id='caption" + index + "'>" + image.caption + "</figcaption>";
                htmlToRender += "</figure>";
                index++;
            });
            htmlToRender += "</section>";

            htmlToRender += "</div>";
        });

        htmlToRender += "</section>"
    });
    htmlToRender += "</section>";

    // On ajoute le tout au HTML
    document.querySelector("#main").innerHTML = htmlToRender;

    // On s'abonne aux évènements pour montrer la caption
    document.querySelectorAll('.captionClickableImage').forEach(item => 
    {
        const itemID = (item.id).replace("image", '');
        const caption = document.querySelector('#caption' + itemID);

        if(caption != null)
        {
            item.addEventListener('mouseover', () =>
            {
                caption.style.opacity = 1;
                item.style.cursor = 'pointer';
            });
            item.addEventListener('mouseout', () =>
            {
                caption.style.opacity = 0;
                item.style.cursor = 'default';
            });
        }
        else
        {
            console.error("La légende de l'image n°" + index + " n'a pas été trouvé !");
        }
    });
}