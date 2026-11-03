export type VitrineSectionTarget =
  | 'notre_impact'
  | 'weekly_programmes'
  | 'our_biography'
  | 'church_foundations'
  | 'ministry_milestones'
  | 'predications'
  | 'horaires_cultes'
  | 'notre_equipe';

export interface VitrineBadge {
  id: string;
  section_target: VitrineSectionTarget | string;
  author_name: string;
  author_avatar_url?: string | null;
  metadata_subtitle?: string | null;
  body_text: string;
  media_url?: string | null;
  media_type?: 'image' | 'video' | 'podcast';
  embed_domain?: string | null;
  embed_title: string;
  embed_subtitle?: string | null;
  interaction_likes?: number;
  comment_count_simulated?: number;
  cta_button_text?: string | null;
  cta_button_url?: string | null;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

