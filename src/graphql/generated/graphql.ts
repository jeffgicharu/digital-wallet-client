import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
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
  me: User;
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
  receiverPhone: Scalars['String']['input'];
  transferAmount: Scalars['Float']['input'];
}>;


export type TransferFundsMutation = { __typename?: 'Mutation', transferFunds: { __typename?: 'Transaction', id: string, amount: number, type: TransactionType, description: string, timestamp: string } };

export type GetMyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProfileQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, username: string, phoneNumber: string, account: { __typename?: 'Account', id: string, balance: number, transactions?: Array<{ __typename?: 'Transaction', id: string, amount: number, type: TransactionType, description: string, timestamp: string }> | null } } };


export const RegisterUserDocument = gql`
    mutation RegisterUser($username: String!, $phoneNumber: String!, $pin: String!) {
  registerUser(username: $username, phoneNumber: $phoneNumber, pin: $pin) {
    token
    user {
      id
      username
      phoneNumber
    }
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      phoneNumber: // value for 'phoneNumber'
 *      pin: // value for 'pin'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($phoneNumber: String!, $pin: String!) {
  login(phoneNumber: $phoneNumber, pin: $pin) {
    token
    user {
      id
      username
      account {
        id
        balance
      }
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *      pin: // value for 'pin'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const TransferFundsDocument = gql`
    mutation TransferFunds($receiverPhone: String!, $transferAmount: Float!) {
  transferFunds(receiverPhoneNumber: $receiverPhone, amount: $transferAmount) {
    id
    amount
    type
    description
    timestamp
  }
}
    `;
export type TransferFundsMutationFn = Apollo.MutationFunction<TransferFundsMutation, TransferFundsMutationVariables>;

/**
 * __useTransferFundsMutation__
 *
 * To run a mutation, you first call `useTransferFundsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransferFundsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transferFundsMutation, { data, loading, error }] = useTransferFundsMutation({
 *   variables: {
 *      receiverPhone: // value for 'receiverPhone'
 *      transferAmount: // value for 'transferAmount'
 *   },
 * });
 */
export function useTransferFundsMutation(baseOptions?: Apollo.MutationHookOptions<TransferFundsMutation, TransferFundsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TransferFundsMutation, TransferFundsMutationVariables>(TransferFundsDocument, options);
      }
export type TransferFundsMutationHookResult = ReturnType<typeof useTransferFundsMutation>;
export type TransferFundsMutationResult = Apollo.MutationResult<TransferFundsMutation>;
export type TransferFundsMutationOptions = Apollo.BaseMutationOptions<TransferFundsMutation, TransferFundsMutationVariables>;
export const GetMyProfileDocument = gql`
    query GetMyProfile {
  me {
    id
    username
    phoneNumber
    account {
      id
      balance
      transactions {
        id
        amount
        type
        description
        timestamp
      }
    }
  }
}
    `;

/**
 * __useGetMyProfileQuery__
 *
 * To run a query within a React component, call `useGetMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, options);
      }
export function useGetMyProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, options);
        }
export function useGetMyProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, options);
        }
export type GetMyProfileQueryHookResult = ReturnType<typeof useGetMyProfileQuery>;
export type GetMyProfileLazyQueryHookResult = ReturnType<typeof useGetMyProfileLazyQuery>;
export type GetMyProfileSuspenseQueryHookResult = ReturnType<typeof useGetMyProfileSuspenseQuery>;
export type GetMyProfileQueryResult = Apollo.QueryResult<GetMyProfileQuery, GetMyProfileQueryVariables>;