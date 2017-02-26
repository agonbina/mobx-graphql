import { Atom } from 'mobx'

abstract class Base<T> {

  abstract onSubscribe (): void
  abstract onUnsubscribe(): void

  private _loading: boolean = false
  private _error?: Error
  private _current: T
  private atom: Atom

  constructor () {
    this.atom = new Atom('ApolloQuery', this.onSubscribe.bind(this), this.onUnsubscribe.bind(this))
  }

  setCurrent = (value: T, loading: boolean = false) => {
    this._current = value
    this._loading = loading
    this.atom.reportChanged()
  }

  setLoading = (loading: boolean) => {
    this._loading = loading
    this.atom.reportChanged()
  }

  setError = (error) => {
    this._error = error
    this._loading = false
    this.atom.reportChanged()
  }

  loading () {
    if (this.atom.reportObserved()) {
      return this._loading
    }
    return this._loading
  }

  hasError () {
    if (this.atom.reportObserved()) {
      return !!this._error
    }
    return false
  }

  error () {
    return this._error
  }

  current() {
    if (this.atom.reportObserved()) {
      return this._current
    }
    throw new Error('No observers')
  }

}

export default Base
