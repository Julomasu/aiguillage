/* English overlay for career access sheets (4/4 : construction, catering, tourism and aviation, justice, planning). Same keys as js/data/metiers-acces-4.js. */
A.EN_DATA = A.EN_DATA || {};
A.EN_DATA.acces = A.EN_DATA.acces || {};
Object.assign(A.EN_DATA.acces, {
  electricien: {
    emp: [["Construction companies", null], ["Craftspeople and very small firms", "General electrical contractors in your town (most of the jobs)"], ["Industry and maintenance", "Factories, hospitals, shopping centres, SNCF, RATP"], ["Renewable energy", "Solar-panel and charging-point installers"]],
    acces: ["CAP in electrical work, vocational bac in electrical trades (MELEC), then BTS in electrotechnics if you want to move towards design offices or site management.", "Apprenticeship is the royal road: you are paid, you learn on site, and many firms keep their apprentices.", "Electrical certifications (B1, BR, H0…) are required on sites: your school or employer has you take them.", "Many electricians end up creating their own business after a few years' experience."],
    net: "The trade is short of people: a good apprenticeship file or an internship is enough to find an employer.",
    sav: ["NF C 15-100 standard (electrical installations)", "Reading electrical diagrams", "Safety and prevention of electrical risk", "Home-automation and charging-point basics", "Customer relations (quotes, advice)"],
    out: ["Electrical certifications (B1, B2, BR, H0)", "Multimeter, clamp meter", "Driving licence B", "Qualifelec or RGE qualification (for solar)"],
    evo: "Team leader, site manager, design-office technician, self-employed craftsperson."
  },
  "conducteur-travaux": {
    emp: [["Major construction groups", null], ["Regional firms", "General building and public-works contractors"], ["Developers", null], ["Public clients", "Local authorities, social landlords, SNCF Réseau"]],
    acces: ["BTS in building, BUT civil engineering, professional bachelor's, engineering school (ESTP, ENTPE, INSA, Polytech…) or specialised construction school.", "Work-study is widespread: large groups recruit site managers from their apprentices and interns.", "First posts are often \"junior site manager\" or \"works engineer\" on a site, with geographic mobility.", "Firms also recruit by co-option: make yourself noticed during your final-year internship."],
    net: "Internships and work-study are the main way in; afterwards site foremen recommend each other.",
    sav: ["Reading plans and quantity take-offs", "Planning and site coordination (PERT, Gantt methods)", "Safety rules (prevention plan, PPSPS)", "Works-contract law, managing subcontractors", "Budget and profitability tracking"],
    out: ["MS Project, Excel", "Quantity-surveying software (Dimensions, Batiprix)", "Safety certifications (SST, AIPR)", "Driving licence B"],
    evo: "Site foreman, works director, project director, branch director."
  },
  plombier: {
    emp: [["Craftspeople and very small firms", "Local plumbing and heating firms (most of the posts)"], ["Large service groups", null], ["Manufacturers and distributors", "Saunier Duval, Viessmann, Daikin (heat-pump installation), Cedeo"], ["Social landlords and local authorities", "Maintenance of housing stock"]],
    acces: ["CAP in sanitary or thermal installation, vocational bac TISEC (energy and climate systems installation technician), then BTS in fluids-energy-home automation.", "Apprenticeship is the best route: employers often recruit their successor from among their apprentices.", "The RGE qualification (recognised environmental partner) is required to install subsidised heat pumps and boilers: it opens many jobs.", "Taking over a retiring craftsperson's business is a common route to independence."],
    net: "Craftspeople are looking for apprentices and employees: motivation and a CV are enough.",
    sav: ["Hydraulics and water circuits", "Heating (boiler, underfloor heating, heat pump)", "Soldering and brazing", "Reading plans", "Customer relations and quotes"],
    out: ["Capacity certificate (handling refrigerants)", "RGE qualification (Qualibat, Qualit'EnR)", "Driving licence B", "Plumbing tools (pipe bender, soldering)"],
    evo: "Team leader, maintenance technician, self-employed craftsperson, trainer."
  },
  menuisier: {
    emp: [["Master joiners and cabinetmakers", "Joinery workshops, fittings, staircases, furniture restoration"], ["Industry and manufacturers", null], ["Luxury houses and decoration", "Art-cabinetmaking workshops, Hermès, Mobilier national"], ["Heritage sites", "Restoration firms for historic monuments, Compagnons du Devoir"]],
    acces: ["CAP in joinery or cabinetmaking, craft-trades diploma (BMA), vocational bac in joinery-fitting technician, DN MADE craft trades.", "Compagnonnage (Compagnons du Devoir) offers a tour of France with lodging and training: a highly recognised route of excellence.", "Apprenticeship with a craftsperson gives you the skills school does not pass on.", "A portfolio of pieces you made (photos, furniture) helps convince employers for your first job."],
    net: "With craftspeople, everything rests on recommendation and the quality of what you have already made.",
    sav: ["Wood species and their uses", "Technical drawing and plan reading", "Machining (saw, spindle moulder, lathe, CNC)", "Traditional joints", "Finishes and varnishes"],
    out: ["Woodworking machine tools", "CAD software (SketchUp, Autodesk Inventor, TopSolid)", "CNC machines", "Compagnonnage"],
    evo: "Workshop manager, fitter, art cabinetmaker, self-employed craftsperson, trainer."
  },
  boulanger: {
    emp: [["Artisan bakeries", "Your neighbourhood craftspeople, renowned bakeries (Poilâne, Maison Kayser, Du Pain et des Idées)"], ["Bakery chains", null], ["Supermarkets", "Supermarket bakery counters, Picard"], ["Hotels, catering and luxury hotels", "Pastry shops of grand hotels, caterers, chocolatiers"]],
    acces: ["CAP in baking or pastry (often as an apprentice), then professional certificate or BTM, or a complementary mention.", "Competitions (Best Apprentice of France, Best Craftsman of France, Paris best baguette championship) boost careers.", "Many bakers take over an existing bakery: the trade is short of successors.", "Start with a summer job or an internship to test the rhythm (very early mornings) before committing."],
    net: "Bakers mostly train people recommended to them; apprenticeship is a real trial period.",
    sav: ["Fermentation and dough management (sourdough, proofing)", "Food hygiene (HACCP)", "Basic pastry (doughs, creams)", "Managing ingredient costs and stock", "Selling and customer relations"],
    out: ["Oven, mixer, sheeter", "HACCP training", "Professional competitions", "Driving licence B (deliveries)"],
    evo: "Head of production, self-employed craftsperson, trainer, luxury-hotel pastry chef."
  },
  cuisinier: {
    emp: [["Gourmet restaurants", "Michelin-starred restaurants, chefs' tables (Ducasse, Robuchon, Pierre Gagnaire, Alain Passard)"], ["Hotels and luxury hotels", null], ["Contract catering and caterers", null], ["Brasseries and restaurant groups", null]],
    acces: ["CAP in cooking, vocational bac in cooking, BTS in hotel and restaurant management, then elite schools (Institut Paul Bocuse, Ferrandi, Le Cordon Bleu).", "Kitchen internships in great houses (starred or luxury hotels) are the best calling card: apply a year ahead.", "Apprenticeship is the dominant route: you learn in a brigade, paid from the start.", "Competitions (Bocuse d'Or, Best Craftsman of France, Prix Taittinger) speed up careers but are very selective."],
    net: "Chefs recommend their former commis: in gastronomy, your first internship with a big name weighs enormously on what follows.",
    sav: ["Basic techniques (stocks, sauces, cooking methods)", "Food hygiene and safety (HACCP)", "Knowing seasonal produce", "Running a brigade", "Calculating food cost and managing stock"],
    out: ["Professional knives and equipment", "HACCP training", "Culinary competitions", "English (international brigades)"],
    evo: "Chef de partie, sous-chef, head chef, executive chef, restaurant owner."
  },
  pilote: {
    emp: [["French airlines", null], ["Low-cost and European airlines", null], ["Foreign airlines", "Emirates, Qatar Airways, Singapore Airlines (recruit French pilots)"], ["Business aviation and cargo", null]],
    acces: ["Airline pilot: training at the ENAC (exam after prep class or direct admission), or at a school approved by the DGAC (Air France Flight Academy, Pan Am International, Fly Academy…), to obtain the theory and practical licences (CPL, ATPL).", "Funding is the first obstacle: €70,000 to €120,000 in the private sector. Look into grants (Air France Foundation), guaranteed loans and airline cadet schemes.", "Airlines recruit through tests: psychometric tests (COMPASS), simulator, technical interview and HR interview. Prepare with past papers.", "English at level 4 minimum (ICAO certification) and the class 1 medical certificate are essential: take it before incurring costs."],
    net: "Airlines recruit through selection tests; contacts and school instructors help you learn the right recruiting moments.",
    sav: ["Meteorology and navigation", "Aviation regulations and human factors", "Principles of flight and aircraft performance", "Aviation English (phraseology)", "Crew management (CRM)"],
    out: ["Class 1 aviation medical certificate", "PPL, CPL, ATPL licences, type rating", "ICAO English proficiency test", "Flight simulators"],
    evo: "First officer, captain, instructor, examiner, chief pilot."
  },
  pnc: {
    emp: [["French airlines", null], ["Gulf airlines", "Emirates, Qatar Airways, Etihad (recruit in Europe)"], ["Low-cost airlines", null], ["Business aviation", "Private jets and VIP airlines"]],
    acces: ["The Safety Training Certificate (CFS) then the Aptitude Certificate (CCA) are required: you take them at an approved centre (about 4 to 6 weeks for the CFS).", "Airlines hold recruitment \"open days\": check their careers pages and prepare a clean CV and a professional photo.", "You need to speak at least one foreign language, often fluent English, and be at ease in customer service.", "Foreign airlines also recruit in France at pre-selection days."],
    net: "Recruitment days and offers are public: your file and interview count.",
    sav: ["Safety and rescue procedures (evacuation, fire, first aid)", "Fluent English and customer service", "Managing stress and difficult passengers", "Knowing the aircraft and procedures", "Teamwork and irregular hours"],
    out: ["CFS and CCA (compulsory certificates)", "Aviation medical certificate", "English test (TOEIC)", "Swimming certificate"],
    evo: "Cabin chief, instructor, safety trainer, move to ground roles (ramp agent, customer-service manager)."
  },
  "directeur-hotel": {
    emp: [["Large hotel groups", null], ["Luxury hotels", null], ["Independent hotels and French chains", null], ["Hospitality outside hotels", "Tourism residences, cruise lines, hotel management (Lagardère Travel Retail)"]],
    acces: ["BTS in hotel and restaurant management, bachelor's or master's at a hotel school (Institut Paul Bocuse, Glion, EHL in Lausanne, Vatel, Ferrandi, IMI).", "Hotel internships (6 to 12 months in total) are indispensable: large groups recruit on your internship record.", "You start in reception, catering or housekeeping; you then become head of department then assistant director.", "International experience is an asset: groups offer mobility and posts abroad."],
    net: "In luxury hospitality especially, the alumni network of your school (EHL, Glion) and recommendations from directors count enormously.",
    sav: ["Hotel management (occupancy rate, RevPAR, yield management)", "Customer service and quality standards", "Managing large teams and scheduling", "Basic hotel accounting", "Fluent English, a second language as a bonus"],
    out: ["Hotel software (Opera, Protel)", "Revenue-management tools", "Fluent English (TOEIC)", "Geographic mobility"],
    evo: "Assistant director, hotel director, regional director, group director."
  },
  "controleur-aerien": {
    emp: [["Directorate General of Civil Aviation (DGAC)", "Air Navigation Services directorate (DSNA): en-route centres (Reims, Aix, Brest, Bordeaux, Paris) and airports"], ["Military aviation", "Air and Space Force, naval aviation"], ["Private providers", "Aerodrome control services outsourced to companies (Egis Avia, Sky Futur)"], ["Other", "Regional airports, international organisations (Eurocontrol)"]],
    acces: ["Air-traffic-control engineer exam (ICNA): open at science Bac+2 level (prep classes, BTS, bachelor's), then 3 years of training at the ENAC in Toulouse.", "Tests are maths, physics, English, psychometric tests and an interview: past papers online.", "The exam is very selective (under 5% accepted) and held once a year, often December to February: prepare in advance.", "Before operational control, you pass centre and aerodrome ratings: training continues on the job."],
    net: "National exam: your rank decides, networking has no effect.",
    sav: ["Maths and physics (prep-class level)", "Aviation English", "Air-traffic regulations", "Stress management and sustained attention", "Spatial (3D) representation"],
    out: ["ICNA exam (DGAC)", "Class 3 aviation medical certificate", "Psychometric tests (past papers)", "ICAO level 4 English"],
    evo: "Qualified controller, room supervisor, instructor, DSNA manager."
  },
  "ingenieur-aero": {
    emp: [["Aerospace manufacturers", null], ["Equipment makers", null], ["Agencies and research", null], ["Space and defence start-ups", null]],
    acces: ["Specialised engineering school (ISAE-SUPAERO, ENAC, ISAE-ENSMA, ENSMA, Arts et Métiers) or generalist school (INSA, Centrale, Mines) with an aerospace specialisation.", "Internships (2nd-year and final-year) at Airbus, Safran or Thales are the first recruitment step: these companies select their future employees.", "Large groups hold forums (Airbus Careers, Safran Forum) and follow their apprentices closely.", "Some space careers go through a PhD, especially at CNES or in research."],
    net: "Internships and school forums open the door; internal recommendations also weigh in large groups.",
    sav: ["Fluid mechanics and aerodynamics", "Strength of materials and structures", "Propulsion, thermodynamics", "Embedded systems and control", "Project management and technical English"],
    out: ["CATIA, ANSYS, Matlab/Simulink", "Python", "Aviation standards (EASA)", "Fluent English"],
    evo: "Project manager, technical expert, programme manager, head of design office."
  },
  magistrat: {
    emp: [["Judicial courts", "Judicial tribunals, courts of appeal, Court of Cassation, prosecutors' offices"], ["Central administration", "Ministry of Justice, inspectorates"], ["Institutions", "Council of State (administrative judges, separate recruitment), Constitutional Council"], ["Other", "International organisations, Court of Justice of the European Union"]],
    acces: ["Three routes into the École nationale de la magistrature (ENM, in Bordeaux): student exam (Bac+4 in law minimum, often a master 1), professionals' exam, or complementary exam.", "Prepare at an Institut d'études judiciaires (IEJ) or in the integrated \"Equal opportunities\" prep class (CPI) of the ENM, which supports grant holders.", "The exam is very demanding: civil law, criminal law, general knowledge, procedure, then orals (role plays, interview); several attempts are often needed.", "After the exam, 31 months of paid training at the ENM, including 12 months of internship in a court."],
    net: "National exam: your rank decides; networking matters little.",
    sav: ["Civil law, criminal law and procedure", "Public and European law", "General knowledge and current affairs", "Writing judgments and orders", "Ethics and professional conduct of the judge"],
    out: ["ENM exam", "Institut d'études judiciaires (IEJ)", "Oral preparation (role plays)", "Légifrance, case-law databases"],
    evo: "Judge, prosecutor, investigating judge, children's judge, court president, judge at the Court of Cassation."
  },
  notaire: {
    emp: [["Notary offices", "Individual practices or partnerships of several notaries (Notaires de France), offices in Paris, Lyon, Bordeaux…"], ["Large Paris offices", "Large offices in property law, company law, wealth law"], ["Bodies close to the notariat", "Chambers of notaries, Conseil supérieur du notariat, training bodies"], ["Companies and banks", "Legal and wealth-management departments"]],
    acces: ["Master's in notarial law (or private law + higher notarial diploma, DSN), then a 2-year internship in an office to become an assistant notary then a notary.", "Offices recruit their staff from their interns: secure internships in an office from your bachelor's.", "To set up, you must be appointed by the ministry: either by taking over an existing office (financed by a loan, after approval), or by creating a new office in open zones (lottery since 2016).", "The job combines property law, family law and taxation: a double skill in wealth management is sought after."],
    net: "The notariat is closely tied to families and local relationships: internships, supervisors and tutors open the offices; to take over or become a partner, networking is decisive.",
    sav: ["Property law, family and inheritance law", "Property and company law", "Wealth taxation", "Drafting deeds and ethics", "Client relations and advice"],
    out: ["Master's in notarial law / DSN", "Office software (Genapi, Fiducial, iNot)", "Professional training internship (2 years)", "Financing the takeover of an office"],
    evo: "Employed notary, partner notary, titular notary, president of a chamber of notaries."
  },
  urbaniste: {
    emp: [["Local authorities and planning agencies", null], ["Consultancies", null], ["Developers and promoters", null], ["State and public bodies", null]],
    acces: ["Master's in urban planning (Institut d'urbanisme de Paris, Lyon, Grenoble, Sciences Po, École d'urbanisme de Paris, ENPC) or architecture / engineering school with a specialisation.", "Internships (6 months) in a local authority, agency or developer are decisive: most first-job offers follow a successful internship.", "The local-authority civil service exam (attaché or engineer) opens posts in local authorities.", "A dual profile (GIS, planning law, public consultation) is much sought after."],
    net: "The scene is small: planning master's have active alumni networks, and internships often lead to a job.",
    sav: ["Planning law (PLU, SCoT, building permits)", "Mapping and GIS", "Urban sociology and public consultation", "Ecological transition, mobility", "Managing a development project"],
    out: ["QGIS or ArcGIS", "AutoCAD / SketchUp", "Local-authority civil service exam", "Adobe suite for presentations"],
    evo: "Urban project manager, planning director, agency director, developer."
  }
});
