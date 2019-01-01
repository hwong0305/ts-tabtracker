import authentication from '../controllers/authentication';
export const typeDefs = `
    type User {
        id: String!
        username: String!
        password: String!
        firstName: String
        lastName: String
        email: String
    }
    type Query {
        user(username: String): User
        users: [User]
    }
`;

export const resolvers = {
    Query: {
        user: async (_: {}, args: any) => await authentication.fetchUser(args.username),
        users: async () => await authentication.fetchUsers(),
    },
};
