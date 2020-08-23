declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'dev' | 'test' | 'production';
            PORT?: string;
            HASH_1_SECRET: string;
        }
    }
}

export {}