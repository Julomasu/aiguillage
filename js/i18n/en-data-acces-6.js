/* English overlay for career access sheets (6/6 : arts, social, nature, construction, tourism). Same keys as js/data/metiers-acces-6.js. */
A.EN_DATA = A.EN_DATA || {};
A.EN_DATA.acces = A.EN_DATA.acces || {};
Object.assign(A.EN_DATA.acces, {
  photographe: {
    emp: [["Press and agencies", null], ["Fashion, luxury and advertising", "Fashion studios, advertising agencies, luxury brands"], ["Events and portraits", "Weddings, companies, institutions, portrait studios"], ["Independent", "Most photographers work for themselves, sometimes under the author status"]],
    acces: ["BTS in photography, DN MADE, art school or specialised school (ENS Louis-Lumière, École nationale supérieure de la photographie in Arles, Gobelins, ETPA): the portfolio decides admission.", "Internships or assisting an established photographer are the best apprenticeship and your first network.", "Start a coherent personal project (series, reportage): it builds your identity and portfolio.", "To make a living from photography, you need to develop several activities (commissions, prints, workshops, image banks)."],
    net: "Commissions come largely through recommendation, agencies and meetings at festivals (Visa pour l'image, Les Rencontres d'Arles).",
    sav: ["Shooting, lighting, composition", "Retouching and post-production", "Photographic culture", "Copyright and image rights", "Business management (quotes, invoicing)"],
    out: ["Camera, lenses, lighting", "Lightroom, Photoshop, Capture One", "Online portfolio and social media"],
    evo: "Established photographer, art director, retoucher, teacher, photo editor."
  },
  "architecte-interieur": {
    emp: [["Interior architecture firms", "Independent firms, design studios, hospitality and retail design firms"], ["Brands and retailers", null], ["Developers and hospitality", null], ["Independent", "Decoration and design commissions for individuals and businesses"]],
    acces: ["DN MADE space design, DSAA space design, interior architecture school (Camondo, Boulle, Penninghen, Condé, ESAD) then a portfolio.", "Internships in a firm or with a decorator are compulsory and decisive for a first job.", "Master freehand drawing and a 3D tool (SketchUp, Revit, AutoCAD): you are asked about them from the interview.", "Take part in fairs and competitions (Maison&Objet, Les Arcs, interior architecture awards) to get known."],
    net: "Commissions come largely from client, architect and craftsperson referrals: good word of mouth is vital.",
    sav: ["Technical drawing, plans and sections", "Materials, colours, light", "Ergonomics and standards (accessibility, fire)", "History of design and furniture", "Site and budget management"],
    out: ["AutoCAD, SketchUp, Revit", "Photoshop, InDesign", "Models and mood boards"],
    evo: "Senior interior architect, art director, scenographer, setting up your own practice."
  },
  realisateur: {
    emp: [["Production companies", null], ["Television", null], ["Advertising and music videos", "Advertising agencies, commercial-film production companies"], ["Platforms and independents", "Netflix, Prime Video, YouTube, independent production"]],
    acces: ["BTS in audiovisual, film bachelor's, film school (La Fémis, ENS Louis-Lumière, INSAS, ESEC, Kourtrajmé, EICAR) or self-taught with a short film.", "A short film or a portfolio of films is your business card: show it at festivals and online.", "You almost always start as an assistant, intern or editor before directing.", "Intermittent entertainment-worker status is obtained after a certain number of hours on productions."],
    net: "The scene works by encounters and referrals: producers, festivals and school alumni are decisive.",
    sav: ["Writing and storytelling", "Directing actors", "Image, sound and editing", "Production and budget", "Film culture"],
    out: ["DaVinci Resolve, Premiere Pro, Final Cut", "Cameras, lenses, lighting", "Festivals and markets (Cannes, Clermont-Ferrand)"],
    evo: "Director, screenwriter, producer, chief editor, director of photography."
  },
  comedien: {
    emp: [["Public and private theatres", "Comédie-Française, national theatres, private theatres, companies"], ["Audiovisual", "Series, films, TV films, adverts"], ["Dubbing and voice", "Dubbing studios, audiobooks, video games, advertising"], ["Teaching and outreach", "Workshops, schools, conservatoires, school visits"]],
    acces: ["Conservatoires (CNSAD, CRR), drama schools (TNS, ENSATT, Cours Florent, Cours Simon): entry is by audition.", "Prepare 2 or 3 repertoire scenes and a monologue: juries look for temperament more than perfect technique.", "First roles are won in companies, short films or as an extra: they build your CV.", "Take an agent when you have roles to show: they open the audiovisual castings."],
    net: "Castings, agents, directors and companies: everything goes through encounters and referrals.",
    sav: ["Acting and working a text", "Voice and body", "Theatre and film culture", "Improvisation", "Employment law for entertainment workers"],
    out: ["Showreel", "Casting platforms (Cineartistes, CastingGuide)", "Intermittent status (hours accumulated)"],
    evo: "Lead roles, director, teacher, company director, dubbing and voice-over."
  },
  illustrateur: {
    emp: [["Publishing", "Children's, comics and graphic-novel publishers (Gallimard, Casterman, Delcourt, Dargaud, Glénat)"], ["Press and agencies", "Newspapers, magazines, communication agencies"], ["Video games and animation", "Ubisoft, Don't Nod, animation studios"], ["Independent", "Commissions from brands, posters, merchandise, selling your own creations"]],
    acces: ["DN MADE illustration, applied-arts or comics schools (Émile Cohl, Estienne, Gobelins, Pivaut, ENSAD, ESAD Strasbourg) then a portfolio.", "A coherent portfolio (10 to 15 images) and a recognisable style count more than the diploma.", "Take part in fairs and festivals (Angoulême, Montreuil, Annecy) to show your work to publishers.", "Post regularly on Instagram and Behance: it is now a major recruitment channel."],
    net: "Commissions come largely from referrals, fairs and illustrator networks (agencies, collectives).",
    sav: ["Drawing, anatomy, perspective", "Colour and composition", "Visual storytelling", "Contracts and copyright", "Digital drawing software"],
    out: ["Procreate, Photoshop, Clip Studio Paint", "Graphics tablet", "Online portfolio (Behance, Instagram, website)"],
    evo: "Established illustrator, comics author, art director, character designer, teacher."
  },
  animateur: {
    emp: [["Communes and inter-municipal bodies", "Leisure centres, after-school care, neighbourhood centres, youth centres (MJC)"], ["Associations", null], ["Holiday centres and camps", "Holiday stays, leisure centres, camps"], ["Specialised facilities", "Care homes, social centres, residences, structures for disabled people"]],
    acces: ["BAFA (from age 17) to start, then BPJEPS in general-audience leisure (1 year) or BUT social careers, community-work track.", "Work-study is common for the BPJEPS: you are paid and in a post from year 1.", "Leisure centres recruit a lot at every holiday: a great way to test the job.", "To run a facility, a DEJEPS (Bac+3) or DESJEPS (Bac+5) is required."],
    net: "The sector recruits a lot: the BAFA or BPJEPS and some experience are enough.",
    sav: ["Teaching and group facilitation", "Educational project and organising activities", "Safety and regulation of care for minors", "First aid (PSC1)", "Working with a team and with families"],
    out: ["BAFA, BAFD", "BPJEPS, DEJEPS", "PSC1", "Driving licence B"],
    evo: "Leisure-centre director, youth coordinator, facility manager, project officer."
  },
  "educateur-jeunes-enfants": {
    emp: [["Nurseries and multi-care centres", "Municipal, non-profit or private nurseries (People & Baby, Babilou, La Maison Bleue)"], ["PMI and child protection", "Departmental maternal and child protection services, child welfare"], ["Hospitals and care structures", "Paediatric departments, resource centres, CAMSP"], ["Education and associations", "Nursery schools, toy libraries, parent-child drop-in centres"]],
    acces: ["State diploma of early-years educator (3 years): admission after the bac by file, tests and interview (Parcoursup or direct application).", "Experience with children (BAFA, babysitting, nursery placements) counts a lot at the interview.", "Placements (about 60 weeks over 3 years) are your first way into a job.", "Posts are plentiful: nurseries, PMI and associations recruit regularly."],
    net: "The sector is short of professionals: your diploma and placements are enough.",
    sav: ["Child development from 0 to 7", "Teaching and early-learning activities", "Welcoming families and parenting support", "Observation and educational project", "Hygiene and safety rules"],
    out: ["EJE state diploma", "Early-learning teaching materials", "PSC1"],
    evo: "Nursery director, early-years coordinator, trainer, child-protection manager."
  },
  "psy-en": {
    emp: [["National Education", "Middle and high schools, information and guidance centres (CIO)"], ["Agricultural education", "Agricultural high schools, Agriculture ministry institutions"], ["Other", "Private schools under contract, integration services"]],
    acces: ["Psychology bachelor's, then psychology master's, then the National Education psychologist exam (education, development and school and career guidance specialty).", "Training lasts 2 years at the INSPE after the exam.", "Tests cover psychology, education policy and an oral: prepare them from M1.", "Internships in a CIO or a school get you to know the job before the exam."],
    net: "National exam: your rank decides, networking matters little.",
    sav: ["Child and adolescent psychology", "Social and organisational psychology", "Knowledge of the school system and programmes", "Career-guidance interviewing techniques", "Statistics and assessment methods"],
    out: ["Psychology master's", "National Education psychologist exam", "Information tools (Onisep, Parcoursup)"],
    evo: "CIO director, inspector, specialist psychologist, trainer."
  },
  "ingenieur-agronome": {
    emp: [["Cooperatives and food industry", null], ["Seeds and agricultural inputs", null], ["Advice and institutions", "Chambers of agriculture, INRAE, Agriculture ministry, NGOs"], ["Environment and territories", "Design offices, local authorities, ONF, nature parks"]],
    acces: ["Agronomy engineering school (AgroParisTech, Institut Agro, Bordeaux Sciences Agro, VetAgro Sup, ENSAT, ESA…) after a BCPST prep class, or after a BTSA, a BUT in biological engineering or a science bachelor's.", "2nd and 3rd-year internships in companies, on farms and abroad are decisive for finding a job.", "Many schools offer apprenticeships to fund your studies.", "Choose a specialty (animal production, crops, food, environment) consistent with your target sector."],
    net: "School alumni and company forums help a lot, especially in cooperatives and food.",
    sav: ["Agronomy, soil science, plant physiology", "Genetics and crop protection", "Agricultural economics and supply chains", "Statistics and modelling", "Scientific English"],
    out: ["Statistics software (R, Python)", "GIS (QGIS)", "Driving licence B"],
    evo: "Technical manager, senior agricultural adviser, product manager, researcher, cooperative director."
  },
  "technicien-forestier": {
    emp: [["National Forests Office (ONF)", "Local forest officers and forestry technicians in public forests"], ["Cooperatives and forestry experts", "Forestry cooperatives, experts, private forest managers"], ["Logging companies and sawmills", "Forestry-works companies, sawmills"], ["Local authorities and parks", "Forest communes, regional nature parks"]],
    acces: ["Vocational bac in forestry, BTSA in forest management, professional bachelor's: training is also available in work-study.", "The ONF forestry-technician exam is the route to a public post; prepare for the written and physical tests.", "Field experience (internships, reforestation sites) counts a lot.", "In the private sector, posts are found by direct application to loggers and cooperatives."],
    net: "The scene is small: internships, sites and local knowledge count.",
    sav: ["Dendrology (tree identification)", "Silviculture and sustainable management", "Mapping and GPS", "Forestry and environmental regulation", "Safety in the forest (chainsaw, felling)"],
    out: ["QGIS, forestry GPS", "Measuring equipment (calipers, dendrometer)", "Chainsaw certificate"],
    evo: "Head of territorial unit, forestry expert, forestry engineer through bridge course, site foreman."
  },
  oenologue: {
    emp: [["Wine estates and cellars", "Châteaux and estates (Bordeaux, Burgundy, Champagne, Languedoc, Rhône Valley)"], ["Trading and champagne houses", null], ["Laboratories and consulting", "Oenological analysis laboratories, consulting firms, cooperatives"], ["Suppliers and distribution", "Yeast and equipment suppliers (Lallemand, Laffort), wine merchants"]],
    acces: ["DNO (national oenologist diploma, 5 years after the bac) at the universities of Bordeaux, Montpellier, Reims, Dijon or Toulouse, or BTSA in viticulture-oenology then professional bachelor's.", "Harvests, internships and seasons at French and foreign estates are your best apprenticeship.", "Experience abroad (Australia, Chile, California, South Africa) is highly valued.", "To become a cellar master, people often rise through experience within the same estate."],
    net: "The wine world is small and very relational: recommendations from winegrowers and alumni weigh a lot.",
    sav: ["Viticulture and vine physiology", "Fermentation microbiology", "Sensory analysis (tasting)", "Wine chemistry", "Wine regulation and appellations"],
    out: ["Oenological laboratory equipment", "Cellar management software", "English for international markets"],
    evo: "Estate technical director, consulting oenologist, production director, creating your own vintage."
  },
  macon: {
    emp: [["General building contractors", null], ["SMEs and craftspeople", "Local masonry firms (the majority of jobs)"], ["Developers and house builders", "Single-house builders, developers"], ["Renovation and heritage", "Historic-monument restoration firms"]],
    acces: ["CAP in masonry, vocational bac in building technician (structural work), then professional certificate: apprenticeship is the dominant route.", "Firms recruit apprentices massively: a good file and motivation are enough.", "After a few years, you become a journeyman, team leader, then site manager or craftsperson.", "The Compagnons du Devoir offer a highly recognised training tour of France."],
    net: "The sector is short of hands: an employer gladly takes a motivated apprentice.",
    sav: ["Reading plans and quantity take-offs", "Pouring concrete, brick and breeze-block masonry", "Reinforcement, formwork", "Site safety", "Calculating material quantities"],
    out: ["Mason's tools (trowel, level, concrete mixer)", "Safety certifications (working at height, CACES)", "Driving licence B"],
    evo: "Team leader, site manager, self-employed craftsperson, trainer."
  },
  geometre: {
    emp: [["Chartered-surveyor firms", "Independent firms (numerous nationwide), groups (Geofit, Cabinet Gaudin, Axis Conseils)"], ["Design offices and engineering", null], ["Local authorities and institutions", "IGN, land-registry services, metropolitan areas, regions"], ["Construction and energy", null]],
    acces: ["BTS in surveying (2 years), professional bachelor's, or specialised engineering school (ESGT in Le Mans, INSA Strasbourg).", "Work-study is highly valued: firms are short of technicians and train their apprentices.", "To become a chartered surveyor (regulated profession), you need an engineering degree or master's, 2 years of internship, then the state exam.", "Firms recruit through direct applications and via schools."],
    net: "The profession is short of practitioners: your diploma and a good internship are enough.",
    sav: ["Surveying and geodesy", "Mapping, land registry and property law", "Measuring instruments (GNSS, total station, laser scanner, drone)", "Computer-aided drawing", "Property and co-ownership law"],
    out: ["AutoCAD, Covadis, QGIS", "GNSS, total station, drone", "Point-cloud software"],
    evo: "Chartered surveyor (liberal profession), branch manager, project manager, land expert."
  },
  couvreur: {
    emp: [["Roofing and carpentry firms", "SME and craftsperson roofers (most jobs)"], ["General building contractors", "Vinci, Bouygues, Eiffage (roofing subsidiaries)"], ["Energy and renovation", "Solar-panel installers, energy-renovation firms"], ["Heritage", "Historic-monument firms, Compagnons du Devoir"]],
    acces: ["CAP in roofing or vocational bac in building technician (roofing option), preferably as an apprenticeship.", "Roofing employers are looking for apprentices: an internship or a contract gets you to a job quickly.", "Obtain the working-at-height and scaffolding certifications: they are required on site.", "After a few years, you become a team leader, site manager or craftsperson."],
    net: "The sector is short of hands: motivation and a good trial are enough.",
    sav: ["Roofing materials (tile, slate, zinc, steel sheet)", "Waterproofing and roof insulation", "Reading plans and quantity take-offs", "Safety when working at height", "Solar-panel installation basics"],
    out: ["Roofer's tools", "Working-at-height and scaffolding certifications", "Driving licence B"],
    evo: "Team leader, site manager, self-employed roofer, trainer."
  },
  sommelier: {
    emp: [["Gourmet and starred restaurants", "Michelin-starred restaurants, great chefs' tables"], ["Hotels and luxury hotels", null], ["Wine shops", "Independent wine merchants, Nicolas, Cavavin"], ["Trading and production", "Wine merchants, estates, importers"]],
    acces: ["CAP in cooking or restaurant service, then a sommelier certificate (1 year), BTS MHR sommelier option or professional certificate.", "Internships in great houses are the best showcase: apply a year ahead.", "Enter competitions (Best Sommelier of France, Best Craftsman of France): they launch careers.", "Visit vineyards and taste a lot: taste memory is built through practice."],
    net: "Recommendations from chefs, sommeliers and estates weigh a lot for access to the top houses.",
    sav: ["Viticulture, winemaking and appellations", "Tasting and wine vocabulary", "Food and wine pairing", "Managing a wine list and a cellar", "Service and customer relations"],
    out: ["Tastevin, decanter, professional corkscrew", "WSET (international qualification)", "English"],
    evo: "Head sommelier, wine director, wine merchant, consultant, opening your own wine bar or shop."
  },
  "guide-touristique": {
    emp: [["Museums and monuments", null], ["Tourist offices", "Municipal or inter-municipal tourist offices"], ["Receptive agencies and tour operators", "Travel agencies, cruise lines, tour operators"], ["Independent", "Self-employed guide, private tours, free tours"]],
    acces: ["Professional bachelor's as guide-lecturer (after Bac+2 or Bac+3 in history, art, geography, languages) or a suitable bachelor's/master's.", "The professional guide-lecturer card is compulsory to guide in a museum or monument.", "Improve at least one foreign language, ideally two: they widen career options a lot.", "Build your own tours: an original route attracts tourist offices and tour operators."],
    net: "Tourist offices and agencies recruit by application; recommendations count for private tours.",
    sav: ["Art history, local history", "Public speaking and tour techniques", "Modern languages", "Tourism regulation", "Managing a group"],
    out: ["Professional guide-lecturer card", "Languages (level C1)", "Online booking tools"],
    evo: "Specialist guide (art, history, nature), head of visitor services, agency founder, trainer."
  },
  "receptionniste-hotel": {
    emp: [["Large hotel groups", null], ["Palaces and luxury hotels", null], ["Independent hotels and chains", null], ["Residences and accommodation", "Tourism residences, upscale campsites, hostels"]],
    acces: ["Vocational bac in commercialisation and catering services or reception, BTS MHR (hotel and restaurant management) or BTS in tourism.", "Work-study is highly valued: you are paid, in a post from year 1 and often hired afterwards.", "Master English and a second language: it is a requirement in international hotels.", "People often start at the front desk or in customer service, then move up to front-desk manager and management."],
    net: "Hotels recruit a lot all year: a good CV and languages are enough.",
    sav: ["Welcoming and handling complaints", "Hotel software and reservations", "English and a second language", "Hotel accounting basics", "Knowledge of the city and local services"],
    out: ["Hotel software (Opera, Protel, Mews)", "English (TOEIC)", "Booking tools (Booking, Expedia)"],
    evo: "Front-desk manager, assistant director, hotel director, customer-relations manager."
  }
});
