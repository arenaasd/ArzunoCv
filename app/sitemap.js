import GlobalApi from '@/Service/GlobalApi';

export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const currentDate = new Date().toISOString();

  // 1. Fetch ALL resumes from Strapi
  let resumes = [];
  try {
    const res = await GlobalApi.getAllResumes();
    resumes = res?.data?.data || [];
  } catch (error) {
    console.error('Error fetching resumes for sitemap:', error);
  }

  // 2. Map over resume IDs to build dynamic URLs
  const dynamicUrls = resumes.map((resume) => {
    const id = resume.id;
    return [
      {
        url: `${baseUrl}/my-resume/${id}/view`,
        lastModified: currentDate,
        changefreq: 'monthly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/dashboard/resume/${id}/edit`,
        lastModified: currentDate,
        changefreq: 'monthly',
        priority: 0.6,
      },
    ];
  }).flat();

  // 3. Static URLs
  const staticUrls = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changefreq: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/my-resume`,
      lastModified: currentDate,
      changefreq: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: currentDate,
      changefreq: 'weekly',
      priority: 0.7,
    },
  ];

  // 4. Return combined sitemap
  return [...staticUrls, ...dynamicUrls];
}
