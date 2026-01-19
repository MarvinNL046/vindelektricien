// Site configuration for VindElektricien.nl (Netherlands)
export const getSiteConfig = () => {
  const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN ||
                 (typeof window !== 'undefined' ? window.location.hostname : 'vindelektricien.nl');

  const configs: Record<string, {
    id: string;
    domain: string;
    name: string;
    description: string;
  }> = {
    'vindelektricien.nl': {
      id: 'elektricien',
      domain: 'vindelektricien.nl',
      name: 'VindElektricien.nl',
      description: 'Vind een elektricien bij jou in de buurt'
    },
    'www.vindelektricien.nl': {
      id: 'elektricien',
      domain: 'vindelektricien.nl',
      name: 'VindElektricien.nl',
      description: 'Vind een elektricien bij jou in de buurt'
    },
    'localhost:3000': {
      id: 'elektricien',
      domain: 'vindelektricien.nl',
      name: 'VindElektricien.nl',
      description: 'Vind een elektricien bij jou in de buurt'
    },
    'localhost:3001': {
      id: 'elektricien',
      domain: 'vindelektricien.nl',
      name: 'VindElektricien.nl',
      description: 'Vind een elektricien bij jou in de buurt'
    }
  };

  return configs[domain] || configs['vindelektricien.nl'];
};
