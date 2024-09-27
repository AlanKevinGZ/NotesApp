import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";
import { getUser } from "../../datamanger/getUser-dm.js";
import { getNote } from "../../datamanger/notesDM/get-notes-dm.js";

import "../../components/notes-componentes/notes-componetens.js";

export class HomePage extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      .options{
        text-align:center;
        margin-top:1rem;
      }
      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: #333;
        color: white;
      }
      .menu {
        display: flex;
        align-items: center;
      }
      .menu p {
        margin-right: 1rem;
      }
      button {
        background-color: #ff4b5c;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 4px;
      }
      button:hover {
        background-color: #ff1e2e;
      }

      .button {
        background-color: #007bff; /* Color de fondo */
        color: white; /* Color de texto */
        padding: 10px 20px; /* Espaciado interior */
        border: none; /* Sin borde */
        border-radius: 5px; /* Bordes redondeados */
        text-decoration: none; /* Quitar subrayado */
        font-size: 16px; /* Tamaño de texto */
        cursor: pointer; /* Cambia el cursor a mano */
        display: inline-block;
        transition: background-color 0.3s ease; /* Efecto de transición */
      }

      .button:hover {
        background-color: #0056b3; /* Color de fondo al pasar el ratón */
      }

      .button:active {
        background-color: #004085; /* Color de fondo al hacer clic */
      }
    `,
  ];

  static get properties() {
    return {
      username: { type: String },
      notesItems: { type: Array },
    };
  }

  constructor() {
    super();
    this.notesItems = [];
    this.username = "";
    this.getUserObject = new getUser();
    this.notesClass = new getNote();
  }

  firstUpdated() {
    this.handleToken(); // Llama a la función para manejar el token
    this.responseApi();
    this.getNotes();
  }

  handleToken() {
    const urlParams = new URLSearchParams(window.location.search);

    const token = urlParams.get("token"); // Captura el token de la URL

    if (token) {
      localStorage.setItem("token", token); // Almacena el token en localStorage
      window.history.replaceState({}, document.title, window.location.pathname); // Limpia la URL
    }
  }

  async responseApi() {
    try {
      let user = await this.getUserObject.getApi();
      if (
        user.message === "Token no proporcionado" ||
        user.message === "Token no válido"
      ) {
        localStorage.removeItem("token");
        Router.go("/login");
      }
      this.username = user.username;
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      Router.go("/login");
    }
  }

  async getNotes() {
    let response = await this.notesClass.getApi();
    this.notesItems = response;
  }

  logout() {
    localStorage.removeItem("token");
    Router.go("/login");
  }

  render() {
    return html`
      <nav>
        <div class="menu">
          <p>Bienvenido, ${this.username}</p>
          <button @click="${this.logout}">Logout</button>
        </div>
      </nav>
      <div class="options">
        <a
          href="/create-note"
          @click="${(e) => {
            e.preventDefault();
            Router.go("/create-note");
          }}"
          class="button"
        >
          Agregar Una Nota Nueva
        </a>
      </div>

      <notes-component .notes="${this.notesItems}"></notes-component>
    `;
  }
}

customElements.define("home-page", HomePage);
