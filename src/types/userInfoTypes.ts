interface SocialMedia {
    linkedin? :string;
    github? : string;
    twitter? : string;
    website? : string;
    facebook? : string;
    instagram? : string;
}

export interface PersonalInfo {
    name: string;
    address: string;
    phone: string;
    email: string;
    socialMedia? : Partial<SocialMedia>
    photo? : File;
}

type proLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert"

export interface Skill{
    id: string;
    name: string;
    proficiency: proLevel;
}

export interface Experience{
    id: string;
    company: string;
    position: string;
    start_date: string;
    is_current: boolean;
    end_date?: string;
    description?: string;
}

export interface Education{
    id: string;
    degree: string;
    institution: string;
    start_date: string;
    is_current: boolean;
    end_date? : string;
    description? : string;
}

export interface OtherSection {
    id: string;
    title: string; 
    description: string; 
}

export interface UserData{
    personal: PersonalInfo;
    skills: Skill[];
    exp: Experience[];
    edu: Education[];
    others?: OtherSection[];
}