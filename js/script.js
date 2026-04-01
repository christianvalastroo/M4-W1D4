const eminemSec = document.querySelector("#eminemSection")
const metallicaSec = document.querySelector("#metallicaSection")
const queenSec = document.querySelector("#queenSection")
const searchSection = document.querySelector("#searchSection")
const foundSection = document.querySelector("#found")
const albumList = document.querySelector("#albumList")
const albumListButton = document.querySelector("#albumListButton")

const searchInput = document.querySelector(".searchInput")
const buttonSearch = document.querySelector(".buttonSearch")

const eminemSpinner = document.querySelector("#eminemSpinner")
const metallicaSpinner = document.querySelector("#metallicaSpinner")
const queenSpinner = document.querySelector("#queenSpinner")
const searchSpinner = document.querySelector("#foundSpinner")

const eminemError = document.querySelector("#eminemError")
const metallicaError = document.querySelector("#metallicaError")
const queenError = document.querySelector("#queenError")
const searchError = document.querySelector("#foundError")

const artistNames = ["Eminem", "Metallica", "Queen"]

// Chiamata all'API Deezer.
const fetchAlbums = async (artistName) => {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`
  )

  return await response.json()
}

const showLoading = (spinner, errorAlert) => {
  if (spinner) {
    spinner.classList.remove("d-none")
  }

  if (errorAlert) {
    errorAlert.classList.add("d-none")
  }
}

const hideLoading = (spinner) => {
  if (spinner) {
    spinner.classList.add("d-none")
  }
}

// Crea e inserisce una card album nella sezione richiesta.
const generateCard = (album, section) => {
  const albumConteiner = document.createElement("div")
  const imgAlbum = document.createElement("img")
  const albumName = document.createElement("p")
  const artistName = document.createElement("p")

  imgAlbum.src = album.album.cover_medium
  albumName.textContent = album.album.title
  artistName.textContent = album.artist.name

  albumConteiner.append(imgAlbum, albumName, artistName)
  section.appendChild(albumConteiner)
}

// Svuota e riempie una sezione con gli album ricevuti.
const renderAlbums = (albums, section) => {
  section.innerHTML = ""

  albums.forEach((album) => {
    generateCard(album, section)
  })
}

// Carica una sezione artista gestendo spinner ed eventuali errori.
const loadArtistSection = async (artistName, section, spinner, errorAlert) => {
  showLoading(spinner, errorAlert)

  try {
    const res = await fetchAlbums(artistName)
    renderAlbums(res.data, section)
    return res.data
  } catch (error) {
    console.log(error)

    if (errorAlert) {
      errorAlert.classList.remove("d-none")
    }

    return []
  } finally {
    hideLoading(spinner)
  }
}

// Caricamento iniziale delle tre sezioni principali.
loadArtistSection("Eminem", eminemSec, eminemSpinner, eminemError)
loadArtistSection("Metallica", metallicaSec, metallicaSpinner, metallicaError)
loadArtistSection("Queen", queenSec, queenSpinner, queenError)

// Eventi di ricerca.
buttonSearch.addEventListener("click", async () => {
  const query = searchInput.value.trim()

  if (!query) {
    foundSection.classList.add("d-none")
    searchSection.innerHTML = ""
    return
  }

  foundSection.classList.remove("d-none")
  await loadArtistSection(query, searchSection, searchSpinner, searchError)
})

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    buttonSearch.click()
  }
})

// Mostra o nasconde la lista completa degli album unici.
const createAlbumList = async () => {
  if (!albumList.classList.contains("d-none")) {
    albumList.innerHTML = ""
    albumList.classList.add("d-none")
    return
  }

  albumList.innerHTML = ""
  albumList.classList.remove("d-none")

  const allTitles = []

  try {
    for (let i = 0; i < artistNames.length; i += 1) {
      const res = await fetchAlbums(artistNames[i])

      res.data.forEach((track) => {
        if (!allTitles.includes(track.album.title)) {
          allTitles.push(track.album.title)
        }
      })
    }

    allTitles.forEach((title) => {
      const albumItem = document.createElement("p")
      albumItem.textContent = title
      albumList.appendChild(albumItem)
    })
  } catch (error) {
    console.log(error)
    albumList.textContent = "Impossibile caricare la lista album."
  }
}

albumListButton.addEventListener("click", createAlbumList)
