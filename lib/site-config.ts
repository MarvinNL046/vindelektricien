// Site configuration for Rehab Near Me (USA)
export const getSiteConfig = () => {
  const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN ||
                 (typeof window !== 'undefined' ? window.location.hostname : 'rehabnearbyme.com');

  const configs: Record<string, {
    id: string;
    domain: string;
    name: string;
    description: string;
  }> = {
    'rehabnearbyme.com': {
      id: 'rehab',
      domain: 'rehabnearbyme.com',
      name: 'RehabNearMe',
      description: 'Find addiction treatment centers and rehabilitation facilities near you'
    },
    'www.rehabnearbyme.com': {
      id: 'rehab',
      domain: 'rehabnearbyme.com',
      name: 'RehabNearMe',
      description: 'Find addiction treatment centers and rehabilitation facilities near you'
    },
    'localhost:3000': {
      id: 'rehab',
      domain: 'rehabnearbyme.com',
      name: 'RehabNearMe',
      description: 'Find addiction treatment centers and rehabilitation facilities near you'
    },
    'localhost:3001': {
      id: 'rehab',
      domain: 'rehabnearbyme.com',
      name: 'RehabNearMe',
      description: 'Find addiction treatment centers and rehabilitation facilities near you'
    }
  };

  return configs[domain] || configs['rehabnearbyme.com'];
};
