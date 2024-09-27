import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';

export class RegisterPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background-color: #f4f6f9;
      font-family: Arial, sans-serif;
    }

    .register-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 40px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .gsi-material-button {
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      -webkit-appearance: none;
      background-color: WHITE;
      background-image: none;
      border: 1px solid #747775;
      -webkit-border-radius: 4px;
      border-radius: 4px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #1f1f1f;
      cursor: pointer;
      font-family: "Roboto", arial, sans-serif;
      font-size: 14px;
      height: 40px;
      letter-spacing: 0.25px;
      outline: none;
      overflow: hidden;
      padding: 0 12px;
      position: relative;
      text-align: center;
      -webkit-transition: background-color 0.218s, border-color 0.218s,
        box-shadow 0.218s;
      transition: background-color 0.218s, border-color 0.218s,
        box-shadow 0.218s;
      vertical-align: middle;
      white-space: nowrap;
      width: auto;
      max-width: 400px;
      min-width: min-content;
    }

    .gsi-material-button .gsi-material-button-icon {
      height: 20px;
      margin-right: 12px;
      min-width: 20px;
      width: 20px;
    }

    .gsi-material-button .gsi-material-button-content-wrapper {
      -webkit-align-items: center;
      align-items: center;
      display: flex;
      -webkit-flex-direction: row;
      flex-direction: row;
      -webkit-flex-wrap: nowrap;
      flex-wrap: nowrap;
      height: 100%;
      justify-content: space-between;
      position: relative;
      width: 100%;
    }

    .gsi-material-button .gsi-material-button-contents {
      -webkit-flex-grow: 1;
      flex-grow: 1;
      font-family: "Roboto", arial, sans-serif;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: top;
    }

    .gsi-material-button .gsi-material-button-state {
      -webkit-transition: opacity 0.218s;
      transition: opacity 0.218s;
      bottom: 0;
      left: 0;
      opacity: 0;
      position: absolute;
      right: 0;
      top: 0;
    }

    .gsi-material-button:disabled {
      cursor: default;
      background-color: #ffffff61;
      border-color: #1f1f1f1f;
    }

    .gsi-material-button:disabled .gsi-material-button-contents {
      opacity: 38%;
    }

    .gsi-material-button:disabled .gsi-material-button-icon {
      opacity: 38%;
    }

    .gsi-material-button:not(:disabled):active .gsi-material-button-state,
    .gsi-material-button:not(:disabled):focus .gsi-material-button-state {
      background-color: #303030;
      opacity: 12%;
    }

    .gsi-material-button:not(:disabled):hover {
      -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
        0 1px 3px 1px rgba(60, 64, 67, 0.15);
      box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
        0 1px 3px 1px rgba(60, 64, 67, 0.15);
    }

    .gsi-material-button:not(:disabled):hover .gsi-material-button-state {
      background-color: #303030;
      opacity: 8%;
    }

    h2 {
      text-align: center;
      color: #0a2540;
    }

    form {
      display: flex;
      flex-direction: column;
      margin-bottom:1rem;
    }

    .password-container {
      position: relative;
    }

    input {
      margin-bottom: 20px;
      padding: 12px;
      font-size: 16px;
      border-radius: 4px;
      border: 1px solid #ccd6dd;
      outline: none;
      width: 100%;
    }

    .toggle-password {
      position: absolute;
      top: 32%;
      right: 10px;
      transform: translateY(-50%);
      cursor: pointer;
      border: none;
      background: none;
      font-size: 14px;
    }

    button {
      padding: 12px;
      font-size: 16px;
      background-color: #0070ba;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

   

    .google-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      border: 2px solid #4285f4;
      color: #4285f4;
      margin-top: 16px;
      cursor: pointer;
    }

    .google-btn img {
      margin-right: 8px;
    }

    .error-message {
      color: red;
      text-align: center;
    }
  `;

  static properties = {
    errorMessage: { type: String },
    showPassword: { type: Boolean },
    showConfirmPassword: { type: Boolean },
  };

  constructor() {
    super();
    this.errorMessage = '';
    this.showPassword = false;
    this.showConfirmPassword = false;
  }

  render() {
    return html`
      <div class="register-container">
        <h2>Registro</h2>
        <form @submit="${this.handleRegister}">
          <input type="text" name="username" placeholder="Nombre de usuario" required />
          <input type="email" name="email" placeholder="Correo electrónico" required />
          
          <div class="password-container">
            <input 
              type="${this.showPassword ? 'text' : 'password'}" 
              name="password" 
              placeholder="Contraseña" 
              required 
            />
            <button type="button" class="toggle-password" @click="${this.togglePassword}">
              ${this.showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <div class="password-container">
            <input 
              type="${this.showConfirmPassword ? 'text' : 'password'}" 
              name="confirmPassword" 
              placeholder="Confirmar contraseña" 
              required 
            />
            <button type="button" class="toggle-password" @click="${this.toggleConfirmPassword}">
              ${this.showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>

          ${this.errorMessage ? html`<p class="error-message">${this.errorMessage}</p>` : ''}
          
          <button type="submit">Registrarse</button>
        </form>

        <a href="/login">Iniciar Sesison</a>
      </div>
    `;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async handleRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target); //Captura todos los campos del formulario
    const username = formData.get('username'); // Obtiene el valor del campo "username"
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    
  }

  
}

customElements.define('register-page', RegisterPage);
