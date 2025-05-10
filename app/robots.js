export default async function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/admin'
            },
        ],
        sitemap: `${process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000'}/sitemap.xml`,
    };
}