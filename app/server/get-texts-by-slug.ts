import "server-only";

export const SOCIAL_MEDIAS = [
  "instagram",
  "facebook",
  "twitter",
  "linkedin",
  "youtube",
];

export async function getTextsBySlug(slug: string) {
  for (const socialMedia of SOCIAL_MEDIAS) {
    const mediaSlug = `link-na-bio-para-${socialMedia}`;
    if (slug === mediaSlug) {
      const capitalizedSocialMedia = socialMedia?.charAt(0).toUpperCase() + socialMedia?.slice(1);
      return {
        title: `Link na bio para ${capitalizedSocialMedia}`,
        description: `Compartilhe todos os seus links no perfil do seu ${capitalizedSocialMedia}`
      };
    }
  }
}

// export async function getTextsBySlug(slug: string) {
//   const socialMedia = SOCIAL_MEDIAS.find((socialMedia) => socialMedia === slug);
//   const capitalizedSocialMedia = !socialMedia ? null : socialMedia?.charAt(0).toUpperCase() + socialMedia?.slice(1);
//   if (!socialMedia) {
//     return null;
//   }
//   return {
//     title: `Link na bio para ${capitalizedSocialMedia}`,
//     description: `Compartilhe todos os seus links no perfil do seu ${capitalizedSocialMedia}`
//   }
// }