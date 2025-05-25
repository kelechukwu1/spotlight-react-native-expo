export default {
    providers: [
        {
            domain: process.env.EXPO_PUBLIC_CLERK_JWT_URL,
            applicationID: 'convex',
        },
    ],
}