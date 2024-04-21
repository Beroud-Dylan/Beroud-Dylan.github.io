// Variables globales
const gamePresentationPageURL = "games-presentation.html";
let jsonFile = null;

// Système de pagination
const maxNbPaginationGames = 3;
let startIndex = 0;
let endIndex = maxNbPaginationGames;

// On récupère le fichier contenant l'ensemble des jeux
const fileUrl = "./Resources/gamesText.json";
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
    // On affiche les jeux
    jsonFile = data;
    LoadGameSection(data);
})
.catch(error => 
{
    console.error("Il y a eu une erreur lors de la récupération du fichier json contenant les données des différents jeux :", error);
});

// Fonction permettant d'afficher la liste des jeux
function LoadGameSection(data)
{
    // On va chercher la section contenant la liste des jeux
    var root = document.querySelector("#GamesSection");
    // Si on l'a trouvé, on peut commencer les changements
    if(root != null)
    {
        // On prépare le html à envoyer
        var htmlToRender = "<h2>Liste des jeux</h2>";
        htmlToRender += "<p>Une liste non-exhaustive des différents jeux que j'ai réalisés et jugés \"présentables\"</p>";

        // On crée la section dynamique
        htmlToRender += "<ul id='Paginator' class='dynamicSectionContainer'>";
        htmlToRender += LoadGames(data.games.slice(0, maxNbPaginationGames));
        htmlToRender += "</ul>";

        // On met en place le système de pagination
        htmlToRender += "<section id='GameNavigationButtons'>";
        htmlToRender += "<button id='previousPageButton' class='whiteButton'>Page Précédente</button>";
        htmlToRender += "<button id='accueilButton' class='orangeButton'>Accueil</button>";
        htmlToRender += "<button id='nextPageButton' class='whiteButton'>Page Suivante</button>";
        htmlToRender += "</section>";

        // On assigne le nouveau HTML à l'élément root
        root.innerHTML = htmlToRender;

        // On s'abonne aux évènements pour afficher les captions quand la souris est au dessus de l'image
        RenderCaptionWhenMouseoverSetter();

        // On fait en sorte que les boutons de pagination soient actifs
        var nextButton = document.querySelector('#nextPageButton');
        if (nextButton != null)
        {
            nextButton.addEventListener('click', () => 
            { 
                // On modifie les nouveaux indices
                startIndex = Math.min(startIndex + maxNbPaginationGames, endIndex);
                endIndex = Math.min(endIndex + maxNbPaginationGames, jsonFile.games.length);
                ModifPagination();
            });
        }
        var accueilButton = document.querySelector('#accueilButton');
        if(accueilButton != null)
        {
            accueilButton.addEventListener('click', () => 
            { 
                // On renvoie vers la page d'accueil
                window.location.href = './index.html';
            });
        }
        var previousButton = document.querySelector('#previousPageButton');
        if (previousButton != null)
        {
            previousButton.addEventListener('click', () => 
            { 
                // On modifie les nouveaux indices
                startIndex = Math.max(startIndex - maxNbPaginationGames, 0);
                endIndex = Math.max(endIndex - maxNbPaginationGames, maxNbPaginationGames);
                ModifPagination();
            });
        }
        UpdateNavigationButtonVisibility();
    }
}

// Fonction permettant d'afficher la caption seulement lorsque la souris est au dessus de l'image
function RenderCaptionWhenMouseoverSetter()
{
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

// Fonction permettant de modifier la pagination
function ModifPagination()
{
    console.log(startIndex + " - " + endIndex);
    // On récupère l'élément HTML à modifier
    var root = document.querySelector('#Paginator');
    if(root == null)
    {
        console.error("Il n'y a pas de conteneur pour la liste des jeux");
        return;
    }
    if(jsonFile == null)
    {
        console.error("Le fichier JSON contenant les informations des jeux n'est pas encore chargé !");
        return 0;
    }

    // On récupère la liste des jeux à afficher
    var gamesToRender = jsonFile.games.slice(startIndex, endIndex);
    gamesToRender.forEach(game => {
        console.log(game.title);
    });
    
    // On l'affiche
    var htmlToRender = LoadGames(gamesToRender);
    // On la met dans le root
    root.innerHTML = htmlToRender;
    // On s'abonne aux évènements pour afficher les captions quand la souris est au dessus de l'image
    RenderCaptionWhenMouseoverSetter();
    UpdateNavigationButtonVisibility();
}

// Fonction permettant d'afficher ou non le bouton "suivant" et "précédent"
function UpdateNavigationButtonVisibility()
{
    // On vérifie que le jsonFile soit chargé
    if(jsonFile == null)
    {
        console.error("Le fichier JSON contenant les informations des jeux n'est pas encore chargé !");
        return 0;
    }

    // On récupère le bouton suivant
    var nextButton = document.querySelector('#nextPageButton');
    if(nextButton != null)
    {
        // Si on doit se déplacer, il faut afficher le bouton
        if(startIndex + maxNbPaginationGames < jsonFile.games.length)
        {
            nextButton.style.visibility = "visible";
        }
        else
        {
            nextButton.style.visibility = "hidden";
        }
    }

    // On récupère le bouton précédent
    var previousButton = document.querySelector('#previousPageButton');
    if(previousButton != null)
    {
        // Si on doit se déplacer, il faut afficher le bouton
        if(startIndex > 0)
        {
            previousButton.style.visibility = "visible";
        }
        else
        {
            previousButton.style.visibility = "hidden";
        }
    }
}

// Fonction permettant d'afficher un certain nombre de jeux
function LoadGames(games)
{
    var htmlToRender = "";
    var index = 0; // L'indice unique des images à assigner
    games.forEach(game => 
    {
        // On crée un onglet pour le jeu
        htmlToRender += "<li><figure>";
        htmlToRender += "<a id='image" + index + "' class='captionClickableImage' href='./" + gamePresentationPageURL + "?game=" + getIndexFrom(game.title) + "'><img src='" + game.logo_link + "' alt='" + game.title + "'></a>";
        htmlToRender += "<figcaption id='caption" + index + "'>" + game.title + "</figcaption>";
        htmlToRender += "</figure></li>";

        // On incrémente l'indice
        index++;
    });
    return htmlToRender;
}

// Fonction permettant de récupérer l'indice de référence à partir du titre d'un jeu
function getIndexFrom(gameTitle)
{
    // On vérifie qu'on puisse comparer, sinon on renvoie 0 par défaut
    if(jsonFile == null)
    {
        console.error("Le fichier JSON contenant les informations des jeux n'est pas encore chargé !");
        return 0;
    }

    // Pour chaque jeu
    for (var i = 0; i < jsonFile.games.length; i++) 
    {
        if (jsonFile.games[i].title == gameTitle) 
        {
            return i;
        }
    }

    // On dit qu'on n'a rien trouvé
    console.error("Aucun jeu trouvé dont le titre est '" + gameTitle + "'.");
    return 0;
}
