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
        bookmarks: [Bookmark]
    }
    type UserResponse {
        user: User
        token: String
        responseError: Boolean!
    }
    type LoginResponse {
        user: User
        token: String
        responseError: Boolean!
    }
`;

export const resolvers = {
    Query: {
        user: async (_: {}, args: { [key: string]: string }) => {
            try {
                if (args.username) {
                    return authentication.fetchUser(args.username);
                }
                if (args.userId) {
                    return authentication.findUserById(args.userId);
                } else {
                    throw new Error('Invalid Parameters');
                }
            } catch (err) {
                console.log(err);
                return {
                    responseError: true,
                };
            }
        },
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
