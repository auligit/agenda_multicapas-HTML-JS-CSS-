class AgendaApp {
    constructor(url) {
      this.url = url;
      this.table = document.getElementById('data');
      this.form = document.getElementById('form');
      this.nameField = document.getElementById('name');
      this.lastNameField = document.getElementById('lastName');
      this.phoneField = document.getElementById('phone');
      this.form.addEventListener('submit', this.sendData.bind(this));
    }
  
    getAll() {
      fetch(this.url)
        .then(response => response.json())
        .then(data => {
          data.forEach(element => {
            const row = this.table.insertRow();
            const nameCell = row.insertCell();
            const lastNameCell = row.insertCell();
            const phoneCell = row.insertCell();
            nameCell.textContent = element.nombre;
            lastNameCell.textContent = element.apellido;
            phoneCell.textContent = element.telefono;
          });
        })
        .catch(error => console.log(error));
    }
  
    sendData(event) {
      event.preventDefault();
      const name = this.nameField.value;
      const lastName = this.lastNameField.value;
      const phone = this.phoneField.value;
  
      if (name && lastName && phone) {
        const contact = {
          nombre: name,
          apellido: lastName,
          telefono: phone
        };
        this.send(contact);
      } else {
        alert('Por favor, complete todos los campos.');
      }
    }
  
    send(contact) {
      fetch(this.url, {
        method: 'POST',
        body: JSON.stringify(contact)
      })
        .then(response => {
          console.log('¡Datos enviados con éxito!');
          this.table.innerHTML = '';
          this.getAll();
          this.form.reset();
        })
        .catch(error => console.log(error));
    }
  }
  
  const app = new AgendaApp('http://www.raydelto.org/agenda.php');
  app.getAll();
  