import { LitElement, css, html } from 'lit';
import {isAuthenticated} from './guards/isAuthenticated.js';
import { Router } from "@vaadin/router";

import "./pages/home-page/home-page.js";
import "./pages/login-page/login-page.js";
import "./pages/register-page/register-page.js";
import "./pages/create-note-page/create-note-page.js"
import "./pages/edit-page/edit-page.js"

export class MyElement extends LitElement {


  constructor() {
    super()
    
  }

  firstUpdated() {
    const router = new Router(this.shadowRoot.querySelector("#outlet"));

    // Define las rutas
    const routes = [
      { path: "/", component: "home-page" },
      { 
        path: "/create-note", 
        component: "create-note-page",
        action: () => {
          if (!isAuthenticated()) {
            Router.go('/login'); // Redirige a login si no está autenticado
          }
        }
      },
      { 
        path: '/edit-note/:id', 
        component: "edit-page",
        action: () => {
          if (!isAuthenticated()) {
            Router.go('/login'); // Redirige a login si no está autenticado
          }
        }
      },
      {
        path: "/login", 
        component: "login-page",
        action: () => {
          if (isAuthenticated()) {
            Router.go('/'); // Si está autenticado, redirige a la página de inicio
          }
        }
      },
      { path: "/register", component: "register-page" },
    ];
    
    router.setRoutes(routes);
  }

  render() {
    return html`
      <div id="outlet"></div>
    `
  }



  static get styles() {
    return css`
      :host {
       display:block;
      }

      
    `
  }
}

window.customElements.define('my-element', MyElement)
