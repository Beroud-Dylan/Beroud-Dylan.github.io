// Variables globales
const blogPresentationPageURL = "blog-presentation.html";
let jsonFile = null;

// Système de pagination
const maxNbPaginationBlog = 3;
let startIndex = 0;
let endIndex = maxNbPaginationBlog;

// On récupère le fichier contenant l'ensemble des articles du blog
const fileUrl = "./Resources/JSON/blog.json";
fetch(fileUrl)
.then(response => 
{
    if (!response.ok)
    {
        var erreur = "Le fichier n'a pas été trouvé.";

        var root = document.querySelector("#BlogSection");
        root.innerHTML = "<h2>Erreur lors de la récupération des données du blog</h2><p>" + erreur + "</p>";

        throw new Error(erreur);
    }

    return response.json();
})
.then(data =>
{
    // On affiche le blog
    jsonFile = data;
    LoadBlogSection(data);
})
.catch(error => 
{
    console.error("Il y a eu une erreur lors de la récupération du fichier json contenant les données des différents articles du blog :", error);
});

// Fonction permettant d'afficher la liste des articles du blog
function LoadBlogSection(data)
{
    // On va chercher la section contenant la liste des articles du blog
    var root = document.querySelector("#BlogSection");
    // Si on l'a trouvé, on peut commencer les changements
    if(root != null)
    {
        // On prépare le html à envoyer
        var htmlToRender = "<h2>Liste des articles</h2>";

        // On crée la section dynamique
        htmlToRender += "<ul id='Paginator' class='dynamicSectionContainer'>";
        htmlToRender += LoadBlog(data.articles.slice(0, maxNbPaginationBlog));
        htmlToRender += "</ul>";

        // On met en place le système de pagination
        htmlToRender += "<section id='BlogNavigationButtons'>";
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
                startIndex = Math.min(startIndex + maxNbPaginationBlog, endIndex);
                endIndex = Math.min(endIndex + maxNbPaginationBlog, jsonFile.articles.length);
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
                startIndex = Math.max(startIndex - maxNbPaginationBlog, 0);
                endIndex = Math.max(endIndex - maxNbPaginationBlog, maxNbPaginationBlog);
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
    // On récupère l'élément HTML à modifier
    var root = document.querySelector('#Paginator');
    if(root == null)
    {
        console.error("Il n'y a pas de conteneur pour le blog");
        return;
    }
    if(jsonFile == null)
    {
        console.error("Le fichier JSON contenant les informations du blog n'est pas encore chargé !");
        return 0;
    }

    // On récupère la liste des articles du blog à afficher
    var blogToRender = jsonFile.articles.slice(startIndex, endIndex);    
    // On l'affiche
    var htmlToRender = LoadBlog(blogToRender);
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
        console.error("Le fichier JSON contenant les informations du blog n'est pas encore chargé !");
        return 0;
    }

    // On récupère le bouton suivant
    var nextButton = document.querySelector('#nextPageButton');
    if(nextButton != null)
    {
        // Si on doit se déplacer, il faut afficher le bouton
        if(startIndex + maxNbPaginationBlog < jsonFile.articles.length)
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

// Fonction permettant d'afficher un certain nombre d'articles
function LoadBlog(articles)
{
    var htmlToRender = "";
    var index = 0; // L'indice unique des images à assigner
    articles.forEach(article => 
    {
        // On crée un onglet pour l'article
        htmlToRender += "<li><figure>";
        htmlToRender += "<a id='image" + index + "' class='captionClickableImage' href='" + article.article_url + "'><img src='" + article.img_url + "' alt='" + article.title + "'></a>";
        htmlToRender += "<figcaption id='caption" + index + "'>" + article.title + "</figcaption>";
        htmlToRender += "</figure></li>";

        // On incrémente l'indice
        index++;
    });
    return htmlToRender;
}

// Fonction permettant de récupérer l'indice de référence à partir du titre d'un article
function getIndexFrom(articleTitle)
{
    // On vérifie qu'on puisse comparer, sinon on renvoie 0 par défaut
    if(jsonFile == null)
    {
        console.error("Le fichier JSON contenant les informations des articles du blog n'est pas encore chargé !");
        return 0;
    }

    // Pour chaque article
    for (var i = 0; i < jsonFile.articles.length; i++) 
    {
        if (jsonFile.articles[i].title == articleTitle) 
        {
            return i;
        }
    }

    // On dit qu'on n'a rien trouvé
    console.error("Aucun article trouvé dont le titre est '" + articleTitle + "'.");
    return 0;
}
