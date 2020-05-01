export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

export type Query = {
   __typename?: 'Query';
  feed?: Maybe<Array<Chirp>>;
  ping: Scalars['String'];
  users: Array<User>;
};

export type Chirp = {
   __typename?: 'Chirp';
  id: Scalars['ID'];
  createdAt: Scalars['Timestamp'];
  content: Scalars['String'];
  author: User;
};


export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  chirps?: Maybe<Array<Chirp>>;
};

export type Mutation = {
   __typename?: 'Mutation';
  signup: User;
  login: AuthPayload;
  addChirp: Chirp;
  deleteChirp: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
};


export type MutationSignupArgs = {
  password: Scalars['String'];
  name: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  name: Scalars['String'];
};


export type MutationAddChirpArgs = {
  content: Scalars['String'];
};


export type MutationDeleteChirpArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};

export type AuthPayload = {
   __typename?: 'AuthPayload';
  token: Scalars['String'];
  userId: Scalars['Float'];
};

export type FeedQueryVariables = {};


export type FeedQuery = (
  { __typename?: 'Query' }
  & { feed?: Maybe<Array<(
    { __typename?: 'Chirp' }
    & Pick<Chirp, 'id' | 'content' | 'createdAt'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  )>> }
);