const config = {
    env:{
        apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
        prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
        imagekit:{
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
            urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
        },
        databaseUrl: process.env.DATABASE_URL!,
        uptash: {
            redisUrl: process.env.UPTASH_REDIS_URL!,
            redisToken: process.env.UPTASH_REDIS_TOKEN!,
            qtashUrl: process.env.QSTASH_URL!,
            qtashToken: process.env.QSTASH_TOKEN!,
        },
        resendToken: process.env.RESEND_TOKEN!,
    },
};

export default config;