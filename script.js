
/* ==========================================
   REZENDE — CONECTA SÍNDICOS
   ARQUIVO: script.js
   ========================================== */

'use strict';

/* ==========================================
   01 — INICIAR O SITE
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

  // Fecha o menu ao clicar em uma seção.

  const links = menu.querySelectorAll('a');

  links.forEach(function (link) {

    link.addEventListener('click', fecharMenu);

  });

  // Fecha o menu ao pressionar ESC.

  document.addEventListener('keydown', function (evento) {

    if (evento.key === 'Escape') {
      fecharMenu();
    }

  });

  // Fecha o menu ao voltar para a visualização desktop.

  window.addEventListener('resize', function () {

    if (window.innerWidth > 768) {
      fecharMenu();
    }

  });

}


/* ==========================================
   03 — CONTEÚDO DOS BENEFÍCIOS
   ========================================== */

/*
  Aqui ficam armazenadas as informações
  dos seis benefícios do Conecta Síndicos.

  Os botões e o cartão principal utilizam
  estas informações automaticamente.
*/

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

  botoes.forEach(function (botao, indice) {

    botao.addEventListener('click', function () {

      selecionarBeneficio(indice);

    });

    // Permite navegar pelas opções usando o teclado.

    botao.addEventListener('keydown', function (evento) {

      let proximo = indice;

      if (evento.key === 'ArrowDown' ||
          evento.key === 'ArrowRight') {

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

  // Exibe o primeiro benefício ao carregar a página.

  selecionarBeneficio(0);

}


/* ==========================================
   05 — CONFIGURAÇÕES COMERCIAIS
   ========================================== */

/*
  Os dados comerciais são carregados do
  arquivo config.js.

  Isso permite alterar WhatsApp, consultor
  e campanhas sem editar este script.
*/

function carregarConfiguracoes() {

  const config = window.REZENDE_CONFIG || {};

  const nomeConsultor =
    config.consultantName || 'Equipe Rezende';

  const cargoConsultor =
    config.consultantRole ||
    'Atendimento especializado a condomínios';

  const email =
    typeof config.email === 'string'
      ? config.email.trim()
      : '';

  const nomeElemento =
    document.getElementById('consultant-name');

  const cargoElemento =
    document.getElementById('consultant-role');

  if (nomeElemento) {
    nomeElemento.textContent = nomeConsultor;
  }

  if (cargoElemento) {
    cargoElemento.textContent = cargoConsultor;
  }


  /* E-MAIL */

  const emailElemento =
    document.getElementById('email-link');

  const emailValido =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (emailElemento) {

    if (emailValido) {

      emailElemento.textContent = email;

      emailElemento.href = 'mailto:' + email;

    } else {

      emailElemento.hidden = true;

    }

  }


  /* SITE INSTITUCIONAL */

  const siteElemento =
    document.getElementById('website-link');

  if (siteElemento) {

    const site = config.institutionalWebsite || '';

    const endereco = validarEndereco(site);

    if (endereco) {

      siteElemento.href = endereco;

    } else {

      siteElemento.hidden = true;

    }

  }


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

      botaoCampanha.textContent =
        'Acessar campanha atual ↗';

    } else {

      botaoCampanha.href = '#contato';

      botaoCampanha.removeAttribute('target');

      botaoCampanha.textContent =
        'Consultar campanha atual ↗';

    }

  }


  /* WHATSAPP */

  configurarWhatsApp(config, emailValido ? email : '');

}


/* ==========================================
   06 — WHATSAPP
   ========================================== */

function configurarWhatsApp(config, email) {

  const botaoWhatsApp =
    document.getElementById('whatsapp-link');

  const botaoFlutuante =
    document.getElementById('floating-whatsapp');

  const telefone = String(
    config.whatsappNumber || ''
  ).replace(/\D/g, '');

  const mensagem =
    config.whatsappMessage ||
    'Olá! Gostaria de conhecer o Conecta Síndicos da Rezende.';

  // Número brasileiro: 55 + DDD + telefone.
  // Exemplo de formato: 5521999999999.

  const telefoneValido =
    /^55\d{10,11}$/.test(telefone);

  let enderecoContato = '#contato';

  let contatoExterno = false;

  if (telefoneValido) {

    enderecoContato =
      'https://wa.me/' +
      telefone +
      '?text=' +
      encodeURIComponent(mensagem);

    contatoExterno = true;

  } else if (email) {

    enderecoContato =
      'mailto:' +
      email +
      '?subject=' +
      encodeURIComponent('Interesse no Conecta Síndicos') +
      '&body=' +
      encodeURIComponent(mensagem);

  }


  /* BOTÃO PRINCIPAL */

  if (botaoWhatsApp) {

    if (telefoneValido) {

      botaoWhatsApp.href = enderecoContato;

      botaoWhatsApp.textContent =
        'Iniciar conversa no WhatsApp ↗';

      botaoWhatsApp.target = '_blank';

      botaoWhatsApp.rel = 'noopener noreferrer';

    } else if (email) {

      botaoWhatsApp.href = enderecoContato;

      botaoWhatsApp.textContent =
        'Entrar em contato por e-mail ↗';

      botaoWhatsApp.removeAttribute('target');

      botaoWhatsApp.removeAttribute('rel');

    } else {

      botaoWhatsApp.hidden = true;

    }

  }


  /* BOTÃO FLUTUANTE */

  if (botaoFlutuante) {

    if (telefoneValido || email) {

      botaoFlutuante.href = enderecoContato;

      botaoFlutuante.textContent =
        telefoneValido
          ? 'Fale pelo WhatsApp ↗'
          : 'Fale com a Rezende ↗';

      if (contatoExterno) {

        botaoFlutuante.target = '_blank';

        botaoFlutuante.rel = 'noopener noreferrer';

      } else {

        botaoFlutuante.removeAttribute('target');

        botaoFlutuante.removeAttribute('rel');

      }

    } else {

      botaoFlutuante.href = '#contato';

      botaoFlutuante.textContent =
        'Ver atendimento ↗';

    }

  }

}


/* ==========================================
   07 — VALIDAR LINKS EXTERNOS
   ========================================== */

/*
  Aceita apenas URLs que começam com
  http:// ou https://.

  Evita que endereços incorretos sejam
  adicionados aos botões.
*/

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
   08 — ANO AUTOMÁTICO NO RODAPÉ
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
   09 — NAVEGAÇÃO INTERNA
   ========================================== */

function iniciarNavegacao() {

  const linksInternos =
    document.querySelectorAll('a[href^="#"]');

  linksInternos.forEach(function (link) {

    link.addEventListener('click', function (evento) {

      const destinoId = link.getAttribute('href');

      if (!destinoId || destinoId === '#') {
        return;
      }

      const destino =
        document.getElementById(destinoId.substring(1));

      if (!destino) {
        return;
      }

      evento.preventDefault();

      const movimentoReduzido =
        window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;

      destino.scrollIntoView({

        behavior: movimentoReduzido ? 'auto' : 'smooth',

        block: 'start'

      });

      // Atualiza a URL mantendo o identificador da seção.

      if (window.history && window.history.replaceState) {

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
