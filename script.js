
/* ==========================================
   REZENDE — CONECTA SÍNDICOS
   ARQUIVO: script.js

   VERSÃO COM 3 WHATSAPPS:
   - Nova Friburgo
   - Rio de Janeiro
   - Niterói
   ========================================== */

'use strict';


/* ==========================================
   01 — INICIALIZAÇÃO DO SITE
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {

  iniciarMenu();

  iniciarBeneficios();

  carregarConfiguracoes();

  atualizarAno();

  iniciarNavegacao();

});


/* ==========================================
   02 — MENU PARA CELULAR
   ========================================== */

function iniciarMenu() {

  const botaoMenu = document.querySelector('.menu-toggle');

  const menu = document.querySelector('#nav');

  if (!botaoMenu || !menu) return;


  function fecharMenu() {

    menu.classList.remove('open');

    botaoMenu.setAttribute('aria-expanded', 'false');

    botaoMenu.setAttribute('aria-label', 'Abrir menu');

    botaoMenu.textContent = '☰';

    document.body.classList.remove('menu-open');

  }


  botaoMenu.addEventListener('click', function () {

    const aberto = menu.classList.toggle('open');

    botaoMenu.setAttribute('aria-expanded', String(aberto));

    botaoMenu.setAttribute(
      'aria-label',
      aberto ? 'Fechar menu' : 'Abrir menu'
    );

    botaoMenu.textContent = aberto ? '✕' : '☰';

    document.body.classList.toggle('menu-open', aberto);

  });


  /* FECHAR AO SELECIONAR UMA SEÇÃO */

  menu.querySelectorAll('a').forEach(function (link) {

    link.addEventListener('click', fecharMenu);

  });


  /* FECHAR COM A TECLA ESC */

  document.addEventListener('keydown', function (evento) {

    if (evento.key === 'Escape') {

      fecharMenu();

    }

  });


  /* FECHAR AO VOLTAR PARA DESKTOP */

  window.addEventListener('resize', function () {

    if (window.innerWidth > 768) {

      fecharMenu();

    }

  });

}


/* ==========================================
   03 — CONTEÚDO DOS BENEFÍCIOS
   ========================================== */

const beneficios = [

  {

    numero: '01',

    icone: '◎',

    titulo: 'Atendimento que acompanha sua rotina.',

    descricao:
      'Canal de atendimento direto e personalizado, com consultores dedicados para ajudar nas demandas do condomínio.'

  },

  {

    numero: '02',

    icone: '✳',

    titulo: 'Conhecimento para tomar melhores decisões.',

    descricao:
      'Consultoria especializada e oportunidades de treinamento com marcas parceiras, aproximando sua gestão de informações e soluções para obras e manutenção.'

  },

  {

    numero: '03',

    icone: '▤',

    titulo: 'Mais clareza para a prestação de contas.',

    descricao:
      'Apoio na organização das informações financeiras das compras realizadas, facilitando o acompanhamento de investimentos e despesas do condomínio.'

  },

  {

    numero: '04',

    icone: '↗',

    titulo: 'Praticidade para sua operação.',

    descricao:
      'Condições de logística e entrega expressa, conforme disponibilidade, para ajudar o condomínio a receber os materiais necessários com mais agilidade.'

  },

  {

    numero: '05',

    icone: '◇',

    titulo: 'Condições alinhadas ao seu planejamento.',

    descricao:
      'Possibilidades de crédito, faturamento e condições comerciais especiais, sujeitas à análise e às políticas vigentes da Rezende.'

  },

  {

    numero: '06',

    icone: '★',

    titulo: 'Uma parceria que vai além das compras.',

    descricao:
      'Acesso às possibilidades do Ponto Premiado, campanhas de relacionamento e experiências exclusivas, conforme as regras e condições de cada iniciativa.'

  }

];


/* ==========================================
   04 — BENEFÍCIOS INTERATIVOS
   ========================================== */

function iniciarBeneficios() {

  const botoes = Array.from(
    document.querySelectorAll('.benefit-tab')
  );

  const numero = document.getElementById('detail-num');

  const icone = document.getElementById('detail-icon');

  const titulo = document.getElementById('detail-title');

  const descricao = document.getElementById('detail-description');


  if (
    !botoes.length ||
    !numero ||
    !icone ||
    !titulo ||
    !descricao
  ) {

    return;

  }


  function selecionarBeneficio(indice) {

    const beneficio = beneficios[indice];

    if (!beneficio) return;


    numero.textContent =
      'BENEFÍCIO ' + beneficio.numero + ' / 06';

    icone.textContent = beneficio.icone;

    titulo.textContent = beneficio.titulo;

    descricao.textContent = beneficio.descricao;


    botoes.forEach(function (botao, posicao) {

      const ativo = posicao === indice;

      botao.classList.toggle('active', ativo);

      botao.setAttribute(
        'aria-selected',
        String(ativo)
      );

      botao.tabIndex = ativo ? 0 : -1;

    });

  }


  /* CLIQUE NOS BENEFÍCIOS */

  botoes.forEach(function (botao, indice) {

    botao.addEventListener('click', function () {

      selecionarBeneficio(indice);

    });


    /* NAVEGAÇÃO PELO TECLADO */

    botao.addEventListener('keydown', function (evento) {

      let proximo = indice;


      if (
        evento.key === 'ArrowDown' ||
        evento.key === 'ArrowRight'
      ) {

        proximo = (indice + 1) % botoes.length;

      } else if (
        evento.key === 'ArrowUp' ||
        evento.key === 'ArrowLeft'
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


  selecionarBeneficio(0);

}


/* ==========================================
   05 — CARREGAR CONFIGURAÇÕES
   ========================================== */

function carregarConfiguracoes() {

  const config = window.REZENDE_CONFIG || {};


  /* CAMPANHA ATUAL */

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

      botaoCampanha.textContent =
        'Acessar campanha atual ↗';

    } else {

      botaoCampanha.href = '#contato';

      botaoCampanha.removeAttribute('target');

      botaoCampanha.removeAttribute('rel');

      botaoCampanha.textContent =
        'Consultar campanha atual ↗';

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

    } else {

      siteElemento.hidden = true;

    }

  }


  /* CONFIGURAR OS TRÊS WHATSAPPS */

  configurarWhatsApps(config);


  /* BOTÃO FLUTUANTE */

  configurarBotaoFlutuante();

}


/* ==========================================
   06 — WHATSAPP POR REGIÃO
   ========================================== */

/*
  Os números são carregados do config.js.

  Cada botão recebe automaticamente:

  - O número da região.
  - A mensagem comercial.
  - O endereço correto do WhatsApp.

  Não é necessário alterar os números
  diretamente neste arquivo.
*/

function configurarWhatsApps(config) {

  const localidades = Array.isArray(config.whatsappLocations)
    ? config.whatsappLocations
    : [];

  const mensagemPadrao =
    config.whatsappMessage ||
    'Olá! Conheci o Conecta Síndicos da Rezende e gostaria de saber mais sobre os benefícios para nosso condomínio.';


  localidades.forEach(function (localidade) {

    if (!localidade || typeof localidade !== 'object') {
      return;
    }


    const id = localidade.id;

    const numero = String(
      localidade.number || ''
    ).replace(/\D/g, '');


    const botao =
      document.getElementById('whatsapp-' + id);


    if (!botao) {
      return;
    }


    /* VALIDAR TELEFONE BRASILEIRO */

    const numeroValido =
      /^55\d{10,11}$/.test(numero);


    if (!numeroValido) {

      // Não permite abrir um telefone incorreto.

      botao.removeAttribute('href');

      botao.removeAttribute('target');

      botao.setAttribute('aria-disabled', 'true');

      botao.style.opacity = '0.5';

      botao.style.pointerEvents = 'none';

      botao.textContent = 'Indisponível';

      return;

    }


    /* MENSAGEM PERSONALIZADA */

    const mensagem = mensagemPadrao;


    /* CRIAR LINK DO WHATSAPP */

    const link =
      'https://wa.me/' +
      numero +
      '?text=' +
      encodeURIComponent(mensagem);


    /* APLICAR LINK NO BOTÃO */

    botao.href = link;

    botao.target = '_blank';

    botao.rel = 'noopener noreferrer';

    botao.removeAttribute('aria-disabled');

    botao.textContent = 'Conversar ↗';


    /* IDENTIFICAÇÃO ACESSÍVEL */

    const nomeRegiao =
      localidade.name || 'sua região';

    botao.setAttribute(
      'aria-label',
      'Conversar com a Rezende de ' +
      nomeRegiao +
      ' pelo WhatsApp'
    );

  });


  /* VERIFICAR SE TODOS OS BOTÕES POSSUEM CONFIGURAÇÃO */

  const idsEsperados = [
    'friburgo',
    'rio',
    'niteroi'
  ];

  idsEsperados.forEach(function (id) {

    const existe = localidades.some(function (localidade) {

      return localidade && localidade.id === id;

    });

    if (existe) {
      return;
    }

    const botao =
      document.getElementById('whatsapp-' + id);

    if (botao) {

      botao.removeAttribute('href');

      botao.removeAttribute('target');

      botao.setAttribute('aria-disabled', 'true');

      botao.style.opacity = '0.5';

      botao.style.pointerEvents = 'none';

      botao.textContent = 'Indisponível';

    }

  });

}


/* ==========================================
   07 — BOTÃO FLUTUANTE
   ========================================== */

/*
  Como agora existem três WhatsApps,
  o botão flutuante não abre diretamente
  nenhum telefone.

  Ele leva o visitante até a seção onde
  poderá escolher sua região.
*/

function configurarBotaoFlutuante() {

  const botao =
    document.getElementById('floating-whatsapp');

  if (!botao) return;


  botao.href = '#contato';

  botao.removeAttribute('target');

  botao.removeAttribute('rel');

  botao.textContent = 'Fale com a Rezende ↗';

  botao.setAttribute(
    'aria-label',
    'Escolher uma região para conversar com a Rezende'
  );

}


/* ==========================================
   08 — VALIDAR LINKS EXTERNOS
   ========================================== */

function validarEndereco(valor) {

  if (typeof valor !== 'string') {

    return '';

  }


  const texto = valor.trim();

  if (!texto) {

    return '';

  }


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


/* ==========================================
   09 — ANO AUTOMÁTICO NO RODAPÉ
   ========================================== */

function atualizarAno() {

  const elemento =
    document.getElementById('year');

  if (elemento) {

    elemento.textContent =
      new Date().getFullYear();

  }

}


/* ==========================================
   10 — NAVEGAÇÃO INTERNA
   ========================================== */

function iniciarNavegacao() {

  const linksInternos =
    document.querySelectorAll('a[href^="#"]');


  linksInternos.forEach(function (link) {

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


      if (!destino) {

        return;

      }


      evento.preventDefault();


      /* RESPEITAR ACESSIBILIDADE */

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


      /* ATUALIZAR A URL */

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


/* ==========================================
   FIM DO ARQUIVO
   ========================================== */
