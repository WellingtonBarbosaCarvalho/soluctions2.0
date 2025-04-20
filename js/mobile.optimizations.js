/**
 * Soluctions S.A - Otimizações Mobile Avançadas
 * Script para melhorar a experiência e corrigir problemas específicos em dispositivos móveis
 */

document.addEventListener('DOMContentLoaded', () => {
  // Verificar se é dispositivo móvel
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Aplicar todas as otimizações mobile
    initMobileOptimizations();
  }
  
  // Adicionar listeners para mudanças de orientação/redimensionamento
  window.addEventListener('resize', handleScreenResize);
  window.addEventListener('orientationchange', handleOrientationChange);
});

/**
 * Inicializa todas as otimizações necessárias para dispositivos móveis
 */
function initMobileOptimizations() {
  // Reorganizar a área de hero e os cards de estatísticas
  reorganizeHeroSection();
  
  // Melhorar o chatbot mobile
  enhanceMobileChatbot();
  
  // Otimizar o menu mobile
  enhanceMobileMenu();
  
  // Melhorar a performance reduzindo animações pesadas
  optimizePerformance();
  
  // Melhorar a experiência em formulários
  enhanceFormExperience();
  
  // Adicionar detecção de gestos touch (se Hammer.js disponível)
  setupTouchGestures();
}

/**
 * Reorganiza a seção hero e os cards de estatísticas para mobile
 */
function reorganizeHeroSection() {
  const cardContainer = document.querySelector('.cyber-card-container');
  const statsCards = document.querySelectorAll('.cyber-stats-card');
  
  if (!cardContainer || !statsCards.length) return;
  
  // Criar wrapper para cards de estatísticas se não existir
  let statsWrapper = cardContainer.querySelector('.cyber-stats-wrapper');
  if (!statsWrapper) {
    statsWrapper = document.createElement('div');
    statsWrapper.className = 'cyber-stats-wrapper';
    cardContainer.appendChild(statsWrapper);
  }
  
  // Mover os cards para o wrapper
  statsCards.forEach(card => {
    // Remover posicionamento absoluto
    card.style.position = 'static';
    card.style.transform = 'none';
    card.style.top = 'auto';
    card.style.left = 'auto';
    card.style.right = 'auto';
    card.style.bottom = 'auto';
    
    // Reorganizar layout interno para coluna
    const flexContainer = card.querySelector('.flex');
    if (flexContainer) {
      flexContainer.style.flexDirection = 'column';
      flexContainer.style.alignItems = 'center';
      flexContainer.style.textAlign = 'center';
      
      // Ajustar espaçamento
      const icon = flexContainer.querySelector('.h-10.w-10');
      if (icon) {
        icon.style.marginRight = '0';
        icon.style.marginBottom = '0.5rem';
      }
      
      const textContainer = flexContainer.querySelector('div:last-child');
      if (textContainer) {
        textContainer.style.textAlign = 'center';
      }
    }
    
    // Mover para o wrapper
    statsWrapper.appendChild(card);
  });
}

/**
 * Melhora o chatbot para dispositivos móveis
 */
function enhanceMobileChatbot() {
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotButton = document.getElementById('chatbot-button');
  const chatbotBox = document.getElementById('chatbot-box');
  
  if (!chatbotContainer || !chatbotButton || !chatbotBox) return;
  
  // Garantir z-index correto
  chatbotContainer.style.zIndex = '9999';
  chatbotBox.style.zIndex = '10000';
  
  // Ajustar posicionamento
  chatbotButton.style.position = 'fixed';
  chatbotButton.style.bottom = '1rem';
  chatbotButton.style.right = '1rem';
  
  // Configurar caixa do chatbot
  chatbotBox.style.position = 'fixed';
  chatbotBox.style.bottom = '5rem';
  chatbotBox.style.right = '1rem';
  chatbotBox.style.width = 'calc(100% - 2rem)';
  chatbotBox.style.maxWidth = '320px';
  
  // Melhorar área de mensagens
  const messagesContainer = document.getElementById('chatbot-messages');
  if (messagesContainer) {
    messagesContainer.style.padding = '1rem';
    messagesContainer.style.backgroundColor = 'rgba(18, 18, 31, 0.95)';
  }
  
  // Tratar comportamento com teclado virtual em iOS/Android
  const chatbotInput = document.getElementById('chatbot-input');
  if (chatbotInput) {
    chatbotInput.addEventListener('focus', () => {
      // Pequeno delay para permitir que o teclado apareça
      setTimeout(() => {
        chatbotBox.classList.add('keyboard-visible');
        window.scrollTo(0, document.body.scrollHeight);
      }, 300);
    });
    
    chatbotInput.addEventListener('blur', () => {
      chatbotBox.classList.remove('keyboard-visible');
    });
  }
  
  // Melhorar feedback visual nos botões
  const sendButton = document.getElementById('chatbot-send');
  if (sendButton) {
    sendButton.addEventListener('click', () => {
      sendButton.classList.add('pulse');
      setTimeout(() => sendButton.classList.remove('pulse'), 300);
    });
  }
  
  // Adicionar animação de entrada quando o chatbot é aberto
  chatbotButton.addEventListener('click', () => {
    chatbotBox.style.animation = 'chatbot-appear 0.3s ease-out';
  });
}

/**
 * Melhora o menu mobile
 */
function enhanceMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  
  if (!mobileMenuBtn || !mobileNav) return;
  
  // Melhorar z-index para evitar sobreposições
  mobileNav.style.zIndex = '1000';
  if (mobileNavOverlay) mobileNavOverlay.style.zIndex = '999';
  
  // Adicionar classe para animação suave
  mobileNav.classList.add('mobile-transition');
  
  // Garantir que links fechem o menu ao serem clicados
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
      
      // Pequeno delay para melhorar experiência de navegação
      setTimeout(() => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      }, 300);
    });
  });
  
  // Função para fechar o menu
  function closeMenu() {
    mobileNav.classList.remove('active');
    mobileNav.style.transform = 'translateX(100%)';
    document.body.style.overflow = '';
    if (mobileNavOverlay) mobileNavOverlay.classList.remove('active');
  }
}

/**
 * Otimiza a performance reduzindo animações pesadas
 */
function optimizePerformance() {
  // Reduzir número de partículas em particles.js
  if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 30 // Reduzido de 80
        },
        "opacity": {
          "value": 0.3 // Reduzido para melhor performance
        },
        "size": {
          "value": 2 // Reduzido para melhor performance
        },
        "line_linked": {
          "distance": 120, // Reduzido
          "opacity": 0.3 // Reduzido
        },
        "move": {
          "speed": 0.5 // Reduzido
        }
      },
      "interactivity": {
        "events": {
          "onhover": {
            "enable": false // Desativado em mobile para economizar recursos
          }
        }
      }
    });
  }
  
  // Pausar algumas animações CSS para economizar recursos
  const heavyAnimations = document.querySelectorAll('.cyber-grid, .blob');
  heavyAnimations.forEach(el => {
    el.style.animationPlayState = 'paused';
  });
}

/**
 * Melhora a experiência em formulários mobile
 */
function enhanceFormExperience() {
  const formInputs = document.querySelectorAll('input, textarea, select');
  
  formInputs.forEach(input => {
    // Tamanho de fonte seguro para evitar zoom indesejado em iOS
    input.style.fontSize = '16px';
    
    // Adicionar focus visual
    input.addEventListener('focus', () => {
      input.style.borderColor = 'var(--color-neon-blue)';
      input.style.boxShadow = '0 0 10px rgba(0, 243, 255, 0.3)';
      
      // Scroll para o campo em foco com pequeno delay
      setTimeout(() => {
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    });
    
    input.addEventListener('blur', () => {
      input.style.borderColor = '';
      input.style.boxShadow = '';
    });
  });
  
  // Melhorar feedback visual em botões de submit
  const submitButtons = document.querySelectorAll('button[type="submit"]');
  submitButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.classList.add('pulse');
      setTimeout(() => button.classList.remove('pulse'), 300);
    });
  });
}

/**
 * Configura gestos touch para melhorar a navegação
 */
function setupTouchGestures() {
  // Verificar se Hammer.js está disponível
  if (typeof Hammer === 'undefined') {
    // Carregar Hammer.js dinamicamente se não estiver disponível
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js';
    script.onload = () => {
      // Inicializar gestos após carregamento
      initTouchGestures();
    };
    document.head.appendChild(script);
  } else {
    // Inicializar gestos diretamente
    initTouchGestures();
  }
}

/**
 * Inicializa gestos touch específicos
 */
function initTouchGestures() {
  if (typeof Hammer === 'undefined') return;
  
  // Swipe para fechar menu mobile
  const mobileNav = document.querySelector('.mobile-nav');
  if (mobileNav) {
    const hammer = new Hammer(mobileNav);
    hammer.on('swiperight', () => {
      mobileNav.classList.remove('active');
      mobileNav.style.transform = 'translateX(100%)';
      document.body.style.overflow = '';
      
      const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
      if (mobileNavOverlay) mobileNavOverlay.classList.remove('active');
    });
  }
  
  // Swipe para fechar chatbot
  const chatbotBox = document.getElementById('chatbot-box');
  if (chatbotBox) {
    const hammer = new Hammer(chatbotBox);
    hammer.on('swipedown', () => {
      chatbotBox.classList.add('hidden');
      const chatbotButton = document.getElementById('chatbot-button');
      if (chatbotButton) chatbotButton.classList.remove('hidden');
    });
  }
}

/**
 * Manipula mudanças de tamanho de tela
 */
function handleScreenResize() {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Aplicar otimizações mobile se não estiverem aplicadas
    initMobileOptimizations();
  } else {
    // Reverter otimizações mobile
    resetMobileOptimizations();
  }
}

/**
 * Manipula mudanças de orientação em dispositivos móveis
 */
function handleOrientationChange() {
  // Pequeno delay para permitir que a tela se ajuste
  setTimeout(() => {
    // Recalcular layout
    reorganizeHeroSection();
    
    // Ajustar chatbot
    const chatbotBox = document.getElementById('chatbot-box');
    if (chatbotBox && !chatbotBox.classList.contains('hidden')) {
      chatbotBox.style.bottom = '5rem';
      chatbotBox.style.right = '1rem';
    }
  }, 300);
}

/**
 * Reverte otimizações mobile quando em desktop
 */
function resetMobileOptimizations() {
  // Restaurar cards de estatísticas para desktop
  resetHeroLayoutForDesktop();
  
  // Restaurar animações
  const animations = document.querySelectorAll('.cyber-grid, .blob');
  animations.forEach(el => {
    el.style.animationPlayState = '';
  });
}

/**
 * Restaura o layout da seção hero para desktop
 */
function resetHeroLayoutForDesktop() {
  const cardContainer = document.querySelector('.cyber-card-container');
  const statsCards = document.querySelectorAll('.cyber-stats-card');
  const statsWrapper = document.querySelector('.cyber-stats-wrapper');
  
  if (!cardContainer || !statsCards.length) return;
  
  // Remover wrapper e restaurar cards para posição original
  if (statsWrapper) {
    // Mover cards de volta para container principal
    statsCards.forEach((card, index) => {
      // Limpar estilos inline
      card.style.position = '';
      card.style.transform = '';
      card.style.top = '';
      card.style.left = '';
      card.style.right = '';
      card.style.bottom = '';
      
      // Restaurar posição original
      if (index === 0) {
        card.style.position = 'absolute';
        card.style.bottom = '-5px';
        card.style.left = '-5px';
      } else if (index === 1) {
        card.style.position = 'absolute';
        card.style.top = '-5px';
        card.style.right = '-5px';
      }
      
      // Restaurar layout interno
      const flexContainer = card.querySelector('.flex');
      if (flexContainer) {
        flexContainer.style.flexDirection = '';
        flexContainer.style.alignItems = '';
        flexContainer.style.textAlign = '';
        
        const icon = flexContainer.querySelector('.h-10.w-10');
        if (icon) {
          icon.style.marginRight = '';
          icon.style.marginBottom = '';
        }
        
        const textContainer = flexContainer.querySelector('div:last-child');
        if (textContainer) {
          textContainer.style.textAlign = '';
        }
      }
      
      // Mover para o container principal
      cardContainer.appendChild(card);
    });
    
    // Remover wrapper
    statsWrapper.remove();
  }
}

/**
 * Adiciona pulsação ao chatbot para chamar atenção
 * Esta função adiciona uma animação sutil ao botão do chatbot
 * para aumentar a visibilidade e engajamento
 */
document.addEventListener('DOMContentLoaded', () => {
  const chatbotButton = document.getElementById('chatbot-button');
  
  if (chatbotButton) {
    // Adicionar classe de pulsação após um pequeno delay
    setTimeout(() => {
      chatbotButton.classList.add('pulse-attention');
      
      // Remover após alguns pulsos
      setTimeout(() => {
        chatbotButton.classList.remove('pulse-attention');
      }, 5000);
    }, 3000);
  }
  
  // Adicionar estilo para a animação
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse-attention {
      0% { transform: scale(1); box-shadow: 0 0 10px rgba(0, 243, 255, 0.5); }
      50% { transform: scale(1.1); box-shadow: 0 0 20px rgba(0, 243, 255, 0.7); }
      100% { transform: scale(1); box-shadow: 0 0 10px rgba(0, 243, 255, 0.5); }
    }
    
    .pulse-attention {
      animation: pulse-attention 1s ease-in-out infinite;
    }
    
    .pulse {
      animation: pulse 0.3s ease-in-out;
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    
    /* Classe para transição suave no menu */
    .mobile-transition {
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  `;
  document.head.appendChild(style);
});