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
    var index = 0;

    // On récupère les paramètres de l'URL
    var params = getParams();
    if(params != null && params.game != null)
    {
        // Si le paramètre n'est pas bon, on redirige vers la bonne URL
        if(params.game < 0 || params.game >= data.games.length)
        {
            window.location.href = getURLForGameAtIndex(0);
            return;
        }

        // Sinon, on en déduit l'indice du jeu à afficher
        index = parseInt(params.game);
    }

    // On affiche le bon jeu
    LoadGamePresentationPage(data, index);
})
.catch(error => 
{
    console.error("Il y a eu une erreur lors de la récupération du fichier json contenant les données des différents jeux :", error);
});

// Une fonction permettant de récupérer l'URL qui pointe vers le jeu d'un indice spécifique
function getURLForGameAtIndex(index)
{
    var currentURL = (window.location.href).split('?')[0];
    var url = currentURL + '?game=' + index;
    return url;
}

// Une fonction pour récupérer les paramètres de l'url
function getParams()
{
    // On récupère l'URL actuelle
    const queryString = window.location.search;
    const params = {};

    // On vérifie s'il y a des paramètres dans l'URL
    if (queryString) 
    {
        // On divise l'URL en une liste des différents paramètres
        const queryStringWithoutQuestionMark = queryString.substring(1);
        const paramArray = queryStringWithoutQuestionMark.split('&');

        // Pour chaque division, on va récupérer le nom du paramètre et sa valeur
        paramArray.forEach(param => 
        {
            const [key, value] = param.split('=');
            // On le stocke dans l'objet
            params[key] = decodeURIComponent(value);
        });
    }

    // On renvoie les paramètres
    return params;
}

// La fonction permettant d'afficher la page
function LoadGamePresentationPage(data, gameIndex = 0)
{
    if(gameIndex < 0 || gameIndex >= data.games.length)
    {
        console.error("Le jeu à afficher n'est pas présent dans le fichier json.");
    }

    // On prépare le HTML à afficher
    var htmlToRender = "";

    // On crée la section du titre
    htmlToRender += "<section id='TitleSection'>";
    htmlToRender += "<a href='" + data.games[gameIndex].logo_redirect_url + "' target='_blank'><img src='" + data.games[gameIndex].logo_link + "' alt='Logo'></a>";
    htmlToRender +="<div id='TitleInfos'>";
    htmlToRender += "<h1 class='orangeName'>" + data.games[gameIndex].title + "</h1>";
    htmlToRender += "<div id='TitleDescription'>" + data.games[gameIndex].description + "</div>";
    htmlToRender += "</div>";
    htmlToRender += "</section>";

    htmlToRender += "<hr id='TitleHR'>";

    var hasRepoGithub = (data.games[gameIndex].infos.repoGithub_url != "");
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
        htmlToRender += "<a href='" + data.games[gameIndex].infos.repoGithub_url + "' target='_blank'><img src='./Resources/Images/Logos/GithubLogo.png' alt='Logo Github'></a>";
    }

    htmlToRender += "</div>";
    htmlToRender += "</section>";

    htmlToRender += "<hr id='InformationHR'>";

    htmlToRender += "<section id='GamesAdditionalSections'>";
    htmlToRender += "<h1>Présentation</h1>"
    htmlToRender += "<section>";
    // On crée les différentes sections
    var index = 0;
    data.games[gameIndex].sections.forEach(section => 
    {
        // On crée la section
        htmlToRender += "<section class='gameSection'>";
        htmlToRender += "<h2>" + section.title + "</h2>";
        htmlToRender += "<p class='gameHeader'>" + section.description + "</p>";

        // On crée ses sous-sections
        var isFirstHeader = true;
        section.subsections.forEach(subSection => 
        {
            htmlToRender += "<div>";

            // Si ce n'est pas le premier header ou que le titre ET la description sont manquantes
            if(!isFirstHeader || (section.title == "" && section.description == ""))
            {
                // Il faut centrer le texte
                htmlToRender += "<p class='gameCenteredHeader'>" + subSection.header + "</p>";
            }
            else
            {
                // Sinon, on ajoute le header normalement
                htmlToRender += "<p>" + subSection.header + "</p>";
                isFirstHeader = false;
            }

            htmlToRender += "<section class='gameGalery'>";
            // On ajoute d'abord toutes les vidéos
            subSection.videos.forEach(video =>
            {
                htmlToRender += "<figure>";
                htmlToRender += "<video controls>";
                htmlToRender += "<source src='" + video.src + "' type='" + video.type +"'>";
                htmlToRender += video.alt;
                htmlToRender += "</video>";
                htmlToRender += "</figure>";
            });
            // Puis toutes les images
            subSection.images.forEach(image =>
            {
                htmlToRender += "<figure>";
                htmlToRender += "<a id='image" + index + "' class='captionClickableImage' target='_blank'><img src='" + image.src + "' alt='" + image.alt + "'></a>";
                htmlToRender += "<figcaption id='caption" + index + "'>" + image.caption + "</figcaption>";
                htmlToRender += "</figure>";
                index++;
            });
            htmlToRender += "</section>";

            htmlToRender += "</div>";
        });

        htmlToRender += "</section>"
        htmlToRender += "<hr class='gameSectionHr'>";
    });
    htmlToRender += "</section></section>";

    // On ajoute les boutons de navigation
    htmlToRender += "<section id='gameNavigationButtons'>";
    if(gameIndex - 1 >= 0)
    {
        htmlToRender += "<a href='" + getURLForGameAtIndex(gameIndex - 1) + "'><button class='orangeButton'>Jeu Précédent</button></a>";
    }
    htmlToRender += "<a href='./games.html'><button class='whiteButton'>Liste des jeux</button></a>";
    if(gameIndex + 1 < data.games.length)
    {
        htmlToRender += "<a href='" + getURLForGameAtIndex(gameIndex + 1) + "'><button class='orangeButton'>Jeu Suivant</button></a>";
    }
    htmlToRender += "</section>";

    // On ajoute le tout au HTML
    document.querySelector("#main").innerHTML = htmlToRender;

    // On s'abonne aux évènements pour montrer la caption
    document.querySelectorAll('.captionClickableImage').forEach(item => 
    {
        var itemID = (item.id).replace("image", '');
        var caption = document.querySelector('#caption' + itemID);

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
            console.error("La légende de l'image n°" + itemID + " n'a pas été trouvé !");
        }
    });
}