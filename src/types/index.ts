export interface NavItem {
  id: string
  title: string
  icon: string
  subtitle?: string
}

export interface Profile {
  name: string
  displayName: string
  avatar: string
  subtitle: string
  since: string
  anniversary: string
  favoritePhrase: string
}

export interface BannerButton {
  id: string
  label: string
}

export interface Banner {
  title: string
  background: string
  buttons: BannerButton[]
}

export interface LetterData {
  letter: {
    id: string
    title: string
    author: string
    date: string
    icon: string
    content: string[]
    footer: {
      signature: string
      showSignature: boolean
    }
  }
}

export interface PlaylistItem {
  id: number
  title: string
  description: string
  cover: string
  audio: string
  favorite: boolean
  featured: boolean
  duration: string
  artist: string
  year: number
  color: string
}

export interface PlaylistData {
  page: {
    id: string
    title: string
    description: string
  }
  search: {
    enabled: boolean
    placeholder: string
    icon: string
  }
  playlist: PlaylistItem[]
}

export interface Moment {
  id: number
  title: string
  description: string
  image: string
  date?: string
  location: string
  favorite: boolean
  featured: boolean
}

export interface MomentsData {
  page: {
    id: string
    title: string
    description: string
  }
  moments: Moment[]
  gallery: {
    layout: string
    columns: {
      desktop: number
      tablet: number
      mobile: number
    }
    gap: number
    cardRadius: number
    lightbox: {
      enabled: boolean
      showNavigation: boolean
      showCounter: boolean
      allowKeyboard: boolean
      allowSwipe: boolean
    }
  }
}

export interface PlayerState {
  currentTrack: number
  playing: boolean
  volume: number
  shuffle: boolean
  repeat: boolean
  progress: number
}

export interface Theme {
  mode: string
  background: string
  surface: string
  card: string
  border: string
  primary: string
  secondary: string
  text: string
  textSecondary: string
  cardRadius: number
}

export interface Settings {
  splashScreen: {
    enabled: boolean
    duration: number
    logo: string
  }
  layout: {
    sidebar: {
      width: number
      fixed: boolean
    }
    header: {
      sticky: boolean
    }
    content: {
      maxWidth: number
    }
    player: {
      fixedBottom: boolean
      height: number
    }
  }
}
