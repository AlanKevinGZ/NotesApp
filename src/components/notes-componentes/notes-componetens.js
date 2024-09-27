import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";
import interact from "interactjs";
import { deleteNote } from "../../datamanger/notesDM/delete-note-dm.js";
import { getNoteById } from "../../datamanger/notesDM/get-note-id-dm.js";

export class NotesComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .notes-container {
      position: relative; /* Para que las notas se posicionen en relación a este contenedor */
      margin: 2rem auto;
      width: 100%; /* Define el ancho */
      max-width: 1200px;
      height: 100vh; /* Define la altura */
      border: 1px solid #ccc; /* Opcional: borde para visualizar el área */
      overflow: hidden; /* Evita que las notas salgan del contenedor */
      padding: 10px; /* Espaciado interno */
    }

    .note {
      background-color: #fff9a8;
      padding: 20px;
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      position: relative;
      font-size: 14px;
      margin: 10px;
      width: 40%;
      cursor: move; /* Cambia el cursor para indicar que se puede arrastrar */
    }

    .note-header {
      font-weight: bold;
      font-size: 16px;
      color: #333;
      margin-bottom: 10px;
    }

    .note-content {
      color: #666;
      font-size: 14px;
      margin-bottom: 15px;
    }

    .note-footer {
      font-size: 12px;
      color: #999;
    }
  `;

  static get properties() {
    return {
      notes: { type: Array },
    };
  }

  constructor() {
    super();
    this.DeleteNote = new deleteNote();
    this.GetNoteById = new getNoteById();
    this.notes = []; // Inicializa el arreglo de notas vacío
  }

  firstUpdated() {
    this.initDragAndDrop(); // Inicializa el arrastre
  }

  updated(changedProperties) {
    if (changedProperties.has("notes")) {
      //changedProperties.has('') se utiliza dentro del método updated  verificar si la propiedad  ha cambiado desde la última renderización.
      this.loadNotePositions(); // Carga las posiciones solo cuando las notas cambian
    }
  }

  loadNotePositions() {
    const positions = JSON.parse(localStorage.getItem("notePositions")) || {};

    this.notes.forEach((note, index) => {
      const noteElement = this.shadowRoot.querySelector(
        `.note[data-index="${index}"]`
      );
      if (noteElement && positions[index]) {
        const { x, y } = positions[index];
        noteElement.setAttribute("data-x", x);
        noteElement.setAttribute("data-y", y);
        noteElement.style.transform = `translate(${x}px, ${y}px)`;
      }
    });
  }

  render() {
    return html`
      <div class="notes-container">
        ${this.notes.map(
          (note, index) => html`
            <div class="note" data-index="${index}">
              <div class="note-header">${note.title}</div>
              <div class="note-content">${note.content}</div>
              <div class="note-footer">
                By: ${note.username} (${note.email})
              </div>
              <div class="note-footer">
                Created at: ${new Date(note.created_at).toLocaleString()}
              </div>

              <div class="note-footer">
                <button @click="${() => this.handleEdit(note.id)}">
                  Editar
                </button>
                <button @click="${() => this.handleDelete(note.id, index)}">
                  Eliminar
                </button>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }

  initDragAndDrop() {
    const container = this.shadowRoot.querySelector(".notes-container"); // Selecciona el contenedor

    interact(".note")
      .draggable({
        listeners: {
          move: (event) => {
            const target = event.target;

            // Actualiza la posición del elemento arrastrado
            const x =
              (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
            const y =
              (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute("data-x", x);
            target.setAttribute("data-y", y);
          },
        },
        modifiers: [
          interact.modifiers.restrict({
            restriction: container, // Restringe el movimiento al contenedor
            endOnly: true, // Restringe el movimiento solo al final
          }),
        ],
      })
      .on("dragend", (event) => {
        const index = event.target.getAttribute("data-index");
        const x = event.target.getAttribute("data-x");
        const y = event.target.getAttribute("data-y");

        // Guardar la posición en localStorage
        this.saveNotePosition(index, x, y);
        console.log(
          `Nota en el índice ${index} fue arrastrada a nueva posición (${x}, ${y})`
        );
      });
  }

  saveNotePosition(index, x, y) {
    // Cargar la posición actual de las notas
    const positions = JSON.parse(localStorage.getItem("notePositions")) || {};

    // Guardar la nueva posición
    positions[index] = { x, y };

    // Actualizar localStorage
    localStorage.setItem("notePositions", JSON.stringify(positions));
  }

  async handleDelete(id) {
    try {
      // Confirmar la eliminación
      const confirmDelete = confirm(
        "¿Estás seguro de que deseas eliminar esta nota?"
      );
      if (!confirmDelete) return;

      // Llamar a la API para eliminar la nota
      await this.DeleteNote.deleteApi(id);

      // Eliminar la nota del array localmente
      this.notes = this.notes.filter((note) => note.id !== id);

      // Eliminar la posición de la nota de localStorage
      const positions = JSON.parse(localStorage.getItem("notePositions")) || {};
      delete positions[id];
      localStorage.setItem("notePositions", JSON.stringify(positions));

      console.log(`Nota con ID ${id} eliminada correctamente.`);
    } catch (error) {
      console.error(`Error al eliminar la nota con ID ${id}:`, error);
      alert(
        "Hubo un error al eliminar la nota. Por favor, inténtalo de nuevo."
      );
    }
  }

  async handleEdit(id) {
    Router.go(`/edit-note/${id}`);
  }


}

customElements.define("notes-component", NotesComponent);
