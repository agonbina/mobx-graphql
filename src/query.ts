import { ObservableQuery, Subscription } from 'apollo-client'
import Base from './base'

class ApolloQuery<T> extends Base<T> {

  private subscription: Subscription

  constructor (private query: ObservableQuery<T>, private _canStart: Boolean = false) {
    super()
  }

  onSubscribe () {
    if (!this._canStart || this.subscription) {
      return
    }
    this.subscription = this.query.subscribe({
      next: ({ data, loading }) => {
        this.setCurrent(data, loading)
      },
      error: (error) => {
        this.setError(error)
      }
    })
  }

  onUnsubscribe () {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  start (variables: {[key: string]: any} = {}) {
    this._canStart = true
    this.query.options.variables = {
      ...this.query.options.variables,
      ...variables
    }
    this.onSubscribe()
  }

}

export default ApolloQuery
