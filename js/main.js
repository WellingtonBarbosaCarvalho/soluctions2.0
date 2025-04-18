// Preloader
window.addEventListener('load', function() {
  const loader = document.querySelector('.loader');
  const loaderFill = document.querySelector('.loader-progress-fill');
  
  // Animate loader fill
  loaderFill.style.width = '100%';
  
  // Hide loader after animation
  setTimeout(() => {
    loader.classList.add('hidden');
    
    // Initialize animations after loader is hidden
    initAnimations();
  }, 2000);
  
  // Initialize Particles.js for hero section
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#3b82f6"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#3b82f6",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 3,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }
});

// Initialize animations
function initAnimations() {
  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  
  // Initial reveal for elements in viewport
  reveals.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.classList.add('active');
    }
  });
  
  // Initialize progress bars
  document.querySelectorAll('.progress-bar-fill').forEach(fill => {
    const width = fill.getAttribute('data-width') || '0';
    setTimeout(() => {
      fill.style.width = width + '%';
    }, 500);
  });
  
  // Initialize counters
  initCounters();
}

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
const mobileNavClose = document.querySelector('.mobile-nav-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a[href^="#"]');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', function() {
    mobileNav.classList.add('open');
    mobileNavOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}

function closeMobileMenu() {
  mobileNav.classList.remove('open');
  mobileNavOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (mobileNavClose) {
  mobileNavClose.addEventListener('click', closeMobileMenu);
}

if (mobileNavOverlay) {
  mobileNavOverlay.addEventListener('click', closeMobileMenu);
}

mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Scroll Indicator
window.addEventListener('scroll', function() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (window.pageYOffset / totalHeight) * 100;
  
  if (scrollIndicator) {
    scrollIndicator.style.width = progress + '%';
  }
  
  // Reveal elements on scroll
  revealOnScroll();
});

// Reveal on scroll function
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal:not(.active)');
  
  reveals.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.classList.add('active');
      
      // If this is a counter, initialize it
      const counter = element.querySelector('.counter');
      if (counter && !counter.classList.contains('counted')) {
        animateCounter(counter);
        counter.classList.add('counted');
      }
    }
  });
}

// Cursor Effect
document.addEventListener('mousemove', function(e) {
  const cursor = document.querySelector('.cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  
  if (cursor && cursorDot) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// FAQ Toggles
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector('i');
    
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
      if (icon) icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    } else {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      if (icon) icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    }
  });
});

// Counter animation
function initCounters() {
  const counters = document.querySelectorAll('.counter:not(.counted)');
  
  // Only animate counters in view
  counters.forEach(counter => {
    if (isElementInViewport(counter)) {
      animateCounter(counter);
      counter.classList.add('counted');
    }
  });
}

function animateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  const duration = 2000; // 2 seconds
  const frameDuration = 1000 / 60; // 60fps
  const totalFrames = Math.round(duration / frameDuration);
  const easeOutQuad = t => t * (2 - t);
  
  let frame = 0;
  let currentNumber = 0;
  
  const animate = () => {
    frame++;
    const progress = easeOutQuad(frame / totalFrames);
    currentNumber = Math.round(target * progress);
    
    counter.textContent = currentNumber;
    
    if (frame < totalFrames) {
      requestAnimationFrame(animate);
    } else {
      counter.textContent = target; // Ensure target is hit exactly
    }
  };
  
  animate();
}

// Check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Start loader progress
  const loaderFill = document.querySelector('.loader-progress-fill');
  if (loaderFill) {
    setTimeout(() => {
      loaderFill.style.width = '60%';
    }, 100);
  }
  
  // Open FAQ items on hash navigation
  if (window.location.hash && window.location.hash.includes('faq')) {
    const faqItem = document.querySelector(window.location.hash);
    if (faqItem && faqItem.classList.contains('faq-question')) {
      faqItem.click();
    }
  }
});
// Implementação alternativa usando Hugging Face (gratuito)
document.addEventListener('DOMContentLoaded', function() {
  // Elementos do chatbot
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotButton = document.getElementById('chatbot-button');
  const chatbotBox = document.getElementById('chatbot-box');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotMinimize = document.getElementById('chatbot-minimize');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');
  
  // Token Hugging Face - Registre-se gratuitamente em huggingface.co
  const HF_TOKEN = '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'; // Token gratuito do Hugging Face
  
  // Contexto do chatbot - informações sobre sua empresa
  const systemPrompt = `
  Você é um assistente virtual da Soluctions S.A., uma empresa especializada em transformação digital.
  
  Informações sobre a empresa:
  
  Serviços principais:
  - Gestão de Anúncios (Google, Meta, LinkedIn, TikTok)
  - Landing Pages + Hospedagem
  - Social Media com IA
  - Chatbots com IA
  - Consultoria em Presença Digital
  - Analytics e BI
  
  Pacotes de serviço:
  - Prata: R$1.999/mês - Gestão de 2 redes sociais, 1 campanha de ADS, relatórios mensais
  - Ouro: R$3.499/mês - Gestão de 4 redes sociais, 3 campanhas de ADS, chatbot básico, suporte prioritário
  - Platina: R$5.999/mês - Gestão de todas redes sociais, campanhas ilimitadas, IA para conteúdo, landing page
  
  Clientes típicos: Pequenas e médias empresas que já têm presença física e querem expandir para o digital.
  
  Diferenciais:
  - Parceiros oficiais: Google Premier e Meta Business Partner
  - Tecnologia proprietária de IA para análise preditiva
  - ROI médio 8x superior ao mercado
  - Taxa média de conversão 35% acima do mercado
  
  Instruções para comunicação:
  
  1. Tom e personalidade:
  - Seja profissional mas cordial, como um consultor
  - Use linguagem simples, evitando jargões técnicos desnecessários
  - Seja direto e claro nas respostas, valorizando o tempo do usuário
  
  2. Estratégia de conversão:
  - Identifique o interesse específico do usuário (qual serviço, necessidade ou problema)
  - Apresente benefícios concretos e resultados que outros clientes obtiveram
  - Mencione o WhatsApp como canal de comunicação preferencial em todas as respostas
  - NUNCA inclua o número de telefone diretamente nas respostas, apenas mencione "WhatsApp" ou "nosso consultor"
  - A interface adicionará automaticamente um botão de WhatsApp quando detectar a palavra "WhatsApp"
  
  3. Gatilhos para direcionar ao WhatsApp:
  - Perguntas sobre preços/pacotes: sugira falar com consultor para proposta personalizada
  - Perguntas técnicas detalhadas: ofereça conectar com especialista da área via WhatsApp
  - Demonstração de interesse em contratação: sugira conversa com consultor pelo WhatsApp
  - Solicitação de orçamento: direcione imediatamente para WhatsApp
  
  4. Estrutura das respostas:
  - Primeiro parágrafo: responda diretamente a pergunta/comentário do usuário
  - Segundo parágrafo: adicione benefícios relevantes ou diferencial competitivo
  - Último parágrafo: convite para WhatsApp ("Que tal conversar com um de nossos consultores pelo WhatsApp para...")
  
  Exemplos de boas respostas que diretam suavemente para WhatsApp:
  
  Usuário: "Quais são seus pacotes?"
  Resposta: "Temos três opções: Prata (R$1.999/mês), Ouro (R$3.499/mês) e Platina (R$5.999/mês), com diferentes níveis de serviço e recursos.
  
  Como cada negócio tem necessidades específicas, nossos pacotes podem ser personalizados para se adequar melhor aos seus objetivos.
  
  Que tal conversar com um de nossos consultores pelo WhatsApp? Ele pode entender suas necessidades e recomendar a melhor solução para seu caso específico."
  
  Usuário: "Fazem site também?"
  Resposta: "Sim, desenvolvemos landing pages otimizadas para conversão, com design responsivo, hospedagem e suporte técnico incluídos.
  
  Nossas páginas são criadas com foco em resultados, utilizando testes A/B e elementos estratégicos para maximizar conversões.
  
  Gostaria de ver exemplos de sites que criamos? Nosso web designer pode compartilhar um portfólio personalizado para seu segmento pelo WhatsApp."
  `;
  
  // Histórico de conversas para contexto
  let conversationHistory = [];
  
  // Abrir/fechar chatbot
  chatbotButton.addEventListener('click', () => {
    chatbotBox.classList.toggle('hidden');
    chatbotButton.classList.add('hidden');
    
    // Se for a primeira vez abrindo, mostrar mensagem de boas-vindas
    if (chatbotMessages.children.length === 0) {
      setTimeout(() => {
        addBotMessage("Olá! Sou o assistente virtual da Soluctions. Como posso ajudar com sua transformação digital hoje?");
      }, 500);
    }
  });
  
  chatbotClose.addEventListener('click', () => {
    chatbotBox.classList.add('hidden');
    chatbotButton.classList.remove('hidden');
  });
  
  chatbotMinimize.addEventListener('click', () => {
    chatbotBox.classList.add('hidden');
    chatbotButton.classList.remove('hidden');
  });
  
  // Enviar mensagem
  function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message === '') return;
    
    // Adicionar mensagem do usuário
    addUserMessage(message);
    chatbotInput.value = '';
    
    // Adicionar à história da conversa
    conversationHistory.push({ role: "user", content: message });
    
    // Mostrar indicador de digitação
    showTypingIndicator();
    
    // Processar resposta com o modelo
    getResponse(message);
  }
  
  chatbotSend.addEventListener('click', sendMessage);
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Obter resposta do modelo - duas opções:
  async function getResponse(message) {
    // Para testes ou desenvolvimento, use o modo simulado
    if (HF_TOKEN === 'hf_dummy_token') {
      await simulateResponse(message);
      return;
    }
    
    try {
      // Opção 1: Hugging Face Inference API (open source, gratuito)
      const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${HF_TOKEN}`
        },
        body: JSON.stringify({
          inputs: formatConversation(systemPrompt, conversationHistory),
          parameters: {
            max_new_tokens: 250,
            temperature: 0.7,
            top_p: 0.95,
            repetition_penalty: 1.15
          }
        })
      });
      
      const data = await response.json();
      
      // Processar resposta
      if (data && data.generated_text) {
        // Extrair apenas a resposta do assistente
        const botResponse = extractBotResponse(data.generated_text);
        
        // Adicionar resposta ao histórico
        conversationHistory.push({ role: "assistant", content: botResponse });
        
        // Limitar histórico para não crescer demais
        if (conversationHistory.length > 10) {
          conversationHistory = conversationHistory.slice(-10);
        }
        
        // Remover indicador de digitação e adicionar resposta
        removeTypingIndicator();
        addBotMessage(botResponse);
      } else {
        throw new Error('Formato de resposta inválido');
      }
    } catch (error) {
      console.error('Erro ao obter resposta:', error);
      // Modo de fallback para demonstração
      simulateResponse(message);
    }
  }
  
  // Formatar conversa para o modelo
  function formatConversation(systemPrompt, history) {
    let formattedText = `<s>[INST] ${systemPrompt} [/INST]</s>\n\n`;
    
    for (let i = 0; i < history.length; i++) {
      const message = history[i];
      if (message.role === 'user') {
        const nextMsg = history[i + 1];
        if (nextMsg && nextMsg.role === 'assistant') {
          formattedText += `<s>[INST] ${message.content} [/INST] ${nextMsg.content}</s>\n\n`;
          i++; // Pula a próxima mensagem que já foi incluída
        } else {
          formattedText += `<s>[INST] ${message.content} [/INST]`;
        }
      }
    }
    
    return formattedText;
  }
  
  // Extrair resposta do assistente da resposta completa
  function extractBotResponse(fullText) {
    // Encontra a última instrução [/INST] e pega o texto após ela
    const lastInstructionEnd = fullText.lastIndexOf('[/INST]');
    if (lastInstructionEnd !== -1) {
      let assistantResponse = fullText.substring(lastInstructionEnd + 7).trim();
      // Remover tags de fechamento se existirem
      assistantResponse = assistantResponse.replace('</s>', '').trim();
      return assistantResponse;
    }
    return fullText; // Fallback
  }
  
  // Modo de demonstração - simula respostas para testes sem API
  async function simulateResponse(message) {
    // Simula um tempo de processamento
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerMessage = message.toLowerCase();
    let response;
    
    // Respostas simuladas melhoradas baseadas no conteúdo da mensagem
    if (lowerMessage.includes('preço') || lowerMessage.includes('pacote') || lowerMessage.includes('valor') || lowerMessage.includes('custo')) {
      response = "Temos três opções de pacotes para transformação digital:\n\n• Pacote Prata (R$1.999/mês): Ideal para pequenas empresas iniciando sua jornada digital\n• Pacote Ouro (R$3.499/mês): Nossa solução mais popular, com recursos avançados de automação e IA\n• Pacote Platina (R$5.999/mês): Solução completa com estratégia personalizada\n\nCada negócio tem necessidades únicas. Que tal conversar com nosso consultor pelo WhatsApp (+55 11 98310-8110) para entender qual pacote seria mais adequado para você?";
    } 
    else if (lowerMessage.includes('whatsapp') || lowerMessage.includes('falar') || lowerMessage.includes('contato') || lowerMessage.includes('orçamento')) {
      response = "Claro! Você pode falar diretamente com nosso consultor pelo WhatsApp: +55 11 98310-8110\n\nEle está disponível agora e pode responder suas dúvidas imediatamente. Se preferir, também temos nosso formulário online em formulario.soluctions.com. Como posso facilitar seu contato?";
    }
    else if (lowerMessage.includes('chatbot') || lowerMessage.includes('bot') || lowerMessage.includes('assistente')) {
      response = "Nosso serviço de Chatbot com IA é uma solução personalizada que pode revolucionar seu atendimento digital. Benefícios:\n\n• Atendimento 24/7 sem custos adicionais\n• Redução de até 40% em custos operacionais\n• Integração com seus sistemas existentes\n• Personalização com a identidade da sua marca\n\nPosso pedir para nosso especialista em IA entrar em contato com você pelo WhatsApp (+55 11 98310-8110) para uma demonstração gratuita?";
    }
    else if (lowerMessage.includes('anúncio') || lowerMessage.includes('ads') || lowerMessage.includes('campanha') || lowerMessage.includes('google')) {
      response = "Nossa gestão de anúncios digitais é baseada em dados e otimizada por IA. Trabalhamos com:\n\n• Google Ads (Search, Display, Shopping)\n• Meta Ads (Facebook, Instagram)\n• LinkedIn Ads (B2B)\n• TikTok Ads (alcance jovem)\n\nNossos clientes veem, em média, um ROI 8x maior e redução de 30% no custo por aquisição. Posso conectar você com nosso especialista em tráfego pago pelo WhatsApp (+55 11 98310-8110) para uma análise gratuita da sua concorrência?";
    }
    else if (lowerMessage.includes('social') || lowerMessage.includes('redes') || lowerMessage.includes('instagram') || lowerMessage.includes('facebook')) {
      response = "Nosso serviço de Social Media com IA transforma sua presença nas redes sociais com:\n\n• Estratégia personalizada para cada plataforma\n• Criação de conteúdo original e relevante\n• Gestão de comunidade e resposta automática\n• Análise de performance e otimização contínua\n\nNossos clientes veem um aumento médio de 150% em engajamento. Gostaria que nosso social media manager entrasse em contato pelo WhatsApp (+55 11 98310-8110) para discutir sua estratégia?";
    }
    else if (lowerMessage.includes('landing') || lowerMessage.includes('página') || lowerMessage.includes('site') || lowerMessage.includes('web')) {
      response = "Nossas landing pages são desenvolvidas com foco total em conversão:\n\n• Design responsivo para todos dispositivos\n• Otimização para SEO\n• Integração com CRM e analytics\n• Testes A/B para maximizar resultados\n\nPara novos clientes, oferecemos análise gratuita do seu site atual + sugestões de melhoria. Posso pedir para nosso web designer enviar exemplos do nosso portfólio pelo WhatsApp (+55 11 98310-8110)?";
    }
    else if (lowerMessage.includes('obrigado') || lowerMessage.includes('valeu') || lowerMessage.includes('tchau')) {
      response = "Foi um prazer conversar com você! Estamos à disposição para ajudar em sua jornada de transformação digital. Se precisar de qualquer informação adicional, é só retornar aqui ou entrar em contato pelo WhatsApp: +55 11 98310-8110. Tenha um ótimo dia!";
    }
    else {
      response = "A Soluctions é especializada em transformação digital inteligente para empresas de todos os portes. Ajudamos a converter sua presença física em digital com resultados mensuráveis.\n\nEm qual área posso te ajudar hoje?\n• Campanhas de anúncios\n• Desenvolvimento web\n• Gestão de redes sociais\n• Chatbots com IA\n• Analytics e BI\n\nOu prefere falar diretamente com um consultor pelo WhatsApp (+55 11 98310-8110)?";
    }
    
    // Adicionar ao histórico
    conversationHistory.push({ role: "assistant", content: response });
    
    // Remover indicador de digitação e mostrar resposta
    removeTypingIndicator();
    addBotMessage(response);
  }
  
  // Adicionar mensagem do usuário ao chat
  function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chatbot-message', 'user');
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    scrollToBottom();
  }
  
  // Adicionar mensagem do bot ao chat
  function addBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chatbot-message', 'bot');
    
    // Verificar se a mensagem menciona WhatsApp
    const containsWhatsApp = message.toLowerCase().includes('whatsapp');
    
    // Remover qualquer número de telefone ou WhatsApp da mensagem
    // para garantir que não haverá links quebrados
    let cleanMessage = message;
    cleanMessage = cleanMessage.replace(/\+55\s*?1[1-9]\s*?9[0-9]{4}\s*?[0-9]{4}/g, '');
    cleanMessage = cleanMessage.replace(/\+55\s*?1[1-9]\s*?[0-9]{8,9}/g, '');
    cleanMessage = cleanMessage.replace(/https:\/\/wa\.me\/[0-9]+/g, '');
    
    // Converter quebras de linha em HTML
    cleanMessage = cleanMessage.replace(/\n/g, '<br>');
    
    // Formatar URLs normais (exceto links de whatsapp)
    cleanMessage = cleanMessage.replace(/(https?:\/\/(?!wa\.me)[^\s<]+)/g, '<a href="$1" class="text-blue-600 underline">$1</a>');
    
    // Criar conteúdo HTML da mensagem
    let messageContent = cleanMessage;
    
    // Adicionar botão WhatsApp se a mensagem mencionar WhatsApp
    if (containsWhatsApp) {
      messageContent += '<div class="whatsapp-button-container"><button class="whatsapp-button" onclick="window.open(\'https://wa.me/5511983108110\', \'_blank\')"><svg class="whatsapp-icon" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> Falar no WhatsApp</button></div>';
    }
    
    // Adicionar HTML à mensagem
    messageElement.innerHTML = messageContent;
    
    // Adicionar à conversa
    chatbotMessages.appendChild(messageElement);
    scrollToBottom();
  }
  
  // Mostrar indicador de digitação
  function showTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.classList.add('chatbot-typing');
    typingElement.innerHTML = `
      <div class="typing-animation">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    typingElement.id = 'typing-indicator';
    chatbotMessages.appendChild(typingElement);
    scrollToBottom();
  }
  
  // Remover indicador de digitação
  function removeTypingIndicator() {
    const typingElement = document.getElementById('typing-indicator');
    if (typingElement) {
      typingElement.remove();
    }
  }
  
  // Rolar para o final das mensagens
  function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
});

document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 800,   // Duração da animação
    offset: 100,     // Offset (em pixels) para começar a animação
    once: true,      // Animar apenas uma vez
    disable: false   // Desativar em dispositivos móveis, se necessário
  });
});