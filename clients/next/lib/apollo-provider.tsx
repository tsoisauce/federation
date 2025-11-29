"use client";

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, concat } from "@apollo/client";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from 'crypto-hash';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_APOLLO_GATEWAY_URL || "http://localhost:4000/",
});

const persistedQueryLink = createPersistedQueryLink({
  sha256,
});

const client = new ApolloClient({
  link: concat(persistedQueryLink, httpLink),
  cache: new InMemoryCache(),
});

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
