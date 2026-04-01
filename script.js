let usuarios = [];

async function obtenerUsuarios() {
  const estado = document.getElementById("estado");
  const loader = document.getElementById("loader");

  estado.textContent = "";
  loader.style.display = "block";

  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await respuesta.json();

    usuarios = data;

    loader.style.display = "none";
    renderizarUsuarios(usuarios);

  } catch (error) {
    loader.style.display = "none";
    estado.textContent = "Error al cargar usuarios. Intenta nuevamente.";
  }
}


function renderizarUsuarios(listaUsuarios) {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  if (listaUsuarios.length === 0) {
  lista.innerHTML = "<p>No se encontraron usuarios</p>";
  return;
  }

  listaUsuarios.forEach(usuario => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${usuario.name}</strong><br>
      📧 ${usuario.email}<br>
      🏢 ${usuario.company.name}<br>
      📍 ${usuario.address.city}
    `;

    lista.appendChild(li);
  });
}


document.getElementById("buscador").addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();

  const filtrados = usuarios.filter(u =>
    u.name.toLowerCase().includes(texto)
  );

  renderizarUsuarios(filtrados);
});

obtenerUsuarios();
