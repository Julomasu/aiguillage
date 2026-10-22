/* English overlay for career access sheets (5/6 : health, digital, industry, business, law). Same keys as js/data/metiers-acces-5.js. */
A.EN_DATA = A.EN_DATA || {};
A.EN_DATA.acces = A.EN_DATA.acces || {};
Object.assign(A.EN_DATA.acces, {
  dentiste: {
    emp: [["Private practice", "Own practice, in partnership or as an associate of a colleague"], ["Dental health centres", "Mutual, municipal or non-profit dental centres, centre networks"], ["Hospitals and university hospitals", "Dentistry departments of university hospitals (care, emergency, teaching)"], ["Other", "Army, dental industry, research, insurance"]],
    acces: ["Enter through PASS or L.AS, then pass the selection at the end of year 1: dentistry places are capped.", "The 6 years (short cycle) are followed by an active internship: you treat patients from year 4 in a university clinic.", "Many set up after 1 to 2 years of associate or locum work in an existing practice.", "For a specialty (orthodontics, oral surgery), you need a residency after an exam."],
    net: "To set up or take over a practice, your network of colleagues and faculty alumni counts a lot.",
    sav: ["Anatomy of the mouth and face", "Conservative care, prosthetics, oral surgery", "Hygiene, asepsis, radiation protection", "Running a practice (accounting, staff)", "Dealing with anxious patients"],
    out: ["Chair, drill, digital radiography", "Practice management software", "CAD/CAM (digital impressions)"],
    evo: "Setting up your own practice, practice partner, specialist (orthodontist, oral surgeon), dentistry teacher."
  },
  ergotherapeute: {
    emp: [["Hospitals and rehabilitation centres", "University hospitals, functional rehabilitation centres"], ["Medico-social structures", "Institutes for disabled children, care homes, residences"], ["Private practice", "Occupational therapy practice or home visits"], ["Companies and local authorities", "Ergonomics consulting, workstation adaptation"]],
    acces: ["Apply on Parcoursup to an occupational therapy institute (3 years): file and sometimes tests or interview.", "Placements (about a year in total) get you known by teams and often decide your first job.", "Posts are plentiful: the profession is short of people in many regions.", "You can specialise (hand, geriatrics, psychiatric disability) through university diplomas."],
    net: "Departments are short of occupational therapists: your diploma and placements are enough.",
    sav: ["Anatomy, physiology, neurology", "Daily-living activities and activity analysis", "Technical aids and home adaptation", "Hand and upper-limb rehabilitation", "Working with families and teams"],
    out: ["Splints and technical aids", "Drawing or modelling software", "Standardised assessments"],
    evo: "Nurse-manager-type roles, specialist occupational therapist, trainer, ergonomics consultant."
  },
  osteopathe: {
    emp: [["Private practice", "The vast majority of osteopaths are self-employed"], ["Group practices and health centres", "Multidisciplinary practices with physiotherapists and doctors"], ["Sport", "Professional sports clubs, federations"], ["Other", "Care homes, companies (prevention of musculoskeletal disorders)"]],
    acces: ["Enter a school approved by the Health ministry (5 years): admission by file and interview, sometimes via Parcoursup or after an L.AS or PASS.", "Tuition is high (often several thousand euros a year): look into loans and school aid.", "Placements in the school's clinic train you for real consultations.", "As with physiotherapists or dentists, many start by locum work or an associateship before setting up."],
    net: "Clientele is built by word of mouth and referrals from doctors, physiotherapists and athletes: networking is decisive.",
    sav: ["Anatomy and biomechanics", "Physiology and pathology", "Manual techniques (structural, visceral, cranial)", "Differential diagnosis (knowing when to refer to a doctor)", "Running a practice"],
    out: ["Treatment table", "Practice management software", "Compulsory continuing training"],
    evo: "Setting up alone or in a group practice, specialisation (sport, paediatrics), teaching at a school."
  },
  dieteticien: {
    emp: [["Hospitals and clinics", "University hospitals, care centres, nutrition departments"], ["Contract catering", "Sodexo, Elior, Compass, school and hospital canteens"], ["Private practice", "Dietetics or nutrition practice"], ["Food industry and sport", "Danone, Nestlé, sports clubs, nutrition apps"]],
    acces: ["BTS in dietetics (2 years) or BUT in biological engineering, dietetics track (3 years): admission through Parcoursup.", "Placements (hospital, contract catering) are compulsory and give you your first contacts.", "To set up, you must register your diploma with the ARS: the title is protected.", "Pursue a specialty (sports nutrition, eating disorders) through further training."],
    net: "In private practice, your reputation and referrals from doctors count; in hospitals or catering, your file is enough.",
    sav: ["Nutrition, therapeutic dietetics", "Biochemistry and physiology", "Balanced diet and official guidance (PNNS)", "Interviewing and patient-education techniques", "Managing contract catering"],
    out: ["Nutritional analysis software", "Food composition tables (Ciqual)", "Patient follow-up tools"],
    evo: "Specialist dietitian, quality manager in contract catering, setting up your own practice, trainer."
  },
  opticien: {
    emp: [["Optical chains", null], ["Independent opticians", "Local shop, often a family business"], ["Industry and laboratories", null], ["Health", "Ophthalmology clinics, ophthalmologists' practices"]],
    acces: ["BTS Optician-eyewear specialist (2 years): admission through Parcoursup, with a high share of work-study.", "Work-study is the main route: chains recruit many apprentices.", "To open your own shop, the optician's diploma is compulsory and start-up capital is needed.", "After a few years, you can move towards hearing-aid dispensing or contact lenses with further diplomas."],
    net: "Chains recruit regularly: your diploma and work-study are enough.",
    sav: ["Geometrical and physiological optics", "Fitting and adjusting glasses", "Refraction (measuring eyesight)", "Reimbursements and insurers", "Advice and selling"],
    out: ["Lensmeter, refractometer", "Lens-edging machine", "Shop management software"],
    evo: "Shop manager, independent optician, trainer, specialisation in contact lenses or low vision."
  },
  psychomotricien: {
    emp: [["Care structures", "Hospitals, rehabilitation centres, CMPs"], ["Medico-social structures for children", "IME, SESSAD, early medico-social action centres"], ["Private practice", "Own or shared practice"], ["Care homes for older people", "EHPAD, Alzheimer units"]],
    acces: ["Enter a psychomotor therapy institute (3 years): admission by exam, file or Parcoursup depending on the institute.", "Prepare for the tests (general knowledge, biology, interview): places are limited.", "Placements are numerous and decisive in finding a first job.", "Posts are plentiful in institutions; private practice requires building a clientele."],
    net: "The profession is short of practitioners: your diploma and placements are enough.",
    sav: ["Psychomotor development of the child", "Neurology and psychopathology", "Relaxation and body-expression techniques", "Psychomotor assessment and therapeutic plan", "Working with families and teams"],
    out: ["Test batteries (Bender, NEPSY, M-ABC)", "Motor-skill and relaxation equipment", "Follow-up software"],
    evo: "Specialist psychomotor therapist, nurse-manager-type roles, trainer, setting up in private practice."
  },
  devops: {
    emp: [["IT services and consulting", null], ["Software publishers and scale-ups", null], ["Banks, insurers, large groups", null], ["Cloud providers", "AWS, Google Cloud, Microsoft Azure (teams in France)"]],
    acces: ["Bac+3 to Bac+5 in computing: engineering school, master's, BUT then professional bachelor's or specialised school.", "Work-study is very common: it places you directly in an operations or platform team.", "Practise on a free cloud account, deploy a personal project and show it on GitHub.", "Take a cloud certification (AWS Cloud Practitioner then Solutions Architect, Azure AZ-104, Google ACE): they weigh a lot in interviews."],
    net: "Referrals and communities (meetups, DevOps Days) are common; a good GitHub profile and a certification also open doors.",
    sav: ["Linux and the command line", "Networking, DNS, HTTP", "Docker and Kubernetes", "Continuous integration and deployment (CI/CD)", "Infrastructure as code (Terraform, Ansible)", "Monitoring and incident management"],
    out: ["Git, GitLab CI or GitHub Actions", "Terraform, Ansible, Helm", "Prometheus, Grafana", "AWS, Azure, Kubernetes (CKA) certifications"],
    evo: "Senior DevOps, site reliability engineer (SRE), cloud architect, infrastructure manager."
  },
  "data-analyst": {
    emp: [["Banks and insurers", null], ["Retail and e-commerce", null], ["Consulting and IT services", "Capgemini, Accenture, Sopra Steria, specialised firms"], ["Start-ups and scale-ups", null]],
    acces: ["BUT STID (statistics and decision-support computing), maths-computing or economics bachelor's, data master's, business or engineering school.", "Work-study or a 6-month internship is the best way to get hired.", "Build a portfolio of 2 or 3 analyses on open data (data.gouv.fr, Kaggle) with an online dashboard.", "Interviews include an analysis case, a SQL exercise and a presentation to non-specialists."],
    net: "Companies recruit many analysts: a good portfolio and some experience are enough.",
    sav: ["Basic statistics (mean, correlation, tests)", "SQL", "Advanced Excel (pivot tables)", "Visualisation and data storytelling", "Python or R basics"],
    out: ["SQL", "Power BI, Tableau, Looker", "Excel", "Python (pandas), Git basics"],
    evo: "Senior data analyst, analytics engineer, data scientist, BI manager, chief data officer."
  },
  "dev-mobile": {
    emp: [["Start-ups and scale-ups", null], ["Game and app publishers", null], ["Banks and large groups", null], ["IT services and agencies", "Capgemini, Sopra Steria, mobile-app agencies"]],
    acces: ["BTS SIO SLAM option, BUT in computing, bachelor's or engineering school: you can start from Bac+2.", "Publish an app on the App Store or Play Store, even a simple one: it is your best business card.", "Work-study is very common: many teams train apprentices.", "Choose a technology (Swift, Kotlin, Flutter, React Native) and go deep before broadening."],
    net: "A portfolio and a published app count more than networking, but referrals remain frequent.",
    sav: ["A mobile language (Swift, Kotlin, Dart or TypeScript)", "Responsive interfaces and accessibility", "API calls and local data handling", "Testing and publishing on the stores", "Security and performance basics"],
    out: ["Xcode, Android Studio", "Flutter or React Native", "Git, Firebase", "Figma for mock-ups"],
    evo: "Senior mobile developer, mobile lead, architect, product manager, freelance."
  },
  "technicien-support": {
    emp: [["IT services and managed-service firms", null], ["IT departments", "IT departments of large companies, hospitals, local authorities"], ["Retailers and providers", "Fnac Darty, Boulanger, Apple Store, support providers"], ["Software publishers", "Technical customer services at Microsoft, Salesforce, French publishers"]],
    acces: ["BTS SIO SISR option, BUT networks and telecoms or vocational bac SN: you are hired right after the diploma.", "Work-study is the fastest route: you work on real tickets from the first year.", "Take a simple certification (CompTIA A+, Microsoft MD-102, ITIL Foundation): it reassures recruiters.", "Show your patience and teaching skills: interviews often simulate troubleshooting with a user."],
    net: "Recruitment is steady: a CV with work-study or an internship is enough.",
    sav: ["Windows, macOS, Linux basics", "Networking (IP address, DNS, Wi-Fi)", "Ticket management (ITIL)", "Microsoft 365 and Active Directory", "Clear communication with users"],
    out: ["Ticketing tools (GLPI, ServiceNow, Jira Service Management)", "Remote control", "CompTIA A+, ITIL certifications"],
    evo: "Level 2 or 3 technician, systems and networks administrator, support manager, project manager."
  },
  "chef-projet-it": {
    emp: [["IT services and consulting", null], ["IT departments", "IT departments of banks, insurers, industry, retail"], ["Publishers and start-ups", "Software publishers, scale-ups, digital agencies"], ["Public sector", "Ministries, local authorities, hospitals"]],
    acces: ["No single diploma: engineering school, computing or MIAGE master's, business school with an information-systems option.", "People often become project managers after 3 to 5 years as a developer, analyst or consultant.", "Work-study in business-side project ownership (MOA) or PMO is a direct way in.", "Sought-after certifications: PMP, Prince2, Scrum Master, ITIL."],
    net: "Many posts are found through internal promotion or referrals; your network of colleagues and former clients counts.",
    sav: ["Planning, budget, risk management", "Agile methods (Scrum, Kanban) and V-cycle", "Technical basics (architecture, databases)", "Requirements and acceptance testing", "Managing a team and stakeholders"],
    out: ["Jira, Confluence, MS Project", "Excel, PowerPoint", "PMP, Prince2, Scrum Master certifications"],
    evo: "Project director, programme manager, IT director, senior consultant."
  },
  soudeur: {
    emp: [["Boilermaking and metal construction", "Manufacturing SMEs, tank builders, Fives, Vallourec"], ["Shipyards", null], ["Aerospace and nuclear", null], ["Energy and petrochemicals", null]],
    acces: ["CAP in industrial boilermaking or vocational bac TCI, then welder certification.", "Apprenticeship is the royal road: manufacturers train and keep their apprentices.", "Certifications (ISO 9606 or nuclear qualification) are decisive to get the best-paid posts.", "Agency work is a good entry point to try several companies and get noticed."],
    net: "Companies are short of welders: a qualification and a good trial are enough.",
    sav: ["Welding processes (MIG, MAG, TIG, arc)", "Reading drawings and weld symbols", "Metals and how they behave under heat", "Basic non-destructive testing", "Safety (fumes, PPE, working at height)"],
    out: ["Welding set (MIG/MAG, TIG)", "Welder qualification (ISO 9606)", "Nuclear clearance depending on the site"],
    evo: "Team leader, weld inspector, welding coordinator, business founder."
  },
  "ingenieur-energie": {
    emp: [["Energy producers and suppliers", null], ["Design offices and consulting", null], ["Industry and equipment makers", null], ["Local authorities and public bodies", "ADEME, regions, metropolitan areas, grid operators (RTE, Enedis)"]],
    acces: ["Engineering school with an energy track (INSA, Centrale, Mines, Polytech, ENSE3…) or master's in energy and transition.", "Internships (6-month final-year) at an energy company or design office are the most common route to a job.", "Certifications such as RE2020 or project management support your profile.", "The sector also recruits through VIE (international volunteering in business) on projects abroad."],
    net: "Alumni of your school and company forums help, without being indispensable.",
    sav: ["Thermodynamics and heat transfer", "Electricity, grids and storage", "Renewables (solar, wind, biomass, hydrogen)", "Energy regulation (RE2020, energy performance ratings)", "Project management and economic analysis"],
    out: ["Simulation software (Pleiades, TRNSYS, PVsyst)", "Python, MATLAB, Excel", "Technical English"],
    evo: "Energy project manager, head of studies, site director, transition consultant."
  },
  "responsable-qualite": {
    emp: [["Industry", null], ["Food industry", null], ["Health and pharma", "Sanofi, laboratories, hospitals, medical-device makers"], ["Services and certification bodies", "Bureau Veritas, SGS, AFNOR, quality consulting firms"]],
    acces: ["BUT in physical measurements, industrial engineering or biological engineering, professional bachelor's in quality, or engineering school with a quality option.", "Work-study in quality is very common and often leads to a permanent job.", "Prepare certifications (ISO 9001 auditor, Lean Six Sigma Green Belt): they are sought after.", "Interviews ask you to analyse a non-conformity case or propose an improvement plan."],
    net: "The profession recruits in every sector: a good file and work-study are enough.",
    sav: ["ISO 9001, 14001, 45001 standards", "Internal and external audits", "Quality tools (8D, FMEA, Pareto, 5 whys)", "Basic statistics (control charts)", "Managing non-conformities and complaints"],
    out: ["Excel, Power BI", "Quality software (Qualiac, Enovia)", "Lean Six Sigma, ISO auditor certifications"],
    evo: "Senior quality manager, quality director, auditor, consultant, QHSE manager."
  },
  acheteur: {
    emp: [["Industry", null], ["Retail and luxury", null], ["Services and consulting", "Capgemini, Orange, banks, purchasing firms"], ["Public sector", "UGAP, ministries, local authorities, hospitals"]],
    acces: ["BUT TC or GEA, professional bachelor's in purchasing, business school, engineering school or purchasing-logistics master's.", "Work-study in purchasing is highly sought after: it is a real shortcut to a first job.", "Interviews include a negotiation role play and a numbers case.", "A first experience as a buyer's assistant or in logistics then opens buyer roles."],
    net: "School alumni and work-study contacts help, but your file and negotiation in the interview count a lot.",
    sav: ["Commercial negotiation", "Cost and offer analysis", "Contract law and public procurement", "Excel and indicators", "Fluent English"],
    out: ["ERP (SAP, Oracle)", "Advanced Excel", "E-procurement tools (Coupa, Ariba)", "CDAF or CIPS certifications"],
    evo: "Senior buyer, purchasing manager, chief purchasing officer, purchasing consultant."
  },
  "agent-immobilier": {
    emp: [["Agency networks", null], ["Independent agencies", "Neighbourhood agency, often family-run"], ["Developers and managers", null], ["Notaries and advice", "Notaries, property hunters, wealth-management firms"]],
    acces: ["BTS real estate professions, BUT TC, professional bachelor's in real estate: you can also start with a bac and in-house training.", "Work-study is very common: agency networks recruit apprentices every year.", "To practise, you need a professional card (transaction, management): your employer or the CCI supports you.", "Some networks recruit independent negotiators on commission: an easy but demanding entry."],
    net: "Clientele is built on your reputation: your personal network, client referrals and local officials weigh a lot.",
    sav: ["Property law (sale, lease, co-ownership)", "Valuing a property", "Negotiation and prospecting", "Basic property taxation", "Surveys and planning"],
    out: ["Real-estate software (Hektor, Apimo)", "Professional card", "Listing portals and CRM"],
    evo: "Agency manager, network director, setting up independently, property expert."
  },
  entrepreneur: {
    emp: [["Creating your own company", "Micro-enterprise, SAS, SARL, associations"], ["Incubators and accelerators", null], ["Funding", "Bpifrance, business angels, banks, crowdfunding, regional aid"], ["Taking over a business", "Taking over an SME, a shop or a farm"]],
    acces: ["No diploma is compulsory: you can start as a micro-entrepreneur from 18, or even earlier with the student-entrepreneur status.", "The national student-entrepreneur status (PEPITE) lets you build your project during your studies, with a tutor and access to incubators.", "Test your idea fast: first customers, prototype or site, before investing.", "Learn management, sales and accounting: schools, the CCI and entrepreneur networks offer free or cheap programmes."],
    net: "Networking is essential: mentors, customers, investors and peers give you contacts, advice and first contracts.",
    sav: ["Sales and prospecting", "Accounting and cash-flow basics", "Basic law (articles, contracts, intellectual property)", "Marketing and communication", "Risk management and resilience"],
    out: ["Micro-entrepreneur status (URSSAF)", "Management tools (Shine, Pennylane, Qonto)", "Networks (Réseau Entreprendre, French Tech, BNI)"],
    evo: "SME owner, serial entrepreneur, investor, business buyer."
  },
  "conseiller-assurance": {
    emp: [["Insurers", null], ["Bancassurance", null], ["Brokers and general agents", "Brokerage firms, independent insurance agencies"], ["Health mutuals", null]],
    acces: ["BTS in insurance (2 years), BUT TC, professional bachelor's in insurance-banking-finance: you can start from Bac+2.", "Work-study is very common: insurers recruit apprentices in branches every year.", "Registration with ORIAS is compulsory to advise and sell: your employer or a training course prepares you.", "After a few years, you can become a general agent (independent) or a broker."],
    net: "Insurers recruit many juniors: your diploma and work-study are enough.",
    sav: ["Types of contract (car, home, health, protection, life)", "Insurance law basics", "Risk assessment", "Selling advice and customer relations", "Handling a claim"],
    out: ["Contract management software", "ORIAS registration", "Compulsory continuing training (15 hours a year)"],
    evo: "Business-client adviser, branch manager, general agent, underwriter."
  },
  gendarme: {
    emp: [["Departmental gendarmerie", "Territorial brigades, investigation brigades, family-protection units"], ["Mobile gendarmerie", "Riot-control squadrons"], ["Specialist units", "GIGN, research sections, air and maritime gendarmerie"], ["Central services and cyber", "Cyberspace command, criminal research institute"]],
    acces: ["Enlist as a volunteer assistant gendarme (no exam, from age 17) to test the job, then take the non-commissioned officer exam (bac level).", "To become an officer, you take an exam at Bac+3 or Bac+5 (École des officiers de la gendarmerie nationale).", "Prepare fitness tests (running, swimming, pull-ups), psychometric tests and an interview.", "Training lasts about 1 year in school (Montluçon, Chaumont, Rochefort, Tulle) before your first posting."],
    net: "Entry is by exam and selection: networking does not matter, preparation does.",
    sav: ["Criminal procedure and road law", "Writing police reports", "Fitness and shooting", "Conflict handling and composure", "General knowledge and current affairs"],
    out: ["Gendarmerie NCO exam", "Officer exam (EOGN)", "Physical preparation"],
    evo: "Non-commissioned officer, warrant officer, lieutenant (internal exam), officer, specialisation (cyber, investigation brigade, GIGN)."
  },
  douanier: {
    emp: [["Customs directorate (DGDDI)", "Border services, ports, airports, investigation services (DNRED)"], ["Goods control", "Economic action units, customs laboratories"], ["Surveillance and anti-trafficking", "Surveillance brigades, coastguards, dog-handling units"], ["Taxation", "Collecting taxes (import VAT, alcohol, tobacco, fuel)"]],
    acces: ["Customs controller exam (bac level) or inspector exam (Bac+3 level).", "Tests cover general knowledge, law, economics and an oral: prepare a year ahead.", "Integrated prep classes (CPI) exist for grant-holding students.", "Initial training takes place at the National Customs School (La Rochelle), then you leave for a first posting."],
    net: "National exam: your rank decides, networking matters little.",
    sav: ["Customs law and taxation", "International economics", "Inspection and search procedures", "Administrative writing", "Foreign languages"],
    out: ["Customs exams (categories B and A)", "Integrated prep (CPI) for grant holders", "English"],
    evo: "Inspector, principal inspector, head of office, regional director."
  },
  "officier-armee": {
    emp: [["Army", "Regiments, staff, combat, logistics and intelligence units"], ["Navy", "Combat vessels, submarines, naval aviation, marines"], ["Air and Space Force", "Air bases, space command, fighter squadrons"], ["Joint services", "Health, intelligence, cyber defence, gendarmerie"]],
    acces: ["Entrance exams to the schools: Saint-Cyr Coëtquidan (after a prep class or a bachelor's), École navale, École de l'air et de l'espace, École des officiers de la gendarmerie.", "A literary or science prep class is often the normal route, but there are also admissions on qualifications (Bac+3).", "You are paid from the school and tuition is free in return for a service commitment.", "Prepare sports tests and an oral: schools also assess leadership and motivation."],
    net: "National exam: your rank decides, not networking.",
    sav: ["Geopolitics and military culture", "Maths or humanities (depending on the track)", "Leadership and team management", "Physical fitness", "Languages, especially English"],
    out: ["Saint-Cyr, École navale, École de l'air exams", "Military qualifications (parachutist, pilot, diver)", "Sports preparation"],
    evo: "Captain, commander, colonel, general, staff officer, international postings."
  }
});
