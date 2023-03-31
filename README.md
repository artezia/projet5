# Kanap #
Voici les dossiers front et back du projet 5 OpenClassRoom. 
Dans ce projet il s'agissait d'intégrer dynamiquement les éléments de l’API dans les différentes pages web avec JavaScript. 

# Back end pré-recquis #

Vous devez avoir Node installé localement et `npm` sur votre ordinateur. https://nodejs.org/en/

# Lancer le site #

# 1 . depuis VS CODE avec live server #
Utiliser les fichiers contenu dans le zip fournit ou Créer un dossier dans lequel vous allez accueillir le projet en clonant le repository : git clone https://github.com/artezia/projet5

Ouvrir le terminal, utiliser la commande `cd` pour aller dans le dossier back.  
Saisissez ensuite `npm install` et `node server` dans le temrinal.
Le serveur doit s'exécuter sur localhost avec le port par défaut 3000. A défaut, utilisez le port 3001.

Vous pouvez maintenant aller dans le dossier front, ouvrir le fichier index.html ou le lancer directement depuis VS Code avec live server.
# 2. Avec git #

Ou installer git depuis cette url : https://git-scm.com/
Ouvrir le dossier "back" dans l'explorateur de fichier, faire un clic droit et executer "git bash here". 
Taper ensuite `node server` dans l'invit de commande.

# 3 . Avec un serveur web local

Taper `cd back` (pour aller dans le dossier back), `npm install` et `node server`.

Installer le serveur sur l'ordinateur 
`npm install --global http-server` (si vous l'avez déjà passez directement à l'étape suivante)

Lancez le : `http-server front`

Ouvrez votre navigateur à l'une des adresses suivantes :
http://192.168.1.20:8080
http://127.0.0.1:8080