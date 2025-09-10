# 🔥 Configuration Firebase Ultra Simple

## 1. Créer un projet Firebase (GRATUIT !)

1. Allez sur https://console.firebase.google.com/
2. Cliquez sur "Créer un projet"
3. Nom du projet : `cadeau-anniversaire` (ou ce que vous voulez)
4. Désactivez Google Analytics (pas besoin pour ça)
5. Cliquez sur "Créer le projet"

## 2. Configurer Firestore

1. Dans votre projet Firebase, allez dans "Firestore Database"
2. Cliquez sur "Créer une base de données"
3. Choisissez "Démarrer en mode test" (pour 30 jours gratuits)
4. Choisissez une région (Europe-west1 par exemple)

## 3. Récupérer la configuration

1. Allez dans "Paramètres du projet" (icône engrenage)
2. Descendez jusqu'à "Vos applications"
3. Cliquez sur l'icône web `</>`
4. Nom de l'app : `cadeau-anniversaire`
5. Copiez la configuration qui ressemble à ça :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "cadeau-anniversaire-xxxxx.firebaseapp.com",
  projectId: "cadeau-anniversaire-xxxxx",
  storageBucket: "cadeau-anniversaire-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};
```

## 4. Remplacer dans le fichier

Remplacez le contenu de `src/firebase.js` avec vos vraies clés !

## 5. Déployer sur Vercel

1. `npm run build`
2. Déployez sur Vercel
3. Partagez le lien !

## 🎉 C'est tout !

Maintenant tous les participants verront les mêmes données en temps réel !

**Important :** Après l'anniversaire, vous pouvez supprimer le projet Firebase pour nettoyer.
