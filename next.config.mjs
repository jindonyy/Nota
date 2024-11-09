import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.resolve(__dirname, './src/styles')],
    },
    /**
     * @type {import('next').NextConfig['eslint']}
     **/
    eslint: {
        ignoreDuringBuilds: true,
    },
    /**
     * @type {import('next').NextConfig['typescript']}
     **/
    typescript: {
        ignoreBuildErrors: false,
    },
};

export default nextConfig;
