import { FileDown } from "lucide-react";

export default function CvPreview({ cvData, cvRef, downloadPdf }) {
  return (
    <div className="cv-panel">
      <button className="download-btn" onClick={downloadPdf}>
        <FileDown size={18} /> Download PDF
      </button>

      <div className="cv-container" ref={cvRef}>
        <div className="cv-header">
          <div className="cv-name">{cvData.name}</div>
          {cvData.title && (
            <div
              style={{
                fontSize: "1.2rem",
                color: "#344054",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              {cvData.title}
            </div>
          )}
          <div
            className="cv-contact"
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {cvData.email && <span>{cvData.email}</span>}
            {cvData.phone && <span>| {cvData.phone}</span>}
            {cvData.location && <span>| {cvData.location}</span>}
            {cvData.links &&
              cvData.links.length > 0 &&
              cvData.links.map((link, i) => <span key={i}>| {link}</span>)}
          </div>
        </div>

        {cvData.summary && (
          <div className="cv-section">
            <div className="cv-section-title">Professional Summary</div>
            <div className="cv-item-desc">{cvData.summary}</div>
          </div>
        )}

        <div className="cv-section">
          <div className="cv-section-title">Skills</div>
          {cvData.skills && cvData.skills.length > 0 ? (
            <div style={{ display: "grid", gap: "8px" }}>
              {cvData.skills.map((skillGroup, idx) => (
                <div key={idx} style={{ fontSize: "0.95rem" }}>
                  <span style={{ fontWeight: 600, color: "#101828" }}>
                    {skillGroup.category}:{" "}
                  </span>
                  <span style={{ color: "#344054" }}>
                    {skillGroup.items.join(", ")}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="cv-empty">Your skills will appear here.</div>
          )}
        </div>

        <div className="cv-section">
          <div className="cv-section-title">Experience</div>
          {cvData.experience && cvData.experience.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
              }}
            >
              {cvData.experience.map((exp, idx) => (
                <div key={idx}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "0.2rem",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        color: "#101828",
                        fontSize: "1.05rem",
                      }}
                    >
                      {exp.title} | {exp.company}
                    </div>
                    <div
                      style={{
                        color: "#475467",
                        fontSize: "0.9rem",
                        textAlign: "right",
                      }}
                    >
                      {exp.location ? `${exp.location} | ` : ""}
                      {exp.duration}
                    </div>
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul
                      style={{
                        paddingLeft: "1.2rem",
                        margin: 0,
                        color: "#344054",
                        fontSize: "0.95rem",
                      }}
                    >
                      {exp.highlights.map((bullet, i) => (
                        <li key={i} style={{ marginBottom: "4px" }}>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="cv-empty">
              Your experience will appear here as we chat.
            </div>
          )}
        </div>

        {cvData.key_achievements && cvData.key_achievements.length > 0 && (
          <div className="cv-section">
            <div className="cv-section-title">Key Achievements</div>
            <ul
              style={{
                paddingLeft: "1.2rem",
                margin: 0,
                color: "#344054",
                fontSize: "0.95rem",
              }}
            >
              {cvData.key_achievements.map((achieve, i) => (
                <li key={i} style={{ marginBottom: "4px" }}>
                  {achieve}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="cv-section" style={{ marginTop: "1.5rem" }}>
          <div className="cv-section-title">Education</div>
          {cvData.education && cvData.education.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
              }}
            >
              {cvData.education.map((edu, idx) => (
                <div key={idx}>
                  <div style={{ fontWeight: 600, color: "#101828" }}>
                    {edu.degree}
                  </div>
                  <div style={{ color: "#475467", fontSize: "0.95rem" }}>
                    {edu.institution} | {edu.duration}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="cv-empty">Your education will appear here.</div>
          )}
        </div>
      </div>
    </div>
  );
}
