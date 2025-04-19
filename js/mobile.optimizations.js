/**
 * Soluctions S.A - Otimizações Mobile JavaScript
 * Script complementar para melhorar performance e comportamento em dispositivos móveis
 */

document.addEventListener('DOMContentLoaded', () => {
  // Verificar se é dispositivo móvel
  const isMobile = window.innerWidth <= 768;
  
  // Ajustes específicos para dispositivos móveis
  if (isMobile) {
    // Inicializar otimizações mobile
    initMobileOptimizations();
    
    // Corrigir problemas do particles.js
    optimizeParticles();
    
    // Melhorar comportamento do menu mobile
    enhanceMobileMenu();
    
    // Corrigir posicionamento dos cards de estatísticas
    fixStatsCardPositioning();
  }
  
  // Adicionar listener para mudanças de orientação
  window.addEventListener('resize', handleOrientationChange);
  
  // Otimizações para qualquer dispositivo (inclui desktops e mobile)
  improveFormBehavior();
  enhanceChatbot();
});

/**
 * Inicializa otimizações gerais para dispositivos móveis
 */
function initMobileOptimizations() {
  // Reduzir complexidade das animações
  const animatedElements = document.querySelectorAll('[data-aos]');
  animatedElements.forEach(el => {
    // Simplificar animações
    el.setAttribute('data-aos-duration', '600');
    
    // Desativar mirror para economizar memória
    el.setAttribute('data-aos-mirror', 'false');
  });
  
  // Pausar animações de fundo pesadas
  const nonEssentialAnimations = document.querySelectorAll('.cyber-grid, .blob');
  nonEssentialAnimations.forEach(el => {
    el.style.animationPlayState = 'paused';
  });
  
  // Ajustar velocidade do preloader
  const loaderFill = document.querySelector('.loader-progress-fill');
  if (loaderFill) {
    loaderFill.style.transitionDuration = '1000ms';
  }
  
  // Detectar e ajustar problemas de altura do viewport em iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
}

/**
 * Otimiza as configurações do particles.js para mobile
 */
function optimizeParticles() {
  // Verificar se particles.js está instalado e inicializado
  if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    // Reduzir número de partículas e complexidade
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 30, // Reduzido de 80
          density: {
            enable: true,
            value_area: 800
          }
        },
        opacity: {
          value: 0.3, // Reduzido de 0.5
          random: true,
          anim: {
            enable: true,
            speed: 0.5, // Reduzido de 1
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 2, // Reduzido de 3
          random: true,
          anim: {
            enable: true,
            speed: 1, // Reduzido de 2
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 120, // Reduzido de 150
          color: "#00f3ff",
          opacity: 0.3, // Reduzido de 0.4
          width: 1
        },
        move: {
          enable: true,
          speed: 0.5, // Reduzido de 1
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false // Desabilitar para economizar processamento
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: false // Desabilitar interatividade hover em mobile
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          push: {
            particles_nb: 2 // Reduzido de 4
          }
        }
      },
      retina_detect: true
    });
  }
}

/**
 * Melhora o comportamento do menu mobile
 */
function enhanceMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
  
  if (mobileMenuBtn && mobileNav) {
    // Garantir fechamento do menu ao clicar nos links
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.style.transform = 'translateX(100%)';
        document.body.style.overflow = '';
        if (mobileNavOverlay) mobileNavOverlay.classList.remove('active');
        
        // Pequeno atraso antes de scrollar para evitar problemas de layout
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
    
    // Melhorar detecção de clique fora para fechar menu
    document.addEventListener('click', function(e) {
      const isMenuOpen = mobileNav.classList.contains('active');
      const isClickInsideMenu = mobileNav.contains(e.target);
      const isClickOnMenuButton = mobileMenuBtn.contains(e.target);
      
      if (isMenuOpen && !isClickInsideMenu && !isClickOnMenuButton) {
        mobileNav.classList.remove('active');
        mobileNav.style.transform = 'translateX(100%)';
        document.body.style.overflow = '';
        if (mobileNavOverlay) mobileNavOverlay.classList.remove('active');
      }
    });
  }
}

/**
 * Corrige posicionamento dos cards de estatísticas
 */
function fixStatsCardPositioning() {
  const statsCards = document.querySelectorAll('.cyber-stats-card');
  const cardContainer = document.querySelector('.cyber-card-container');
  
  if (statsCards.length && cardContainer) {
    statsCards.forEach(card => {
      // Remover posicionamento absoluto
      card.classList.remove('absolute');
      
      // Adicionar ao final do container como elemento relativo
      cardContainer.appendChild(card);
      
      // Ajustar estilo
      card.style.position = 'relative';
      card.style.margin = '0.5rem auto';
      card.style.transform = 'none';
      card.style.bottom = 'auto';
      card.style.left = 'auto';
      card.style.right = 'auto';
      card.style.top = 'auto';
    });
  }
}

/**
 * Gerencia mudanças de orientação no dispositivo
 */
function handleOrientationChange() {
  // Recalcular altura do viewport para iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Ajustar altura de seções que usam vh
    document.querySelectorAll('#hero, .min-h-screen').forEach(el => {
      el.style.height = `calc(var(--vh, 1vh) * 100)`;
    });
  }
  
  // Recalcular posicionamento em mudanças de orientação
  fixStatsCardPositioning();
  
  // Resetar overflow para garantir que o scroll continue funcionando
  document.body.style.overflow = '';
}

/**
 * Melhora o comportamento de formulários em dispositivos móveis
 */
function improveFormBehavior() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Evitar zoom em iOS ao focar campos
      input.style.fontSize = '16px';
      
      // Adicionar handler para melhorar scroll quando teclado virtual aparece
      input.addEventListener('focus', () => {
        // Em dispositivos móveis, scroll para o campo em foco
        if (window.innerWidth <= 768) {
          setTimeout(() => {
            input.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 300);
        }
      });
      
      // Fechar teclado ao submeter
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        input.blur();
        
        // Mostrar feedback de submissão (simulado)
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.innerHTML;
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
          submitBtn.disabled = true;
          
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            form.reset();
          }, 2000);
        }
      });
    });
  });
}

/**
 * Melhora o comportamento do chatbot em dispositivos móveis
 */
function enhanceChatbot() {
  const chatbotButton = document.getElementById('chatbot-button');
  const chatbotBox = document.getElementById('chatbot-box');
  
  if (chatbotButton && chatbotBox) {
    // Em mobile, garantir que o chat fique visível mesmo com teclado
    const chatbotInput = document.getElementById('chatbot-input');
    if (chatbotInput) {
      chatbotInput.addEventListener('focus', () => {
        if (window.innerWidth <= 768) {
          // Atrasar para permitir que o teclado virtual apareça
          setTimeout(() => {
            chatbotBox.scrollIntoView({ behavior: 'smooth', block: 'end' });
            // Ajustar altura para ficar acima do teclado
            chatbotBox.style.maxHeight = '250px';
          }, 300);
        }
      });
      
      chatbotInput.addEventListener('blur', () => {
        chatbotBox.style.maxHeight = '';
      });
    }
    
    // Melhorar feedback ao enviar mensagem
    const chatbotSend = document.getElementById('chatbot-send');
    if (chatbotSend) {
      chatbotSend.addEventListener('click', () => {
        // Efeito visual de clique
        chatbotSend.classList.add('pulse');
        setTimeout(() => {
          chatbotSend.classList.remove('pulse');
        }, 300);
      });
    }
  }
}

/**
 * Adiciona classe de animação para pulsar
 */
document.head.insertAdjacentHTML('beforeend', `
  <style>
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    .pulse {
      animation: pulse 0.3s ease-in-out;
    }
  </style>
`);