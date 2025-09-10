// Messages amusants pour l'application
export const funMessages = {
  welcomeMessages: [
    "🎉 Bienvenue dans l'organisation du cadeau le plus cool ! 🎉",
    "🎂 Préparons ensemble un anniversaire inoubliable ! 🎂",
    "✨ Ensemble, on va faire des merveilles ! ✨",
    "🎁 L'union fait la force... et les beaux cadeaux ! 🎁"
  ],
  
  successMessages: [
    "🎊 Super ! Tu es maintenant dans l'équipe cadeau ! 🎊",
    "🌟 Parfait ! Ton inscription a été prise en compte ! 🌟",
    "🎈 Génial ! Merci pour ta participation ! 🎈",
    "💫 Top ! Tu fais partie de l'aventure maintenant ! 💫"
  ],
  
  emptyStateMessages: [
    "🎈 Sois le premier à participer ! 🎈",
    "🌟 L'aventure commence avec toi ! 🌟",
    "🎯 À toi de jouer ! 🎯",
    "🚀 Lance les festivités ! 🚀"
  ],
  
  encouragementMessages: [
    "💪 Plus on est nombreux, plus c'est fun ! 💪",
    "🔥 L'équipe grandit, c'est fantastique ! 🔥",
    "⭐ Chaque participation compte ! ⭐",
    "🎪 Le spectacle continue ! 🎪"
  ]
};

export const getRandomMessage = (messageArray) => {
  return messageArray[Math.floor(Math.random() * messageArray.length)];
};
