import type { UserData } from "@/types/userInfoTypes";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Twitter,
} from "lucide-react";

interface ModernTemplateProps {
  data: UserData;
  accentColor?: string;
}

const ModernTemplate = ({
  data,
  accentColor = "#0f172a",
}: ModernTemplateProps) => {
  const { personal, skills, exp, edu, others } = data;

  return (
    <div className="bg-white min-h-[297mm] w-full max-w-[210mm] mx-auto font-sans text-gray-800 flex">
      {/* Left Sidebar */}
      <aside
        className="w-1/3 p-6 text-white"
        style={{ backgroundColor: accentColor }}
      >
        {/* Photo or initials */}
        <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-6 flex items-center justify-center text-3xl font-bold overflow-hidden">
          {personal.photo ? (
            <img
              src={personal.photo}
              alt={personal.name ? `${personal.name} photo` : "Profile photo"}
              className="h-full w-full object-cover"
            />
          ) : (
            <span>
              {personal.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2) || "CV"}
            </span>
          )}
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4 opacity-70">
            Contact
          </h2>
          <div className="space-y-3 text-sm">
            {personal.email && (
              <a
                href={`mailto:${personal.email}`}
                className="flex items-start gap-2 hover:opacity-80"
              >
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <span className="break-all">{personal.email}</span>
              </a>
            )}
            {personal.phone && (
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.address && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{personal.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Social Links */}
        {personal.socialMedia &&
          Object.values(personal.socialMedia).some(Boolean) && (
            <div className="mb-8">
              <h2 className="text-xs font-semibold uppercase tracking-widest mb-4 opacity-70">
                Links
              </h2>
              <div className="space-y-2 text-sm">
                {personal.socialMedia.linkedin && (
                  <a
                    href={personal.socialMedia.linkedin}
                    className="flex items-center gap-2 hover:opacity-80"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {personal.socialMedia.github && (
                  <a
                    href={personal.socialMedia.github}
                    className="flex items-center gap-2 hover:opacity-80"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
                {personal.socialMedia.website && (
                  <a
                    href={personal.socialMedia.website}
                    className="flex items-center gap-2 hover:opacity-80"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Website</span>
                  </a>
                )}
                {personal.socialMedia.twitter && (
                  <a
                    href={personal.socialMedia.twitter}
                    className="flex items-center gap-2 hover:opacity-80"
                  >
                    <Twitter className="w-4 h-4" />
                    <span>Twitter</span>
                  </a>
                )}
              </div>
            </div>
          )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest mb-4 opacity-70">
              Skills
            </h2>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id} className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span>{skill.name}</span>
                  </div>
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/80 rounded-full"
                      style={{
                        width:
                          skill.proficiency === "Expert"
                            ? "100%"
                            : skill.proficiency === "Advanced"
                              ? "80%"
                              : skill.proficiency === "Intermediate"
                                ? "60%"
                                : "40%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Sections in Sidebar */}
        {others && others.length > 0 && (
          <>
            {others.map((section) => (
              <div key={section.id} className="mb-6">
                <h2 className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-70">
                  {section.title}
                </h2>
                <p className="text-sm opacity-90 leading-relaxed">
                  {section.description}
                </p>
              </div>
            ))}
          </>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
            {personal.name || "Your Name"}
          </h1>
          {exp && exp.length > 0 && (
            <p className="text-lg text-gray-500">{exp[0].position}</p>
          )}
        </header>

        {/* Experience */}
        {exp && exp.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-sm font-semibold uppercase tracking-widest mb-5 pb-2 border-b-2"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Experience
            </h2>
            <div className="space-y-6">
              {exp.map((item) => (
                <div
                  key={item.id}
                  className="relative pl-4 border-l-2 border-gray-200"
                >
                  <div
                    className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {item.position}
                    </h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded mt-1 sm:mt-0">
                      {item.start_date} —{" "}
                      {item.is_current ? "Present" : item.end_date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{item.company}</p>
                  {item.description && (
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {edu && edu.length > 0 && (
          <section className="mb-8">
            <h2
              className="text-sm font-semibold uppercase tracking-widest mb-5 pb-2 border-b-2"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Education
            </h2>
            <div className="space-y-4">
              {edu.map((item) => (
                <div
                  key={item.id}
                  className="relative pl-4 border-l-2 border-gray-200"
                >
                  <div
                    className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {item.degree}
                    </h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded mt-1 sm:mt-0">
                      {item.start_date} —{" "}
                      {item.is_current ? "Present" : item.end_date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{item.institution}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ModernTemplate;
