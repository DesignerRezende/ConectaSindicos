
/* =====================================================
   REZENDE — CONECTA SÍNDICOS

   SCRIPT.JS — VERSÃO INSTITUCIONAL

   Funcionalidades:
   - Ícones Lucide
   - Menu responsivo
   - Benefícios interativos
   - Logo Ponto Premiado
   - WhatsApp por região
   - Campanhas comerciais
   - Navegação suave
   ===================================================== */

'use strict';


/* =====================================================
   01 — INICIALIZAÇÃO DO SITE
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

  iniciarIcones();

  iniciarMenu();

  iniciarBeneficios();

  carregarConfiguracoes();

  atualizarAno();

  iniciarNavegacao();

});


/* =====================================================
   02 — ÍCONES LUCIDE
   ===================================================== */

/*
   A biblioteca Lucide é carregada pelo index.html.

   Esta função transforma os elementos com
   data-lucide em ícones vetoriais profissionais.
*/

function iniciarIcones() {

  if (
    window.lucide &&
    typeof window.lucide.createIcons === 'function'
  ) {

    window.lucide.createIcons();

  } else {

    console.warn(
      'Biblioteca Lucide não carregada. Verifique sua conexão.'
    );

  }

}


/* =====================================================
   03 — ATUALIZAR UM ÍCONE DINÂMICO
   ===================================================== */

/*
   Usaremos esta função quando o conteúdo de
   um ícone precisar mudar após um clique.

   Exemplo: trocar o ícone de atendimento
   pelo de treinamento.
*/

function atualizarIcone(elemento, nomeIcone) {

  if (!elemento) return;

  // Aceita somente nomes conhecidos do projeto.

  const iconesPermitidos = [

    'headset',
    'graduation-cap',
    'chart-no-axes-column',
    'truck',
    'credit-card',
    'gift',
    'menu',
    'x'

  ];

  if (!iconesPermitidos.includes(nomeIcone)) {

    return;

  }

  // Limpa o conteúdo anterior.

  elemento.replaceChildren();

  // Cria um novo elemento para o ícone.

  const icone = document.createElement('i');

  icone.setAttribute('data-lucide', nomeIcone);

  icone.setAttribute('aria-hidden', 'true');

  elemento.appendChild(icone);

  // Converte o novo elemento em SVG.

  iniciarIcones();

}


/* =====================================================
   04 — MENU RESPONSIVO
   ===================================================== */

function iniciarMenu() {

  const botao = document.querySelector('.menu-toggle');

  const menu = document.getElementById('nav');

  if (!botao || !menu) return;


  function fecharMenu() {

    menu.classList.remove('open');

    botao.setAttribute('aria-expanded', 'false');

    botao.setAttribute('aria-label', 'Abrir menu');

    document.body.classList.remove('menu-open');

    atualizarIcone(botao, 'menu');

  }


  function abrirMenu() {

    menu.classList.add('open');

    botao.setAttribute('aria-expanded', 'true');

    botao.setAttribute('aria-label', 'Fechar menu');

    document.body.classList.add('menu-open');

    atualizarIcone(botao, 'x');

  }


  botao.addEventListener('click', function () {

    const aberto = menu.classList.contains('open');

    if (aberto) {

      fecharMenu();

    } else {

      abrirMenu();

    }

  });


  /* FECHAR AO CLICAR EM UMA OPÇÃO */

  const links = menu.querySelectorAll('a');

  links.forEach(function (link) {

    link.addEventListener('click', fecharMenu);

  });


  /* FECHAR AO PRESSIONAR ESC */

  document.addEventListener('keydown', function (evento) {

    if (
      evento.key === 'Escape' &&
      menu.classList.contains('open')
    ) {

      fecharMenu();

      botao.focus();

    }

  });


  /* FECHAR AO VOLTAR PARA O DESKTOP */

  window.addEventListener('resize', function () {

    if (window.innerWidth > 900) {

      if (menu.classList.contains('open')) {

        fecharMenu();

      }

    }

  });

}


/* =====================================================
   05 — CONTEÚDO DOS BENEFÍCIOS
   ===================================================== */

/*
   Aqui estão os textos dos seis benefícios.

   Cada um possui:

   - Número
   - Ícone Lucide
   - Título
   - Descrição
   - Identificação do Ponto Premiado
*/

const beneficios = [

  {

    numero: '01',

    icone: 'headset',

    titulo: 'Atendimento que acompanha sua rotina.',

    descricao:
      'Canal de atendimento direto e personalizado, com consultores dedicados para ajudar nas demandas do condomínio.',

    pontoPremiado: false

  },


  {

    numero: '02',

    icone: 'graduation-cap',

    titulo: 'Conhecimento para tomar melhores decisões.',

    descricao:
      'Consultoria especializada e oportunidades de treinamento com marcas parceiras, aproximando sua gestão de informações e soluções para obras e manutenção.',

    pontoPremiado: false

  },


  {

    numero: '03',

    icone: 'chart-no-axes-column',

    titulo: 'Mais clareza para a prestação de contas.',

    descricao:
      'Apoio na organização das informações financeiras das compras realizadas, facilitando o acompanhamento de investimentos e despesas do condomínio.',

    pontoPremiado: false

  },


  {

    numero: '04',

    icone: 'truck',

    titulo: 'Praticidade para sua operação.',

    descricao:
      'Condições de logística e entrega expressa, conforme disponibilidade, para ajudar o condomínio a receber os materiais necessários com mais agilidade.',

    pontoPremiado: false

  },


  {

    numero: '05',

    icone: 'credit-card',

    titulo: 'Condições alinhadas ao seu planejamento.',

    descricao:
      'Possibilidades de crédito, faturamento e condições comerciais especiais, sujeitas à análise e às políticas vigentes da Rezende.',

    pontoPremiado: false

  },


  {

    numero: '06',

    icone: 'gift',

    titulo: 'Uma parceria que vai além das compras.',

    descricao:
      'Acesso às possibilidades do Ponto Premiado, campanhas de relacionamento e experiências exclusivas, conforme as regras e condições de cada iniciativa.',

    pontoPremiado: true

  }

];


/* =====================================================
   06 — BENEFÍCIOS INTERATIVOS
   ===================================================== */

function iniciarBeneficios() {

  const botoes = Array.from(
    document.querySelectorAll('.benefit-tab')
  );

  const painel = document.getElementById('benefit-panel');

  const numero = document.getElementById('detail-num');

  const icone = document.getElementById('detail-icon');

  const titulo = document.getElementById('detail-title');

  const descricao = document.getElementById('detail-description');

  const logoPontoPremiado =
    document.getElementById('ponto-premiado-brand');


  if (
    !botoes.length ||
    !painel ||
    !numero ||
    !icone ||
    !titulo ||
    !descricao
  ) {

    return;

  }


  /* FUNÇÃO QUE EXIBE O BENEFÍCIO SELECIONADO */

  function selecionarBeneficio(indice) {

    const beneficio = beneficios[indice];

    if (!beneficio) return;


    // Atualiza o número.

    numero.textContent =
      'BENEFÍCIO ' + beneficio.numero + ' / 06';


    // Atualiza título e descrição.

    titulo.textContent = beneficio.titulo;

    descricao.textContent = beneficio.descricao;


    // Atualiza o ícone principal.

    atualizarIcone(icone, beneficio.icone);


    // Mostra ou oculta a logo Ponto Premiado.

    if (logoPontoPremiado) {

      logoPontoPremiado.hidden = !beneficio.pontoPremiado;

    }


    // Atualiza o estado visual dos botões.

    botoes.forEach(function (botao, posicao) {

      const ativo = posicao === indice;

      botao.classList.toggle('active', ativo);

      botao.setAttribute(
        'aria-selected',
        String(ativo)
      );

      botao.tabIndex = ativo ? 0 : -1;

    });


    // Atualiza a identificação acessível do painel.

    painel.setAttribute(
      'aria-labelledby',
      botoes[indice].id
    );

  }


  /* EVENTOS DE CLIQUE */

  botoes.forEach(function (botao, indice) {

    botao.addEventListener('click', function () {

      selecionarBeneficio(indice);

    });


    /* NAVEGAÇÃO PELO TECLADO */

    botao.addEventListener('keydown', function (evento) {

      let proximo = indice;


      if (
        evento.key === 'ArrowRight' ||
        evento.key === 'ArrowDown'
      ) {

        proximo = (indice + 1) % botoes.length;

      } else if (
        evento.key === 'ArrowLeft' ||
        evento.key === 'ArrowUp'
      ) {

        proximo =
          (indice - 1 + botoes.length) % botoes.length;

      } else if (evento.key === 'Home') {

        proximo = 0;

      } else if (evento.key === 'End') {

        proximo = botoes.length - 1;

      } else {

        return;

      }


      evento.preventDefault();

      selecionarBeneficio(proximo);

      botoes[proximo].focus();

    });

  });


  /* PRIMEIRO BENEFÍCIO AO CARREGAR */

  selecionarBeneficio(0);

}


/* =====================================================
   07 — CARREGAR CONFIGURAÇÕES COMERCIAIS
   ===================================================== */

function carregarConfiguracoes() {

  const config = window.REZENDE_CONFIG || {};


  /* CAMPANHA COMERCIAL */

  const tituloCampanha =
    document.getElementById('campaign-title');

  const descricaoCampanha =
    document.getElementById('campaign-description');

  const botaoCampanha =
    document.getElementById('campaign-link');


  if (tituloCampanha) {

    tituloCampanha.textContent =
      config.campaignTitle ||
      'Campanhas e oportunidades';

  }


  if (descricaoCampanha) {

    descricaoCampanha.textContent =
      config.campaignDescription ||
      'Consulte as oportunidades comerciais vigentes com nossa equipe.';

  }


  if (botaoCampanha) {

    const enderecoCampanha =
      validarEndereco(config.campaignUrl);


    if (enderecoCampanha) {

      botaoCampanha.href = enderecoCampanha;

      botaoCampanha.target = '_blank';

      botaoCampanha.rel = 'noopener noreferrer';

      // Preserva o ícone presente no botão.

      botaoCampanha.innerHTML =
        'Acessar campanha atual ' +
        '<i data-lucide="arrow-up-right" aria-hidden="true"></i>';

      iniciarIcones();

    } else {

      botaoCampanha.href = '#contato';

      botaoCampanha.removeAttribute('target');

      botaoCampanha.removeAttribute('rel');

      botaoCampanha.innerHTML =
        'Consultar campanha atual ' +
        '<i data-lucide="arrow-up-right" aria-hidden="true"></i>';

      iniciarIcones();

    }

  }


  /* SITE INSTITUCIONAL */

  const siteElemento =
    document.getElementById('website-link');


  if (siteElemento) {

    const endereco =
      validarEndereco(config.institutionalWebsite);


    if (endereco) {

      siteElemento.href = endereco;

      siteElemento.hidden = false;

    } else {

      siteElemento.hidden = true;

    }

  }


  /* WHATSAPPS */

  configurarWhatsApps(config);


  /* BOTÃO FLUTUANTE */

  configurarBotaoFlutuante();

}


/* =====================================================
   08 — WHATSAPP POR REGIÃO
   ===================================================== */

/*
   Os telefones são lidos automaticamente
   do arquivo config.js.

   Regiões:
   - Nova Friburgo
   - Rio de Janeiro
   - Niterói

   Cada botão possui sua mensagem automática.
*/

function configurarWhatsApps(config) {

  const localidades = Array.isArray(config.whatsappLocations)
    ? config.whatsappLocations
    : [];


  const mensagem =
    config.whatsappMessage ||
    'Olá! Conheci o Conecta Síndicos da Rezende e gostaria de saber mais sobre os benefícios para nosso condomínio.';


  const ids = [

    'friburgo',

    'rio',

    'niteroi'

  ];


  ids.forEach(function (id) {

    const botao =
      document.getElementById('whatsapp-' + id);

    if (!botao) return;


    const localidade = localidades.find(function (item) {

      return item && item.id === id;

    });


    const numero = localidade
      ? String(localidade.number || '').replace(/\D/g, '')
      : '';


    /* VALIDAR O NÚMERO */

    const numeroValido =
      /^55\d{10,11}$/.test(numero);


    if (!numeroValido) {

      botao.removeAttribute('href');

      botao.removeAttribute('target');

      botao.removeAttribute('rel');

      botao.setAttribute('aria-disabled', 'true');

      botao.style.opacity = '0.5';

      botao.style.pointerEvents = 'none';

      botao.textContent = 'Indisponível';

      return;

    }


    /* MONTAR O LINK */

    const link =
      'https://wa.me/' +
      numero +
      '?text=' +
      encodeURIComponent(mensagem);


    /* APLICAR NO BOTÃO */

    botao.href = link;

    botao.target = '_blank';

    botao.rel = 'noopener noreferrer';

    botao.removeAttribute('aria-disabled');

    botao.style.opacity = '';

    botao.style.pointerEvents = '';

    botao.textContent = 'Conversar ↗';


    /* IDENTIFICAÇÃO ACESSÍVEL */

    botao.setAttribute(
      'aria-label',
      'Conversar com a Rezende de ' +
      localidade.name +
      ' pelo WhatsApp'
    );

  });

}


/* =====================================================
   09 — BOTÃO FLUTUANTE
   ===================================================== */

/*
   O botão flutuante leva o visitante
   à escolha da região.

   Não abre diretamente um dos WhatsApps.
*/

function configurarBotaoFlutuante() {

  const botao =
    document.getElementById('floating-whatsapp');

  if (!botao) return;


  botao.href = '#contato';

  botao.removeAttribute('target');

  botao.removeAttribute('rel');


  // Preserva o ícone de atendimento.

  botao.innerHTML =
    '<i data-lucide="message-circle" aria-hidden="true"></i>' +
    'Fale com a Rezende ↗';


  botao.setAttribute(
    'aria-label',
    'Escolher uma região para conversar com a Rezende'
  );


  iniciarIcones();

}


/* =====================================================
   10 — VALIDAR ENDEREÇOS EXTERNOS
   ===================================================== */

function validarEndereco(valor) {

  if (typeof valor !== 'string') {

    return '';

  }


  const texto = valor.trim();

  if (!texto) return '';


  try {

    const endereco = new URL(texto);


    if (
      endereco.protocol === 'https:' ||
      endereco.protocol === 'http:'
    ) {

      return endereco.href;

    }

  } catch (erro) {

    return '';

  }


  return '';

}


/* =====================================================
   11 — ANO AUTOMÁTICO NO RODAPÉ
   ===================================================== */

function atualizarAno() {

  const elemento =
    document.getElementById('year');


  if (elemento) {

    elemento.textContent =
      new Date().getFullYear();

  }

}


/* =====================================================
   12 — NAVEGAÇÃO SUAVE
   ===================================================== */

function iniciarNavegacao() {

  const links =
    document.querySelectorAll('a[href^="#"]');


  links.forEach(function (link) {

    link.addEventListener('click', function (evento) {

      const destinoId =
        link.getAttribute('href');


      if (!destinoId || destinoId === '#') {

        return;

      }


      const destino =
        document.getElementById(
          destinoId.substring(1)
        );


      if (!destino) return;


      evento.preventDefault();


      /* RESPEITAR PREFERÊNCIAS DE ACESSIBILIDADE */

      const movimentoReduzido =
        window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;


      destino.scrollIntoView({

        behavior: movimentoReduzido
          ? 'auto'
          : 'smooth',

        block: 'start'

      });


      /* ATUALIZAR URL */

      if (
        window.history &&
        window.history.replaceState
      ) {

        window.history.replaceState(
          null,
          '',
          destinoId
        );

      }

    });

  });

}


/* =====================================================
   FIM DO SCRIPT.JS
   ===================================================== */
