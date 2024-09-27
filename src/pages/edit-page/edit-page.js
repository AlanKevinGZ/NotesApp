import { LitElement, html, css } from "lit";
import { getNoteById } from "../../datamanger/notesDM/get-note-id-dm.js";
import { editNotes } from "../../datamanger/notesDM/edit-note-dm.js";
import { Router } from "@vaadin/router"; // Importa el Router

export class EditPage extends LitElement {
  static styles = css`
    .form-container {
      max-width: 400px;
      margin: auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #f9f9f9;
    }

    .form-group {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input[type="text"],
    textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      padding: 10px 15px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background-color: #45a049;
    }

    .error {
      color: red;
      font-size: 0.9em;
      margin-bottom: 10px;
    }

    .success {
      color: green;
      font-size: 0.9em;
      margin-bottom: 10px;
    }
  `;

  static get properties() {
    return {
      note: { type: Object },
      id: { type: String },
      errorMessage: { type: String },
      successMessage: { type: String },
    };
  }

  constructor() {
    super();
    this.GetNoteById = new getNoteById();
    this.EditNotes = new editNotes();
    this.id = "";
    this.note = {};
    this.errorMessage = "";
    this.successMessage = "";
  }

  firstUpdated() {
    console.log("firstUpdated en EditPage");
    this.id = this.location.params.id;
    console.log(this.id);
    this.loadNoteData(this.id);
  }

  async loadNoteData(id) {
    try {
      const res = await this.GetNoteById.getApi(id); 
      if (res.error) {
        Router.go('/');
      }

      this.note = res;
      this.setValue();
    } catch (error) {
      console.error("Error al cargar la nota:", error);
    }
  }

  setValue() {
    this.shadowRoot.querySelector('#title').value = this.note.title || '';
    this.shadowRoot.querySelector('#content').value = this.note.content || '';
  }

  validateFields(title, content) {
    if (!title || title.trim() === "") {
      this.errorMessage = "El título no puede estar vacío.";
      return false;
    }

    if (!content || content.trim() === "") {
      this.errorMessage = "El contenido no puede estar vacío.";
      return false;
    }

    this.errorMessage = ""; // Si no hay errores
    return true;
  }

  async handleSubmit(e) {
    e.preventDefault();

    const title = this.shadowRoot.querySelector('#title').value;
    const content = this.shadowRoot.querySelector('#content').value;

    // Validación de los campos
    if (!this.validateFields(title, content)) {
      return;
    }

    const edit = {
      title: title,
      content: content
    };

    try {
      const response = await this.EditNotes.editeApi(this.id, edit);
      if (response.error) {
        this.errorMessage = "Error al modificar la nota.";
      } else {
        this.successMessage = "Nota modificada correctamente.";
        this.errorMessage = ""; // Limpia cualquier mensaje de error
        setTimeout(() => {
          Router.go('/')
        }, 1000);
      }
    } catch (error) {
      this.errorMessage = "Ocurrió un error al intentar modificar la nota.";
      console.error(error);
    }
  }

  render() {
    return html`
      <h1>Edit Note</h1>
      <div class="form-container">
        <form @submit="${(e) => this.handleSubmit(e)}">
          ${this.errorMessage ? html`<div class="error">${this.errorMessage}</div>` : ''}
          ${this.successMessage ? html`<div class="success">${this.successMessage}</div>` : ''}
          <div class="form-group">
            <label for="title">Title</label>
            <input
              type="text"
              id="title"
              .value="${this.note.title || ''}"
              @input="${(e) => this.note.title = e.target.value}"
              required
            />
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <textarea
              id="content"
              .value="${this.note.content || ''}"
              @input="${(e) => this.note.content = e.target.value}"
              required
              rows="4"
            ></textarea>
          </div>
          <button type="submit">Save Changes</button>
          <a href="/">Regresar</a>
        </form>
      </div>
    `;
  }
}

customElements.define("edit-page", EditPage);
