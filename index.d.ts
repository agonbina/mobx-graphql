declare module 'mobx-graphql/base' {
	 abstract class Base<T> {
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
	}
	export default Base;

}
declare module 'mobx-graphql/query' {
	import { ObservableQuery } from 'apollo-client';
	import Base from 'mobx-graphql/base'; class ApolloQuery<T> extends Base<T> {
	    private query;
	    private _canStart;
	    private subscription;
	    constructor(query: ObservableQuery<T>, _canStart?: Boolean);
	    onSubscribe(): void;
	    onUnsubscribe(): void;
	    start(variables?: {
	        [key: string]: any;
	    }): void;
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
