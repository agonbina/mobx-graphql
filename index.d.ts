declare module 'mobx-graphql/query' {
	import { ObservableQuery } from 'apollo-client';
	export abstract class Query<T> {
	    abstract onSubscribe(): void;
	    abstract onUnsubscribe(): void;
	    private _loading;
	    private _error?;
	    private _current;
	    private atom;
	    constructor();
	    setCurrent: (value: T, loading?: boolean) => void;
	    setLoading: (loading: boolean) => void;
	    setError: (error: any) => void;
	    loading(): boolean;
	    hasError(): boolean;
	    error(): Error | undefined;
	    current(): T;
	} class ApolloQuery<T> extends Query<T> {
	    private query;
	    private subscription;
	    constructor(query: ObservableQuery<T>);
	    onSubscribe(): void;
	    onUnsubscribe(): void;
	}
	export default ApolloQuery;

}
declare module 'mobx-graphql/index' {
	import ApolloQuery from 'mobx-graphql/query';
	export const createQuery: <T>(query: any) => ApolloQuery<T>;

}
declare module 'mobx-graphql' {
	import main = require('mobx-graphql/index');
	export = main;
}
