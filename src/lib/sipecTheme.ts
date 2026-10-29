export const SIPEC_THEME = {
  colors: {
    primary: '#1E3A5F', secondary: '#2A7DE1', gold: '#D4A017',
    success: '#4CAF50', warning: '#F59E0B', danger: '#EF4444',
  },
  light: {
    background: '#F8FAFC', backgroundAlt: '#F1F5F9', card: '#FFFFFF',
    title: '#1E293B', text: '#475569', textSecondary: '#64748B', border: '#E2E8F0',
  },
  dark: {
    background: '#0B1120', backgroundAlt: '#111827', card: '#1E293B',
    title: '#F8FAFC', text: '#CBD5E1', textSecondary: '#94A3B8', border: '#334155',
  },
  departments: {
    media: '#2A7DE1', youth: '#F97316', choir: '#8B5CF6', intercession: '#D4A017',
    children: '#22C55E', mothers: '#EC4899', fathers: '#2563EB', elders: '#64748B',
  },
  typography: {
    bodyFont: "'Inter', sans-serif",
    headingFont: "'Poppins', sans-serif",
    heroDesktop: '72px', heroTablet: '56px', heroMobile: '40px',
    sectionTitle: '48px', subtitle: '24px', body: '18px', small: '16px',
  },
  radius: { card: '24px' },
} as const;
