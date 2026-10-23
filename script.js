
/* ==========================================
   REZENDE — CONECTA SÍNDICOS
   PROGRAMAÇÃO COMPLETA
   ========================================== */

'use strict';

/* INICIAR O SITE */

document.addEventListener('DOMContentLoaded', function () {
  iniciarMenu();
  iniciarBeneficios();
  carregarConfiguracoes();
  atualizarAno();
  iniciarNavegacao();
});

/* MENU PARA CELULAR */

function iniciarMenu() {
  const botao = document.querySelector('.menu-toggle');
  const menu = document.getElementById('nav');

  if (!botao || !menu) return;

  function fecharMenu() {
    menu.classList.remove('open');
    botao.setAttribute('aria-expanded', 'false');
    botao.setAttribute('aria-label', 'Abrir menu');
    botao.textContent = '☰';
    document.body.classList.remove('menu-open');
  }

  botao.addEventListener('click', function () {
    const aberto = menu.classList.toggle('open');

    botao.setAttribute('aria-expanded', String(aberto));
    botao.setAttribute(
      'aria-label',
      aberto ? 'Fechar menu' : 'Abrir menu'
    );

    botao.textContent = aberto ? '✕' : '☰';
    document.body.classList.toggle('menu-open', aberto);
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', fecharMenu);
  });

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape') fecharMenu();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) fecharMenu();
  });
}

/* CONTEÚDO DOS SEIS BENEFÍCIOS */

const beneficios = [
  {
    numero: '01',
    icone: '◎',
    titulo: 'Atendimento que acompanha sua rotina.',
    descricao: 'Canal de atendimento direto e personalizado, com consultores dedicados para ajudar nas demandas do condomínio.'
  },
  {
    numero: '02',
    icone: '✳',
    titulo: 'Conhecimento para tomar melhores decisões.',
    descricao: 'Consultoria especializada e oportunidades de treinamento com marcas parceiras, aproximando sua gestão de informações e soluções para obras e manutenção.'
  },
  {
    numero: '03',
    icone: '▤',
    titulo: 'Mais clareza para a prestação de contas.',
    descricao: 'Apoio na organização das informações financeiras das compras realizadas, facilitando o acompanhamento de investimentos e despesas do condomínio.'
  },
  {
    numero: '04',
    icone: '↗',
    titulo: 'Praticidade para sua operação.',
    descricao: 'Condições de logística e entrega expressa, conforme disponibilidade, para ajudar o condomínio a receber os materiais necessários com mais agilidade.'
  },
  {
    numero: '05',
    icone: '◇',
    titulo: 'Condições alinhadas ao seu planejamento.',
    descricao: 'Possibilidades de crédito, faturamento e condições comerciais especiais, sujeitas à análise e às políticas vigentes da Rezende.'
  },
  {
    numero: '06',
    icone: '★',
    titulo: 'Uma parceria que vai além das compras.',
    descricao: 'Acesso às possibilidades do Ponto Premiado, campanhas de relacionamento e experiências exclusivas, conforme as regras e condições de cada iniciativa.'
  }
];

/* BENEFÍCIOS INTERATIVOS */

function iniciarBeneficios() {
  const botoes = Array.from(
    document.querySelectorAll('.benefit-tab')
  );

  const painel = document.getElementById('benefit-panel');
  const numero = document.getElementById('detail-num');
  const icone = document.getElementById('detail-icon');
  const titulo = document.getElementById('detail-title');
  const descricao = document.getElementById('detail-description');

  if (!botoes.length || !painel || !numero ||
      !icone || !titulo || !descricao) return;

  function selecionar(indice) {
    const beneficio = beneficios[indice];
    if (!beneficio) return;

    numero.textContent = 'BENEFÍCIO ' + beneficio.numero + ' / 06';
    icone.textContent = beneficio.icone;
    titulo.textContent = beneficio.titulo;
    descricao.textContent = beneficio.descricao;

    botoes.forEach(function (botao, posicao) {
      const ativo = posicao === indice;
      botao.classList.toggle('active', ativo);
      botao.setAttribute('aria-selected', String(ativo));
      botao.tabIndex = ativo ? 0 : -1;
    });

    painel.setAttribute('aria-labelledby', botoes[indice].id);
  }

  botoes.forEach(function (botao, indice) {
    botao.addEventListener('click', function () {
      selecionar(indice);
    });

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
        proximo = (indice - 1 + botoes.length) % botoes.length;
      } else if (evento.key === 'Home') {
        proximo = 0;
      } else if (evento.key === 'End') {
        proximo = botoes.length - 1;
      } else {
        return;
      }

      evento.preventDefault();
      selecionar(proximo);
      botoes[proximo].focus();
    });
  });

  selecionar(0);
}

/* CARREGAR AS CONFIGURAÇÕES COMERCIAIS */

function carregarConfiguracoes() {
  const config = window.REZENDE_CONFIG || {};

  const tituloCampanha = document.getElementById('campaign-title');
  const descricaoCampanha = document.getElementById('campaign-description');
  const botaoCampanha = document.getElementById('campaign-link');
  const siteElemento = document.getElementById('website-link');

  if (tituloCampanha) {
    tituloCampanha.textContent =
      config.campaignTitle || 'Campanhas e oportunidades';
  }

  if (descricaoCampanha) {
    descricaoCampanha.textContent =
      config.campaignDescription ||
      'Consulte as oportunidades comerciais vigentes com nossa equipe.';
  }

  if (botaoCampanha) {
    const endereco = validarEndereco(config.campaignUrl);

    if (endereco) {
      botaoCampanha.href = endereco;
      botaoCampanha.target = '_blank';
      botaoCampanha.rel = 'noopener noreferrer';
      botaoCampanha.textContent = 'Acessar campanha atual ↗';
    } else {
      botaoCampanha.href = '#contato';
      botaoCampanha.removeAttribute('target');
      botaoCampanha.removeAttribute('rel');
      botaoCampanha.textContent = 'Consultar campanha atual ↗';
    }
  }

  if (siteElemento) {
    const endereco = validarEndereco(config.institutionalWebsite);

    if (endereco) {
      siteElemento.href = endereco;
      siteElemento.hidden = false;
    } else {
      siteElemento.hidden = true;
    }
  }

  configurarWhatsApps(config);
  configurarBotaoFlutuante();
}

/* WHATSAPP DAS TRÊS REGIÕES */

function configurarWhatsApps(config) {
  const localidades = Array.isArray(config.whatsappLocations)
    ? config.whatsappLocations
    : [];

  const mensagem =
    config.whatsappMessage ||
    'Olá! Conheci o Conecta Síndicos da Rezende e gostaria de saber mais.';

  const ids = ['friburgo', 'rio', 'niteroi'];

  ids.forEach(function (id) {
    const botao = document.getElementById('whatsapp-' + id);
    if (!botao) return;

    const localidade = localidades.find(function (item) {
      return item && item.id === id;
    });

    const numero = localidade
      ? String(localidade.number || '').replace(/\D/g, '')
      : '';

    const numeroValido = /^55\d{10,11}$/.test(numero);

    if (!numeroValido) {
      botao.removeAttribute('href');
      botao.removeAttribute('target');
      botao.setAttribute('aria-disabled', 'true');
      botao.style.opacity = '0.5';
      botao.style.pointerEvents = 'none';
      botao.textContent = 'Indisponível';
      return;
    }

    const link =
      'https://wa.me/' +
      numero +
      '?text=' +
      encodeURIComponent(mensagem);

    botao.href = link;
    botao.target = '_blank';
    botao.rel = 'noopener noreferrer';
    botao.removeAttribute('aria-disabled');
    botao.style.opacity = '';
    botao.style.pointerEvents = '';
    botao.textContent = 'Conversar ↗';

    botao.setAttribute(
      'aria-label',
      'Conversar com a Rezende de ' +
      localidade.name +
      ' pelo WhatsApp'
    );
  });
}

/* BOTÃO FLUTUANTE */

function configurarBotaoFlutuante() {
  const botao = document.getElementById('floating-whatsapp');

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

/* VALIDAÇÃO DOS LINKS EXTERNOS */

function validarEndereco(valor) {
  if (typeof valor !== 'string') return '';

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

/* ANO AUTOMÁTICO */

function atualizarAno() {
  const elemento = document.getElementById('year');

  if (elemento) {
    elemento.textContent = new Date().getFullYear();
  }
}

/* NAVEGAÇÃO SUAVE ENTRE AS SEÇÕES */

function iniciarNavegacao() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(function (link) {
    link.addEventListener('click', function (evento) {
      const destinoId = link.getAttribute('href');

      if (!destinoId || destinoId === '#') return;

      const destino = document.getElementById(
        destinoId.substring(1)
      );

      if (!destino) return;

      evento.preventDefault();

      const movimentoReduzido = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      destino.scrollIntoView({
        behavior: movimentoReduzido ? 'auto' : 'smooth',
        block: 'start'
      });

      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', destinoId);
      }
    });
  });
}

/* FIM DO SCRIPT.JS */
