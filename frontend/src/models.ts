export interface Page {
  firstName: string
  interests: string[]
  identifier: string
  channels: {
    twitter: {
      screenName: string
    }
  }
}
