import authentication from '../controllers/authentication';
export const typeDefs = `
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
    type Query {
        user(username: String): User
        users: [User]
    }
    type Mutation {
        register(username: String!, password: String!, email: String!, firstName: String!, lastName: String!): UserResponse
        login(username: String!, password: String!): LoginResponse
    }
`;

export const resolvers = {
    Query: {
        user: async (_: {}, args: any) => await authentication.fetchUser(args.username),
        users: async () => await authentication.fetchUsers(),
    },
    Mutation: {
        register: async (_: {}, args: any) =>
            await authentication.registerUser(
                args.username,
                args.password,
                args.email,
                args.firstName,
                args.lastName
            ),
        login: async (_: {}, args: any) =>
            await authentication.loginUser(args.username, args.password),
    },
};
