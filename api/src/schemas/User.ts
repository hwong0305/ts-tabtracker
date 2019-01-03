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
`;

export const resolvers = {
    Query: {
        user: async (_: {}, args: { [key: string]: string }) =>
            await authentication.fetchUser(args.username),
        users: async () => await authentication.fetchUsers(),
    },
    Mutation: {
        register: async (_: {}, args: { [key: string]: string }) =>
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
