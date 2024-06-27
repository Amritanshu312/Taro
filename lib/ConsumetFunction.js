"use server"

export const FetchEpisodes = async (id, dub = false) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CONSUMET_URL}/meta/anilist/episodes/${id}?dub=${dub}`
  )
  if (response.ok) {
    const data = await response.json()

    return data
  }
}

export const FetchWatchData = async (EPid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CONSUMET_URL}/meta/anilist/watch/${EPid}`
  )
  if (response.ok) {
    const data = await response.json()
    return data
  }
}

export const FetchServers = async (EPid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CONSUMET_URL}/meta/anilist/servers/${EPid}`
  )
  if (response.ok) {
    const data = await response.json()
    return data
  }
}