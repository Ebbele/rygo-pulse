import {
    createClient as createUrqlClient,
    fetchExchange,
    subscriptionExchange
} from '@urql/core';

import { createClient as createSSEClient } from 'graphql-sse';

const GRAPHQL_URL = 'http://localhost:8080/query';

// Create a graphql-sse client
const sseClient = createSSEClient({
    url: GRAPHQL_URL,
    singleConnection: false
});

export const client = createUrqlClient({
    url: GRAPHQL_URL,
    exchanges: [
        fetchExchange,
        subscriptionExchange({
            forwardSubscription(operation) {
                return {
                    subscribe(sink) {
                        let query: string = operation.query || '';
                        const dispose = sseClient.subscribe(
                            {
                                query: query,
                                variables: operation.variables,
                                operationName: operation.operationName,
                            },
                            sink
                        );

                        return { unsubscribe: dispose };
                    },
                };
            },
        })
    ],
});

