// On récupère le fichier json
const fileUrl = "../Resources/JSON/popupInfo.json";
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
    // S'il y a des données à afficher
    if(data.title != "" && data.description != "")
    {
        // On recherche le container
        var popup = document.querySelector('#Popup');
        if (popup != null)
        {
            // On envoie un nombre random pour savoir si on affiche le pop-up
            const maxNb = 5;
            var nb = Math.floor(Math.random() * (maxNb + 1));
            if(nb != 2) // 1 chance sur 5 d'afficher le pop-up
            {
                popup.remove();
                return;
            }

            // On ajoute le HTML nécessaire
            var htmlToRender = "<div>";
            htmlToRender += "<h3 id='PopupTitle'>" + data.title + "</h3>";
            htmlToRender += "<span id='PopupCloseBtn'>&times;</span>";
            htmlToRender += "</div>"
            htmlToRender += "<span id='PopupText'>" + data.description + "</span>";

            popup.innerHTML = htmlToRender;
            popup.classList.add('popin');

            // On s'abonne aux évènements
            document.querySelector('#PopupCloseBtn').addEventListener('click', () => 
            {
                // On va appliquer l'animation fadeOut
                popup.classList.remove('popin');
                popup.classList.add("popout");

                // On récupère la durée de l'animation
                const style = window.getComputedStyle(popup);
                const animationDuration = parseFloat(style.animationDuration) * 1000;
                // On supprime le popup après cette durée
                setTimeout(() => { popup.remove(); }, animationDuration);
            });

            // S'il y a une redirection à faire
            if(data.url_redirect != "")
            {
                document.querySelector('#PopupText').addEventListener('mouseover', () => 
                {
                    popup.style.cursor = 'pointer';
                });
                document.querySelector('#PopupText').addEventListener('mouseout', () => 
                {
                    popup.style.cursor = 'default';
                });
                document.querySelector('#PopupText').addEventListener('click', () => 
                {
                    window.location.href = data.url_redirect;
                });
            }

            // On affiche le pop-up par défaut
            popup.style.visibility = 'visible';
        }
    }
})
.catch(error => 
{
    console.error("Il y a eu une erreur lors de la récupération du fichier json contenant les données du pop-up :", error);
});