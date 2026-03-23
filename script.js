const ARTISTS = ["eminem", "metallica", "queen"]
const RESULTS_LIMIT = 4

const getTracks = async (query) => {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${encodeURIComponent(query)}`
  )

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  const { data } = await response.json()
  return data.slice(0, RESULTS_LIMIT)
}

const createTrackCard = (track) => {
  const col = document.createElement("div")
  col.classList.add("col", "text-center", "mb-4")

  const img = document.createElement("img")
  img.src = track.album.cover_big
  img.alt = `${track.album.title} cover`
  img.classList.add("img-fluid")

  const description = document.createElement("p")
  description.textContent = `${track.title} - Album: ${track.album.title}`

  col.appendChild(img)
  col.appendChild(description)

  return col
}

const renderTracks = (tracks, section) => {
  section.innerHTML = ""
  tracks.forEach((track) => {
    section.appendChild(createTrackCard(track))
  })
}

const populateSection = async (artistName, sectionId, wrapperId) => {
  try {
    const tracks = await getTracks(artistName)
    const wrapper = document.getElementById(wrapperId)
    const section = document.getElementById(sectionId)

    renderTracks(tracks, section)
    wrapper.classList.remove("d-none")
  } catch (error) {
    console.error(error)
  }
}

const search = async () => {
  const searchField = document.getElementById("searchField")
  const query = searchField.value.trim()
  const wrapper = document.getElementById("found")
  const section = document.getElementById("searchSection")

  if (!query) {
    section.innerHTML = ""
    wrapper.classList.add("d-none")
    return
  }

  try {
    const tracks = await getTracks(query)

    renderTracks(tracks, section)
    wrapper.classList.remove("d-none")
  } catch (error) {
    console.error(error)
  }
}

const createAlbumList = async () => {
  const container = document.getElementById("albumList")

  if (!container.classList.contains("d-none")) {
    container.innerHTML = ""
    container.classList.add("d-none")
    return
  }

  container.innerHTML = ""

  try {
    const tracksByArtist = await Promise.all(ARTISTS.map((artist) => getTracks(artist)))
    const albumTitles = [...new Set(tracksByArtist.flat().map((track) => track.album.title))]

    container.classList.remove("d-none")

    albumTitles.forEach((title) => {
      const album = document.createElement("p")
      album.textContent = title
      container.appendChild(album)
    })
  } catch (error) {
    console.error(error)
    container.classList.remove("d-none")
    container.textContent = "Impossibile caricare la lista album."
  }
}

window.search = search
window.createAlbumList = createAlbumList

window.addEventListener("load", () => {
  populateSection("eminem", "eminemSection", "eminem")
  populateSection("metallica", "metallicaSection", "metallica")
  populateSection("queen", "queenSection", "queen")

  document.getElementById("searchField").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      search()
    }
  })
})
