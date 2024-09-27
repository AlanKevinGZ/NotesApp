// create-note-page.js
import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";
import { createNote } from "../../datamanger/notesDM/create-note-dm.js";

export class CreateNotePage extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        padding: 20px;
        font-family: Arial, sans-serif;
        background-color: #f0f2f5;
        min-height: 100vh;
      }

      h1 {
        text-align: center;
        color: #333;
      }

      .form-container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        padding: 30px;
      }

      .form-group {
        margin-bottom: 20px;
      }

      .form-group label {
        display: block;
        font-weight: bold;
        margin-bottom: 8px;
        color: #555;
      }

      .form-group input,
      .form-group textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        box-sizing: border-box;
        transition: border-color 0.3s;
      }

      .form-group input:focus,
      .form-group textarea:focus {
        border-color: #4caf50;
        outline: none;
      }

      .form-group textarea {
        resize: vertical;
        height: 200px;
      }

      .submit-button {
        background-color: #4caf50; /* Color verde */
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 18px;
        width: 100%;
        transition: background-color 0.3s;
      }

      .submit-button:hover {
        background-color: #45a049; /* Verde más oscuro al pasar el ratón */
      }

      .back-link {
        display: block;
        text-align: center;
        margin-top: 20px;
        text-decoration: none;
        color: #007bff; /* Color azul */
        font-size: 16px;
      }

      .back-link:hover {
        text-decoration: underline;
      }

      .error-message {
        color: #ff0000;
        text-align: center;
        margin-bottom: 15px;
        font-weight: bold;
      }

      .success-message {
        color: #4caf50;
        text-align: center;
        margin-bottom: 15px;
        font-weight: bold;
      }
    `,
  ];

  static get properties() {
    return {
      username: { type: String },
      errorMessage: { type: String },
      successMessage: { type: String },
    };
  }

  constructor() {
    super();
    this.createNoteClass = new createNote();
    this.username = "";
    this.errorMessage = "";
    this.successMessage = "";
  }

  firstUpdated() {}

  render() {
    return html`
      <div class="form-container">
        <h1>Create Note</h1>
        ${this.errorMessage
          ? html`<div class="error-message">${this.errorMessage}</div>`
          : ''}
        ${this.successMessage
          ? html`<div class="success-message">${this.successMessage}</div>`
          : ''}
        <form @submit="${this.handleSubmit}">
          <div class="form-group">
            <label for="title">Title</label>
            <input
              type="text"
              id="title"
              required
              placeholder="Enter the title"
            />
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <textarea
              id="content"
              required
              placeholder="Write your note here..."
            ></textarea>
          </div>
          <button type="submit" class="submit-button">Add Note</button>
        </form>
        <a href="/" class="back-link">Back to Notes</a>
      </div>
    `;
  }

  async postApiNote(note) {
    try {
      await this.createNoteClass.postApi(note);
    
      this.successMessage = "Note created successfully!";
      this.errorMessage = "";
      // Redirigir después de un breve retraso para mostrar el mensaje
      setTimeout(() => {
        Router.go('/'); // Asegúrate de que esta ruta sea correcta
      }, 1500);
    } catch (error) {
      this.errorMessage = error.message || 'Error creating note. Please try again.';
      this.successMessage = "";
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    // Obtener valores del formulario
    const title = this.shadowRoot.getElementById("title").value.trim();
    const content = this.shadowRoot.getElementById("content").value.trim();

    if (!title || !content) {
      this.errorMessage = "Both title and content are required.";
      this.successMessage = "";
      return;
    }

    let note = {
      title: title,
      content: content,
    };

    this.postApiNote(note);
  }
}

customElements.define("create-note-page", CreateNotePage);
