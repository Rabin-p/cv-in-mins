import type { UserData } from "@/types/userInfoTypes";

interface CoverLetterTemplateProps {
  data: UserData;
  accentColor?: string;
}

const CoverLetterTemplate = ({
  data,
  accentColor = "#1d4ed8",
}: CoverLetterTemplateProps) => {
  const { personal, coverLetter } = data;

  const openingText = coverLetter.opening || "Dear Hiring Manager,";
  const closingText = coverLetter.closing || "Sincerely,";
  const signatureText = coverLetter.signature || personal.name || "";

  return (
    <div className="bg-white min-h-[297mm] w-full max-w-[210mm] mx-auto p-10 font-sans text-gray-800">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: accentColor }}>
            {personal.name || "Your Name"}
          </h1>
          <p className="text-sm text-gray-600 mt-1">{personal.address}</p>
          <p className="text-sm text-gray-600">
            {personal.email} {personal.phone ? `| ${personal.phone}` : ""}
          </p>
        </div>
        {coverLetter.date && (
          <p className="text-sm text-gray-500">{coverLetter.date}</p>
        )}
      </div>

      <div className="mt-8 space-y-2 text-sm">
        {coverLetter.recipientName && <p>{coverLetter.recipientName}</p>}
        {coverLetter.position && <p>{coverLetter.position}</p>}
        {coverLetter.company && <p>{coverLetter.company}</p>}
      </div>

      <div className="mt-8 text-sm leading-relaxed space-y-4">
        <p>{openingText}</p>
        <p>{coverLetter.body || "Write your cover letter message here."}</p>
        <p>{closingText}</p>
        <div className="pt-4">
          <p className="font-medium">{signatureText}</p>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterTemplate;
