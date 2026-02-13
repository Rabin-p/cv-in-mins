interface SocialMedia {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
}

export interface PersonalInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  socialMedia?: Partial<SocialMedia>;
  photo?: string;
}

type proLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface Skill {
  id: string;
  name: string;
  proficiency: proLevel;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  start_date: string;
  is_current: boolean;
  end_date?: string;
  description?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  start_date: string;
  is_current: boolean;
  end_date?: string;
  description?: string;
}

export interface OtherSection {
  id: string;
  title: string;
  description: string;
}

export interface CoverLetter {
  recipientName?: string;
  company?: string;
  position?: string;
  date?: string;
  opening?: string;
  body?: string;
  closing?: string;
  signature?: string;
}

export type TemplateId = "minimalist" | "modern";

export interface CvSettings {
  accentColor: string;
  template: TemplateId;
}

export interface UserData {
  personal: PersonalInfo;
  skills: Skill[];
  exp: Experience[];
  edu: Education[];
  others?: OtherSection[];
  settings: CvSettings;
  coverLetter: CoverLetter;
}
