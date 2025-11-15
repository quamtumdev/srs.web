/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import { jsPDF } from "jspdf";

export const highlightImportantText = content => {
  // Dynamic important terms that work for all subjects
  const importantTerms = [
    // General terms
    "What is",
    "Definition:",
    "Important Points:",
    "Examples:",
    "Types:",
    "Solution:",
    "Answer:",
    "KEY CONCEPTS:",
    "CHAPTER SUMMARY:",
    "IMPORTANT POINTS TO REMEMBER:",
    "PRACTICAL APPLICATIONS:",
    "Tip:",
    "Note:",
    "Remember:",
    "Formula:",
    "Equation:",
    "Law:",
    "Principle:",
    "Property:",
    "Characteristics:",
    "Features:",
    "Applications:",
    "Uses:",
    "Advantages:",
    "Disadvantages:",

    // Physics terms
    "Motion",
    "Force",
    "Energy",
    "Power",
    "Velocity",
    "Acceleration",
    "Momentum",
    "Friction",
    "Gravitation",
    "Light",
    "Sound",
    "Electricity",
    "Magnetism",

    // Chemistry terms
    "Chemical Reaction",
    "Chemical Equation:",
    "Law of Conservation of Mass",
    "Combination Reaction",
    "Decomposition Reaction",
    "Displacement Reaction",
    "Double Displacement Reaction",
    "Oxidation and Reduction",
    "Redox Reaction",
    "Corrosion:",
    "Rancidity:",
    "Acid",
    "Base",
    "Salt",
    "Metal",
    "Non-metal",
    "Element",
    "Compound",

    // Mathematics terms
    "Real Number",
    "Rational Number",
    "Irrational Number",
    "Polynomial",
    "Linear Equation",
    "Quadratic Equation",
    "Theorem",
    "Proof:",
    "Given:",
    "To Prove:",
    "Construction:",
    "Steps:",
    "Triangle",
    "Circle",
    "Parallelogram",
    "Rectangle",
    "Square",

    // Common formatting
    "Balanced:",
    "Unbalanced:",
    "Physical State:",
    "Symbols:",
    "Energy Change:",
    "Signs of",
  ];

  let styledContent = content;
  importantTerms.forEach(term => {
    const regex = new RegExp(
      `(^|\\s)(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    styledContent = styledContent.replace(
      regex,
      `$1<span class="highlight-term">$2</span>`
    );
  });

  return styledContent;
};

export const generateTopicPDF = (section, chapterData = null) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Dynamic metadata
      const topicTitle = section.title || section.topicTitle || "Topic";
      const subjectName = chapterData?.subject || "Subject";
      const chapterTitle = chapterData?.title || "Chapter";
      const chapterNumber = chapterData?.chapterNumber || "1";

      doc.setProperties({
        title: topicTitle,
        author: "Educational Content",
        creator: "Study Material Generator",
        subject: subjectName,
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      let yPosition = 25;

      // Header Section with dynamic colors by subject
      const getSubjectColor = subject => {
        switch (subject.toLowerCase()) {
          case "physics":
            return [70, 130, 180]; // Steel Blue
          case "chemistry":
            return [255, 140, 0]; // Dark Orange
          case "mathematics":
            return [34, 139, 34]; // Forest Green
          default:
            return [25, 25, 112]; // Midnight Blue
        }
      };

      const subjectColor = getSubjectColor(subjectName);

      doc.setFillColor(240, 248, 255);
      doc.rect(0, 0, pageWidth, 35, "F");

      // Dynamic Title
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...subjectColor);
      doc.text(`${subjectName} - Chapter ${chapterNumber}`, pageWidth / 2, 15, {
        align: "center",
      });

      // Subtitle
      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(70, 70, 70);
      doc.text(chapterTitle, pageWidth / 2, 25, {
        align: "center",
      });

      yPosition = 50;

      // Section Header with subject color
      doc.setFillColor(...subjectColor);
      doc.rect(margin, yPosition - 8, contentWidth, 20, "F");

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);

      // Fixed: Use single pageLabel declaration
      const sectionPageLabel = section.page || "Topic";
      doc.text(`${sectionPageLabel}: ${topicTitle}`, margin + 2, yPosition + 5);

      yPosition += 25;
      doc.setTextColor(0, 0, 0);

      // Content processing - works with both old and new format
      let content = section.content || section.topicContent || "";

      // Clean HTML and format content
      content = content
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/p>/gi, "\n\n")
        .replace(/<p[^>]*>/gi, "")
        .replace(/<\/div>/gi, "\n")
        .replace(/<div[^>]*>/gi, "")
        .replace(/<li[^>]*>/gi, "• ")
        .replace(/<\/li>/gi, "\n")
        .replace(/<\/ul>/gi, "\n")
        .replace(/<\/ol>/gi, "\n")
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/[""]/g, '"')
        .replace(/['']/g, "'")
        .replace(/…/g, "...")
        .replace(/–/g, "-")
        .replace(/—/g, "-");

      const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim());

      paragraphs.forEach((paragraph, index) => {
        if (paragraph.trim()) {
          if (yPosition > pageHeight - 40) {
            doc.addPage();
            yPosition = 25;
          }

          let cleanParagraph = paragraph.replace(/\s+/g, " ").trim();

          if (!cleanParagraph) return;

          // Dynamic heading detection for any subject
          const isHeading =
            cleanParagraph.includes("What is") ||
            cleanParagraph.includes("Definition") ||
            cleanParagraph.includes("Formula") ||
            cleanParagraph.includes("Law") ||
            cleanParagraph.includes("Principle") ||
            cleanParagraph.includes("Theorem") ||
            cleanParagraph.includes("Property") ||
            cleanParagraph.includes("Examples:") ||
            cleanParagraph.includes("Important Points:") ||
            cleanParagraph.includes("Types:") ||
            cleanParagraph.includes("KEY CONCEPTS") ||
            cleanParagraph.includes("CHAPTER SUMMARY") ||
            cleanParagraph.includes("Solution:") ||
            cleanParagraph.includes("Answer:") ||
            cleanParagraph.includes("Question") ||
            cleanParagraph.includes("Given:") ||
            cleanParagraph.includes("To Prove:") ||
            cleanParagraph.includes("Proof:") ||
            cleanParagraph.match(/^\d+\./) ||
            cleanParagraph.startsWith("•") ||
            cleanParagraph.includes("Note:") ||
            cleanParagraph.includes("Tip:") ||
            cleanParagraph.includes("Remember:");

          const isBulletPoint =
            cleanParagraph.startsWith("•") ||
            cleanParagraph.match(/^\d+\./) ||
            cleanParagraph.startsWith("-");

          // Set styling based on content type
          if (isHeading && !isBulletPoint) {
            doc.setFontSize(13);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(52, 58, 64);

            try {
              const textWidth = Math.min(
                doc.getTextWidth(cleanParagraph.substring(0, 40)),
                contentWidth
              );
              // Dynamic highlight color based on subject
              const highlightColors = {
                physics: [173, 216, 230], // Light Blue
                chemistry: [255, 218, 185], // Peach
                mathematics: [144, 238, 144], // Light Green
              };
              const highlightColor = highlightColors[
                subjectName.toLowerCase()
              ] || [255, 243, 205];

              doc.setFillColor(...highlightColor);
              doc.rect(
                margin,
                yPosition - 5,
                Math.min(textWidth + 8, contentWidth),
                12,
                "F"
              );
            } catch (e) {
              console.warn("Header background error:", e);
            }
          } else if (isBulletPoint) {
            doc.setFontSize(11);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(40, 40, 40);
          } else {
            doc.setFontSize(11);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(40, 40, 40);
          }

          try {
            // Handle list items
            if (
              cleanParagraph.includes("\n") &&
              (cleanParagraph.includes("•") || cleanParagraph.match(/\d+\./))
            ) {
              const listItems = cleanParagraph
                .split("\n")
                .filter(item => item.trim());

              listItems.forEach(item => {
                if (yPosition > pageHeight - 30) {
                  doc.addPage();
                  yPosition = 25;
                }

                const trimmedItem = item.trim();
                if (trimmedItem) {
                  const listContentWidth =
                    contentWidth -
                    (trimmedItem.startsWith("•") ||
                    trimmedItem.match(/^\d+\./) ||
                    trimmedItem.startsWith("-")
                      ? 10
                      : 0);

                  const lines = doc.splitTextToSize(
                    trimmedItem,
                    listContentWidth
                  );

                  lines.forEach((line, lineIndex) => {
                    if (yPosition > pageHeight - 30) {
                      doc.addPage();
                      yPosition = 25;
                    }

                    try {
                      const xPos =
                        lineIndex === 0 &&
                        (trimmedItem.startsWith("•") ||
                          trimmedItem.match(/^\d+\./) ||
                          trimmedItem.startsWith("-"))
                          ? margin + 5
                          : margin + 10;

                      if (xPos + doc.getTextWidth(line) <= pageWidth - margin) {
                        doc.text(line, xPos, yPosition);
                      } else {
                        const wrappedLines = doc.splitTextToSize(
                          line,
                          pageWidth - xPos - margin
                        );
                        wrappedLines.forEach((wrappedLine, wIndex) => {
                          if (yPosition > pageHeight - 30) {
                            doc.addPage();
                            yPosition = 25;
                          }
                          doc.text(wrappedLine, xPos, yPosition);
                          if (wIndex < wrappedLines.length - 1) yPosition += 6;
                        });
                      }
                    } catch (textError) {
                      const safeLine = line.replace(
                        /[^\w\s\-\.\,\:\;\?\!\(\)]/g,
                        ""
                      );
                      doc.text(safeLine, margin, yPosition);
                    }

                    yPosition += 6;
                  });
                }
              });
            } else {
              // Handle regular paragraphs
              const lines = doc.splitTextToSize(cleanParagraph, contentWidth);

              lines.forEach((line, lineIndex) => {
                if (yPosition > pageHeight - 30) {
                  doc.addPage();
                  yPosition = 25;
                }

                try {
                  if (margin + doc.getTextWidth(line) <= pageWidth - margin) {
                    doc.text(line, margin, yPosition);
                  } else {
                    const rewrappedLines = doc.splitTextToSize(
                      line,
                      contentWidth
                    );
                    rewrappedLines.forEach((rewrappedLine, rIndex) => {
                      if (yPosition > pageHeight - 30) {
                        doc.addPage();
                        yPosition = 25;
                      }
                      doc.text(rewrappedLine, margin, yPosition);
                      if (rIndex < rewrappedLines.length - 1) yPosition += 6;
                    });
                    return;
                  }
                } catch (textError) {
                  const safeLine = line.replace(
                    /[^\w\s\-\.\,\:\;\?\!\(\)]/g,
                    ""
                  );
                  doc.text(safeLine, margin, yPosition);
                }

                yPosition += 6;
              });
            }

            yPosition += isHeading ? 10 : 8;
          } catch (splitError) {
            console.warn("Text splitting error:", splitError);
            yPosition += 10;
          }
        }
      });

      // Dynamic Footer
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);

        doc.setLineWidth(0.3);
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(128, 128, 128);

        doc.text(`Page ${i} of ${totalPages}`, margin, pageHeight - 10);

        // Dynamic footer title
        const footerTitle =
          `${subjectName} - Chapter ${chapterNumber}: ${chapterTitle}`
            .replace(/[^\w\s\-]/g, "")
            .replace(/\s+/g, " ")
            .trim();

        doc.text(footerTitle, pageWidth - margin, pageHeight - 10, {
          align: "right",
        });
      }

      // Dynamic filename - Fixed: Use single variable
      const cleanTopicTitle = topicTitle
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-")
        .trim();

      const filename = `${subjectName}-Chapter${chapterNumber}-${sectionPageLabel}-${cleanTopicTitle}.pdf`;

      doc.save(filename);

      resolve();
    } catch (error) {
      console.error("PDF generation error:", error);
      reject(error);
    }
  });
};

// Additional utility functions
export const formatContentForPDF = content => {
  if (!content) return "";

  return content
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
};

export const validateTopicData = topic => {
  const requiredFields = ["title", "content"];
  const actualFields = ["topicTitle", "topicContent"];

  return requiredFields.every(field => {
    return topic[field] || topic[actualFields[requiredFields.indexOf(field)]];
  });
};

export const getSubjectIcon = subjectName => {
  const icons = {
    physics: "⚡",
    chemistry: "🧪",
    mathematics: "📐",
    maths: "📐",
  };
  return icons[subjectName?.toLowerCase()] || "📚";
};

export const getSubjectColorScheme = subjectName => {
  const schemes = {
    physics: {
      primary: "#4682B4",
      secondary: "#ADD8E6",
      background: "#F0F8FF",
    },
    chemistry: {
      primary: "#FF8C00",
      secondary: "#FFDAB9",
      background: "#FFF8DC",
    },
    mathematics: {
      primary: "#228B22",
      secondary: "#90EE90",
      background: "#F0FFF0",
    },
  };
  return schemes[subjectName?.toLowerCase()] || schemes["physics"];
};

// PDF Configuration
export const PDF_CONFIG = {
  margin: 20,
  fontSize: {
    title: 22,
    subtitle: 14,
    heading: 13,
    content: 11,
    footer: 9,
  },
  lineHeight: 1.5,
  maxWidth: 180,
  colors: {
    primary: [25, 25, 112],
    secondary: [70, 70, 70],
    accent: [52, 58, 64],
    muted: [128, 128, 128],
  },
};
