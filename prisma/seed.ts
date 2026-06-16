// Seeds the database with the site's initial content (the same copy that used
// to live as the hard-coded fallback). Safe to re-run: it upserts singletons
// and only inserts the starter case results / testimonials when those tables
// are empty.
//
// Run with: npm run db:seed

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // --- About (singleton) ---
  await prisma.about.upsert({
    where: { id: "about" },
    update: {},
    create: {
      id: "about",
      fullName: "Shreyansh Rai",
      designationEn: "Criminal Law Advocate",
      designationHi: "आपराधिक विधि अधिवक्ता",
      courtEn: "High Court of Judicature at Allahabad & Lucknow Bench",
      courtHi: "उच्च न्यायालय, इलाहाबाद एवं लखनऊ खंडपीठ",
      taglineEn: "Fearless Advocacy. Relentless Justice.",
      taglineHi: "निर्भीक पैरवी। अथक न्याय।",
      bioEn: [
        "Shreyansh Rai is a Criminal Law Advocate based in Lucknow, practising at the High Court of Judicature at Allahabad and the Lucknow Bench. With a BA.LLB (Hons.) and a specialised LLM in Criminal & Security Law, he brings a rigorous academic foundation to every matter he handles.",
        "His practice is built on meticulous preparation, a deep command of criminal procedure, and an unwavering commitment to every client's right to a fair defence — from bail and FIR quashing to full trial representation and appeals.",
      ],
      bioHi: [
        "श्रेयांश राय लखनऊ स्थित एक आपराधिक विधि अधिवक्ता हैं, जो उच्च न्यायालय इलाहाबाद एवं लखनऊ खंडपीठ में अभ्यास करते हैं। बी.ए.एल.एल.बी (ऑनर्स) और आपराधिक एवं सुरक्षा विधि में विशेष एल.एल.एम के साथ, वे हर मामले में एक कठोर शैक्षणिक आधार लाते हैं।",
      ],
      education: [
        {
          degreeEn: "LLM — Criminal & Security Law",
          degreeHi: "एल.एल.एम — आपराधिक एवं सुरक्षा विधि",
          institutionEn: "To be updated",
          institutionHi: "अद्यतन किया जाना है",
          year: "Completed",
        },
        {
          degreeEn: "BA.LLB (Hons.) — 5 Years",
          degreeHi: "बी.ए.एल.एल.बी (ऑनर्स) — 5 वर्ष",
          institutionEn: "To be updated",
          institutionHi: "अद्यतन किया जाना है",
          year: "Completed",
        },
      ],
      barEnrollmentNumber: "UP/XXXX/20XX",
      enrolledSinceYear: "2016",
      highlightsEn: [
        "Advocate at High Court of Judicature at Allahabad & Lucknow Bench",
        "Specialised in NDPS, bail matters, and criminal trial defence",
        "LLM specialisation in Criminal & Security Law",
        "Handling complex criminal matters at Sessions and High Court level",
      ],
      highlightsHi: [
        "उच्च न्यायालय इलाहाबाद एवं लखनऊ खंडपीठ में अधिवक्ता",
        "एनडीपीएस, जमानत मामलों और आपराधिक मुकदमा पैरवी में विशेषज्ञ",
        "आपराधिक एवं सुरक्षा विधि में एल.एल.एम विशेषज्ञता",
        "सत्र एवं उच्च न्यायालय स्तर पर जटिल आपराधिक मामलों को संभालना",
      ],
      linkedinUrl: "",
      instagramUrl: "",
    },
  });

  // --- Contact (singleton) ---
  await prisma.contact.upsert({
    where: { id: "contact" },
    update: {},
    create: {
      id: "contact",
      headingEn: "Get in Touch",
      headingHi: "संपर्क करें",
      subheadingEn:
        "For bail, NDPS, FIR quashing, and criminal trial matters across Lucknow and Uttar Pradesh.",
      subheadingHi:
        "लखनऊ और उत्तर प्रदेश में जमानत, एनडीपीएस, एफआईआर रद्दीकरण और आपराधिक मुकदमा मामलों के लिए।",
      phone: "",
      whatsapp: "",
      email: "",
      officeAddressEn: "Civil Lines, Lucknow, Uttar Pradesh 226001",
      officeAddressHi: "सिविल लाइंस, लखनऊ, उत्तर प्रदेश 226001",
      officeHoursEn: "Mon–Sat, 10:00 AM – 6:00 PM",
      officeHoursHi: "सोम–शनि, सुबह 10:00 – शाम 6:00",
      googleMapsEmbedUrl: "",
    },
  });

  // --- Case results (only seed when empty) ---
  if ((await prisma.caseResult.count()) === 0) {
    await prisma.caseResult.createMany({
      data: [
        {
          titleEn: "Bail Granted in NDPS Act Case — High Court Lucknow Bench",
          outcome: "Bail Granted",
          court: "High Court — Lucknow Bench",
          year: 2024,
          category: "NDPS",
          summaryEn:
            "Client was in custody under Section 37 NDPS Act. Successfully argued commercial quantity anomaly and procedural violations in the FSL report. Bail granted by the Hon'ble High Court after extended hearing.",
          isHighlight: true,
          sortOrder: 0,
        },
        {
          titleEn:
            "FIR Quashed Under Section 482 CrPC — Property Dispute Matter",
          outcome: "Charges Dropped",
          court: "High Court — Allahabad",
          year: 2023,
          category: "Other",
          summaryEn:
            "Obtained quashing of an FIR filed in a property dispute matter that had been wrongly framed as a criminal cheating case under IPC 420.",
          isHighlight: true,
          sortOrder: 1,
        },
        {
          titleEn: "Acquittal Secured in IPC 307 Attempt to Murder Case",
          outcome: "Acquittal",
          court: "Sessions Court",
          year: 2023,
          category: "Assault",
          summaryEn:
            "Client charged under IPC 307. Successfully challenged the reliability of the eyewitness testimony and medical evidence, resulting in full acquittal by the Sessions Court.",
          isHighlight: true,
          sortOrder: 2,
        },
      ],
    });
  }

  // --- Testimonials (only seed when empty) ---
  if ((await prisma.testimonial.count()) === 0) {
    await prisma.testimonial.createMany({
      data: [
        {
          clientName: "Ramesh K.",
          clientRoleEn: "Family of Accused — Bail Matter",
          quoteEn:
            "Shreyansh sir handled our bail case with complete dedication. We had been refused bail twice before. He identified a procedural error in our case and got bail granted within weeks. Highly recommended.",
          rating: 5,
          caseType: "Bail Matter",
          isHighlight: true,
        },
        {
          clientName: "Priya S.",
          clientRoleEn: "Client — FIR Quashing",
          quoteEn:
            "We were falsely implicated in an FIR. Shreyansh sir fought our case at the High Court and got it quashed. His knowledge of criminal procedure is exceptional.",
          rating: 5,
          caseType: "FIR Quashing",
          isHighlight: true,
        },
        {
          clientName: "Mohammed A.",
          clientRoleEn: "Client — NDPS Case",
          quoteEn:
            "Very professional and honest advocate. He explained every step of the case clearly and kept us informed throughout. Got bail in an NDPS matter which others said was impossible.",
          rating: 5,
          caseType: "NDPS Defence",
          isHighlight: false,
        },
      ],
    });
  }

  console.log("✓ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
