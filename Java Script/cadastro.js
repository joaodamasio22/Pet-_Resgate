class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li",
);
mobileNavbar.init();

// Requisuição de estados e cidades, utilizando a API do IBGE

const estadoSelect = document.getElementById("estado");
const cidadeSelect = document.getElementById("cidade");

function carregarEstados() {
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then(res => res.json())
    .then(estados => {
      estados.forEach(estado => {
        const option = document.createElement("option");
        option.value = estado.id;
        option.textContent = estado.nome;
        estadoSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Erro ao carregar estados:", error);
    });
}

function carregarCidades(estadoId) {
  cidadeSelect.innerHTML = "<option>Carregando cidades...</option>";

  if (estadoId) {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`)
      .then(res => res.json())
      .then(cidades => {
        cidadeSelect.innerHTML = "<option value=''>Selecione a cidade</option>";
        cidades.forEach(cidade => {
          const option = document.createElement("option");
          option.value = cidade.nome;
          option.textContent = cidade.nome;
          cidadeSelect.appendChild(option);
        });
      })
      .catch(error => {
        console.error("Erro ao carregar cidades:", error);
      });
  } else {
    cidadeSelect.innerHTML = "<option>Selecione um estado primeiro</option>";
  }
}

estadoSelect.addEventListener("change", () => {
  carregarCidades(estadoSelect.value);
});

document.addEventListener("DOMContentLoaded", () => {
  carregarEstados();
});