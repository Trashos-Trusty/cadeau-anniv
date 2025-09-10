// Fonctions ultra simples pour Firebase
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { db, COLLECTION_NAME } from './firebase';

// Ajouter un participant
export const addParticipant = async (participant) => {
  try {
    await addDoc(collection(db, COLLECTION_NAME), participant);
    console.log('✅ Participant ajouté !');
  } catch (error) {
    console.error('❌ Erreur:', error);
    throw error;
  }
};

// Écouter les changements en temps réel
export const listenToParticipants = (callback) => {
  return onSnapshot(collection(db, COLLECTION_NAME), (snapshot) => {
    const participants = [];
    snapshot.forEach((doc) => {
      participants.push({ id: doc.id, ...doc.data() });
    });
    callback(participants);
  }, (error) => {
    console.error('❌ Erreur d\'écoute:', error);
  });
};

// Supprimer un participant
export const removeParticipant = async (participantId) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, participantId));
    console.log('✅ Participant supprimé !');
  } catch (error) {
    console.error('❌ Erreur suppression:', error);
    throw error;
  }
};
