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

interface MinimalistTemplateProps {
  data: UserData;
  accentColor?: string;
}

const MinimalistTemplate = ({
  data,
  accentColor = "#2563eb",
}: MinimalistTemplateProps) => {
  const { personal, skills, exp, edu, others } = data;

  return (
    <div className="bg-white min-h-[297mm] w-full max-w-[210mm] mx-auto p-8 md:p-12 font-sans text-gray-800">
      {/* Header */}
      <header
        className="text-center mb-8 pb-6 border-b-2"
        style={{ borderColor: accentColor }}
      >
        {personal.photo && (
          <div className="flex justify-center mb-4">
            <img
              src={personal.photo}
              alt={personal.name ? `${personal.name} photo` : "Profile photo"}
              className="h-24 w-24 rounded-full object-cover border-2"
              style={{ borderColor: accentColor }}
            />
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          {personal.name || "Your Name"}
        </h1>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-4">
          {personal.email && (
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-1.5 hover:text-gray-900"
            >
              <Mail className="w-4 h-4" />
              <span>{personal.email}</span>
            </a>
          )}
          {personal.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              <span>{personal.phone}</span>
            </span>
          )}
          {personal.address && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{personal.address}</span>
            </span>
          )}
        </div>

        {/* Social Links */}
        {personal.socialMedia && (
          <div className="flex justify-center gap-4 mt-3 text-sm">
            {personal.socialMedia.linkedin && (
              <a
                href={personal.socialMedia.linkedin}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {personal.socialMedia.github && (
              <a
                href={personal.socialMedia.github}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {personal.socialMedia.website && (
              <a
                href={personal.socialMedia.website}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
            {personal.socialMedia.twitter && (
              <a
                href={personal.socialMedia.twitter}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </header>

      {/* Experience */}
      {exp && exp.length > 0 && (
        <section className="mb-8">
          <h2
            className="text-lg font-semibold uppercase tracking-wider mb-4 pb-1 border-b"
            style={{ color: accentColor }}
          >
            Experience
          </h2>
          <div className="space-y-5">
            {exp.map((item) => (
              <div key={item.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.position}
                    </h3>
                    <p className="text-gray-600">{item.company}</p>
                  </div>
                  <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                    {item.start_date} —{" "}
                    {item.is_current ? "Present" : item.end_date}
                  </span>
                </div>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
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
            className="text-lg font-semibold uppercase tracking-wider mb-4 pb-1 border-b"
            style={{ color: accentColor }}
          >
            Education
          </h2>
          <div className="space-y-4">
            {edu.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-start"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">{item.degree}</h3>
                  <p className="text-gray-600">{item.institution}</p>
                </div>
                <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                  {item.start_date} —{" "}
                  {item.is_current ? "Present" : item.end_date}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-8">
          <h2
            className="text-lg font-semibold uppercase tracking-wider mb-4 pb-1 border-b"
            style={{ color: accentColor }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 text-sm rounded-full border"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Other Sections */}
      {others && others.length > 0 && (
        <>
          {others.map((section) => (
            <section key={section.id} className="mb-8">
              <h2
                className="text-lg font-semibold uppercase tracking-wider mb-4 pb-1 border-b"
                style={{ color: accentColor }}
              >
                {section.title}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {section.description}
              </p>
            </section>
          ))}
        </>
      )}
    </div>
  );
};

export default MinimalistTemplate;
