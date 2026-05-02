export interface HobbyItem {
  title: string
  subtitle: string
  note: string
  cover?: string
  animated?: boolean  // true for animated WebP — bypasses Next.js image optimisation
  aspect: 'portrait' | 'square'
  dominantColor?: string  // CSS color for the ambient bloom behind the card
  tags?: string[]
}

export interface HobbyCategory {
  id: string
  label: string
  emoji: string
  items: HobbyItem[]
}

export const hobbies: HobbyCategory[] = [
  {
    id: 'books',
    label: 'Books',
    emoji: '📚',
    items: [
      { title: 'Beyond Good and Evil', subtitle: 'Friedrich Nietzsche', note: 'Shattered every moral assumption I held without realising it.', cover: '/images/hobbies/books/nietzsche-beyond-good-evil.jpg', aspect: 'portrait', dominantColor: '#5a3a20' },
      { title: 'Thus Spoke Zarathustra', subtitle: 'Friedrich Nietzsche', note: 'The most poetic philosophy I have ever encountered.', cover: '/images/hobbies/books/nietzsche-zarathustra.jpg', aspect: 'portrait', dominantColor: '#2a3a5a' },
      { title: 'The Metamorphosis', subtitle: 'Franz Kafka', note: 'A short book that asks the longest questions.', cover: '/images/hobbies/books/kafka-metamorphosis.jpg', aspect: 'portrait', dominantColor: '#1a2e1a' },
      { title: "Man's Search for Meaning", subtitle: 'Viktor Frankl', note: 'Changed how I think about suffering and purpose.', cover: '/images/hobbies/books/frankl-mans-search.jpg', aspect: 'portrait', dominantColor: '#4a2a18' },
      { title: 'White Nights', subtitle: 'Fyodor Dostoevsky', note: 'The loneliest and most beautiful love story I have read.', cover: '/images/hobbies/books/dostoevsky-white-nights.jpg', aspect: 'portrait', dominantColor: '#1a2a4a' },
      { title: 'How Emotions Are Made', subtitle: 'Lisa Feldman Barrett', note: 'Turned everything I thought I knew about feelings upside down.', cover: '/images/hobbies/books/barrett-how-emotions-made.jpg', aspect: 'portrait', dominantColor: '#3a2040' },
    ],
  },
  {
    id: 'movies',
    label: 'Movies',
    emoji: '🎬',
    items: [
      { title: 'Interstellar', subtitle: 'Nolan, 2014', note: 'Makes physics feel like poetry.', cover: '/images/hobbies/movies/yQvGrMoipbRoddT0ZR8tPoR7NfX.webp', aspect: 'portrait', dominantColor: '#1a2a3a' },
      { title: 'Her', subtitle: 'Jonze, 2013', note: 'A love story that made me question what connection really means.', cover: '/images/hobbies/movies/her.webp', aspect: 'portrait', dominantColor: '#4a2010' },
      { title: 'There Will Be Blood', subtitle: 'Anderson, 2007', note: 'Daniel Day-Lewis is untouchable.', cover: '/images/hobbies/movies/there-will-be-blood.webp', aspect: 'portrait', dominantColor: '#2a1810' },
      { title: 'Zodiac', subtitle: 'Fincher, 2007', note: 'The best film about obsession ever made.', cover: '/images/hobbies/movies/zodiac.webp', aspect: 'portrait', dominantColor: '#18182a' },
      { title: 'Taxi Driver', subtitle: 'Scorsese, 1976', note: 'The loneliest film ever made.', cover: '/images/hobbies/movies/taxiDriver.webp', aspect: 'portrait', dominantColor: '#2a1010' },
      { title: 'Nocturnal Animals', subtitle: 'Ford, 2016', note: 'A film within a film — both haunt you.', cover: '/images/hobbies/movies/nocturnal-animal.webp', aspect: 'portrait', dominantColor: '#2a1a28' },
      { title: 'Manchester by the Sea', subtitle: 'Lonergan, 2016', note: 'The most honest portrayal of grief I have seen.', cover: '/images/hobbies/movies/manchester-by-the-sea.webp', aspect: 'portrait', dominantColor: '#102030' },
      { title: 'Scarface', subtitle: 'De Palma, 1983', note: 'Every line of dialogue is quotable.', cover: '/images/hobbies/movies/scarface.webp', aspect: 'portrait', dominantColor: '#1a2810' },
      { title: 'Memories of a Murder', subtitle: 'Bong Joon-ho, 2003', note: 'Still thinking about it years later.', cover: '/images/hobbies/movies/memories-of-a-murder.webp', aspect: 'portrait', dominantColor: '#181818' },
      { title: 'Blade Runner 2049', subtitle: 'Villeneuve, 2017', note: 'The most beautiful film I have seen.', cover: '/images/hobbies/movies/bladerunner.webp', aspect: 'portrait', dominantColor: '#101828' },
    ],
  },
  {
    id: 'series',
    label: 'Series',
    emoji: '📺',
    items: [
      { title: 'Breaking Bad', subtitle: 'Gilligan, 2008–2013', note: 'The perfect character arc.', cover: '/images/hobbies/series/breaking-bad.webp', aspect: 'portrait', dominantColor: '#282808' },
      { title: 'True Detective', subtitle: 'Pizzolatto, 2014–', note: 'Season one is perfect television.', cover: '/images/hobbies/series/true-detective.webp', aspect: 'portrait', dominantColor: '#0a1a0a' },
      { title: 'The Leftovers', subtitle: 'Lindelof, 2014–2017', note: 'The most underrated show ever made.', cover: '/images/hobbies/series/leftovers.webp', aspect: 'portrait', dominantColor: '#181828' },
      { title: 'Black Mirror', subtitle: 'Brooker, 2011–', note: 'Makes you think about technology differently.', cover: '/images/hobbies/series/blackmirror.webp', aspect: 'portrait', dominantColor: '#101010' },
      { title: 'Sherlock', subtitle: 'BBC, 2010–2017', note: 'Benedict Cumberbatch redefined the role.', cover: '/images/hobbies/series/sherlock.webp', aspect: 'portrait', dominantColor: '#101828' },
      { title: 'Severance', subtitle: 'Stiller, 2022–', note: 'The most unsettling premise on television.', cover: '/images/hobbies/series/severance.webp', aspect: 'portrait', dominantColor: '#101020' },
      { title: 'From', subtitle: 'Griffin, 2022–', note: 'The kind of mystery that keeps you up at night.', cover: '/images/hobbies/series/from.webp', aspect: 'portrait', dominantColor: '#201010' },
      { title: 'Stranger Things', subtitle: 'Duffer Brothers, 2016–', note: 'Pure nostalgia wrapped in genuine dread.', cover: '/images/hobbies/series/strangerthings.webp', aspect: 'portrait', dominantColor: '#200a30' },
    ],
  },
  {
    id: 'games',
    label: 'Games',
    emoji: '🎮',
    items: [
      { title: 'The Last of Us Part II', subtitle: 'Naughty Dog, 2020', note: 'The most emotionally brutal game I have ever played.', cover: '/images/hobbies/games/TLOU2.jpg', aspect: 'portrait', dominantColor: '#0a200a' },
      { title: 'Red Dead Redemption 2', subtitle: 'Rockstar, 2018', note: 'The most immersive world I have ever explored.', cover: '/images/hobbies/games/reddead2.png', aspect: 'portrait', dominantColor: '#281808' },
      { title: 'God of War', subtitle: 'Santa Monica Studio, 2018', note: 'A father-son story told through mythology.', cover: '/images/hobbies/games/GOW.png', aspect: 'portrait', dominantColor: '#300808' },
      { title: 'Detroit: Become Human', subtitle: 'Quantic Dream, 2018', note: 'Made me think harder about consciousness than most books.', cover: '/images/hobbies/games/detroit.png', aspect: 'portrait', dominantColor: '#102030' },
      { title: 'The Witcher 3', subtitle: 'CD Projekt Red, 2015', note: 'Set the bar for open-world storytelling.', cover: '/images/hobbies/games/withcer3.png', aspect: 'portrait', dominantColor: '#0a1a10' },
      { title: 'BioShock Remastered', subtitle: '2K Games, 2016', note: 'One of the greatest stories ever told in a game.', cover: '/images/hobbies/games/bioshock.webp', aspect: 'portrait', dominantColor: '#081828' },
      { title: 'Inmost', subtitle: 'Hidden Layer Games, 2020', note: 'A tiny game that hit harder than most blockbusters.', cover: '/images/hobbies/games/inmost.png', aspect: 'portrait', dominantColor: '#180820' },
    ],
  },
  {
    id: 'music',
    label: 'Music',
    emoji: '🎵',
    items: [
      { title: 'Amnesia', subtitle: 'Krobak', note: 'Dark ambient that stays with you long after it ends.', cover: '/images/hobbies/music/krobak-amnesia.jpg', aspect: 'square', dominantColor: '#0a0a1a' },
      { title: 'it is snowing like it is the end of the world', subtitle: 'Krobak', note: 'Perfect winter listening.', cover: '/images/hobbies/music/krobak-snowing.jpg', aspect: 'square', dominantColor: '#0a1828' },
      { title: 'Regret', subtitle: 'Anathema', note: 'Progressive rock that moves you to tears.', cover: '/images/hobbies/music/anathema-regret.jpg', aspect: 'square', dominantColor: '#1a0808' },
      { title: 'Thin Flesh', subtitle: 'Traitrs', note: 'Post-punk that sounds like midnight.', cover: '/images/hobbies/music/traitrs-thin-flesh.jpg', aspect: 'square', dominantColor: '#180818' },
      { title: 'Chamber of Reflection', subtitle: 'Mac DeMarco', note: 'Mac DeMarco at his most melancholic.', cover: '/images/hobbies/music/mac-demarco-chamber.jpg', aspect: 'square', dominantColor: '#081818' },
      { title: 'Rebel Paradise', subtitle: 'Common Saints', note: 'Soundtrack of late-night PhD sessions.', cover: '/images/hobbies/music/common-saints-rebel-paradise.jpg', aspect: 'square', dominantColor: '#1a1828' },
      { title: 'illuminate my heart, my darling', subtitle: 'Yndi Halda', note: 'Every listen reveals something new.', cover: '/images/hobbies/music/yndi-halda-illuminate.jpg', aspect: 'square', dominantColor: '#101820' },
      { title: 'Ode to the Mets', subtitle: 'The Strokes', note: 'Perfect from start to finish.', cover: '/images/hobbies/music/strokes-ode.jpg', aspect: 'square', dominantColor: '#201818' },
      { title: 'Imminence', subtitle: 'Sleep Dealer', note: 'The right album for deep focus.', cover: '/images/hobbies/music/sleep-dealer-imminence.jpg', aspect: 'square', dominantColor: '#101020' },
    ],
  },
  {
    id: 'podcasts',
    label: 'Podcasts',
    emoji: '🎙️',
    items: [
      { title: 'Huberman Lab', subtitle: 'Andrew Huberman', note: 'Changed how I structure my day.', cover: '/images/hobbies/podcasts/hubermanlab.jpg', aspect: 'square', dominantColor: '#081808' },
      { title: 'Jafekri', subtitle: 'Persian Podcast', note: 'A Persian space to think deeply and question everything.', cover: '/images/hobbies/podcasts/jafekri.jpeg', aspect: 'square', dominantColor: '#180818' },
      { title: 'Life School', subtitle: 'Persian Podcast', note: 'Persian wisdom on the lessons life quietly teaches.', cover: '/images/hobbies/podcasts/lifeschool.jpg', aspect: 'square', dominantColor: '#101828' },
      { title: 'B+', subtitle: 'B Plus Podcast', note: 'Long-form conversations that make me think.', cover: '/images/hobbies/podcasts/bplus.jpg', aspect: 'square', dominantColor: '#1a1010' },
    ],
  },
]
