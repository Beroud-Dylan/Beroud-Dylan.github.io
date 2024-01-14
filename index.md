# Accueil
Bonjour, je me présente, moi c'est **Dylan** !

J'étudie actuellement à l'**école d'ingénieurs du CESI** et réalise quelques **projets informatiques** sur mon temps libre.<br> Ce site sert justement à avoir une **présentation concise** de certains projets jugés "présentables".

J'aime énormément tout ce qui est lié à l'**univers de la création**. C'est certes assez vaste, mais cela représente aussi l'étendu de ma **curiosité** !<br>
C'est en découvrant Unity à l'âge de 14 ans que j'ai réellement commencé à me lancer plus sérieusement sur mes passions : **créations de jeux vidéos**, **d'animations** et maintenant de **livres**, je m'épanouis dans ce monde infini que permet l'imagination.
<br><br>

## Jeux
Voici donc une liste non-exhaustive de jeux-vidéos que j'ai réalisés :
<div style="justify-content: space-between; align-items: center;">
  <a href="./trapped.html"><img src="./Images/Trapped_Logo.png" alt="Trapped Logo" style="width: 32%;"></a>
  <a href="./slacken.html"><img src="./Images/Slacken_1.png" alt="Slacken Logo" style="width: 32%;"></a>
  <a href="./rocknfall.html"><img src="./Images/Rock'n'Fall_1.png" alt="Rock'n'Fall Logo" style="width: 32%;"></a>
</div>
<div style="justify-content: space-between; align-items: center;">
  <a href="./punkfighter.html"><img src="./Images/PunkFighter_Logo.png" alt="PunkFighter Logo" style="width: 32%;"></a>
  <a href="./soulinthecastle.html"><img src="./Images/SoulInTheCastle_Logo.png" alt="SoulInTheCastle Logo" style="width: 32%;"></a>
  <a href="./ratattack.html"><img src="./Images/RatAttackLogo.PNG" alt="RatAttack Logo" style="width: 32%;"></a>
</div>
<br><br>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Votre Parcours</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }

    .timeline {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: #F1C300; /* Couleur de fond de la timeline */
      color: #1D1D1D; /* Couleur du texte de la timeline */
      padding: 10px;
      position: relative;
    }

    .timeline-item {
      flex: 1;
      text-align: center;
      cursor: pointer;
      position: relative;
      font-weight: bold; /* Texte en gras */
    }

    .timeline-item::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #333;
      transform: translateY(-50%);
      z-index: -1;
    }

    .timeline-item.active::before {
      background-color: #007bff; /* Couleur pour l'onglet actif */
    }

    .timeline-item:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 100%;
      width: 15px;
      height: 15px;
      background-color: #F1C300; /* Couleur de fond de la flèche */
      border-radius: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    }

    .content {
      display: none;
    }

    .content.active {
      display: block;
      text-align: center;
      padding: 20px;
    }
  </style>
</head>
<body>

<div class="timeline">
  <div class="timeline-item" onclick="showContent(0)">Étape 1</div>
  <div class="timeline-item" onclick="showContent(1)">Étape 2</div>
  <div class="timeline-item" onclick="showContent(2)">Étape 3</div>
  <!-- Ajoutez plus d'étapes au besoin -->
</div>

<div id="content-0" class="content active">
  <h2>Étape 1</h2>
  <p>Description de l'étape 1.</p>
</div>

<div id="content-1" class="content">
  <h2>Étape 2</h2>
  <p>Description de l'étape 2.</p>
</div>

<div id="content-2" class="content">
  <h2>Étape 3</h2>
  <p>Description de l'étape 3.</p>
</div>

<script>
  function showContent(index) {
    // Masquer tous les contenus
    var contents = document.querySelectorAll('.content');
    contents.forEach(function(content) {
      content.classList.remove('active');
    });

    // Afficher le contenu correspondant à l'index
    var selectedContent = document.getElementById('content-' + index);
    selectedContent.classList.add('active');

    // Mettre en surbrillance l'onglet actif
    var items = document.querySelectorAll('.timeline-item');
    items.forEach(function(item) {
      item.classList.remove('active');
    });
    items[index].classList.add('active');
  }
</script>

</body>

-----------------
### **Contact**
<div style="display: flex; justify-content: space-between;">
    <div style="flex: 1; text-align: left;"><a href="https://www.linkedin.com/in/beroud-dylan/"><img src="./Images/LinkedInLogo.png" alt="LinkedIn Logo" style="width:4%;"> /in/beroud-dylan</a></div>
    <div style="flex: 1; text-align: left; margin-left:-70px"><a href="mailto:dylan.beroud13@gmail.com"><img src="./Images/EmailLogo.png" alt="Email Logo" style="width:4%;"> dylan.beroud13@gmail.com</a> </div>
    <div style="text-align: right">® Tous droits réservés</div>
</div>



