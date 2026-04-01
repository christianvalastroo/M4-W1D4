const detailsSection = document.querySelector("#detailsSection")

const params = new URLSearchParams(window.location.search)
const albumId = params.get("albumid")

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = String(seconds % 60).padStart(2, "0")
  return `${minutes}:${remainingSeconds}`
}

const createMetaItem = (label, value) => {
  const metaItem = document.createElement("li")
  metaItem.textContent = `${label}: ${value}`
  return metaItem
}

const createTrackItem = (track, index) => {
  const trackItem = document.createElement("div")
  const trackIndex = document.createElement("span")
  const trackTitle = document.createElement("p")
  const trackDuration = document.createElement("span")

  trackItem.classList.add("details-track")
  trackIndex.classList.add("details-track-index")
  trackTitle.classList.add("details-track-title")
  trackDuration.classList.add("details-track-duration")

  trackIndex.textContent = index + 1
  trackTitle.textContent = track.title
  trackDuration.textContent = formatDuration(track.duration)

  trackItem.append(trackIndex, trackTitle, trackDuration)
  return trackItem
}

const showMessage = (message) => {
  detailsSection.innerHTML = ""

  const container = document.createElement("div")
  const messageBox = document.createElement("div")

  container.classList.add("container", "py-5")
  messageBox.classList.add("details-message")
  messageBox.textContent = message

  container.appendChild(messageBox)
  detailsSection.appendChild(container)
}

const generateAlbum = (albumDetails) => {
  detailsSection.innerHTML = ""

  const pageContainer = document.createElement("div")
  const cardContainer = document.createElement("section")
  const rowCard = document.createElement("div")
  const colImg = document.createElement("div")
  const colInfo = document.createElement("div")
  const img = document.createElement("img")
  const kicker = document.createElement("p")
  const title = document.createElement("h1")
  const artist = document.createElement("p")
  const metaList = document.createElement("ul")
  const tracksWrapper = document.createElement("div")
  const tracksTitle = document.createElement("h2")

  pageContainer.classList.add("container", "py-5")
  cardContainer.classList.add("details-card")
  rowCard.classList.add("row", "g-4", "align-items-center")
  colImg.classList.add("col-12", "col-md-5", "col-lg-4")
  colInfo.classList.add("col-12", "col-md-7", "col-lg-8")

  img.classList.add("details-cover", "img-fluid")
  kicker.classList.add("details-kicker")
  title.classList.add("details-heading")
  artist.classList.add("details-subtitle")
  metaList.classList.add("details-meta")
  tracksWrapper.classList.add("details-tracks")
  tracksTitle.classList.add("details-tracks-title")

  img.src = albumDetails.cover_xl || albumDetails.cover_big
  img.alt = `Copertina album ${albumDetails.title}`
  kicker.textContent = "Album details"
  title.textContent = albumDetails.title
  artist.textContent = albumDetails.artist.name
  tracksTitle.textContent = "Tracklist"

  metaList.append(
    createMetaItem("Pubblicazione", albumDetails.release_date || "n/d"),
    createMetaItem("Brani", albumDetails.nb_tracks),
    createMetaItem("Durata", formatDuration(albumDetails.duration || 0)),
    createMetaItem("Fan", (albumDetails.fans || 0).toLocaleString("it-IT"))
  )

  colImg.appendChild(img)
  colInfo.append(kicker, title, artist, metaList)
  rowCard.append(colImg, colInfo)
  cardContainer.appendChild(rowCard)

  tracksWrapper.appendChild(tracksTitle)
  albumDetails.tracks.data.forEach((track, index) => {
    tracksWrapper.appendChild(createTrackItem(track, index))
  })

  pageContainer.append(cardContainer, tracksWrapper)
  detailsSection.appendChild(pageContainer)
}

const getAlbumDetails = async () => {
  if (!albumId) {
    showMessage("Album non trovato. Apri questa pagina partendo da un album della home.")
    return
  }

  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`
    )

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`)
    }

    const albumDetails = await response.json()
    generateAlbum(albumDetails)
  } catch (error) {
    console.log(error)
    showMessage("Impossibile caricare i dettagli dell'album.")
  }
}

getAlbumDetails()
