/* English overlay for career access sheets (1/4). Same keys as js/data/metiers-acces-1.js.
   emp: [title, examples or null to keep the original list]; net: sentence only (the 1-3 score is kept). */
A.EN_DATA = A.EN_DATA || {};
A.EN_DATA.acces = A.EN_DATA.acces || {};
Object.assign(A.EN_DATA.acces, {
  infirmier: {
    emp: [["Public hospitals and university hospitals", null], ["Private clinics and health groups", null], ["Care homes and home care", "Clariane (ex-Korian), Orpea, home hospitalisation, health centres"], ["Other", "Army, schools (school nurse), companies (occupational health), private practice"]],
    acces: ["Apply to a nursing school (IFSI) on Parcoursup: your file counts (reports, motivation letter), usually no entrance exam.", "Placements make up half of the training: that's where you get noticed, and many nurses are hired by their placement ward.", "After graduating, hiring is open everywhere in France: jobs outnumber candidates.", "For a specialty (operating theatre, anaesthesia, paediatric nursing), you then need a school entrance exam."],
    net: "You get in through your Parcoursup file then your placements: networking helps little, motivation counts.",
    sav: ["Anatomy, physiology, basic pharmacology", "Nursing care and hygiene (techniques, asepsis)", "Care law and ethics, professional confidentiality", "Dose calculation", "Communicating with the patient and family"],
    out: ["Electronic care records", "Technical skills (blood draws, dressings) learned in practicals", "AFGSU (emergency care certificate)"],
    evo: "Specialist nurse (theatre, anaesthesia, paediatric), advanced-practice nurse, nurse manager, nursing school trainer."
  },
  medecin: {
    emp: [["Public hospitals and university hospitals", "AP-HP, university hospitals, regional hospital centres"], ["Private practice and health centres", "GP or specialist in their own practice"], ["Private clinics", null], ["Industry, research, army", "Sanofi, laboratories, INSERM, armed forces health service"]],
    acces: ["Enter through PASS or L.AS, then pass the selection at the end of year 1.", "The end-of-cycle exam (the ECOS and the ranking test) decides your specialty and city: the medical years are tightly structured.", "Lots of night shifts and clinical placements: that's where you make contacts that help for the residency.", "For a hospital-university or research career, you start a master's or a science thesis early."],
    net: "Your exam ranking decides almost everything; networking mostly matters afterwards (posts, locums, practices).",
    sav: ["Biology, chemistry, physics (PASS programme)", "Anatomy, physiology, semiology", "Clinical reasoning", "Medical ethics and health law", "Statistics and reading scientific papers"],
    out: ["ECOS practice platform", "Patient-record software", "Medical English"],
    evo: "GP or specialist, chief resident, hospital practitioner, university professor, head of department."
  },
  kine: {
    emp: [["Private practice", "Physiotherapist with their own practice, associate or locum"], ["Hospitals and clinics", "AP-HP, functional rehabilitation centres"], ["Sport", "Professional clubs, federations, INSEP"], ["Other", "Retirement homes, thalassotherapy, health centres"]],
    acces: ["Enter a physiotherapy school after PASS, an L.AS or a science bachelor's (including STAPS).", "Locum work in a practice is the best way to discover the job, find a post and build a clientele.", "Train in a specialty (sport, paediatrics, respiratory) through university diplomas."],
    net: "Locums and partnerships come largely through word of mouth among colleagues.",
    sav: ["Anatomy and biomechanics", "Physiology and disorders of the musculoskeletal system", "Rehabilitation and massage techniques", "Physiotherapy diagnostic assessment", "Patient education (getting patients to stick to exercise)"],
    out: ["Practice-management software", "Rehabilitation equipment (electrotherapy, isokinetics)"],
    evo: "Setting up your own practice, specialisation (sport, neurology), nurse manager-style roles, teaching at a school, osteopathy on top."
  },
  pharmacien: {
    emp: [["Community pharmacies", "Neighbourhood pharmacy, groups (Pharmacie Lafayette, Giphar)"], ["Hospitals", "Hospital pharmacies of university hospitals"], ["Pharmaceutical industry", null], ["Medical biology and other", "Analysis laboratories (Biogroup, Cerballiance), distribution (Alliance Healthcare)"]],
    acces: ["Enter through PASS or L.AS, then the 6 years of pharmacy.", "In year 5 you choose a track: community pharmacy, industry or residency (exam for hospital and biology).", "A pharmacy is often bought between partners: you start as an employee then set up.", "Industry internships, in year 5 or a gap year, open the doors of laboratories."],
    net: "In industry, internships and faculty alumni count; in community pharmacy, networking helps find a pharmacy to take over.",
    sav: ["Pharmacology and therapeutic chemistry", "Drug interactions", "Drug regulation", "Running a pharmacy (stock, accounting)", "Patient advice"],
    out: ["Pharmacy management software", "Drug databases", "Scientific English"],
    evo: "Pharmacy owner, hospital pharmacist, quality or regulatory affairs manager in industry, laboratory director."
  },
  "aide-soignant": {
    emp: [["Public hospitals", "AP-HP, university hospitals, hospital centres"], ["Care homes (EHPAD) and social-care facilities", "Clariane (ex-Korian), Orpea, non-profit structures"], ["At home", "SSIAD nursing services, home-help services, home hospitalisation"], ["Private clinics", null]],
    acces: ["Enter a care-assistant training institute (about 1 year): file and interview, often outside Parcoursup.", "The diploma can also be prepared as an apprenticeship or for a career change.", "Placements often lead to short then permanent contracts on the spot: wards are short-staffed.", "After a few years, bridges allow you to enter nursing school."],
    net: "You are hired quickly; networking matters little, availability and seriousness on placement matter a lot.",
    sav: ["Hygiene and comfort care", "Moving and transferring patients", "Observing and reporting to the team", "First aid (AFGSU)", "Kind care and communicating with older people"],
    out: ["Electronic care records", "Handling equipment"],
    evo: "Nurse after a bridge course, nursery auxiliary, lead care assistant, team supervisor."
  },
  "sage-femme": {
    emp: [["Public maternity units", "AP-HP, university hospitals, regional hospitals"], ["Private clinics", null], ["Private practice", "Practice or birth centre"], ["Maternal and child protection", "Departmental PMI centres"]],
    acces: ["Enter through PASS or L.AS, then the 5 years of midwifery.", "Placements in delivery rooms and consultations let teams that recruit get to know you.", "In private practice, you first join an existing practice; locums are common."],
    net: "The diploma is enough to get hired; networking helps for setting up in private practice.",
    sav: ["Anatomy and physiology of pregnancy", "Fetal monitoring and obstetrics", "Newborn paediatrics", "Gynaecology and contraception", "Emergency procedures in the delivery room"],
    out: ["Ultrasound", "Monitoring equipment", "Perinatal record software"],
    evo: "Midwife manager, sonographer, teaching, work in PMI or public health."
  },
  "manip-radio": {
    emp: [["Public hospitals", "AP-HP, university hospitals, cancer centres"], ["Private imaging centres", "Medical imaging groups, clinics"], ["Radiotherapy centres", "Unicancer centres (Gustave Roussy, Institut Curie)"], ["Industry", "Imaging equipment makers (GE HealthCare, Siemens Healthineers, Philips)"]],
    acces: ["Enter a DTS IMRT at a high school or in an institute after a Parcoursup file, or the state diploma for radiographers.", "Placements in radiology, CT, MRI and radiotherapy are the main springboard to a job.", "The shortage of radiographers makes hiring fast; you can choose your specialty."],
    net: "The shortage means departments look for you: your file and placements are enough.",
    sav: ["Radiation physics and radiation protection", "Radiological anatomy", "How CT, MRI and radiotherapy work", "Dealing with anxious patients", "Hygiene and safety"],
    out: ["CT and MRI consoles", "Image archiving system (PACS)", "Dosimetry"],
    evo: "Dosimetrist, nurse-manager-type roles, trainer, applications engineer at a manufacturer."
  },
  psychologue: {
    emp: [["Hospitals and care facilities", "University hospitals, medico-psychological centres, mental health centres"], ["Schools system", "School psychologists (Psy-EN) in middle and high schools and information and guidance centres"], ["Companies and practices", "HR, consulting firms, occupational psychology"], ["Private practice and charities", "Practice, child protection, associations"]],
    acces: ["Psychology bachelor's, then psychology master's: the title of psychologist requires a master's.", "Entry to the master's is selective: your file, internships and bachelor's grade count.", "Internships are compulsory and chosen by the master's: ask early and nurture the relationship with your supervisor.", "For hospital civil service or the Education ministry, you take an exam."],
    net: "The master's internship is your chance to get known; afterwards posts circulate largely by word of mouth between teams.",
    sav: ["Developmental, clinical and social psychology", "Statistics and research methodology", "Basic neuroscience", "Clinical interviewing and listening", "Psychologist's code of ethics"],
    out: ["Psychometric tests (learned in the master's)", "Statistics software (SPSS, R)"],
    evo: "Neuropsychologist, occupational psychologist, clinical psychologist in private practice, school psychologist, lecturer-researcher."
  },
  orthophoniste: {
    emp: [["Private practice", "Speech-therapy practice alone or in a group"], ["Hospitals and rehabilitation centres", "University hospitals, language-disorder reference centres"], ["Medico-social structures", "IME, SESSAD, institutes for deaf children"], ["Other", "Teaching, research"]],
    acces: ["Entrance exam to a training centre (admission via Parcoursup with tests): prepare for the language and logic tests.", "The 5 years include many placements in practices and hospitals.", "After graduating, many set up privately in an area where demand is high."],
    net: "Admission to a training centre is selective and played on file and tests; afterwards clients come by themselves.",
    sav: ["Linguistics, phonetics and phonology", "Spoken and written language disorders (dyslexia, dysphasia)", "Neurology and anatomy of voice and swallowing", "Teaching and playing with children", "Law and billing schedule for procedures"],
    out: ["Speech-therapy assessment batteries", "Rehabilitation software"],
    evo: "Practice in partnership, specialisation (voice, neurology), teaching, research."
  },
  "dev-web": {
    emp: [["IT services and consulting firms (ESN)", null], ["Software publishers and French start-ups", null], ["Large groups (in-house teams)", "Banks (BNP Paribas, Société Générale), insurance (AXA), retail (Carrefour, Leroy Merlin)"], ["Web agencies and freelancers", "Digital agencies, freelance"]],
    acces: ["Many enter through a BTS SIO, a BUT in computer science, a bachelor's or a school: the diploma helps, your project portfolio (GitHub) counts just as much.", "Work-study is the best shortcut: you get hired by the company where you did your apprenticeship.", "Contribute to an open-source project, do hackathons, publish a real project: it shows on your profile.", "Answer junior developer job ads, naming the technologies of your project, and pass the technical tests (algorithms, take-home exercise)."],
    net: "Referrals and meetups count, but a strong portfolio opens doors without a network too.",
    sav: ["One solid language (JavaScript/TypeScript, Python or Java)", "HTML, CSS, HTTP and how the web works", "SQL databases", "Git and teamwork", "Basic algorithms and testing", "Technical English"],
    out: ["Git and GitHub", "A framework (React, Vue, Symfony, Django…)", "Docker, cloud basics (AWS, Azure)", "VS Code and its terminal"],
    evo: "Senior developer, lead dev, software architect, CTO, product manager."
  },
  "data-scientist": {
    emp: [["Banking, insurance, finance", null], ["Tech and e-commerce", null], ["Consulting and IT services", "Capgemini, Accenture, Sopra Steria, data-specialised firms"], ["Health, energy, industry", null]],
    acces: ["Master's in data science, applied maths or an engineering school with a data track: Bac+5 is the norm.", "A final-year internship or a work-study contract in data is the main way to get hired.", "Show projects on real data (Kaggle, open data) and explain your results to non-specialists.", "Interviews include statistics, SQL and coding exercises, and a case study."],
    net: "Offers circulate a lot through referrals and communities (meetups, Kaggle); technical level remains decisive.",
    sav: ["Probability and statistics", "Linear algebra", "Python and its libraries (pandas, scikit-learn)", "SQL", "Machine learning (regression, trees, neural networks)", "Visualisation and communicating results"],
    out: ["Python, R", "SQL and data warehouses", "Jupyter, Git", "Cloud (AWS, GCP, Azure), Spark"],
    evo: "Senior data scientist, data lead, machine-learning engineer, head of data, chief data officer."
  },
  cyber: {
    emp: [["IT services and specialised firms", null], ["Large groups", "Banks, insurers, energy, industry (in-house security teams)"], ["State", "ANSSI, Ministry of the Armed Forces, DGSI, gendarmerie, police"], ["Software publishers and start-ups", null]],
    acces: ["Bac+3 to Bac+5 in computing with a security option (BUT networks and telecoms cyber track, engineering schools, master's).", "Take part in CTFs (Capture the Flag), TryHackMe, Root-Me: these are proofs of level that recruiters look at.", "Work-study is very common: it places you directly in a security team.", "For the State, look at ANSSI and the Armed Forces ministry exams; some missions require a security clearance."],
    net: "The cyber community is small: events (FIC, CTFs) and referrals weigh a lot.",
    sav: ["Networks (TCP/IP, DNS, firewalls)", "Systems (Linux, Windows) and Active Directory", "Basic cryptography", "Web vulnerabilities (OWASP) and penetration testing", "Regulation (GDPR, NIS 2) and crisis management"],
    out: ["Kali Linux, Wireshark, Burp Suite", "SIEM (Splunk, Elastic)", "Certifications (Security+, CEH, OSCP, CISSP later)"],
    evo: "Pentester, SOC analyst, consultant, chief information security officer (CISO)."
  },
  "admin-reseau": {
    emp: [["IT services and managed-service firms", null], ["Companies and local authorities", "In-house IT teams of large groups, town halls, hospitals"], ["Operators", null], ["Integrators", null]],
    acces: ["BTS SIO SISR option, BUT networks and telecoms or a professional bachelor's: you can be hired from Bac+2.", "Work-study is very common and places you in an IT department or an IT services firm.", "Take a network or system certification (Cisco CCNA, Microsoft): it is recognised and reassures recruiters.", "Start as a support technician or junior administrator, then build up your skills."],
    net: "IT services firms hire a lot of juniors: a CV with projects and certifications is enough.",
    sav: ["OSI model, TCP/IP, routing, VLANs", "Linux and Windows Server", "Active Directory, DNS, DHCP", "Virtualisation and cloud", "Scripting (PowerShell, Bash) to automate", "Backups and monitoring"],
    out: ["Cisco Packet Tracer", "VMware, Hyper-V, Proxmox", "Monitoring tools (Zabbix, Nagios)", "CCNA, AZ-104 certifications"],
    evo: "Systems and networks engineer, infrastructure architect, DevOps, IT director."
  },
  "game-designer": {
    emp: [["Large French studios", "Ubisoft (Montpellier, Paris, Annecy), Don't Nod, Focus Entertainment"], ["Independent studios", null], ["Mobile and online games", null], ["Serious games and other", "Serious games, training, museums"]],
    acces: ["Video-game schools (Rubika, ISART Digital, ENJMIN, Gamagora, Gobelins…) or a bachelor's/master's in computing or design, then a portfolio.", "A portfolio of small playable games (game jams, prototypes) is worth more than a CV: join the Global Game Jam.", "Studio internships are mostly won through unsolicited applications with a playable project.", "The sector is very competitive: be ready to start as a tester or QA, then move up."],
    net: "The scene is small: events (Game Connection, Gamescom, game jams), school alumni and referrals decide a lot.",
    sav: ["Gameplay loops, balancing and progression", "Game design documents", "An engine (Unity or Unreal) for prototyping", "Scripting basics (C#, Blueprints)", "Game culture and critical analysis", "Player psychology"],
    out: ["Unity, Unreal Engine", "Figma, Miro", "Excel for balancing", "Git, Jira"],
    evo: "Lead game designer, creative director, producer, senior level designer."
  },
  "ux-designer": {
    emp: [["Start-ups and scale-ups", null], ["Agencies and consulting", "Accenture Song, Wavestone, Publicis Sapient, digital agencies"], ["Large groups", "Banks, insurers, energy, e-commerce"], ["Freelance", "Assignments for SMEs and start-ups"]],
    acces: ["Design course (DN MADE digital, BUT MMI, design and web schools) then a portfolio.", "A portfolio of 3 to 5 case studies explaining the problem, your approach and the result is worth more than the diploma.", "Work-study is very common: it places you in a product team.", "Practise recruitment exercises (live design challenges) and usability tests."],
    net: "Communities (UX Paris, ADPList, LinkedIn) and referrals: the portfolio remains the essential.",
    sav: ["User research and interviews", "Information architecture and journeys", "UI principles (grid, typography, accessibility)", "Prototyping and usability testing", "Working with developers"],
    out: ["Figma", "Miro, Maze", "HTML/CSS basics", "Design systems"],
    evo: "UX lead, product designer, head of design, product manager."
  },
  ingenieur: {
    emp: [["Aerospace", null], ["Automotive and transport", null], ["Energy and environment", null], ["Consulting and digital", "Capgemini, Altran (Capgemini Engineering), Alten, Accenture, Sopra Steria"], ["Construction", null]],
    acces: ["Engineering degree (CTI): straight after the bac in 5 years, after a prep class, or after a BUT, a BTS or a bachelor's (admission on qualifications).", "Internships (usually 3, including one abroad) are the way in: many engineers are hired by their final-year internship.", "Engineering apprenticeships pay you and place you in a company: more and more grandes écoles offer them.", "Choose your major and internship for your target sector; school-company forums save time."],
    net: "Your school's alumni and company forums help a lot, without being indispensable.",
    sav: ["Solid maths and physics", "Engineering sciences of your specialty", "Project management (V-cycle, agile)", "Fluent English", "A programming base (Python, MATLAB)"],
    out: ["Design software (CATIA, SolidWorks, AutoCAD)", "MATLAB, Python", "Excel", "Project tools (MS Project, Jira)"],
    evo: "Project manager, head of design office, technical director, manager, entrepreneur."
  },
  "tech-maintenance": {
    emp: [["Industry", null], ["Energy", null], ["Maintenance subcontractors", null], ["Transport", "SNCF, RATP, airlines"]],
    acces: ["BTS in systems maintenance, BUT in industrial engineering and maintenance, vocational bac in maintenance then BTS: you are hired right after the diploma.", "Work-study is the best route: companies fund the training.", "Look for an agency or fixed-term contract in a factory: that is also how people get in.", "Electrical certifications or manufacturer certifications are a plus."],
    net: "The market is short of people: a good file and a serious internship are enough.",
    sav: ["Mechanics, electricity, hydraulics and pneumatics", "Reading electrical diagrams", "Fault diagnosis", "Preventive maintenance and CMMS", "Safety and certifications"],
    out: ["CMMS (Maximo, SAP PM)", "Multimeter, oscilloscope", "Electrical certification (H0B0, BR)"],
    evo: "Maintenance manager, methods technician, workshop manager, engineer after a further course."
  },
  automaticien: {
    emp: [["Integrators and design offices", null], ["Manufacturers", null], ["PLC and robot makers", null], ["Energy and process", "EDF, Engie, TotalEnergies, chemicals"]],
    acces: ["BTS CIEL or electrotechnics, BUT GEII, engineering school: many start as technicians then progress.", "Work-study is highly valued in industry.", "Take part in robotics competitions (French Robotics Cup, Eurobot): you learn and get noticed.", "Interviews often include a PLC programming or logic test."],
    net: "Industrial companies recruit a lot: a file and a convincing internship are enough.",
    sav: ["Basic electricity and electronics", "PLC programming (Grafcet, ladder language)", "Sensors, actuators, industrial networks", "Robotics", "Machine safety"],
    out: ["TIA Portal (Siemens), EcoStruxure (Schneider)", "Supervision software", "Cobots and industrial robots"],
    evo: "Automation project manager, head of an automated site, robotics engineer."
  },
  "tech-labo": {
    emp: [["Pharmaceutical and cosmetics industry", null], ["Food industry", null], ["Testing and analysis laboratories", null], ["Public research", "CNRS, Inserm, INRAE, CEA, hospitals"]],
    acces: ["BTS in bioanalysis and control, BTS chemistry trades, BUT chemistry or biological engineering: you are hired right after the diploma.", "Work-study is common and recommended.", "Laboratory internships give you the rigour employers look for (traceability, good practice).", "A laboratory in a regulated sector (pharma, food) requires good laboratory practice."],
    net: "Your file and internships count more than networking.",
    sav: ["Basic chemistry and biology", "Analysis techniques (chromatography, spectrometry, PCR)", "Good laboratory practice (GLP)", "Traceability and quality", "Chemical and biological safety"],
    out: ["Laboratory software (LIMS)", "Analysis instruments", "Excel and basic statistics"],
    evo: "Laboratory manager, quality engineer, senior technician then engineer through a further course."
  },
  "meca-aero": {
    emp: [["Airlines", null], ["Manufacturers", null], ["Maintenance and equipment makers", null], ["Armed forces and general aviation", "Air Force, ALAT, flying clubs"]],
    acces: ["Vocational bac in aeronautics then BTS in aeronautics: the BTS is the main route to the B1 or B2 licence.", "The European maintenance licence (EASA Part 66) is prepared in a Part 147 approved school: without it you cannot sign off work on an aircraft.", "Work-study is highly valued: big companies (Air France, Airbus) use it to recruit.", "Interviews include a technical test and check your rigour and technical English."],
    net: "Employers recruit through approved schools and work-study: your training centre's reputation counts.",
    sav: ["General mechanics, basic aerodynamics", "Electricity and avionics", "EASA regulations (Part 66, Part 145)", "Reading technical documentation in English", "Rigour and traceability"],
    out: ["B1 / B2 licence (EASA Part 66)", "Measuring and inspection tools", "Manufacturer technical manuals"],
    evo: "Team leader, hangar manager, engineer after further training."
  }
});
