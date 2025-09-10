import React, { useState, useEffect } from 'react';
import './App.css';
import Confetti from './Confetti';
import { funMessages, getRandomMessage } from './messages';
import { addParticipant, listenToParticipants, removeParticipant } from './firebaseHelpers';

function App() {
  const [participants, setParticipants] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    isAnonymous: false,
    giftType: 'commun' // 'commun' ou 'individuel'
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(getRandomMessage(funMessages.welcomeMessages));
  const [loading, setLoading] = useState(false);

  // Écouter les participants en temps réel avec Firebase
  useEffect(() => {
    const unsubscribe = listenToParticipants((newParticipants) => {
      setParticipants(newParticipants);
    });

    // Nettoyer l'écoute quand le composant se démonte
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name.trim() && (formData.giftType === 'individuel' || formData.amount)) {
      setLoading(true);
      try {
        const newParticipant = {
          name: formData.isAnonymous ? '🎭 Anonyme' : formData.name,
          amount: formData.giftType === 'commun' ? parseFloat(formData.amount) : null,
          giftType: formData.giftType,
          timestamp: new Date().toLocaleString('fr-FR')
        };
        
        await addParticipant(newParticipant);
        setFormData({ name: '', amount: '', isAnonymous: false, giftType: 'commun' });
        setShowConfetti(true);
        setCurrentMessage(getRandomMessage(funMessages.successMessages));
      } catch (error) {
        console.error('Erreur lors de l\'ajout:', error);
        alert('Oups ! Erreur lors de l\'ajout. Réessayez !');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemoveParticipant = async (id) => {
    try {
      await removeParticipant(id);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression. Réessayez !');
    }
  };

  const totalAmount = participants
    .filter(p => p.giftType === 'commun')
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const commonGiftParticipants = participants.filter(p => p.giftType === 'commun');
  const individualGiftParticipants = participants.filter(p => p.giftType === 'individuel');

  return (
    <div className="App">
      <header className="App-header">
        <div className="birthday-title">
          <h1>🎉 Cadeau d'Anniversaire 🎂</h1>
          <p className="subtitle">{currentMessage}</p>
        </div>


        <div className="main-content">
          <div className="left-panel">
            {showForm && (
              <div className="form-container">
                <form onSubmit={handleSubmit} className="participation-form">
                  <h3>Comment veux-tu participer ? 🤔</h3>
                  
                  <div className="gift-type-selector">
                    <label className={`gift-option ${formData.giftType === 'commun' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        value="commun"
                        checked={formData.giftType === 'commun'}
                        onChange={(e) => setFormData({...formData, giftType: e.target.value})}
                      />
                      <span className="option-content">
                        <span className="emoji">💰</span>
                        <span className="text">Je participe au cadeau commun</span>
                      </span>
                    </label>
                    
                    <label className={`gift-option ${formData.giftType === 'individuel' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        value="individuel"
                        checked={formData.giftType === 'individuel'}
                        onChange={(e) => setFormData({...formData, giftType: e.target.value})}
                      />
                      <span className="option-content">
                        <span className="emoji">🎁</span>
                        <span className="text">Je fais mon propre cadeau</span>
                      </span>
                    </label>
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Ton prénom 😊"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  {formData.giftType === 'commun' && (
                    <div className="form-group">
                      <input
                        type="number"
                        placeholder="Montant en € 💸"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        min="1"
                        step="0.01"
                        required
                      />
                    </div>
                  )}

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.isAnonymous}
                        onChange={(e) => setFormData({...formData, isAnonymous: e.target.checked})}
                      />
                      <span className="checkmark"></span>
                      🎭 Rester anonyme
                    </label>
                  </div>

                  <div className="form-buttons">
                    <button type="submit" className="btn btn-success" disabled={loading}>
                      {loading ? '⏳ Ajout...' : (formData.giftType === 'commun' ? '💰 Participer' : '🎁 M\'inscrire')}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className="right-panel">
            <div className="results-container">
              {commonGiftParticipants.length > 0 && (
                <div className="result-card common-gift-card">
                  <div className="card-header">
                    <h3>💰 Cadeau Commun</h3>
                    <span className="participant-count">
                      {commonGiftParticipants.length} participant{commonGiftParticipants.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="total-amount-display">
                    <div className="total-label">Total collecté</div>
                    <div className="total-value">{totalAmount.toFixed(2)} €</div>
                    <div className="celebration-emoji">🎉</div>
                  </div>
                  
                  <div className="participants-list-compact">
                    {commonGiftParticipants.map(participant => (
                      <div key={participant.id} className="participant-item">
                        <div className="participant-details">
                          <span className="participant-name">{participant.name}</span>
                          <span className="participant-amount">{participant.amount.toFixed(2)} €</span>
                        </div>
                        <button 
                          className="remove-btn-small"
                          onClick={() => handleRemoveParticipant(participant.id)}
                          title="Supprimer"
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {individualGiftParticipants.length > 0 && (
                <div className="result-card individual-gift-card">
                  <div className="card-header">
                    <h3>🎁 Cadeaux Individuels</h3>
                    <span className="participant-count">
                      {individualGiftParticipants.length} participant{individualGiftParticipants.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="participants-list-compact">
                    {individualGiftParticipants.map(participant => (
                      <div key={participant.id} className="participant-item individual">
                        <div className="participant-details">
                          <span className="participant-name">{participant.name}</span>
                          <span className="participant-gift-type">Cadeau personnel 🎁</span>
                        </div>
                        <button 
                          className="remove-btn-small"
                          onClick={() => handleRemoveParticipant(participant.id)}
                          title="Supprimer"
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {participants.length === 0 && (
                <div className="empty-results">
                  <div className="empty-icon">🎈</div>
                  <p>{getRandomMessage(funMessages.emptyStateMessages)}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {participants.length > 0 && (
          <div className="summary">
            <div className="summary-card">
              <h4>📊 Récapitulatif</h4>
              <p>👥 {participants.length} participant{participants.length > 1 ? 's' : ''} au total</p>
              {commonGiftParticipants.length > 0 && (
                <p>💰 {totalAmount.toFixed(2)} € collectés pour le cadeau commun</p>
              )}
              {individualGiftParticipants.length > 0 && (
                <p>🎁 {individualGiftParticipants.length} cadeau{individualGiftParticipants.length > 1 ? 'x' : ''} individuel{individualGiftParticipants.length > 1 ? 's' : ''}</p>
              )}
            </div>
          </div>
        )}
      </header>
      
      <Confetti 
        show={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
    </div>
  );
}

export default App;