[![](./Images/Trapped_Logo.png)](https://mcdown.itch.io/trapped)
# Trapped

  Ce jeu est le plus gros projet sur lequel j'ai pu travailler jusqu'à présent. Il représente **2 ans** de développement, que ce soit dans la rédaction d'un [Game Design Document](https://docs.google.com/document/d/1_1KQkmH81AEaGpWc58F0cResZkfwV0hweFI6ZmrWNoI/edit?usp=sharing) ainsi que dans la réalisation du projet, disponible dans sa dernière version sur [itch.io](https://mcdown.itch.io/trapped).

  Cependant, il est aussi la **réalisation personnelle de mon manque d'expérience**. En effet, je me suis lancé dans un tel projet à l'âge de 15 ans, immédiatement après avoir réalisé mon premier jeu. Cela m'a certes apporté énormément de connaissance en termes d'**organisation**, de **technique de programmation** et d'**assiduité**, mais cela m'a également mis face à la réalité : j'étais incapable d'optimiser un tel programme.

  Je vous présente alors humblement ce projet, en temps que plus grande fierté, mais en toute humilité.
<br><br>

## Informations
- **Moteur de jeu :** Unity 3D
- **Type :** Sandbox
- **Status :** Abandonné
- **Assets Utilisées :** Aucune
- **Durée de réalisation :** 2 ans
- **Plateformes :** Windows, Mac, Linux
<br><br>

## Génération Procédurale
  Comme le jeu dont est fortement inspiré ce projet, le monde, composé de **voxels** (ou blocks), est généré **procéduralement**, à l'aide du *Bruit de Perlin*. Le tout est entièrement déterminé par une **graine de génération** et est ensuite **sauvegardé** automatiquement.
<video width="660" controls>
  <source src="./Videos/GenerationProcedurale.mp4" type="video/mp4">
  Votre navigateur ne supporte pas la lecture de vidéos HTML5.
</video>
<br><br>

## Environnement
  Dans ce jeu, nous étions censé incarner un alien recherchant des planètes habitables pour la survie de son espèce et dont le vaisseau s'est écrasé sur Terre. Étant vous-mêmes humain, vous serez intrigués d'apprendre pourquoi il ne reste qu'un **espace limité par un champ de force**, pourquoi l'humanité est revenue à **l'âge de pierre** et pourquoi **certains évènements rendent toutes les créatures follent**...

  Au stade actuel du développement, je n'ai pu créer que ce qu'on appelle des "**biomes**", qui représentent des environnements types. Il y en a un total de 9, possédant chacun des **souterrains** mais aussi des **îles flottantes** uniques.
<div style="justify-content: center;">
  <img src="./Images/VolcanoBiome.png" alt="Image 1" style="width: 32%;">
  <img src="./Images/DesertBiome.png" alt="Image 2" style="width: 32%;">
  <img src="./Images/InGameView.png" alt="Image 3" style="width: 32%;">
</div>
<br>
  Exemples de caves et d'îles flottantes :
<div style="justify-content: center;">
  <img src="./Images/FrozenCave.png" alt="Image 4" style="width: 48%;">
  <img src="./Images/FloatingIslands.png" alt="Image 5" style="width: 48%;">
</div>
<br>
  Il y a aussi un système d'**ambiance** qui ajoute un brouillard dans certaines zones :
<div style="justify-content: center;">
  <img src="./Images/FrozenForest.png" alt="Image 6" style="width: 48%;">
  <img src="./Images/IrradiatedBiome.png" alt="Image 7" style="width: 48%;">
</div>
<br>
  Et enfin, chaque biome ayant un terrain différent, il y a une gestion des transitions entre ceux-ci :
<div style="justify-content: center;">
  <img src="./Images/BiomeTransitions.png" alt="Image 8">
</div>
<br><br>

## Interactions
  Le joueur est capable d'interagir avec ces blocks : il peut les **sélectionner**, les **poser** et les **casser**. De plus, les blocks peuvent interagir entre eux de manière **indépendente**.

  C'est le cas par exemple des blocks de magma avec des blocks de pierre :
<video width="660" controls>
  <source src="./Videos/Trapped_HotStone.mp4" type="video/mp4">
  Votre navigateur ne supporte pas la lecture de vidéos HTML5.
</video>
<br>
  De certains liquides entre eux :
<video width="660" controls>
  <source src="./Videos/Trapped_LiquidReaction.mp4" type="video/mp4">
  Votre navigateur ne supporte pas la lecture de vidéos HTML5.
</video>
<br>
  Ou simplement lorsque l'on pose un block sur de la terre :
<video width="660" controls>
  <source src="./Videos/Trapped_GrassToDirt.mp4" type="video/mp4">
  Votre navigateur ne supporte pas la lecture de vidéos HTML5.
</video>
<br><br>

## Physique
  Le joueur peut se déplacer dans toutes les directions, en **marchant**, **courant**, **sautant** ou en **nageant** s'il se trouve dans un liquide. Ces actions consommeront de **l'endurance** et certaines ne lui seront plus accessibles s'il n'en a plus.<br>
De plus, certains blocks modifient ces déplacements : les feuilles ralentissent le joueur et la glace le fait glisser.
<video width="660" controls>
  <source src="./Videos/Trapped_Sliding.mp4" type="video/mp4">
  Votre navigateur ne supporte pas la lecture de vidéos HTML5.
</video>
<br>

<div style="display: flex; justify-content: space-between;">
    <div><a href="./index.html">Retour à la page principale</a></div>
    <div><a href="./slacken.html">Projet suivant</a></div>
</div>

