/* English overlay for career access sheets (3/4 : law, security, arts, social, nature). Same keys as js/data/metiers-acces-3.js. */
A.EN_DATA = A.EN_DATA || {};
A.EN_DATA.acces = A.EN_DATA.acces || {};
Object.assign(A.EN_DATA.acces, {
  avocat: {
    emp: [["Large corporate law firms", null], ["Mid-sized firms and boutiques", "Specialist firms (tax, employment, intellectual property, litigation)"], ["Bar associations and general practices", "City practices, criminal and family lawyers, sole practitioners"], ["In-house legal departments", "Salaried in-house lawyers, associations, NGOs"]],
    acces: ["Law bachelor's, then master 2 (business, tax, criminal law…), then the law school entrance exam (CRFPA): about 18 months of training and an internship before the CAPA.", "Internships in firms during your master's are the real way in: many associates are hired after an internship or as a \"trainee associate\".", "Take part in advocacy competitions, legal clinics and moot debates: they stand out on a CV.", "In large corporate firms, fluent English is essential; an LL.M. abroad is often a plus."],
    net: "Networking weighs heavily, especially to set up and win clients: your faculty alumni, internship supervisors, colleagues. Write to the lawyers you meet during internships and stay in touch.",
    sav: ["Civil law, law of obligations, procedure", "A specialisation (business, criminal, employment, tax…)", "Clear legal writing (opinions, pleadings)", "Pleading and public speaking", "Legal English", "Professional ethics of lawyers"],
    out: ["Legal databases (Lexis360, Dalloz, Doctrinal)", "Légifrance", "CRFPA entrance exam", "LL.M. (Anglo-Saxon law degree) as an option"],
    evo: "Associate then partner, setting up your own practice, in-house counsel, judge (exam), teaching."
  },
  juriste: {
    emp: [["Large companies (legal departments)", "CAC 40 companies: TotalEnergies, AXA, BNP Paribas, L'Oréal, Airbus, Orange"], ["Banks, insurers, mutual insurers", null], ["SMEs and mid-sized firms", "Often a generalist legal post"], ["Firms and administrations", "Law firms, local authorities, regulators"]],
    acces: ["Master's in business law, employment law, digital law or public law depending on the sector.", "Work-study or a 6-month internship in a legal department: the best path to a first job.", "Some lawyers first work in a law firm before joining a company.", "Specialisations (GDPR, intellectual property, compliance) open sought-after posts."],
    net: "Internships, master's alumni and contacts from law firms help; offers are also found through direct applications.",
    sav: ["Contract and company law", "Compliance and data protection law (GDPR)", "Drafting and negotiating contracts", "Legal watch", "Legal English"],
    out: ["Legal databases (Dalloz, Lexis)", "Contract management tools", "DPO (data protection officer) certification"],
    evo: "Head of legal, legal director, lawyer, DPO, compliance officer."
  },
  policier: {
    emp: [["National Police", "Public security, criminal investigation, riot police (CRS), border police, intelligence"], ["Municipal Police", "Town halls and communes (own exam)"], ["National Gendarmerie", "Territorial brigades, research sections"], ["Specialist services", "DGSI, forensic police"]],
    acces: ["Police officer exam (gardien de la paix): open with the bac, with written, sports and oral tests. Prepare your fitness and general knowledge in advance.", "After the exam, about 1 year of paid training in a police school (Nîmes, Oissel, Reims, Toulouse…).", "Support schemes exist: \"cadets de la République\" (paid training to prepare for the exam).", "To become an officer or commissioner, you take an exam at Bac+3 or Bac+5 depending on the rank; forensic police recruit science profiles."],
    net: "Recruitment is by exam: networking does not matter, preparation does.",
    sav: ["General knowledge and current affairs", "Criminal law and basic procedure", "Writing police reports", "Physical fitness (endurance and swimming tests)", "Composure, professional ethics"],
    out: ["Police officer exam (gardien de la paix)", "Officer or commissioner exam", "Physical preparation"],
    evo: "Brigadier, lieutenant, captain, commissioner; specialisation (criminal investigation, cyber, dog unit)."
  },
  diplomate: {
    emp: [["Ministry for Europe and Foreign Affairs", "Embassies, consulates, missions to the UN, NATO and the European Union"], ["International organisations", "UN, OECD, World Bank, European Commission"], ["Institutions and companies", "Think tanks, NGOs, large international companies"]],
    acces: ["Foreign ministry (Quai d'Orsay) exams: foreign-affairs adviser (Bac+5) or foreign-affairs secretary (Bac+3), prepared at Sciences Po, in an ENS prep class or an international-affairs master's.", "Prepare several languages (fluent English, and ideally a rarer language: Arabic, Russian, Mandarin).", "Internships in an embassy or international organisation (VIE, ministry internships) are the best references.", "The exams are very selective: several attempts and good geopolitical general knowledge are often needed."],
    net: "Entry is by exam; afterwards networking matters for postings.",
    sav: ["International relations, geopolitics, contemporary history", "Public international law", "International economics", "Several foreign languages", "Writing briefing notes"],
    out: ["Quai d'Orsay exams", "VIE (international volunteering in business or administration)", "Languages (IELTS, TOEFL, DELE, HSK depending on the language)"],
    evo: "Embassy secretary, counsellor, consul, ambassador, director in an international organisation."
  },
  pompier: {
    emp: [["Departmental services (SDIS)", "Professional and volunteer firefighters in each department"], ["Paris Fire Brigade", "Military unit recruiting without an exam, on selection"], ["Marseille naval firefighters", "Military battalion"], ["Other", "Civil security, air force firefighters, company firefighters, airports"]],
    acces: ["Start as a volunteer firefighter from age 16, or through the junior firefighters (JSP): it is the best preparation.", "The professional firefighter exam is very selective, with sports tests and a written part; several attempts are often needed.", "For Paris or Marseille, enlistment is by file and selection (sports tests, interview).", "Fitness and swimming are essential: prepare over the long term."],
    net: "The exam and selection are impersonal; volunteering in your station helps you get to know the job.",
    sav: ["First aid (PSC1, emergency care training)", "Fitness and swimming", "Basic mechanics and plan reading", "Stress management and teamwork", "General knowledge for the written tests"],
    out: ["Professional firefighter exam", "First-aid training (PSC1, SST)", "Driving licence B then heavy-goods licence"],
    evo: "Corporal, sergeant, warrant officer, lieutenant, captain; specialties (diver, rescue and clearance, chemical hazards)."
  },
  graphiste: {
    emp: [["Communication and advertising agencies", null], ["Publishers, press and media", null], ["Brands and companies", "In-house studios at LVMH, Decathlon, Michelin, BlaBlaCar"], ["Freelance and studios", "Design studios, assignments for start-ups and institutions"]],
    acces: ["DN MADE graphic design, BUT MMI, design or art school (Gobelins, Estienne, Penninghen, ENSAD…) then a portfolio.", "The portfolio decides: it shows 8 to 12 quality projects, well explained, on Behance or a personal site.", "Internships and work-study in agencies, then first junior jobs; many graphic designers first work freelance.", "Enter competitions (Graphisme en France, Prix de la jeune création) and fairs: they get you noticed."],
    net: "The portfolio speaks first, but recommendations and school contacts matter a lot to land internships and first contracts.",
    sav: ["Typography, layout, composition", "Colour theory", "Art direction and visual identity", "Graphic culture (history of design)", "Listening to the client and the brief"],
    out: ["Adobe suite (Illustrator, Photoshop, InDesign)", "Figma", "Procreate, After Effects (motion)", "Online portfolio (Behance, Cargo)"],
    evo: "Art director, studio manager, freelancer, UX/UI designer."
  },
  architecte: {
    emp: [["Architecture firms", null], ["Developers and construction groups", null], ["Public clients", "Local authorities, social landlords, the State"], ["Design offices and urban-planning agencies", null]],
    acces: ["National school of architecture (ENSA), then the state architect diploma (Bac+5), then the HMONP (1-year accreditation) to sign projects in your own name.", "Internships in firms (compulsory) are your best way in: you are often hired by the firm where you interned.", "The portfolio is decisive: school projects, surveys, models, clean drawings.", "Enter student competitions and workshops to get noticed."],
    net: "Small firms recruit mostly through contacts, teacher recommendations and internships: your school's network and internship supervisors are valuable.",
    sav: ["Drawing, plan, section, perspective", "History of architecture and the city", "Construction, structure, regulations", "Energy and environmental design", "Site management"],
    out: ["AutoCAD, Revit, ArchiCAD", "Rhino, SketchUp", "Adobe suite (InDesign, Photoshop)", "Physical models"],
    evo: "Partner architect, project manager, urban planner, project supervisor, teacher."
  },
  journaliste: {
    emp: [["Agencies and national press", null], ["Regional press", null], ["Broadcasting", null], ["Digital media", null]],
    acces: ["Schools recognised by the profession (CFJ, ESJ Lille, IPJ, Sciences Po, CELSA, IJBA, EJT, EPJT, EJDG) are the classic way in, but not compulsory.", "Do internships in local newsrooms (regional press, local radio): you learn fast and publish your first pieces.", "Freelance work then fixed-term contracts: most journalists start precariously before a permanent job.", "Build a portfolio of publications (articles, reports, podcasts) and apply for the press card as soon as you are eligible."],
    net: "Newsrooms recruit a lot through recommendation: internships, alumni of your school, editors who know you.",
    sav: ["Journalistic writing (angle, headline, intro)", "Fact-checking", "Political, economic and social general knowledge", "Press law", "Interviewing and reporting", "Basic audio and video editing"],
    out: ["Editing software (Audacity, Premiere Pro)", "Professional social media", "Press card (joint commission)", "English"],
    evo: "Senior reporter, editor-in-chief, presenter, specialist journalist, freelancer."
  },
  "motion-designer": {
    emp: [["Animation studios", null], ["Games and visual effects", null], ["Agencies and brands", null], ["Freelance and television", "Channels, audiovisual production, content creators"]],
    acces: ["Recognised animation schools (Gobelins, Rubika, ESMA, ARTFX, ISART Digital, MoPA, Émile Cohl) then a portfolio or showreel.", "The showreel (1 minute of your best work) is your business card: polish it and put it on Vimeo.", "Internships and work-study in studios, often in France (Paris, Angoulême, Lyon, Montpellier) and in Belgium or Canada.", "Go to the Annecy festival and industry meetings: studios spot young talent there."],
    net: "The scene is small: showreel, festivals (Annecy), school alumni and recommendations count enormously.",
    sav: ["Animation principles (12 principles, timing, rhythm)", "Drawing and anatomy", "3D modelling, animation and rendering", "Editing and storytelling", "Animated-film culture"],
    out: ["Blender, Maya, Houdini", "After Effects, Cinema 4D", "Photoshop, Procreate", "Online showreel"],
    evo: "Senior animator, animation lead, director, art director, freelancer."
  },
  "community-manager": {
    emp: [["Brands and large companies", null], ["Social-media agencies", "Havas, Publicis, specialist digital agencies"], ["Media and institutions", "Media, local authorities, ministries, associations"], ["Start-ups and freelancers", "Assignments for SMEs, content creators"]],
    acces: ["BTS in communication, BUT info-com or MMI, communication or business school.", "Work-study is the best way in: many companies train apprentices on their social networks.", "Show an account of your own, a student project or a freelance client with real results (stats, growth).", "Employers also expect short-form video editing and writing: prepare a small content portfolio."],
    net: "Offers are plentiful: a good portfolio and an internship are enough to start.",
    sav: ["Social platforms and their algorithms (Instagram, TikTok, LinkedIn)", "Writing and creating content", "Analysing statistics (reach, engagement)", "Crisis management and moderation", "Image rights and advertising law"],
    out: ["Canva, CapCut, Premiere Pro", "Scheduling tools (Hootsuite, Buffer)", "Google Analytics and native stats", "ChatGPT and AI tools for creation"],
    evo: "Social media manager, digital communications manager, content manager, independent consultant."
  },
  "ingenieur-son": {
    emp: [["Radio and television", null], ["Venues and festivals", null], ["Sound-reinforcement providers", null], ["Cinema, games and studios", "Post-production studios, recording studios, games studios (Ubisoft)"]],
    acces: ["BTS in audiovisual trades (sound option), ENS Louis-Lumière courses, private schools (3iS, SAE, ESRA…) or a professional bachelor's in sound.", "Internships in a studio, venue or provider are the way in; many start as sound assistants or stage technicians.", "Intermittent entertainment-worker status structures the early years: you need to accumulate hours to open your rights.", "A portfolio of recordings and mixes (SoundCloud) is your CV."],
    net: "The scene works by recommendation: people call the technicians whose seriousness they know. Internships and first jobs build your address book.",
    sav: ["Acoustics and sound physics", "Recording, microphones, cabling", "Mixing, mastering, signal processing", "Music and film culture", "Room tuning and live sound"],
    out: ["Pro Tools, Reaper, Logic, Ableton", "Digital consoles (Yamaha, DiGiCo)", "Processing plug-ins (EQ, compressors)", "Pro Tools certifications"],
    evo: "Chief sound engineer, mixer, technical director, sound designer."
  },
  styliste: {
    emp: [["Luxury houses", null], ["Ready-to-wear brands", null], ["Trend offices and accessories", "Trend offices, leather goods, lingerie"], ["Independent designer", "Launching your own brand, freelance"]],
    acces: ["DN MADE fashion, fashion schools (ESMOD, Studio Berçot, IFM, La Cambre in Brussels) or sewing courses.", "Internships in couture or luxury houses are the most sought after: apply a year ahead, with a book.", "Competitions (Hyères, ANDAM) launch young designers but are very selective.", "Your book and school collections are your business card: show a personal universe and real construction technique."],
    net: "Fashion is a networking industry: assistants and interns are often recommended. Your school's teachers and the houses where you intern count a lot.",
    sav: ["Fashion drawing and sketching", "Pattern-making and sewing (construction technique)", "Fashion culture and trend watching", "Knowledge of fabrics", "Basics of production and sourcing"],
    out: ["Illustrator, Photoshop", "Pattern-making software (Lectra, Gerber)", "Sewing machine and mannequin", "Book and lookbook"],
    evo: "Assistant designer, designer, art director, founder of your own brand."
  },
  "prof-ecoles": {
    emp: [["National Education", "State nursery and primary schools"], ["Private schools under contract", "Catholic or secular private schools under contract with the State"], ["Special education and other", "Support units, teaching abroad (AEFE network)"]],
    acces: ["Bachelor's then MEEF master's (teaching careers): the exam (CRPE) is the way into the state system.", "The exam rules are changing (move to Bac+3): check the official calendar for your year.", "Observation placements and after-school jobs (BAFA, youth work) give you experience for the orals.", "After passing, you are assigned to an académie: the region depends on your rank and needs."],
    net: "National exam: your rank decides, not networking.",
    sav: ["Primary-school curriculum (French, maths)", "Didactics and early-years teaching", "Child psychology", "Classroom management", "General knowledge and written expression for the exam"],
    out: ["Primary-school teacher exam (CRPE)", "BAFA for experience", "Digital classroom tools (ENT, interactive boards)"],
    evo: "Head teacher, teaching adviser, inspector, special-needs teacher."
  },
  "prof-lycee": {
    emp: [["National Education", "State middle and high schools"], ["Private schools under contract", "Private high schools under contract"], ["Higher education and other", "Agricultural high schools, French schools abroad (AEFE)"]],
    acces: ["Bachelor's in your subject, then MEEF master's: you take the CAPES (or the more selective agrégation) to become a permanent teacher.", "Shortage subjects (maths, physics-chemistry, classics, German, technical subjects) recruit more easily, including on contracts.", "Substitute work as a contract teacher lets you enter teaching before the exam.", "Polish your orals: lesson, motivation interview."],
    net: "National exam: your rank decides; networking matters little.",
    sav: ["In-depth command of your subject", "Didactics and building teaching sequences", "Classroom management and pedagogy", "Assessing pupils", "Knowledge of the school system"],
    out: ["CAPES or agrégation", "Digital education tools", "MEEF master's"],
    evo: "Agrégé teacher, form tutor (professeur principal), head of school, inspector."
  },
  "educ-spe": {
    emp: [["Social-sector associations", null], ["Departments and child protection", "Child welfare services, homes, children's houses"], ["Medico-social establishments", "IME, ITEP, accommodation centres"], ["Justice", "Youth judicial protection, prison integration and probation services"]],
    acces: ["State diploma of specialist educator (DEES), prepared at a training institute (IRTS, ASKORIA…) over 3 years, with long placements.", "Admission is by file and interview, sometimes via Parcoursup or direct application.", "Experience in youth work, volunteering or civic service sets you apart at the interview.", "On leaving, structures recruit a lot: many posts are open."],
    net: "Demand is high: your file and placements are enough.",
    sav: ["Developmental psychology, sociology", "Child-protection legislation", "Day-to-day educational support", "Working in a multidisciplinary team", "Writing reports"],
    out: ["State diploma DEES", "BAFA / BAFD for experience", "Driving licence B"],
    evo: "Coordinator, head of educational service, institution director, trainer."
  },
  "assistant-social": {
    emp: [["Departments and communes", "Departmental social services, CCAS, town halls"], ["Hospitals and health establishments", "University hospitals, clinics, psychiatric services"], ["Social-protection bodies", "CAF, MSA, CPAM, Carsat"], ["National Education and companies", "Middle and high schools, company social services"]],
    acces: ["State diploma of social worker (DEASS) in 3 years, at a training institute.", "Admission is by file, tests and interview (via Parcoursup or direct application).", "Community involvement, civic service or a job in contact with the public is a real plus.", "On leaving, the local-authority and hospital civil services recruit a lot, by exam or contract."],
    net: "Public employers recruit regularly: the diploma is enough.",
    sav: ["Family law, social law, foreigners' rights", "Benefits and social aid", "Interviewing and listening techniques", "Working with a network of partners", "Writing social reports"],
    out: ["State diploma DEASS", "Case-tracking software", "Driving licence B"],
    evo: "Principal social worker, social-educational manager, head of service, trainer."
  },
  "coach-sportif": {
    emp: [["Gyms and clubs", null], ["Clubs and federations", "Sports clubs, federations, departmental committees"], ["Local authorities and companies", "Town halls, swimming centres, works councils, sport-health"], ["Independent", "Home or online coaching, park sessions, studios"]],
    acces: ["BPJEPS in fitness activities (1 year), STAPS bachelor's or DEJEPS: a diploma is compulsory to coach for pay.", "The professional card of sports educator is compulsory: apply for it at the prefecture after your diploma.", "Many start in a gym or club before building their own clientele.", "Prepare a sports CV: certifications, federation diplomas, competition results."],
    net: "To set up on your own, networking and recommendations build the clientele; in a gym, they recruit by application.",
    sav: ["Anatomy and physiology of exercise", "Training techniques and programming", "Basic nutrition", "Teaching and motivation", "First aid (PSC1)"],
    out: ["BPJEPS, DEJEPS or STAPS bachelor's", "Professional card", "Tracking and coaching apps", "First-aid certificate"],
    evo: "Senior coach, gym manager, physical trainer, owner of a facility, STAPS teacher."
  },
  veterinaire: {
    emp: [["Veterinary practices and clinics", "Independent clinics, groups (AniCura, Mon Vétérinaire, Vetoquinol)"], ["Industry and research", null], ["State and public health", "Departmental population-protection directorates, slaughterhouses, customs"], ["Other", "Farms, zoos, army, teaching"]],
    acces: ["Exam after a BCPST prep class, or direct admission after the bac for some places (depending on the veterinary schools), then 5 or 6 years of study.", "Placements are compulsory and highly valued for selection: do some from high school in a clinic or on a farm.", "The state diploma of veterinary doctor allows private practice.", "Many young vets start as employees, then become partners."],
    net: "Placements and supervisors play a decisive role in first jobs and partnerships.",
    sav: ["Biology, physiology, animal pathology", "Comparative anatomy", "Veterinary pharmacology", "Basic surgery", "Relationships with owners"],
    out: ["Clinic management software", "Ultrasound, radiology", "State diploma of veterinary doctor"],
    evo: "Clinic partner, specialist (surgery, imaging), public-health vet, researcher, teacher at a veterinary school."
  },
  agriculteur: {
    emp: [["Farms", "Family farm, GAEC, non-family start-up"], ["Agricultural cooperatives", null], ["Advice and support", "Chambers of agriculture, accounting centres, agricultural banks"], ["Farm employment", "Wine, market-garden and livestock farms, agricultural contractors"]],
    acces: ["Vocational bac in farm management (CGEA), BTSA ACSE or BPREA (professional certificate): the diploma conditions the subsidies.", "Subsidised start-up (young farmer grant) requires a project and a validated path; the Chamber of Agriculture supports you.", "Taking over an existing farm goes through start-up information points and Safer ads: many farmers retire within 10 years.", "Placements and apprenticeships on farms are the best way to learn and find a farm."],
    net: "The sector works a lot through neighbours and advice among farmers; the profession's networks help find a farm.",
    sav: ["Agronomy, livestock or wine growing depending on the production", "Farm management (accounting, CAP subsidies)", "Mechanics and machinery", "Environmental regulation", "Short supply chains and direct sales"],
    out: ["BPREA or BTSA", "Tractor licence (CACES)", "Farm management software", "Start-up file (DJA)"],
    evo: "Farm manager, partner in a GAEC, agricultural adviser, cooperative manager."
  },
  "charge-environnement": {
    emp: [["Environmental consultancies", null], ["Local authorities and State", "Regions, metropolitan areas, DREAL, nature parks"], ["Associations", null], ["Large groups", null]],
    acces: ["Master's in ecology, environment or planning; engineering schools with an environment option.", "6-month internships in a consultancy or local authority are decisive: many are hired at the end.", "Fixed-term contracts are common at first; being able to carry out natural surveys (fauna, flora) is a real asset.", "Join naturalist associations: they train you and put you in touch with employers."],
    net: "The scene is small: naturalist associations and internships open many doors.",
    sav: ["Ecology, botany, fauna", "Environmental regulation (impact study, water law)", "Mapping (GIS)", "Basic statistics", "Writing reports"],
    out: ["QGIS or ArcGIS", "R or Python for statistics", "Field equipment (GPS, cameras)", "Driving licence B"],
    evo: "Environment project manager, ecologist engineer, biodiversity manager, consultancy director."
  },
  "tech-eolien": {
    emp: [["Wind-turbine manufacturers", null], ["Wind-farm operators", null], ["Maintenance firms", "Specialist wind-maintenance subcontractors"], ["Offshore wind", "Offshore farms (Saint-Nazaire, Fécamp, Courseulles-sur-Mer) and their service providers"]],
    acces: ["BTS in electrotechnics or maintenance, vocational bac in maintenance then wind training; training centres offer dedicated courses (CAP, professional titles).", "Safety certifications (working at height, GWO — Global Wind Organisation) are compulsory: you take them at an approved centre.", "Contracts often start as agency or fixed-term work with a subcontractor, then a permanent job with the manufacturer or operator.", "Expect to be mobile: farms are spread across the country, sometimes at sea."],
    net: "Employers recruit a lot: recognised training and certifications are enough.",
    sav: ["Electrotechnics and mechanics", "Working at height and rescue", "Reading diagrams and diagnosis", "Electrical safety", "Technical English"],
    out: ["GWO certifications (Basic Safety Training, working at height)", "Electrical certification", "Medical fitness for work at height"],
    evo: "Team leader, expert technician, site manager, maintenance engineer."
  },
  paysagiste: {
    emp: [["Landscape companies", null], ["Landscape and design agencies", null], ["Local authorities", "Green-space departments of town halls and metropolitan areas"], ["Nurseries, parks and gardens", "Nurseries, historic gardens, garden centres"]],
    acces: ["CAP in landscaping, vocational bac, BTSA in landscaping (worker or technician), or ENSP Versailles / ENSNP Blois to design (landscape designer, Bac+5).", "Landscape companies recruit many apprentices: it is the most direct route.", "To design, a portfolio of projects and internships in agencies are essential.", "Local authorities recruit by exam or contract for green-space services."],
    net: "Companies recruit regularly; for design agencies, the portfolio and internships count more.",
    sav: ["Botany and plant knowledge", "Planting and maintenance techniques", "Drawing and plan design", "Operating machinery", "Site management and quotes"],
    out: ["AutoCAD, SketchUp, Photoshop", "Driving licence B and CACES", "Certiphyto (use of products)", "Freehand drawing"],
    evo: "Team leader, site manager, landscape designer, company owner."
  }
});
