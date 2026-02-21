import * as dotenv from 'dotenv';
import type { GatsbyConfig } from 'gatsby';

// Load environment variables based on NODE_ENV
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
dotenv.config({ path: envFile });

// Check for required environment variables
if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
  console.error('❌ Missing required Contentful environment variables:');
  console.error(
    '   - CONTENTFUL_SPACE_ID:',
    process.env.CONTENTFUL_SPACE_ID ? '✅' : '❌ Missing',
  );
  console.error(
    '   - CONTENTFUL_ACCESS_TOKEN:',
    process.env.CONTENTFUL_ACCESS_TOKEN ? '✅' : '❌ Missing',
  );
  console.error('\n📝 To fix this:');
  console.error('   1. Locally: Check your .env.production file');
  console.error(
    '   2. On Vercel: Add environment variables in project settings',
  );
  console.error('   3. Restart the build process\n');
  // Don't fail the build entirely, but log the error clearly
}

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Nirmalkar`,
    siteUrl: `https://www.nirmalkar.com`,
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'G-M4TGDCN1CL',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/assets/images/icon.png',
      },
    },
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/assets/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST || 'cdn.contentful.com',
      },
    },
  ],
};

export default config;
