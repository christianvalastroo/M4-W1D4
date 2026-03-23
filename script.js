function loadEminem() {

  const eminemSection = document.getElementById("eminemSection")
  const eminemContainer = document.getElementById("eminem")

  fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem")

    .then(response => response.json())

    .then(data => {

      const songs = data.data.filter(song => song.artist.name === "Eminem")

      eminemSection.innerHTML = ""

      songs.forEach(song => {

        const col = document.createElement("div")
        col.classList.add("col", "text-center")

        const img = document.createElement("img")
        img.src = song.album.cover_medium
        img.classList.add("img-fluid")
        img.alt = song.title

        const title = document.createElement("p")
        title.innerText = song.title

        const artist = document.createElement("p")
        artist.innerText = song.artist.name

        col.appendChild(img)
        col.appendChild(title)
        col.appendChild(artist)

        eminemSection.appendChild(col)

      })

      eminemContainer.classList.remove("d-none")

    })

    .catch(error => {
      console.log("Errore:", error)
    })

}

loadEminem()

function loadMetallica() {

  const metallicaSection = document.getElementById("metallicaSection")
  const metallicaContainer = document.getElementById("metallica")

  fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=metallica")

    .then(response => response.json())

    .then(data => {

      const songs = data.data

      songs.forEach(song => {

        const col = document.createElement("div")
        col.classList.add("col", "text-center")

        const img = document.createElement("img")
        img.src = song.album.cover_medium

        const title = document.createElement("p")
        title.innerText = song.title

        const artist = document.createElement("p")
        artist.innerText = song.artist.name

        col.appendChild(img)
        col.appendChild(title)
        col.appendChild(artist)

        metallicaSection.appendChild(col)

      })

      metallicaContainer.classList.remove("d-none")

    })

    .catch(error => {
      console.log("Errore:", error)
    })

}

loadMetallica()

function loadQueen() {

  const queenSection = document.getElementById("queenSection")
  const queenContainer = document.getElementById("queen")

  fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=queen")

    .then(response => response.json())

    .then(data => {

      const songs = data.data

      queenSection.innerHTML = ""

      songs.forEach(song => {

        const col = document.createElement("div")
        col.classList.add("col", "text-center")

        const img = document.createElement("img")
        img.src = song.album.cover_medium
        img.classList.add("img-fluid")

        const title = document.createElement("p")
        title.innerText = song.title

        const artist = document.createElement("p")
        artist.innerText = song.artist.name

        col.appendChild(img)
        col.appendChild(title)
        col.appendChild(artist)

        queenSection.appendChild(col)

      })

      queenContainer.classList.remove("d-none")

    })

    .catch(error => {
      console.log("Errore:", error)
    })

}

loadQueen()