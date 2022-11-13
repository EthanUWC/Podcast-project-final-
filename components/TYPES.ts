export type preview = {
    id: string
    title: string
    seasons: number
    image: string
    genres: string[]
    updated: string
}

export type episode = {
    episode: number
    description: string
    title: string
    file: string
}

export type season = {
    season: number
    title: string
    image: string
    episodes: episode[]
}

export type show = {
    id: string
    title: string
    seasons: season[]
    image: string
    genres: string[]
    updated: string
}

export type phase = 'loading' | 'list' | 'single' | 'error'

export type state = {
    phase: phase
    previews: preview[]
    single: null | show
}

export type subscription = (state: state) => void


/**
 * @type {show}
 */
 const example = {
    genres,
    id,
    image,
    title,
    updated,
    seasons: [
        {
            image,
            season,
            title,
            episodes: [
                {
                    description,
                    episode,
                    file,
                    title,
                }
            ],
        },
    ],
}

/**
 * @typedef {object} preview 
 * @property {string} id
 * @property {string} title
 * @property {number} seasons
 * @property {string} image
 * @property {string[]} genres
 * @property {string} updated
 */

/**
 * @returns {Promise<string>}
 */
 export const getAllShows = () => {
    const result = new Promise((resolve) => {
        fetch('https://podcast-api.netlify.app/shows')
            .then(response => {
                if (!response.ok) resolve('<div>Something went wrong!<div>')
                return response
            })
            .then(response => response.json())
            .then(data => {
                const result = data.map(({ id, title, seasons }) => {
                    return `
                        <li>
                            <button data-preview-button="${id}">${title}</button> 
                            <span>(${seasons})</span>
                        </li>
                    `
                })

                return result
            }).
            then(data => data.join('\n'))
            .then(data => resolve(data))
    })

    return result
}