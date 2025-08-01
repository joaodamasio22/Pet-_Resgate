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

const cidades__por__estado = {
  AC: ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira"],
  AL: ["Maceió", "Arapiraca", "Palmeira dos Índios"],
  AM: ["Manaus", "Parintins", "Itacoatiara"],
  AP: ["Macapá", "Santana", "Laranjal do Jari"],
  BA: ["Salvador", "Feira de Santana", "Vitória da Conquista"],
  CE: ["Fortaleza", "Caucaia", "Juazeiro do Norte"],
  DF: ["Brasília"],
  ES: ["Vitória", "Vila Velha", "Serra"],
  GO: ["Goiânia", "Aparecida de Goiânia", "Anápolis"],
  MA: ["São Luís", "Imperatriz", "Caxias"],
  MG: ["Belo Horizonte", "Uberlândia", "Contagem"],
  MS: ["Campo Grande", "Dourados", "Três Lagoas"],
  MT: ["Cuiabá", "Várzea Grande", "Rondonópolis"],
  PA: ["Belém", "Ananindeua", "Santarém"],
  PB: ["João Pessoa", "Campina Grande", "Patos"],
  PE: ["Recife", "Jaboatão dos Guararapes", "Olinda"],
  PI: ["Teresina", "Parnaíba", "Picos"],
  PR: ["Curitiba", "Londrina", "Maringá"],
  RJ: ["Rio de Janeiro", "Niterói", "Duque de Caxias"],
  RN: ["Natal", "Mossoró", "Parnamirim"],
  RO: ["Porto Velho", "Ji-Paraná", "Ariquemes"],
  RR: ["Boa Vista", "Rorainópolis", "Caracaraí"],
  RS: ["Porto Alegre", "Caxias do Sul", "Pelotas"],
  SC: ["Florianópolis", "Joinville", "Blumenau"],
  SE: ["Aracaju", "Nossa Senhora do Socorro", "Lagarto"],
  SP: ["São Paulo", "Campinas", "Santos", "Sorocaba", "Ribeirão Preto"],
  TO: ["Palmas", "Araguaína", "Gurupi"]
}

function atualizar__estado() {
    var estados__selecionada = document.getElementById('estado').value
    var cidade__selecionada = document.getElementById('cidade');

    cidade__selecionada.innerHTML = '<option value="">Cidade</option>';
    if (estados__selecionada === 'AC')
        cidade = cidades__por__estado['AC']
    else if (estados__selecionada === 'AL')
        cidade = cidades__por__estado['AL']
    else if (estados__selecionada === 'AM')
        cidade = cidades__por__estado['AM']
    else if (estados__selecionada === 'AP')
        cidade = cidades__por__estado['AP']
    else if (estados__selecionada === 'BA')
        cidade = cidades__por__estado['BA']
    else if (estados__selecionada === 'CE')
        cidade = cidades__por__estado['CE']
    else if (estados__selecionada === 'DF')
        cidade = cidades__por__estado['DF']
    else if (estados__selecionada === 'ES')
        cidade = cidades__por__estado['ES']
    else if (estados__selecionada === 'GO')
        cidade = cidades__por__estado['GO']
    else if (estados__selecionada === 'MA')
        cidade = cidades__por__estado['MA']
    else if (estados__selecionada === 'MG')
        cidade = cidades__por__estado['MG']
    else if (estados__selecionada === 'MS')
        cidade = cidades__por__estado['MS']
    else if (estados__selecionada === 'MT')
        cidade = cidades__por__estado['MT']
    else if (estados__selecionada === 'PA')
        cidade = cidades__por__estado['PA']
    else if (estados__selecionada === 'PB')
        cidade = cidades__por__estado['PB']
    else if (estados__selecionada === 'PE')
        cidade = cidades__por__estado['PE']
    else if (estados__selecionada === 'PI')
        cidade = cidades__por__estado['PI']
    else if (estados__selecionada === 'PR')
        cidade = cidades__por__estado['PR']
    else if (estados__selecionada === 'RJ')
        cidade = cidades__por__estado['RJ']
    else if (estados__selecionada === 'RN')
        cidade = cidades__por__estado['RN']
    else if (estados__selecionada === 'RO')
        cidade = cidades__por__estado['RO']
    else if (estados__selecionada === 'RR')
        cidade = cidades__por__estado['RR']
    else if (estados__selecionada === 'RS')
        cidade = cidades__por__estado['RS']
    else if (estados__selecionada === 'SC')
        cidade = cidades__por__estado['SC']
    else if (estados__selecionada === 'SE')
        cidade = cidades__por__estado['SE']
    else if (estados__selecionada === 'SP')
        cidade = cidades__por__estado['SP']
    else if (estados__selecionada === 'TO')
        cidade = cidades__por__estado['TO']

    cidade.innerHTML = cidade
}
