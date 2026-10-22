/* English overlay for career access sheets (2/4 : finance, commerce, consulting, product). Same keys as js/data/metiers-acces-2.js. */
A.EN_DATA = A.EN_DATA || {};
A.EN_DATA.acces = A.EN_DATA.acces || {};
Object.assign(A.EN_DATA.acces, {
  "analyste-ma": {
    emp: [
      ["Large international investment banks (\"bulge bracket\")", null, "Teams in Paris and London, very large deals, high volumes."],
      ["French and European banks", null],
      ["Independent advisory boutiques (the \"high end\" of M&A)", null, "Less volume but sophisticated deals; teams are small and responsibility comes fast."],
      ["Mid-market boutiques and banks", null],
      ["Audit and consulting firms (transaction teams)", null, "A more accessible way in, from which you can switch to banking."],
      ["Investment funds and strategy departments", "Ardian, Eurazeo, PAI Partners; corporate development departments of large groups (LVMH, TotalEnergies, Safran…)", "Often a second job after 2 or 3 years in banking."]
    ],
    acces: [
      "Aim for a 6-month internship during your master 1 or gap year: it is almost a mandatory way in. Applications open a year ahead.",
      "Recruiters target the top business schools (HEC, ESSEC, ESCP, EDHEC, emlyon), Dauphine, Sciences Po, and engineering schools with a finance master's. The school's name gets you interviews, but not the job.",
      "Join your school's finance societies (finance clubs, investment competitions): that is where interviews are prepared and alumni are met.",
      "First do a more accessible internship (audit, financial advisory, retail banking, funds) to build your CV: many bankers come from there.",
      "Prepare technical interviews (accounting, valuation, LBO) and motivation interviews: each bank runs several in a row, often with maths tests.",
      "Once hired, you are an \"analyst\" for 2 to 3 years, then an \"associate\". Many analysts leave the bank for a fund or a company after 2 or 3 years."
    ],
    net: "It is one of the jobs where networking counts most: alumni, coffee chats, LinkedIn contacts and recommendations weigh as much as the CV. Write early to alumni of your school, ask precise questions, say thank you, then stay in touch. It takes 12 to 18 months of work before applications.",
    sav: ["Accounting: income statement, balance sheet, cash-flow statement", "Company valuation: discounted cash flows (DCF), comparable and transaction multiples", "LBO (leveraged buyout) basics", "Excel and financial modelling, clear PowerPoint presentation", "Fluent English, written and spoken", "Following deal news (Les Échos, Financial Times, Mergermarket)"],
    out: ["Excel (keyboard shortcuts, models) and PowerPoint", null, null, "Reading: \"Investment Banking\" (Rosenbaum & Pearl), \"Finance d'entreprise\" (Vernimmen)", "Online modelling courses (Wall Street Prep, Breaking Into Wall Street)"],
    evo: "Analyst (2-3 years), associate, vice-president, director, managing director. Frequent exits to private equity, a debt fund, corporate finance or the strategy team of a large group."
  },
  "private-equity": {
    emp: [["Large French funds", null], ["Mid-sized funds", null], ["International funds (Paris offices)", null], ["Venture capital and growth", null], ["Public and family investors", "Bpifrance, family offices, funds of funds"]],
    acces: [
      "The typical profile is a former 2-to-3-year analyst in investment banking (M&A) or transaction services: direct entry after school exists but remains rare.",
      "Funds sometimes recruit through specialist headhunters from the year after you start in banking: be visible on LinkedIn and keep up those contacts.",
      "An internship in a fund (gap year or M2) is possible, especially in small funds and venture capital, but very competitive.",
      "Interviews include an LBO or valuation case study, often done at home in a few hours, and an investment judgement test.",
      "In venture, what counts most is a portfolio of projects (start-ups, entrepreneur societies) and real knowledge of a sector."
    ],
    net: "Networking is decisive: jobs are found through alumni of your school, bankers and headhunters. Keep good relations with the teams you work with in banking.",
    sav: ["Complete LBO modelling", "Strategic analysis of a sector and a company", "Reading basic legal documents (shareholders' agreement, SPA)", "Financial and commercial due diligence", "Negotiation, relationships with executives"],
    out: ["Advanced Excel, PowerPoint", "Capital IQ, Pitchbook", "Holding-company tax basics"],
    evo: "Analyst, associate, principal, investment director, partner. Exits to the general management of a portfolio company or to launching your own fund."
  },
  trader: {
    emp: [["Large market banks", null], ["Asset managers and hedge funds", null], ["Commodity trading", null], ["Proprietary trading firms", "Optiver, Citadel Securities, Jane Street, Flow Traders, Susquehanna (offices in London, Amsterdam, Paris)"]],
    acces: [
      "Master's in market finance, engineering school (financial maths track) or business school with a markets major.",
      "Summer internship then a final-year internship on a trading floor; the bank keeps the best for hiring.",
      "For \"quant\" or algorithmic trading roles: maths, probability and code (Python, C++) are decisive, and maths logic tests are added to the interviews.",
      "Interviews look like mental arithmetic, probability and decision-under-uncertainty tests, plus a motivation interview.",
      "Careers in commodity trading go largely through specialised schools (Geneva, London) and internships."
    ],
    net: "Trading floors recruit a lot through referrals and alumni; summer internships are the best way to be seen.",
    sav: ["Probability, statistics, basic stochastic calculus", "Financial products (equities, rates, currencies, derivatives)", "How markets and liquidity work", "Risk and position management", "Following global economic news"],
    out: ["Python, C++ or R", "Excel, Bloomberg", "Execution platforms"],
    evo: "Junior trader, senior trader, desk head, portfolio manager, quant. Jobs are declining on traditional floors because of automation."
  },
  actuaire: {
    emp: [["Insurers", null], ["Reinsurers", null], ["Actuarial consulting firms", null], ["Mutual insurers and pension institutions", null]],
    acces: [
      "Actuarial master's (ISFA Lyon, ENSAE, Dauphine, Paris-Saclay, ISUP, EURIA) or engineering school with an actuarial option, recognised by the Institut des actuaires.",
      "Work-study is very common: a 1 or 2-year contract in an insurance company gets you into the job.",
      "Prepare from the bachelor's with maths-economics or applied maths: your level in probability counts.",
      "Take the Institut des actuaires exams (certification): employers recognise them.",
      "Interviews include probability exercises and a case on an insurance portfolio."
    ],
    net: "The profession is small: actuarial cohorts and internships feed the network; your master's alumni easily recommend you.",
    sav: ["Probability, statistics, survival models", "Financial mathematics", "How an insurance contract works", "Insurance regulation (Solvency II)", "Programming (R, Python, SAS) and SQL"],
    out: ["R, Python, SAS", "SQL", "Advanced Excel", "Actuarial modelling tools (Prophet, Igloo)"],
    evo: "Senior actuary, head of pricing, technical director, chief risk officer."
  },
  auditeur: {
    emp: [["The \"Big Four\"", null, "Hire thousands of graduates a year; structured training."], ["Mid-sized firms", null], ["Regional accounting firms", "Independent firms, networks (In Extenso, Fiducial)"], ["In-house audit", "Banks, CAC 40 groups"]],
    acces: [
      "Master's in accounting-control-audit (CCA), DSCG, business school with an audit major, or engineering school then master's.",
      "6-month internship (often January-June: the \"busy season\"): the Big Four then convert the internship into a permanent job.",
      "Apply at school-company forums and case-study competitions: the Big Four recruit in volume, so networking matters less than in M&A.",
      "Chartered accountancy goes through the DEC (chartered accountant diploma): many prepare the DSCG alongside.",
      "After 2 to 4 years, many auditors move into corporate finance, management control or investment banking."
    ],
    net: "Recruitment is massive and standardised: your file, tests and interview count more than networking.",
    sav: ["Accounting standards (French GAAP, IFRS)", "Audit methodology (internal control, sampling)", "In-depth general accounting", "Basic corporate tax", "Excel and data analysis", "English"],
    out: ["Advanced Excel", "Data analysis tools (Power BI, Alteryx)", "ERP (SAP, Oracle)", "DCG and DSCG (accounting diplomas)"],
    evo: "Senior, manager, director, partner; frequent move to corporate finance or management control."
  },
  "controleur-gestion": {
    emp: [["Large groups", null], ["Banks and insurers", null], ["SMEs and mid-sized companies", "Companies of all sizes, often within administration and finance"], ["Consulting firms", "The Big Four and firms specialised in performance management"]],
    acces: ["BUT GEA, management bachelor's then CCA or finance master's, business school, engineering school with a management master's.", "Work-study in management control is very common and often leads to a permanent job.", "A first experience in audit or accounting eases access to large groups.", "Show your Excel mastery (pivot tables, macros, models) in the interview."],
    net: "Recruitment is steady: work-study and internships are enough.",
    sav: ["General and cost accounting", "Budgeting, reporting, performance indicators", "Variance analysis", "Advanced Excel and basic SQL", "Corporate finance basics"],
    out: ["Excel, Power BI, Tableau", "ERP (SAP, Oracle) and consolidation tools", "English for international groups"],
    evo: "Head of management control, chief financial officer (CFO), administration and finance director."
  },
  "gestion-patrimoine": {
    emp: [["Private banks", null], ["Retail banks and insurers", null], ["Independent firms (wealth advisers)", "Wealth-management advisory firms, brokerage platforms"], ["Family offices and asset managers", null]],
    acces: ["Bachelor's or master's in wealth management (universities, business schools); some take a university diploma after a BUT or bachelor's.", "The profession is regulated: you need an AMF certification and registration with ORIAS (brokerage and investment advice).", "Many start as a bank client adviser, then move to wealth management.", "Prospecting and client relationships are essential: clients are built on trust and recommendation."],
    net: "Much of the clientele comes by word of mouth; your personal and professional network weighs as soon as you set up or move upmarket.",
    sav: ["Personal taxation (income tax, inheritance, property)", "Civil law (family, marital property regimes, inheritance)", "Savings products (life insurance, PER, equities, property)", "Ethics and AMF regulation", "Communication and selling advice"],
    out: ["AMF certification", "ORIAS registration", "Wealth-simulation software", "Excel"],
    evo: "Senior adviser, private banker, branch director, setting up as an independent."
  },
  "risk-manager": {
    emp: [["Banks", null], ["Insurance and reinsurance", null], ["Regulators and institutions", "Banque de France, ACPR, Autorité des marchés financiers"], ["Consulting firms and large groups", "Wavestone, Accenture, KPMG; risk departments in industry and energy"]],
    acces: ["Master's in finance, actuarial science or risk management; engineering school with a finance option.", "Often start with an internship or work-study in a risk department or internal audit.", "Prepare the FRM or PRM certifications: banks recognise them.", "Regulators (Banque de France, ACPR) recruit through exams and direct applications."],
    net: "Internship and work-study contacts are valuable; the job is less \"networking\" than investment banking.",
    sav: ["Market, credit, liquidity and operational risk", "Statistics and risk models (VaR)", "Banking regulation (Basel III, Solvency II)", "Programming (Python, SQL)", "Ability to summarise for senior management"],
    out: ["Python, R, SQL", "Advanced Excel", "FRM, PRM certifications"],
    evo: "Head of risk for a business line, chief risk officer (CRO), regulator."
  },
  "analyste-esg": {
    emp: [["Asset managers", null], ["Non-financial rating agencies", null], ["Banks and insurers", null], ["Firms and companies", "Sustainability consulting firms, CSR departments of large groups"]],
    acces: ["Master's in sustainable finance, environmental economics or a business/engineering school with a green-finance option.", "Internship or work-study in an asset manager or a bank: many ESG teams recruit juniors.", "Take recognised certifications (CFA ESG, Finance for Climate, SFDR basics).", "Keep up with European regulation (CSRD, taxonomy, SFDR): it shapes the job."],
    net: "The sector is young and growing: events, societies and alumni help you get known.",
    sav: ["Financial analysis basics", "Climate and social issues, climate-science basics", "European regulation (CSRD, taxonomy, SFDR)", "Reading sustainability reports", "Statistics and data analysis"],
    out: ["Excel, Python", "ESG databases (MSCI, Bloomberg, Sustainalytics)", "CFA ESG certification"],
    evo: "Senior analyst, head of responsible investment, CSR director."
  },
  comptable: {
    emp: [["Accounting firms", null], ["Companies of all sizes", "Accounting departments of SMEs, mid-sized firms and large groups"], ["Associations and local authorities", "Town halls, hospitals, charities"], ["Banks and insurers", "Accounting and control departments"]],
    acces: ["BTS in accounting and management, BUT GEA, DCG: you are hired from Bac+2 or Bac+3.", "Work-study is the classic route: firms train their future accountants.", "An internship or contract in a firm is the best way to start.", "Interviews check rigour, comfort with Excel and knowledge of accounting software."],
    net: "The profession recruits all over France: a good file and an internship are enough.",
    sav: ["General accounting (entries, balance sheet, income statement)", "VAT and everyday taxation", "Basic payroll", "Excel", "Rigour and meeting deadlines"],
    out: ["Accounting software (Sage, EBP, Cegid, QuickBooks)", "Excel", "DCG then DSCG to move up"],
    evo: "Chief accountant, accounting manager, chartered accountant (DEC), management controller."
  },
  "expert-comptable": {
    emp: [["International firms", null], ["Independent firms and networks", null], ["Setting up your own practice", "Taking over or creating a firm"], ["Companies", "Finance departments (CFO role)"]],
    acces: ["The route goes through the DCG (3 years after the bac), the DSCG (2 years) then the DEC (chartered accountant diploma) with a 3-year internship in a firm: roughly 8 years after the bac.", "You work in a firm during your studies, often in work-study: the employer funds the preparation.", "To set up, you then have to buy or build a clientele: networking and reputation weigh.", "The Big Four and mid-sized firms recruit DCG-DSCG profiles in large numbers."],
    net: "To join a firm, your file is enough; to set up on your own, the business network and word of mouth are essential.",
    sav: ["In-depth accounting (consolidation, IFRS)", "Corporate and executive taxation", "Company law and employment law", "Audit and management control", "Advising business owners"],
    out: ["Accounting software (Cegid, Sage)", "Excel", "DCG, DSCG, DEC"],
    evo: "Firm partner, statutory auditor, CFO, firm founder."
  },
  "analyste-financier": {
    emp: [["Asset managers", null], ["Banks (equity research)", null], ["Insurance companies (investments)", null], ["Funds and family offices", "Hedge funds, private equity, family offices"]],
    acces: ["Master's in finance, business or engineering school then market-finance master's; the CFA certification is highly valued.", "Internship or work-study in an asset manager or research desk: this is the standard route.", "Build a mock portfolio or an analysis note on a company: show your method and rigour.", "Interviews often ask you to defend an investment idea (a \"stock pitch\")."],
    net: "The scene is small: internships, alumni and headhunters count a lot.",
    sav: ["Financial analysis (balance sheet, income statement, cash flow)", "Valuation (DCF, multiples)", "Following markets and macroeconomics", "Excel and modelling", "Clear writing and English"],
    out: ["Excel, Bloomberg, FactSet", "CFA (levels 1 to 3)", "Python (a plus)"],
    evo: "Portfolio manager, senior analyst, head of research, chief investment officer."
  },
  "consultant-strategie": {
    emp: [["International strategy firms", null], ["Second-tier strategy firms", null], ["Large generalist firms", null], ["Boutiques and French firms", null]],
    acces: ["The most selective business and engineering schools, Sciences Po, universities with a very strong track record.", "Firms recruit by application, then by \"cases\": number-based reasoning exercises solved orally. Practise with alumni, books (Case in Point) and societies (\"consulting clubs\").", "Internships (6 months) are the classic way in: MBB and strategy firms recruit mostly from internships or the first year after school.", "Generalist consulting firms are more accessible and let you move into strategy afterwards."],
    net: "Strategy firms are very selective: consulting societies, alumni and mock interviews with former consultants make a real difference.",
    sav: ["Structured reasoning and synthesis", "Mental arithmetic and reading numbers", "Market and competitor analysis", "Excel, PowerPoint", "Clear spoken communication, English"],
    out: ["Excel", "PowerPoint", "\"Case in Point\" book and case platforms", "Strategy basics (Porter, portfolio matrices)"],
    evo: "Consultant, manager, principal, partner; exits to senior roles in business or private equity."
  },
  commercial: {
    emp: [["Industry and retail", null], ["Tech and software (SaaS)", null], ["Services and consulting", "Orange Business, Capgemini, banks, insurers"], ["SMEs and local shops", "Any sector, often the first employer of young salespeople"]],
    acces: ["BTS NDRC or MCO, BUT TC, business school, or even a short course: you can start early because the job recruits at all levels.", "Work-study is excellent: it places you in a sales team and often leads to a permanent job.", "Tech companies recruit many junior \"SDRs\" (prospecting), a classic way into sales.", "Interviews include a role play: sell a product, handle an objection."],
    net: "Networking helps land key-account roles; at the start of your career, motivation and ease in speaking are enough.",
    sav: ["Sales and negotiation techniques", "Knowing your product and market", "Prospecting (phone, LinkedIn)", "Tracking figures and a CRM", "Listening to the customer"],
    out: ["CRM (Salesforce, HubSpot)", "LinkedIn Sales Navigator", "Excel", "English for key accounts"],
    evo: "Senior salesperson, key-account manager, sales director, entrepreneur."
  },
  marketing: {
    emp: [["Consumer goods and luxury", null], ["Tech and e-commerce", null], ["Agencies and consulting", null], ["Other sectors", "Banks, insurers, sport, culture, institutions"]],
    acces: ["BUT TC or MMI, business school with a marketing major, marketing master's at university.", "Work-study or a 6-month internship: this is the main way in, especially in large groups.", "Show concrete projects: a brand page, a campaign, a blog or channel with an audience.", "Consumer-goods and luxury groups have very selective entry programmes: apply a year ahead."],
    net: "Your school's alumni network and marketing societies help for large groups; creative profiles can also get noticed through their projects.",
    sav: ["Market research and consumer behaviour", "Digital marketing (SEO, social media, online ads)", "Data analysis (Google Analytics)", "Content creation and storytelling", "Managing a budget"],
    out: ["Google Analytics, Google Ads, Meta Ads", "Excel, Power BI", "Canva, Figma", "CRM and emailing tools"],
    evo: "Product manager, marketing manager, marketing director, brand director."
  },
  rh: {
    emp: [["Large groups", "L'Oréal, Danone, LVMH, Airbus, banks, insurers"], ["Recruitment and temp agencies", null], ["SMEs and mid-sized firms", "Often a versatile HR role"], ["Administration and associations", "Local authorities, hospitals, charities"]],
    acces: ["HR bachelor's or master's (universities, IAEs), business school, or psychology then a master's in work psychology.", "Work-study is the main route: it places you in an HR department.", "Many start in recruitment, payroll or personnel administration before a generalist role.", "Master the basics of employment law: they are useful from day one."],
    net: "Networking helps for large companies, but recruitment firms and SMEs hire a lot.",
    sav: ["Employment law", "Recruiting and interviewing", "Payroll and personnel administration", "Skills management and training", "Communication and conflict handling"],
    out: ["HRIS (Workday, SAP SuccessFactors, Lucca)", "Payroll software", "LinkedIn Recruiter"],
    evo: "HR manager, HR director, HR consultant, headhunter."
  },
  "conseiller-bancaire": {
    emp: [["Retail banks", null], ["Online banks and neobanks", null], ["Private banks and insurers", null]],
    acces: ["BTS in banking or BTS NDRC, BUT TC, banking-insurance bachelor's: you can start from Bac+2.", "Work-study is very common: banks recruit many young people in work-study in their branches.", "Interviews check people skills, interest in economics and rigour.", "Investment advice then requires an AMF certification."],
    net: "Banks recruit many juniors: your file and work-study are enough.",
    sav: ["Banking products (accounts, loans, savings)", "Regulation (anti-money-laundering, customer protection)", "Customer relations and selling advice", "Basic loan calculation", "Managing a portfolio of clients"],
    out: ["The bank's internal tools", "AMF certification", "Excel"],
    evo: "Business or wealth client adviser, branch director, corporate account manager."
  },
  logisticien: {
    emp: [["Transport and logistics", null], ["Retail and e-commerce", null], ["Industry", "Airbus, Renault, Stellantis, Danone, L'Oréal (supply chain)"], ["Service providers and consulting", "ID Logistics, Fiege, supply-chain consulting firms"]],
    acces: ["BTS GTLA, BUT MLT, professional bachelor's in logistics or supply-chain master's, engineering or business school.", "Work-study is excellent: it gives you concrete experience while at school.", "Start as an operator, logistics assistant or planner, then take on more responsibility.", "Internships in warehouses, transport or purchasing help you understand the job."],
    net: "The sector is short of people: your file and work-study are enough.",
    sav: ["Inventory and flow management", "Transport (road, sea, air) and basic customs", "Planning and demand forecasting", "Excel and data analysis", "English"],
    out: ["ERP (SAP, Oracle)", "WMS and TMS (warehouse and transport software)", "Excel, Power BI"],
    evo: "Logistics manager, supply-chain manager, supply-chain director, consultant."
  },
  "product-manager": {
    emp: [["Start-ups and scale-ups", null], ["Large digital companies", null], ["Banks, insurers, energy", "Digital teams at BNP Paribas, AXA, EDF, Orange"], ["Consulting", null]],
    acces: ["No single diploma: engineering schools, business schools, universities or design schools.", "People often become PMs after a few years as a developer, designer, data analyst or project manager: the job is learned on the ground.", "Some companies recruit junior PMs through work-study or internships: apply for \"associate product manager\" or \"product owner\" roles.", "Prepare product cases (prioritisation, metrics) for interviews, and show a project you launched."],
    net: "Many jobs are found through referrals and product communities (Product Tank, ADPList); a visible project helps.",
    sav: ["User research and prioritisation", "Product metrics (acquisition, retention, revenue)", "Technical basics (APIs, databases)", "Agile methods (Scrum, Kanban)", "Communicating with tech and business teams"],
    out: ["Jira, Notion, Figma", "Amplitude, Mixpanel, Google Analytics", "Basic SQL"],
    evo: "Senior PM, group PM, head of product, chief product officer, founder."
  },
  "ingenieur-ia": {
    emp: [["AI labs and start-ups", null], ["Large digital companies", "Google, Meta, Microsoft, Amazon (teams in Paris)"], ["Industry and consulting", null], ["Public research", null]],
    acces: ["Master's in AI or data (engineering-school tracks, MVA, machine-learning master's): Bac+5 is almost compulsory.", "A final-year internship or a PhD in a lab or AI start-up is the classic way in.", "Publish or reproduce work (GitHub, Kaggle, Hugging Face): it proves your level.", "Interviews include maths questions (algebra, probability), machine learning and code."],
    net: "The French AI community is dense: labs, master's alumni and referrals count a lot.",
    sav: ["Linear algebra, probability, optimisation", "Machine learning and deep learning", "Python, PyTorch or TensorFlow", "Data engineering and putting models into production", "Reading scientific papers in English"],
    out: ["Python, PyTorch, TensorFlow", "Git, Docker", "GPUs and cloud platforms (AWS, GCP, Azure)", "Hugging Face"],
    evo: "Senior ML engineer, researcher, AI lead, head of AI, start-up founder."
  }
});
