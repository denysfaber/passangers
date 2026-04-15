type Passenger = {
  id: string
  name: string
}

type RandomUserResponse = {
  results: Array<{
    login: { uuid: string }
    name: { first: string; last: string }
  }>
}

export type { Passenger, RandomUserResponse }
