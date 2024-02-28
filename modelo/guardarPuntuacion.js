const guardarPuntuacion = (score, username) =>  {

    const tableBody = document.querySelector('.table-container__tbody');

    const tr = document.createElement('tr');

    const tdRank = document.createElement('td');
    const tdUsername = document.createElement('td');
    const tdScore = document.createElement('td');

    tdRank.textContent = 1; // Puedes ajustar esto según la lógica de tu aplicación
    tdUsername.textContent = username;
    tdScore.textContent = score;

    tr.appendChild(tdRank);
    tr.appendChild(tdUsername);
    tr.appendChild(tdScore);

    tableBody.appendChild(tr);
}

window.guardarPuntuacion = guardarPuntuacion;

