/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/**  Represents a user's wallet/account */
export type Account = {
  __typename?: 'Account';
  balance: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  transactions?: Maybe<Array<Transaction>>;
};

/**  Payload returned on successful authentication */
export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

/**  --- Mutations --- */
export type Mutation = {
  __typename?: 'Mutation';
  login: AuthPayload;
  registerUser: AuthPayload;
  transferFunds: Transaction;
};


/**  --- Mutations --- */
export type MutationLoginArgs = {
  phoneNumber: Scalars['String']['input'];
  pin: Scalars['String']['input'];
};


/**  --- Mutations --- */
export type MutationRegisterUserArgs = {
  phoneNumber: Scalars['String']['input'];
  pin: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


/**  --- Mutations --- */
export type MutationTransferFundsArgs = {
  amount: Scalars['Float']['input'];
  receiverPhoneNumber: Scalars['String']['input'];
};

/**  --- Queries --- */
export type Query = {
  __typename?: 'Query';
  getAccountBalance?: Maybe<Scalars['Float']['output']>;
  getTransactionHistory?: Maybe<Array<Transaction>>;
  getUserProfile?: Maybe<User>;
};

/**  Represents a single financial transaction */
export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Float']['output'];
  /**  DEBIT or CREDIT */
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  receiver?: Maybe<User>;
  sender?: Maybe<User>;
  timestamp: Scalars['String']['output'];
  type: TransactionType;
};

export enum TransactionType {
  Credit = 'CREDIT',
  Debit = 'DEBIT'
}

/**  Represents a user in the system */
export type User = {
  __typename?: 'User';
  account: Account;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  phoneNumber: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type RegisterUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  pin: Scalars['String']['input'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, username: string, phoneNumber: string } } };

export type LoginMutationVariables = Exact<{
  phoneNumber: Scalars['String']['input'];
  pin: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, username: string, account: { __typename?: 'Account', id: string, balance: number } } } };

export type TransferFundsMutationVariables = Exact<{
  receiverPhoneNumber: Scalars['String']['input'];
  amount: Scalars['Float']['input'];
}>;


export type TransferFundsMutation = { __typename?: 'Mutation', transferFunds: { __typename?: 'Transaction', id: string, amount: number, type: TransactionType, description: string, timestamp: string } };


export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pin"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"phoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"pin"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pin"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pin"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"phoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"pin"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pin"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const TransferFundsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TransferFunds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverPhoneNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transferFunds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"receiverPhoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverPhoneNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<TransferFundsMutation, TransferFundsMutationVariables>;