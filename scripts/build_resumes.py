"""Generate one tailored, ATS-friendly A4 résumé per portfolio view.

Each résumé is a single column of real text. A small script in the page shrinks the
font until everything fits on one page, then spreads the sections so the page is full.
"""
import html, os, sys

OUT = sys.argv[1] if len(sys.argv) > 1 else '.'

CONTACT = ('Kolkata, India', '+91 88954 06527', 'dashsaswat09@gmail.com',
           'linkedin.com/in/saswatdash2003', 'github.com/saswat-projects-hub')

# ---- Shared facts (verified against the portfolio, thesis, reports and CV data) ----
HPCL = dict(org='Hindustan Petroleum Corporation Limited (HPCL)', place='Kolkata', role='Procurement Officer',
            dates='Aug 2026 – Present', bullets={
    'indent': 'Review indents from user departments and turn them into clear specifications, quantities and cost estimates',
    'tender': 'Prepare and float tenders on e-procurement portals, and handle bidder queries and pre-bid clarifications',
    'eval': 'Run techno-commercial evaluation of bids with engineering and finance teams and recommend awards',
    'po': 'Issue purchase orders and contracts, then track delivery, inspection and vendor payments to closure',
    'vendor': 'Manage vendor relationships and performance, keeping every step transparent and audit-ready',
    'own': 'Own end-to-end procurement for regional operations, from department requirement to tender, purchase order and payment',
    'evalshort': 'Run techno-commercial bid evaluations with engineering and finance teams and manage vendor performance',
})
NEXOREA = dict(org='Nexorea', place='AI mental-wellness startup', role='Co-Founder & Product Head',
               dates='May 2025 – Present', bullets={
    'research': 'Ran 48 user interviews and 7 design sprints over a 12-week pre-MVP to define an AI companion and diary',
    'voice': 'Prototyped a 5-persona voice AI with Google APIs, preferred by 68% of 80+ test users',
    'arch': 'Stress-tested a mobile-first architecture for 6,000+ DAUs; prototypes hit under 200 ms latency, 35% faster than baseline',
    'dash': 'Built an AI mood dashboard and creative toolkit, validated with 150+ users',
    'kpi': 'Set launch KPIs of 75% onboarding completion and a 25–30% lift in week-1 retention',
})
INSTA = dict(org='InstaPrepsAI', place='B2B and B2C EdTech', role='Product Management & Analyst Intern',
             dates='Jun 2025 – Sep 2025', bullets={
    'launch': 'Led a 6-member team through research, design and agile sprints to launch a Student Admin Assessment platform in 9 days',
    'mau': 'Grew monthly active users 57% to 1.8k+ with a relaunch strategy built on behavioural analysis and A/B tests',
    'activation': 'Lifted onboarding activation 18% through cohort and funnel analysis of 3,000+ users',
    'sql': 'Analysed 5,000+ records in SQL to surface user pain points behind stalled growth',
    'proto': 'Cut iteration time 50% by leading rapid prototyping with Lovable and Google AI Studio',
    'kpidash': 'Designed KPI dashboards tracking churn, funnel conversion and engagement for leadership decisions',
})
DEVLAUNCH = dict(org='Devlaunch', place='B2B SaaS', role='Product Management Intern', dates='Apr 2025 – Jun 2025', bullets={
    'bounce': 'Cut bounce rate 12% by running 37 user interviews and turning the insights into PRDs that restructured navigation',
    'dau': 'Grew daily active users 5% by adding gamification (streaks and badges) to reward consistency',
    'engage': 'Raised engagement 10% by launching community forums and personalised event reminders',
    'combo': 'Grew DAU 5% with streaks and badges, and engagement 10% with community forums and event reminders',
})
HABUILD = dict(org='Habuild', place='B2C health-tech', role='Product Management Intern', dates='Aug 2024 – Nov 2024', bullets={
    'attend': 'Increased class attendance 19% in 3 months by launching the "Yoga Together" and "Pause My Subscription" features',
})
VECMOCON = dict(org='Vecmocon Technologies', place='EV intelligence', role='Data Analyst & Strategy Intern',
                dates='May 2024 – Jul 2024', bullets={
    'trips': 'Analysed 50,000+ EV trip records in SQL to map demand, income and supply gaps for an NBFC leasing programme',
    'routes': 'Improved rule-based route categorisation 27% using OpenStreetMap road tags, speed trends and stop density',
    'sonar': 'Correlated SONAR occupancy signals with BMS energy use to estimate passenger load and guide route allocation',
    'un': 'Contributed analysis to UN Green Climate Fund project reporting',
})
PODHIKAL = dict(org='Podhikal Scientific Pvt. Ltd.', place='Scientific instruments', role='Product Development Intern',
                dates='May 2023 – Jul 2023', bullets={
    'xy': 'Modelled and optimised the XY motion-controller assembly in SolidWorks to minimise vibration',
    'weight': 'Prototyped the motion-control unit in lightweight alloys, cutting weight 12%',
    'cap': 'Designed a micro-fluid cap geometry to control droplet size and spray angle for uniform thin-film coating',
})

PROJECTS = {
    'airtcraft': dict(name='AirtCraft', desc='B2B art marketplace | Co-founder', dates='2024 – 2026', bullets={
        'research': 'Surveyed 481 artists and buyers, interviewed HR teams and interior designers, and led the pivot from consumer to B2B',
        'platform': 'Launched a quote-based platform with 4 role-based dashboards for corporate buyers, interior designers, artists and admins',
        'one': 'Surveyed 481 artists and buyers, pivoted to B2B, and launched a quote-based platform with 4 role-based dashboards',
    }),
    'bookverse': dict(name='BookVerse', desc='social reading app', dates='Sep 2025', bullets={
        'one': 'Researched 90+ sources and 5 competitors, prioritised with RICE and MoSCoW, and built an MVP on Lovable and Supabase',
    }),
    'zomato': dict(name='Zomato review engagement', desc='NextLeap PM Fellowship, Top Fellow', dates='Jun 2024 – Jul 2024', bullets={
        'one': 'Set product goals and metrics, designed UI changes and a measurement framework projected to raise detailed reviews 24%',
    }),
    'teardown': dict(name='InstaPrepsAI onboarding teardown', desc='product teardown', dates='2025', bullets={
        'one': 'Mapped the onboarding journey and recommended 3 fixes: earlier confidence analytics, clearer permissions, less OTP friction',
    }),
    'design': dict(name='SmartChef and ClarioRx', desc='product design case studies', dates='Nov 2025', bullets={
        'one': 'Designed an ingredient-scanning cooking app and an AI agent for healthcare prior authorisation, with flows and rationale',
    }),
    'vendor': dict(name='Vendor performance and profitability', desc='analytics project', dates='Jul 2025 – Aug 2025', bullets={
        'inventory': 'Analysed 10,000+ sales and inventory records: $2.71M of slow-moving stock and 65.7% reliance on top vendors',
        'bulk': 'Ran a regression on bulk purchasing that showed a 72% unit-cost reduction opportunity',
        'brands': 'Isolated 198 high-margin brands to redirect marketing spend',
        'one': 'Analysed 10,000+ records: $2.71M of slow-moving inventory, 65.7% vendor concentration, a 72% bulk-buying saving',
    }),
    'atliq': dict(name='AtliQ Hotels revenue optimisation', desc='analytics project', dates='Jun 2025 – Jul 2025', bullets={
        'upside': 'Found a 46,134 room-night upside and a 22.2-point weekend-weekday occupancy gap across 25 properties',
        'pricing': 'Modelled pricing: a 15% discount lifted Standard occupancy 7.3 points while a 15% premium protected Presidential margins',
        'roadmap': 'Delivered 8 artifacts, including a phased roadmap to 65% occupancy',
        'one': 'Found a 46,134 room-night upside across 25 properties and modelled pricing that lifted Standard occupancy 7.3 points',
    }),
    'banking': dict(name='Banking dashboard', desc='Power BI', dates='Sep 2024 – Oct 2024', bullets={
        'kpi': 'Built a Power BI dashboard over 188 clients tracking $139.9M loans, $111.5M deposits and $5.17M fees against goals',
        'segments': 'Combined 6 CSV sources and broke results down by income band and nationality; loans peaked mid-income',
    }),
    'amex': dict(name='American Express Campus Challenge', desc='Decision Science track', dates='Jun 2024 – Jul 2024', bullets={
        'one': 'Ranked 9th of 4,518 predicting T20 winners with XGBoost and CatBoost; SMOTE and tuning lifted accuracy 26%',
    }),
    'fraud': dict(name='Credit card fraud detection', desc='machine learning', dates='2024', bullets={
        'one': 'Built a Random Forest classifier on a heavily imbalanced dataset with random under-sampling, reaching an 86.1% F1 score',
    }),
    'warm': dict(name='Warm forming of magnesium alloys', desc='M.Tech research, IIT Kharagpur', dates='Aug 2025 – 2026', bullets={
        'process': 'Developed warm Single Point Incremental Forming of magnesium sheet, raising formability 55% over room temperature',
        'result': 'Formed walls down to 0.4 mm thickness, with 25% finer grains under warm forming',
    }),
    'teliport': dict(name='Tata Elxsi TELIPORT', desc='campus winner, 7,000+ teams nationally', dates='Sep 2023 – Oct 2023', bullets={
        'concept': 'Analysed GPS multipath interference across flight phases and proposed a tool suite to detect and filter it',
    }),
}

EDU = [
    ('Indian Institute of Technology Kharagpur', '2021 – 2026',
     'B.Tech (Hons.) Mechanical Engineering and M.Tech Manufacturing Science &amp; Engineering, 5-year Dual Degree'),
    ('CGPA 7.11/10 | Class XII, CHSE Odisha: 79.83% (2020) | Class X, BSE Odisha: 85.5% (2018)', '', None),
]

ACH = {
    'amex': 'Rank 9 of 4,518, American Express Campus Challenge, Decision Science track (2024)',
    'teliport': 'Campus winner, Tata Elxsi TELIPORT, a national competition of 7,000+ teams (2023)',
    'nextleap': 'Top Fellow, NextLeap PM Fellowship (2024), for a Zomato review-engagement case projected to raise detailed reviews 24%',
    'nextleapshort': 'Top Fellow, NextLeap PM Fellowship (2024)',
    'gate': 'Qualified GATE 2024 (Mechanical Engineering)',
    'ppgs': 'Governor, Public Policy &amp; Governance Society, IIT Kharagpur (2023–24): led an 86-member team; ran a governance programme across 15+ cities reaching 10,000+ people; started the Diplomatic Discourse Series with ambassadors',
    'ppgsshort': 'Governor, Public Policy &amp; Governance Society, IIT Kharagpur: led 86 members; reached 10,000+ people in 15+ cities',
    'gyws': 'LiGHT Head, Gopali Youth Welfare Society: led 13 centres serving 450+ students; raised ₹3L+ in the annual fundraiser',
    'gymkhana': 'Secretary, Culinary Arts Subcommittee, Technology Students’ Gymkhana: ran logistics and budgets for 40+ events',
}

SKILLS = {
    'product': ('Product', 'User research, PRDs, roadmapping, prioritisation (RICE, MoSCoW), A/B testing, funnel and cohort analysis, product metrics (AARRR, HEART), Jobs to be Done, Scrum, Kanban, OKRs'),
    'ptools': ('Product tools', 'Figma, Balsamiq, Miro, JIRA, Confluence, Notion, Postman, Amplitude, CleverTap, Lovable, Google AI Studio'),
    'analytics': ('Analytics', 'SQL, Python (Pandas, NumPy, SciPy, scikit-learn), Power BI, Tableau, Excel'),
    'stats': ('Statistics and ML', 'Hypothesis testing, regression, correlation, sampling design, confidence intervals, XGBoost, CatBoost, Random Forest, SMOTE'),
    'proc': ('Procurement and operations', 'Indent review, specifications, tendering on e-procurement portals, techno-commercial bid evaluation, purchase orders and contracts, vendor management, cost estimation, inventory analysis'),
    'eng': ('Engineering', 'SolidWorks, AutoCAD, Fusion 360, Siemens NX, MATLAB, Mastercam, CNC, metal forming, failure analysis'),
    'analyticslite': ('Analytics', 'SQL, Python, Power BI, Tableau, Excel, Amplitude'),
}

# ---- One résumé per portfolio view ----
RESUMES = {
    'all': dict(file='Saswat_Dash_Resume.pdf', headline='Procurement Officer | Product Management | Analytics',
        summary='IIT Kharagpur dual-degree mechanical engineer, now a Procurement Officer at HPCL, with three product management internships, a co-founded AI startup and analytics work on EV, hotel, banking and inventory data. Launched an assessment platform in 9 days, grew monthly active users 57%, and ranked 9th of 4,518 in the American Express Campus Challenge.',
        sections=[
            ('Experience', [(HPCL, ['own', 'eval', 'po']), (NEXOREA, ['research', 'voice', 'arch']),
                            (INSTA, ['launch', 'mau', 'activation']), (DEVLAUNCH, ['bounce', 'combo']),
                            (HABUILD, ['attend']), (VECMOCON, ['trips', 'routes']), (PODHIKAL, ['weight'])]),
            ('Projects', [('airtcraft', ['one']), ('vendor', ['one']), ('atliq', ['one']), ('warm', ['process'])]),
            ('Education', None),
            ('Skills', ['product', 'analytics', 'proc', 'eng']),
            ('Achievements and Leadership', ['amex', 'teliport', 'nextleapshort', 'gate', 'ppgsshort', 'gyws']),
        ]),
    'operations': dict(file='Saswat_Dash_Resume_Procurement.pdf', headline='Procurement and Operations',
        summary='Procurement Officer at HPCL handling end-to-end public-sector procurement, from indent to payment. IIT Kharagpur mechanical and manufacturing engineer, GATE 2024 qualified, with an analyst’s toolkit: a 10,000-record vendor analysis exposed $2.71M of slow-moving inventory and 65.7% vendor concentration. Has led cross-functional teams at three startups.',
        sections=[
            ('Experience', [(HPCL, ['indent', 'tender', 'eval', 'po', 'vendor']), (VECMOCON, ['trips', 'routes']),
                            (INSTA, ['launch', 'kpidash', 'mau']), (NEXOREA, ['research', 'arch']),
                            (DEVLAUNCH, ['bounce']), (HABUILD, ['attend']), (PODHIKAL, ['xy', 'weight'])]),
            ('Projects', [('vendor', ['inventory', 'bulk', 'brands']), ('atliq', ['upside', 'pricing']), ('banking', ['kpi'])]),
            ('Education', None),
            ('Skills', ['proc', 'analytics', 'eng']),
            ('Achievements and Leadership', ['gate', 'amex', 'teliport', 'gymkhana', 'gyws', 'ppgsshort']),
        ]),
    'product': dict(file='Saswat_Dash_Resume_Product_Manager.pdf', headline='Product Manager',
        summary='Product manager with three product internships and a co-founded AI wellness startup, trained as an engineer at IIT Kharagpur. Launched an assessment platform in 9 days and grew its monthly active users 57% through funnel analysis and A/B testing. Pairs user research and PRDs with SQL and Python analytics and fast prototyping. Now a Procurement Officer at HPCL.',
        sections=[
            ('Experience', [(HPCL, ['own', 'evalshort']), (NEXOREA, ['research', 'voice', 'arch', 'dash', 'kpi']),
                            (INSTA, ['launch', 'mau', 'activation', 'proto', 'kpidash']),
                            (DEVLAUNCH, ['bounce', 'dau', 'engage']), (HABUILD, ['attend']),
                            (VECMOCON, ['trips', 'routes'])]),
            ('Projects', [('airtcraft', ['research', 'platform']), ('bookverse', ['one']), ('zomato', ['one']),
                          ('teardown', ['one']), ('design', ['one'])]),
            ('Education', None),
            ('Skills', ['product', 'ptools', 'analyticslite']),
            ('Achievements and Leadership', ['amex', 'teliport', 'gate', 'ppgsshort', 'gyws']),
        ]),
    'analytics': dict(file='Saswat_Dash_Resume_Analyst.pdf', headline='Data and Product Analyst',
        summary='Analyst trained as an engineer at IIT Kharagpur who turns messy operational data into decisions. Analysed 50,000+ EV trip records at Vecmocon, lifted onboarding activation 18% with cohort and funnel analysis at InstaPrepsAI, and ranked 9th of 4,518 in the American Express Campus Challenge. Works in SQL, Python and Power BI; now a Procurement Officer at HPCL.',
        sections=[
            ('Experience', [(VECMOCON, ['trips', 'routes', 'sonar', 'un']), (INSTA, ['activation', 'sql', 'mau', 'kpidash']),
                            (HPCL, ['own', 'evalshort']), (NEXOREA, ['research', 'arch']),
                            (DEVLAUNCH, ['bounce', 'combo']), (HABUILD, ['attend'])]),
            ('Projects', [('vendor', ['inventory', 'bulk', 'brands']), ('atliq', ['upside', 'pricing', 'roadmap']),
                          ('banking', ['kpi', 'segments']), ('amex', ['one']), ('fraud', ['one'])]),
            ('Education', None),
            ('Skills', ['analytics', 'stats', 'product']),
            ('Achievements and Leadership', ['nextleapshort', 'teliport', 'gate', 'ppgsshort']),
        ]),
    'engineering': dict(file='Saswat_Dash_Resume_Engineering.pdf', headline='Mechanical and Manufacturing Engineer',
        summary='Mechanical and manufacturing engineer from IIT Kharagpur (dual degree, CGPA 7.11, GATE 2024 qualified). M.Tech research raised the formability of magnesium sheet 55% through warm incremental forming; designed motion-control hardware at Podhikal Scientific; campus winner of Tata Elxsi TELIPORT. Now a Procurement Officer at HPCL, writing technical specifications and evaluating bids.',
        sections=[
            ('Experience', [(HPCL, ['indent', 'eval', 'po', 'vendor']), (PODHIKAL, ['xy', 'weight', 'cap']),
                            (VECMOCON, ['trips', 'sonar', 'routes']), (NEXOREA, ['arch', 'research']),
                            (INSTA, ['launch', 'mau']), (DEVLAUNCH, ['bounce'])]),
            ('Research and Projects', [('warm', ['process', 'result']), ('teliport', ['concept']), ('amex', ['one']),
                                       ('airtcraft', ['one'])]),
            ('Education', None),
            ('Skills', ['eng', 'analytics', 'proc']),
            ('Achievements and Leadership', ['teliport', 'gate', 'amex', 'ppgsshort', 'gyws', 'gymkhana']),
        ]),
}

CSS = """
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; }
body { font-family: Arial, Helvetica, sans-serif; color: #111; font-size: var(--fs); line-height: 1.24; }
a { color: #111; text-decoration: none; }
.page { width: 210mm; height: 296.4mm; padding: 8mm 11mm 8mm 11mm; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; }
h1 { font-size: calc(var(--fs) * 1.9); margin: 0; letter-spacing: 0.02em; }
.title { font-size: calc(var(--fs) * 1.13); color: #1f4e79; font-weight: bold; margin: 1pt 0 2pt; }
.contact { font-size: min(calc(var(--fs) * 0.94), 8.9pt); color: #333; white-space: nowrap; }
section + section h2 { margin-top: 3pt; }
h2 { font-size: calc(var(--fs) * 1.05); text-transform: uppercase; letter-spacing: 0.06em; color: #1f4e79; border-bottom: 1px solid #1f4e79; margin: 0 0 2.5pt; padding-bottom: 1pt; }
p { margin: 0; }
.row { display: flex; justify-content: space-between; align-items: baseline; gap: 8pt; }
.entry + .entry { margin-top: 2pt; }
.org { font-weight: bold; }
.role { font-style: italic; }
.date { white-space: nowrap; font-size: calc(var(--fs) * 0.96); }
ul { margin: 0.5pt 0 0; padding-left: 11pt; }
li { margin: 0; }
.skills p { margin-bottom: 1pt; }
"""

FIT = """
<script>
(() => {
  const page = document.querySelector('.page');
  let fs = 11.0;
  const set = () => document.documentElement.style.setProperty('--fs', fs + 'pt');
  set();
  page.style.justifyContent = 'flex-start';
  while (page.scrollHeight > page.clientHeight && fs > 7.6) { fs = Math.round((fs - 0.05) * 100) / 100; set(); }
  page.style.justifyContent = 'space-between';
  document.title = document.title + ' ';
  document.body.dataset.fs = fs;
})();
</script>
"""


def e(s):
    return s  # strings are authored as HTML already (with &amp; where needed)


def job_html(job, keys):
    lis = ''.join(f'<li>{e(job["bullets"][k])}</li>' for k in keys)
    return (f'<div class="entry"><div class="row"><p><span class="org">{job["org"]}</span> | <span class="role">{job["role"]}</span> | {job["place"]}</p>'
            f'<p class="date">{job["dates"]}</p></div><ul>{lis}</ul></div>')


def project_html(pid, keys):
    p = PROJECTS[pid]
    lis = ''.join(f'<li>{e(p["bullets"][k])}</li>' for k in keys)
    return (f'<div class="entry"><div class="row"><p><span class="org">{p["name"]}</span>, {p["desc"]}</p>'
            f'<p class="date">{p["dates"]}</p></div><ul>{lis}</ul></div>')


def build(view, r):
    blocks = []
    c = CONTACT
    blocks.append(f'<header><h1>SASWAT DASH</h1><p class="title">{r["headline"]}</p>'
                  f'<p class="contact">{c[0]} | {c[1]} | <a href="mailto:{c[2]}">{c[2]}</a> | '
                  f'<a href="https://www.{c[3]}">{c[3]}</a> | <a href="https://{c[4]}">{c[4]}</a></p></header>')
    blocks.append(f'<section><h2>Summary</h2><p>{r["summary"]}</p></section>')
    for title, items in r['sections']:
        if title == 'Education':
            inner = (f'<div class="row"><p><span class="org">{EDU[0][0]}</span></p><p class="date">{EDU[0][1]}</p></div>'
                     f'<p>{EDU[0][2]}</p><p>{EDU[1][0]}</p>')
        elif title == 'Skills':
            inner = '<div class="skills">' + ''.join(f'<p><b>{SKILLS[k][0]}:</b> {SKILLS[k][1]}</p>' for k in items) + '</div>'
        elif title.startswith('Achievements'):
            inner = '<ul>' + ''.join(f'<li>{ACH[k]}</li>' for k in items) + '</ul>'
        elif title == 'Experience':
            inner = ''.join(job_html(j, k) for j, k in items)
        else:
            inner = ''.join(project_html(p, k) for p, k in items)
        blocks.append(f'<section><h2>{title}</h2>{inner}</section>')
    doc = (f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Saswat Dash - {r["headline"]} Resume</title>'
           f'<meta name="author" content="Saswat Dash"><style>{CSS}</style></head><body>'
           f'<div class="page">{"".join(blocks)}</div>{FIT}</body></html>')
    path = os.path.join(OUT, f'{view}.html')
    open(path, 'w').write(doc)
    return path


for view, r in RESUMES.items():
    print(build(view, r), r['file'])
