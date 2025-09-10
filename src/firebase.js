// Configuration Firebase ultra simple pour le cadeau d'anniversaire
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuration Firebase (vous devrez remplacer par vos vraies clés)
const firebaseConfig = {

  apiKey: "AIzaSyAPWPS6HPdRraxXlUsIsokjzdCjC9z6dBw",

  authDomain: "cadeau-anniversaire.firebaseapp.com",

  projectId: "cadeau-anniversaire",

  storageBucket: "cadeau-anniversaire.firebasestorage.app",

  messagingSenderId: "286137104963",

  appId: "1:286137104963:web:374b02291fed8fedefb2f6"

};



// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firestore
export const db = getFirestore(app);

// Nom de la collection (vous pouvez changer si vous voulez)
export const COLLECTION_NAME = 'participants';
