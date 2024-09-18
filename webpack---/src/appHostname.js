export const appHostname = (subdomain = 'app') => {
    const hostname = process.env.BASE_HOSTNAME || process.env.HOSTNAME;
    return `${subdomain}.${hostname}`;
};