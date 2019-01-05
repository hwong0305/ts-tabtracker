import authentication from '../controllers/authentication';
import gql from 'graphql-tag';

export const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        password: String!
        firstName: String
        lastName: String
        email: String
    }
    type UserResponse {
        user: User
        token: String
        responseError: Boolean
    }
    type LoginResponse {
        user: User
        token: String
        responseError: Boolean!
    }
`;

export const resolvers = {
    Query: {
        user: async (_: {}, args: { [key: string]: string }) =>
            authentication.fetchUser(args.username),
        users: async () => authentication.fetchUsers(),
    },
    Mutation: {
        register: async (_: {}, args: { [key: string]: string }) =>
            authentication.registerUser(
                args.username,
                args.password,
                args.email,
                args.firstName,
                args.lastName
            ),
        login: async (_: {}, args: any) => authentication.loginUser(args.username, args.password),
    },
};
