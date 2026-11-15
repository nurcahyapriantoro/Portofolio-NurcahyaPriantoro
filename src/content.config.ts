import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file } from 'astro/loaders';

const monthYear = z.string().regex(/^\d{4}-\d{2}$/);

const profile = defineCollection({
  loader: file('src/content/profile.yaml'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      shortMark: z.string(),
      headline: z.string(),
      roles: z.array(z.string()),
      statusBadge: z.object({
        text: z.string(),
        company: z.string(),
        logo: image(),
      }),
      degreeLine: z.string(),
      location: z.string(),
      email: z.email(),
      summary: z.string(),
      aboutParagraphs: z.array(z.string()),
      competencies: z.array(z.string()),
      highlights: z.array(
        z.object({
          value: z.string(),
          label: z.string(),
          detail: z.string(),
        }),
      ),
      heroPhoto: image(),
      aboutPhoto: image(),
      cvPath: z.string(),
      portfolioPdfPath: z.string(),
      portfolioPdfSizeLabel: z.string(),
      socials: z.array(
        z.object({
          label: z.string(),
          href: z.url(),
          icon: z.string(),
        }),
      ),
    }),
});

const experience = defineCollection({
  loader: file('src/content/experience.yaml'),
  schema: ({ image }) =>
    z.object({
      company: z.string(),
      role: z.string(),
      department: z.string().optional(),
      type: z.enum([
        'Internship',
        'Freelance',
        'Apprenticeship',
        'Professional Project',
        'Program',
      ]),
      category: z.enum(['professional', 'program']),
      location: z.string(),
      workMode: z.enum(['On-site', 'Remote', 'Hybrid']).optional(),
      start: monthYear,
      end: monthYear.or(z.literal('present')),
      logo: image(),
      summary: z.string(),
      highlights: z.array(
        z.object({
          title: z.string().optional(),
          text: z.string(),
        }),
      ),
      metrics: z
        .array(
          z.object({
            value: z.string(),
            label: z.string(),
          }),
        )
        .default([]),
      tech: z.array(z.string()).default([]),
      gallery: z
        .array(
          z.object({
            src: image(),
            caption: z.string(),
          }),
        )
        .default([]),
      links: z
        .array(
          z.object({
            label: z.string(),
            href: z.url(),
          }),
        )
        .default([]),
      order: z.number(),
    }),
});

const projects = defineCollection({
  loader: file('src/content/projects.yaml'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      client: z.string(),
      period: z.string(),
      tier: z.enum(['featured', 'other']),
      status: z
        .enum(['Production', 'Internal / Private', 'Prototype', 'Live', 'Academic'])
        .optional(),
      summary: z.string(),
      bullets: z.array(z.string()).default([]),
      tech: z.array(z.string()),
      images: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
          }),
        )
        .default([]),
      placeholderTheme: z.string().optional(),
      logo: image().optional(),
      links: z
        .array(
          z.object({
            label: z.string(),
            href: z.url(),
            kind: z.enum(['github', 'demo', 'live', 'private']).default('github'),
          }),
        )
        .default([]),
      order: z.number(),
    }),
});

const skills = defineCollection({
  loader: file('src/content/skills.yaml'),
  schema: z.object({
    category: z.string(),
    icon: z.string(),
    items: z.array(z.string()),
    order: z.number(),
  }),
});

const education = defineCollection({
  loader: file('src/content/education.yaml'),
  schema: ({ image }) =>
    z.object({
      institution: z.string(),
      degree: z.string(),
      faculty: z.string(),
      gpa: z.string(),
      location: z.string(),
      start: monthYear,
      end: monthYear,
      status: z.string(),
      logo: image(),
      photo: image(),
      website: z.url(),
      coursework: z.array(z.string()),
    }),
});

const certifications = defineCollection({
  loader: file('src/content/certifications.yaml'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      issuer: z.string(),
      issuerGroup: z.enum(['Microsoft', 'Blockchain & Cloud', 'Dicoding', 'IDCamp', 'LinkedIn']),
      issued: z.string(),
      featured: z.boolean().default(false),
      badgeImage: image().optional(),
      icon: z.string().optional(),
      highlights: z.array(z.string()).default([]),
      credentialUrl: z.url().optional(),
      order: z.number(),
    }),
});

const awards = defineCollection({
  loader: file('src/content/awards.yaml'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      organizer: z.string(),
      year: z.string(),
      description: z.string(),
      image: image(),
      links: z
        .array(
          z.object({
            label: z.string(),
            href: z.url(),
          }),
        )
        .default([]),
      order: z.number(),
    }),
});

const organizations = defineCollection({
  loader: file('src/content/organizations.yaml'),
  schema: ({ image }) =>
    z.object({
      organization: z.string(),
      role: z.string(),
      period: z.string(),
      summary: z.string(),
      topic: z.string().optional(),
      logo: image(),
      certificateUrl: z.url().optional(),
      order: z.number(),
    }),
});

export const collections = {
  profile,
  experience,
  projects,
  skills,
  education,
  certifications,
  awards,
  organizations,
};
