import ApolloQuery from './query'

export const createQuery = <T>(query) => {
  return new ApolloQuery<T>(query)
}
