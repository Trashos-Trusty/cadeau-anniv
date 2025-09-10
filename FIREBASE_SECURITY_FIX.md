# 🔒 Corriger l'erreur Firebase - Règles de sécurité

## Le problème
Firebase bloque les écritures par défaut pour la sécurité.

## 🚀 Solution ultra rapide (2 minutes) :

### 1. Aller dans Firebase Console
1. https://console.firebase.google.com/
2. Sélectionnez votre projet `cadeau-anniversaire`
3. Allez dans **Firestore Database**
4. Cliquez sur l'onglet **"Règles"** (Rules)

### 2. Remplacer les règles
Vous verrez quelque chose comme :
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

**Remplacez par ça :**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 3. Publier
1. Cliquez sur **"Publier"** (Publish)
2. Attendez quelques secondes

## ✅ C'est corrigé !

Maintenant l'application peut lire et écrire dans Firebase !

## 🔒 Note de sécurité
Cette règle permet à tout le monde de lire/écrire. C'est parfait pour un cadeau d'anniversaire temporaire, mais pas pour une vraie app.

Après l'anniversaire, supprimez le projet Firebase pour nettoyer !
