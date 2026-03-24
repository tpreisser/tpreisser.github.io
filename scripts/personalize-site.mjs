import fs from "node:fs";
import path from "node:path";

const root = "/Users/tylerpreisser/Documents/New project";

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function write(file, contents) {
  fs.writeFileSync(path.join(root, file), contents);
}

function replaceExact(contents, search, replacement, label) {
  const count = contents.split(search).length - 1;
  if (count === 1) {
    return contents.replace(search, replacement);
  }

  if (count === 0 && contents.includes(replacement)) {
    return contents;
  }

  throw new Error(`${label}: expected 1 match, found ${count}`);
}

function replaceAnyExact(contents, searches, replacement, label) {
  const options = Array.isArray(searches) ? searches : [searches];

  for (const search of options) {
    const count = contents.split(search).length - 1;

    if (count === 1) {
      return contents.replace(search, replacement);
    }

    if (count > 1) {
      throw new Error(`${label}: expected 1 match, found ${count}`);
    }
  }

  if (contents.includes(replacement)) {
    return contents;
  }

  throw new Error(`${label}: no candidate match found`);
}

function replaceRegex(contents, regex, replacement, label) {
  const matches = [...contents.matchAll(regex)];

  if (matches.length === 1) {
    return contents.replace(regex, replacement);
  }

  if (matches.length === 0 && contents.includes(replacement)) {
    return contents;
  }

  throw new Error(`${label}: expected 1 regex match, found ${matches.length}`);
}

function updateFile(file, updates) {
  let contents = read(file);

  for (const update of updates) {
    contents = update.regex
      ? replaceRegex(
          contents,
          update.regex,
          update.replacement,
          `${file} -> ${update.label}`,
        )
      : update.searches
        ? replaceAnyExact(
            contents,
            update.searches,
            update.replacement,
            `${file} -> ${update.label}`,
          )
        : replaceExact(
            contents,
            update.search,
            update.replacement,
            `${file} -> ${update.label}`,
          );
  }

  write(file, contents);
}

const currentSharedProfile = `Fe={name:{first:"Tyler",last:"Preisser",nickname:"Tyler"},education:[{school:"Fort Hays State University",url:"https://www.fhsu.edu/",icon:$t,location:"Hays, KS",degree:"Bachelor of Science",major:"Engineering Design & Technology",start:"2021",end:"2025"}],experience:[{company:"R Squared AI",url:"https://rsquaredai.com/",icon:ee,location:"Iowa City, IA",contract:"Full-time",position:"Chief Product Officer",start:"Dec 2025",end:"Present",description:["Owns product vision and client alignment for production-grade AI agents built for sales intelligence and revenue operations.","Works across discovery, system design, and delivery to turn customer workflows into deployed agentic systems in weeks, not quarters.","Built and shipped custom LLM and automation systems spanning sales workflows, back-office operations, and client-facing AI products.","Bridges technical execution with market needs as a sharp communicator with deep sales instincts.","Helps shape explainable, auditable AI systems that plug into the tools revenue teams already use."],skills:["AI Agents","Product Strategy","LLMs","Sales Intelligence","Revenue Operations","Automation","Client Discovery","Systems Design"]},{company:"Preisser Solutions",url:"https://www.preissersolutions.com/",icon:_t,location:"Kansas, Remote",contract:"Founder",position:"Founder & Automation Consultant",start:"2025",end:"Present",description:["Builds custom internal ecosystems that eliminate business headaches, reduce overhead, and streamline operations for client teams.","Designs automated assistants, back-office workflows, dashboards, marketing systems, and process automations tailored to each business.","Personally leads deep operational discovery, solution design, implementation, and ongoing system upkeep.","Delivered hands-free marketing engines, CRM outreach automation, inventory systems, and reporting workflows for service and industrial businesses."],skills:["Business Automation","Workflow Design","Operational Systems","Dashboards","CRM Automation","Marketing Automation","Consulting","Implementation"]},{company:"Independent / University Projects",url:"https://www.fhsu.edu/news/2025/01/young-fhsu-entrepreneurs-flourish-in-hansen-hall",icon:te,location:"Hays, KS",contract:"Self-directed",position:"Entrepreneur & Systems Builder",start:"2021",end:"2025",description:["Built public-facing projects across automation, engineering, and digital media while attending Fort Hays State University.","Grew social platforms to a combined audience in the hundreds of thousands and used content as a test bed for product, messaging, and distribution.","Developed concepts including a hydroelectric animal-saving water filtration system and autonomous agricultural drone ideas through entrepreneurship programs and competitions.","Focused on turning ideas into working systems with real-world utility, strong communication, and iterative execution."],skills:["Product Development","Entrepreneurship","Engineering Design","Robotics","Content Strategy","Audience Growth"]}],languages:[{name:"English",level:"Native"}],contact:{address:"Hays, KS",email:"sales@preissersolutions.com",phone:"(620) 352-3296",website:"https://www.preissersolutions.com",linkedin:"https://www.linkedin.com/in/tyler-preisser-803605233/",github:"https://linktr.ee/tylerpreisser2"}}`;

const sharedProfile = `Fe={name:{first:"Tyler",last:"Preisser",nickname:"Tyler"},education:[{school:"Fort Hays State University",url:"",icon:$t,location:"Hays, KS",degree:"Engineering Design & Technology",major:"Engineering",start:"Aug 2021",end:"Dec 2025"},{school:"Buhler High School",url:"",icon:"/assets/buhler.png",location:"Buhler, KS",degree:"High School Diploma",major:"",start:"Aug 2016",end:"May 2021"}],experience:[{company:"R Squared AI",url:"",icon:ee,location:"Chicago, IL",contract:"Full-time",position:"Chief Product Officer",start:"Jan 2026",end:"Present",description:["Leads R Squared AI's digital presence, brand strategy, go-to-market systems, and client delivery as the company builds AI systems that actually work for business.","Works across the full lifecycle, from shaping platforms and systems that bring R Squared AI to market to hands-on client deployments from concept through production.","Helps turn real operational pain into usable AI systems that fit existing workflows instead of fighting them."],skills:["AI Systems","Product Strategy","Go-to-Market","Client Delivery","Brand Strategy","Operations"]},{company:"Preisser Solutions",url:"",icon:_t,location:"Kansas",contract:"Self-employed",position:"Owner/Operator",start:"Apr 2025",end:"Feb 2026",description:["Built custom automation systems, dashboards, reporting flows, and internal tooling for businesses that needed clarity and leverage.","Showcased products like a daily email briefing system that turned legal, invoice, and financial clutter into a cleaner executive workflow.","Owned discovery, system design, implementation, and client communication from first conversation through delivery."],skills:["Automation","Business Strategy","Corporate Finance","Creative Entrepreneurship","Workflow Design"]},{company:"Preisser Media",url:"",icon:"/assets/preisser-media.svg",location:"Kansas",contract:"Self-employed",position:"Founder",start:"Feb 2014",end:"Feb 2026",description:["Produced social media content from childhood into adulthood across TikTok, Instagram, Facebook, YouTube, and Snapchat.","Built an audience in the hundreds of thousands and generated tens of millions of views by learning platform behavior, editing, hooks, and consistency through real output.","Turned content into a long-running creative business centered on storytelling, reach, and brand growth."],skills:["Social Media","Audience Growth","Short-Form Video","Brand Development","Entrepreneurship"]},{company:"BIRD DOG AVIATION LLC",url:"",icon:"/assets/bird-dog-aviation.svg",location:"Rooks County, KS",contract:"Part-time",position:"Student Pilot",start:"Feb 2025",end:"Aug 2025",description:["Completed flight training while balancing business, sales, and university commitments.","Built calm decision-making, quick reaction time, and attention to detail in high-pressure environments."],skills:["Quick Thinking","High-Pressure Environments","Attention to Detail","Reaction Time"]},{company:"HG Oil",url:"",icon:"/assets/hgoil-icon.png",location:"Plainville, KS",contract:"Full-time",position:"Vice President Operations / Solutions Engineer",start:"Feb 2025",end:"Aug 2025",description:["Worked at the intersection of project management, solutions engineering, delegation, and operations.","Helped connect business intelligence, execution, and decision-making inside a real operating environment."],skills:["Project Management","Solutions Engineering","Business Intelligence","Delegation","Management"]},{company:"Hansen Hall FHSU",url:"",icon:$t,location:"Hays, KS",contract:"Part-time",position:"Resident Leader",start:"Aug 2021",end:"Aug 2025",description:["Served inside FHSU's entrepreneurship-focused Hansen Hall community while building ventures, giving presentations, and helping lead peers.","Used the role to sharpen public speaking, business development, and leadership while living among other driven founders and builders."],skills:["Public Speaking","Entrepreneurship","Business Development","Leadership","Presentation Skills"]},{company:"Verizon",url:"",icon:"/assets/verizon.svg",location:"Hays, KS",contract:"Full-time",position:"Technology Sales Representative",start:"Mar 2024",end:"May 2025",description:["Sold technology in a high-volume retail environment while attending school.","Helped a small Hays store reach the highest sales per customer in the country, break the store's all-time monthly sales record, and personally finish among the company's top 30 sales reps."],skills:["Sales","Customer Service","Communication","Persistence"]},{company:"Collegiate Entrepreneurs' Organization",url:"",icon:"/assets/ceo.ico",location:"Hays, KS",contract:"Apprenticeship",position:"Treasurer",start:"Aug 2024",end:"Mar 2025",description:["Helped support student entrepreneurship programming and team operations through CEO.","Contributed leadership and teamwork inside one of the most relevant campus organizations in Tyler's entrepreneurial path."],skills:["Leadership","Teamwork","Organization"]},{company:"Truss Craft Structural Components",url:"",icon:"/assets/trusscraft.png",location:"Grand Island, NE",contract:"Full-time",position:"Truss Design Intern",start:"May 2024",end:"Aug 2024",description:["Worked as a truss designer and shared the experience publicly as one of the most practical engineering roles of college.","Used structural design software and design thinking to solve real build problems, including custom concepts for reducing horizontal deflection in vaulted ceiling systems."],skills:["Structural Design","Truss Design","Mytek","Problem Solving"]},{company:"Preisser Farms",url:"",icon:"/assets/preisser-farms.svg",location:"Kansas",contract:"Full-time",position:"Farm Hand",start:"Jun 2021",end:"Aug 2023",description:["Handled summer farm work that built reliability, physical endurance, and respect for practical execution.","Grounded later ag-focused venture ideas in real agricultural experience."],skills:["Agriculture","Work Ethic","Execution"]},{company:"TNM Constructors LLC",url:"",icon:"/assets/tnm-constructors.svg",location:"Kansas",contract:"Part-time",position:"Skilled Laborer",start:"May 2013",end:"Aug 2022",description:["Worked construction from an early age, learning how to show up, solve practical problems, and build with his hands.","That background later fed into structural design thinking and comfort in demanding environments."],skills:["Construction","Problem Solving","Work Ethic"]},{company:"College Works Painting",url:"",icon:"/assets/collegeworks.svg",location:"Kansas",contract:"Internship",position:"Door to Door Salesperson",start:"Mar 2022",end:"Jun 2022",description:["Learned resilience by knocking doors, handling rejection, and earning attention the hard way.","Built early confidence in direct sales, networking, and uncomfortable conversations."],skills:["Door-to-Door Sales","Networking","Resilience"]},{company:"Applebee's Neighborhood Grill + Bar",url:"",icon:"/assets/applebees.svg",location:"Kansas",contract:"Part-time",position:"Server",start:"Jan 2020",end:"May 2020",description:["Worked in fast-paced service where speed, communication, and customer experience mattered every shift.","Built people skills and sales instincts that still translate into client-facing work."],skills:["Customer Service","Sales","Teamwork"]}],languages:[{name:"World CEO Competition Finalist — Collegiate Entrepreneurs' Organization",level:"A1"},{name:"Honorary Award, Faulkner Challenge 2023 — FHSU",level:"A1"},{name:"Epic Challenge 3rd Place — FHSU (Nov 2023)",level:"A1"},{name:"Tenaska Pitch Competition — University of Nebraska-Lincoln (Mar 2023)",level:"A1"},{name:"1st Place Sigma Nu Tau Entrepreneurship Competition — Jun 2022",level:"A1"},{name:"UMKC Regnier BLOCH Entrepreneurship Competition Best Venture — May 2022",level:"A1"},{name:"2nd Place Faulkner Challenge 2022 — SkySprayers",level:"A1"},{name:"2nd Place Kansas Startup Entrepreneurship Competition 2021 — SkySprayers",level:"A1"},{name:"4 Years Hansen Hall Honors Entrepreneurship Hall — FHSU",level:"A1"},{name:"Featured in FHSU Foundation and Hays Post coverage for entrepreneurship and Hansen Hall leadership",level:"A1"}],contact:{address:"Hays, KS",email:"tylerpreisser@gmail.com",phone:"(620) 352-3296",website:"",linkedin:"https://www.linkedin.com/in/tyler-preisser-803605233/",github:""}}`;

const currentProjectFeed = `async function Oe(){return[{title:"R Squared AI",description:"Production-grade AI agents for sales intelligence and revenue operations, built to move from discovery to deployed systems in weeks.",source:"",demo:"https://rsquaredai.com/",language:"AI Agents / RevOps",platform:"github",createdAt:"2025-12-01T00:00:00Z",updatedAt:"2026-03-09T00:00:00Z",interactions:{stars:0}},{title:"Preisser Solutions",description:"Custom business automation practice building internal ecosystems, dashboards, assistants, and workflow systems for growing teams.",source:"",demo:"https://www.preissersolutions.com/",language:"AI / Automation",platform:"github",createdAt:"2025-01-01T00:00:00Z",updatedAt:"2026-03-23T00:00:00Z",interactions:{stars:0}},{title:"Cassidy HVAC Marketing Engine",description:"Hands-free organic marketing system that generates, designs, and publishes social media content with optional approval workflows.",source:"",demo:"https://www.preissersolutions.com/",language:"Marketing Automation",platform:"github",createdAt:"2025-01-01T00:00:00Z",updatedAt:"2026-03-23T00:00:00Z",interactions:{stars:0}},{title:"Cassidy HVAC Outreach Engine",description:"AI-personalized SMS and email reactivation workflow tied to CRM triggers, message testing, and conversion follow-up.",source:"",demo:"https://www.preissersolutions.com/",language:"CRM Automation",platform:"github",createdAt:"2025-01-01T00:00:00Z",updatedAt:"2026-03-23T00:00:00Z",interactions:{stars:0}},{title:"HG Oil Inventory System",description:"Live inventory and transfer system built to reduce tracking time, improve accuracy, and turn operational drag into usable margin.",source:"",demo:"https://www.preissersolutions.com/",language:"Operations Systems",platform:"github",createdAt:"2025-01-01T00:00:00Z",updatedAt:"2026-03-23T00:00:00Z",interactions:{stars:0}},{title:"Hydroelectric Water Filtration System",description:"Entrepreneurial engineering concept focused on an animal-saving hydroelectric water filtration solution developed during Tyler's time at Fort Hays State.",source:"",demo:"https://www.fhsu.edu/news/2025/01/young-fhsu-entrepreneurs-flourish-in-hansen-hall",language:"Product / Engineering",platform:"github",createdAt:"2025-01-08T00:00:00Z",updatedAt:"2025-01-08T00:00:00Z",interactions:{stars:0}},{title:"SkySprayer",description:"Autonomous agricultural spray-drone concept designed to reduce crop loss and improve rural operating efficiency through lightweight automation.",source:"",demo:"https://www.tpusa.com/live/fort-hays-state-university-holds-20th-annual-faulkner-innovation-challenge",language:"Robotics / Automation",platform:"github",createdAt:"2024-05-03T00:00:00Z",updatedAt:"2024-05-03T00:00:00Z",interactions:{stars:0}}]}`;

const projectFeed = `async function Oe(){return[{title:"R Squared AI",description:"AI systems company co-founded with Rich Rivara and Will Godfrey, where Tyler leads product direction, brand strategy, go-to-market systems, and client delivery.",source:"",demo:"",language:"AI Systems",platform:"github",createdAt:"2026-01-01T00:00:00Z",updatedAt:"2026-03-23T00:00:00Z",interactions:{stars:0}},{title:"Wife Supply Co.",description:"AI-powered gift-selection concept built for men: answer a few questions, generate a profile, and surface gift ideas that feel personal without endless browsing or second-guessing.",source:"",demo:"",language:"AI / Ecommerce",platform:"github",createdAt:"2025-01-01T00:00:00Z",updatedAt:"2026-03-23T00:00:00Z",interactions:{stars:0}},{title:"Preisser Solutions",description:"Owner-operated automation company building dashboards, internal systems, reporting workflows, and executive tools like a daily email briefing product for overloaded operators.",source:"",demo:"",language:"Automation / Ops",platform:"github",createdAt:"2025-04-01T00:00:00Z",updatedAt:"2026-02-01T00:00:00Z",interactions:{stars:0}},{title:"Preisser Media / Social Media Productions",description:"Long-running media brand built from years of short-form content creation, audience growth, and platform experimentation across TikTok, Instagram, Facebook, YouTube, and Snapchat.",source:"",demo:"",language:"Media / Audience",platform:"github",createdAt:"2014-02-01T00:00:00Z",updatedAt:"2026-03-23T00:00:00Z",interactions:{stars:0}},{title:"BIA Water Filtration",description:"Livestock water-filtration concept built with Lincoln Myers, combining hydro power, UV-C sterilization, and heavy-metal reduction for practical agricultural use.",source:"",demo:"",language:"AgTech / Engineering",platform:"github",createdAt:"2023-11-01T00:00:00Z",updatedAt:"2023-11-30T00:00:00Z",interactions:{stars:0}},{title:"SkySprayers",description:"Autonomous agricultural spray-drone venture built with Chance Fuhrman, John Gamez-Ramos, Wyatt Cyr, and teammates, earning second-place finishes in Kansas Startup and the Faulkner Challenge.",source:"",demo:"",language:"Robotics / AgTech",platform:"github",createdAt:"2021-11-01T00:00:00Z",updatedAt:"2022-04-01T00:00:00Z",interactions:{stars:0}},{title:"Truss Design Concepts",description:"Structural design work exploring ways to minimize horizontal deflection in vaulted ceilings while using less material and creating cleaner load paths.",source:"",demo:"",language:"Structural Design",platform:"github",createdAt:"2024-08-01T00:00:00Z",updatedAt:"2024-08-01T00:00:00Z",interactions:{stars:0}},{title:"AI Education & Presentations",description:"Public-facing talks and demonstrations around AI fluency, entrepreneurship, and practical tech adoption at Fort Hays State University and related events.",source:"",demo:"",language:"Speaking / Education",platform:"github",createdAt:"2025-04-01T00:00:00Z",updatedAt:"2025-04-01T00:00:00Z",interactions:{stars:0}}]}`;

const currentResumeSummary = `"Tyler Preisser is a **product-minded builder** focused on **AI agents**, **custom automation**, and **operational systems**. <br>He currently serves as **Chief Product Officer** at **R Squared AI**, where he helps turn sales and revenue workflows into production-ready agentic systems. He also leads **Preisser Solutions**, building internal ecosystems, automated assistants, dashboards, and client-specific automation. <br>Across company work and university ventures, Tyler has built everything from **hands-free marketing engines** and **inventory systems** to **water-filtration concepts**, **drone ideas**, and large-audience digital brands.<br>He blends product instincts, technical execution, and direct client communication to ship systems that solve real business problems."`;

const currentResumeSummaryLive = `"Tyler Preisser is a **product-minded builder**, **operator**, and **audience grower** working across AI systems, automation, media, and brand-building. <br>He currently serves as **Chief Product Officer** at **R Squared AI** and leads **Preisser Solutions**, where he builds internal ecosystems, marketing engines, dashboards, outreach automations, and operational tools for real businesses. <br>Publicly, his work also spans **student leadership**, **podcast hosting**, **content creation**, and entrepreneurship competitions through projects like **TheGoodOlBoys**, **FHSU Turning Point USA**, **SkySprayers**, and **BIA**. <br>He blends product instincts, communication, distribution, and technical execution to ship ideas that get attention, create leverage, and solve real problems."`;

const resumeSummary = `"Tyler Preisser is an **operator**, **product builder**, and **entrepreneur** whose work spans AI systems, automation, media, sales, and engineering. <br>He currently serves as **Chief Product Officer** at **R Squared AI**, where he helps lead brand strategy, go-to-market systems, and client delivery for business-ready AI solutions. He has also built ventures and operating systems through **Preisser Solutions**, **Preisser Media**, **Wife Supply Co.**, **BIA**, and **SkySprayers**. <br>Across LinkedIn-visible experience and public features from FHSU and Hays Post, Tyler's background blends hands-on labor, direct sales, structural design, flight training, public speaking, and entrepreneurship competitions. <br>He is at his best where strategy, execution, communication, and real-world problem solving meet."`;

const currentIntroSentence = `["The name's"," ",s(fe,{textColor:"primary.plainColor",href:B.contact.linkedin,children:\`\${B.name.first} \${B.name.last}\`})," ",", but you can call me"," ",s(fe,{href:B.contact.github,children:B.name.nickname}),". I'm a"," ",s(g,{textColor:"text.primary",children:"Chief Product Officer"})," ",a?h(we,{children:["at ",s(fe,{textColor:"text.primary",href:a.url,children:a.company})," "]}):null,"focused on ",s(g,{textColor:"text.primary",children:"AI, automation, and operational systems"}),"."]`;

const currentIntroSentenceLive = `["The name's"," ",s(fe,{textColor:"primary.plainColor",href:B.contact.linkedin,children:\`\${B.name.first} \${B.name.last}\`})," ",", but you can call me"," ",s(fe,{href:B.contact.github,children:B.name.nickname}),". I'm a"," ",s(g,{textColor:"text.primary",children:"Chief Product Officer"})," ",a?h(we,{children:["at ",s(fe,{textColor:"text.primary",href:a.url,children:a.company})," "]}):null,"focused on ",s(g,{textColor:"text.primary",children:"AI, automation, media, and operational systems"}),"."]`;

const introSentence = `["The name's"," ",s(fe,{textColor:"primary.plainColor",href:B.contact.linkedin,children:\`\${B.name.first} \${B.name.last}\`}),", but you can call me ",B.name.nickname,". I'm a"," ",s(g,{textColor:"text.primary",children:"Chief Product Officer"})," at ",a&&a.company?a.company:"R Squared AI",", working across ",s(g,{textColor:"text.primary",children:"AI systems, entrepreneurship, media, and operations"}),"."]`;

const currentContactBlurb = `["Reach out if you want to"," ",s(g,{textColor:"text.primary",children:"build smarter systems"}),", explore automation, or talk through a workflow that should run better. I am always open to new"," ",s(g,{textColor:"text.primary",children:"ideas, partnerships, and opportunities"}),"."]`;

const currentContactBlurbLive = `["Reach out if you want to"," ",s(g,{textColor:"text.primary",children:"build smarter systems"}),", grow an audience, launch a brand, or talk through a workflow that should run better. I am always open to new"," ",s(g,{textColor:"text.primary",children:"ideas, partnerships, and opportunities"}),"."]`;

const contactBlurb = `["Reach out if you want to"," ",s(g,{textColor:"text.primary",children:"build something that actually works"}),", solve an operational bottleneck, or talk through AI, media, or growth. I am always open to"," ",s(g,{textColor:"text.primary",children:"serious opportunities and good people"}),"."]`;

updateFile("public/assets/index-C7RyxxOM.js", [
  {
    label: "swap shared asset constants",
    searches: [
      `const $t="/assets/uc.png",_t="/assets/postmates.png",te="/assets/google.png",ee="/assets/nike.jpg"`,
      `const $t="/assets/fhsu-tiger.png",_t="/assets/preissersolutions-logo.png",te="/assets/tyler-headshot.webp",ee="/assets/rsquaredai-logo.webp"`,
    ],
    replacement:
      `const $t="/assets/fhsu-tiger.png",_t="/assets/preissersolutions-icon.png",te="/assets/fhsu-logo.png",ee="/assets/rsquaredai-icon.png"`,
  },
  {
    label: "replace shared profile data",
    regex:
      /Fe=\{name:\{first:"Tyler",last:"Preisser",nickname:"Tyler"\}[\s\S]*?contact:\{address:"Hays, KS",email:"[^"]*",phone:"\(620\) 352-3296",website:"[^"]*",linkedin:"https:\/\/www\.linkedin\.com\/in\/tyler-preisser-803605233\/",github:"[^"]*"\}\}(?=;function ae)/g,
    replacement: sharedProfile,
  },
  {
    label: "use padded hg oil well svg",
    search: `icon:"/assets/hgoil-icon.png"`,
    replacement: `icon:"/assets/hgoil-well.svg"`,
  },
]);

updateFile("public/assets/Resume-DHYgRoIo.js", [
  {
    label: "replace resume preview url",
    search: `window.open("https://azure-jeannette-58.tiiny.site","_blank")`,
    replacement: `window.open("/resume","_blank")`,
  },
  {
    label: "replace resume summary",
    searches: [
      `"Wesley Jin is a **multilingual software engineer** with 8 years of experience, specializing in full-stack development using **JavaScript**, **Typescript** and **Python**. <br>    He's recognized for developing scalable solutions and has successfully led a **pre-seed startup** to secure funding.     He also gained valuable experience working at startups, launching new projects from scratch. <br>He is a **problem solver** with a can-do attitude, always ready to develop new solutions and offer another perspective.<br>    Additionally, he has a strong interest in **AI** and **Blockchain**."`,
      currentResumeSummary,
      currentResumeSummaryLive,
      `"Tyler Preisser is an **operator**, **builder**, and **audience grower** whose experience spans AI systems, automation, media, sales, service, and hands-on field work. <br>He currently serves as **Chief Product Officer** at **R Squared AI** and leads **Preisser Solutions**, where he helps turn operational pain into shipped systems for real businesses. <br>Outside of company work, he has built **Preisser Media / Social Media Productions**, grown social channels into the hundreds of thousands, competed in entrepreneurship challenges with concepts like **BIA** and **SkySprayers**, and learned execution from hospitality, labor, and direct-sales roles. <br>He blends product instincts, communication, resilience, and real-world operating experience to ship work that earns attention and creates leverage."`,
    ],
    replacement: resumeSummary,
  },
  {
    label: "replace resume job title",
    searches: [
      `children:"Software Engineer"`,
      `children:"Chief Product Officer & Automation Founder"`,
    ],
    replacement: `children:"Chief Product Officer, Founder & Operator"`,
  },
  {
    label: "show linkedin instead of website on resume",
    search: `[{key:"address",label:"Address"},{key:"email",label:"Email"},{key:"phone",label:"Phone"},{key:"website",label:"Website"}]`,
    replacement: `[{key:"address",label:"Address"},{key:"email",label:"Email"},{key:"phone",label:"Phone"},{key:"linkedin",label:"LinkedIn"}]`,
  },
  {
    label: "rename resume languages alt",
    search: `alt:"Languages"`,
    replacement: `alt:"Achievements"`,
  },
  {
    label: "rename resume languages heading",
    search: `children:"Languages"`,
    replacement: `children:"Achievements"`,
  },
  {
    label: "render achievements as bullet list",
    search: `function zt(){const c=e=>{switch(e){case"A1":case"A2":case"B1":return"neutral";case"B2":return"info";case"C1":return"primary";case"C2":return"success";default:return"info"}};return p(b,{direction:"row",flexWrap:"wrap",gap:2,p:1,children:_.languages.map(e=>p(Qe,{size:"lg",color:c(e.level),variant:"outlined",children:\`\${e.name}\`},e.name))})}`,
    replacement: `function zt(){return p(b,{component:"ul",sx:{margin:0,paddingLeft:"1.25rem"},children:_.languages.map(e=>p(R,{component:"li",level:"body2",sx:{marginBottom:.75},children:e.name},e.name))})}`,
  },
]);

updateFile("public/assets/Details-DJPNy4rZ.js", [
  {
    label: "add achievements category to profile details",
    search: `function ul({category:e}){const t=Ra(),r=Wa.createRef(),a=Pa(e,{ref:t,keys:null,from:{opacity:0},enter:{opacity:1},leave:{opacity:0,filter:"blur(10px)",position:"absolute"}});return L.useEffect(()=>{var s,n;(n=(s=r.current)==null?void 0:s.parentElement)==null||n.scrollTo({top:0,behavior:"smooth"}),t.start()},[e]),D(G,{direction:"column",ref:r,children:a((s,n)=>{switch(n){case"education":return D(Tt.div,{style:s,children:D(Xo,{})});case"experience":return D(Tt.div,{style:s,children:D(Ko,{})});default:return D(Tt.div,{style:s,children:C(G,{children:["The currently selected category is ",e," but there is no content for it yet."]})})}})})}`,
    replacement: `function cl(){return D(G,{gap:1,p:1,children:Rt.languages.map(t=>D(H,{level:"body2",children:["- ",t.name]},t.name))})}function ul({category:e}){const t=Ra(),r=Wa.createRef(),a=Pa(e,{ref:t,keys:null,from:{opacity:0},enter:{opacity:1},leave:{opacity:0,filter:"blur(10px)",position:"absolute"}});return L.useEffect(()=>{var s,n;(n=(s=r.current)==null?void 0:s.parentElement)==null||n.scrollTo({top:0,behavior:"smooth"}),t.start()},[e]),D(G,{direction:"column",ref:r,children:a((s,n)=>{switch(n){case"education":return D(Tt.div,{style:s,children:D(Xo,{})});case"experience":return D(Tt.div,{style:s,children:D(Ko,{})});case"achievements":return D(Tt.div,{style:s,children:D(cl,{})});default:return D(Tt.div,{style:s,children:C(G,{children:["The currently selected category is ",e," but there is no content for it yet."]})})}})})}`,
  },
  {
    label: "make education logos contain instead of crop",
    search: `style:{width:"100%",height:"100%"}}):D(qa,{})`,
    replacement: `style:{width:"100%",height:"100%",objectFit:"contain",display:"block"}}):D(qa,{})`,
  },
  {
    label: "make experience logos contain instead of crop",
    search: `style:{width:"100%",height:"100%"}}):D(Fa,{})`,
    replacement: `style:{width:"100%",height:"100%",objectFit:"contain",display:"block"}}):D(Fa,{})`,
  },
]);

updateFile("public/assets/Projects-BDxzUxTv.js", [
  {
    label: "replace local project feed",
    regex: /async function Oe\(\)\{return\[[\s\S]*?\]\}(?=function ke)/g,
    replacement: projectFeed,
  },
]);

updateFile("public/assets/Landing-BZc5tpdU.js", [
  {
    label: "swap personal image asset",
    searches: [
      `const Bo="/assets/vader-Bdamvn3i.webp"`,
      `const Bo="/assets/tyler-headshot.webp"`,
    ],
    replacement: `const Bo="/assets/tyler-headshot-cutout.png"`,
  },
  {
    label: "replace personal image alt",
    search: `alt:"Darth vader"`,
    replacement: `alt:"Tyler Preisser portrait"`,
  },
  {
    label: "replace intro sentence",
    searches: [
      `["The name's"," ",s(fe,{textColor:"primary.plainColor",href:B.contact.linkedin,children:\`\${B.name.first} \${B.name.last}\`})," ",", but you can call me"," ",s(fe,{href:B.contact.github,children:B.name.nickname}),". I'm a"," ",s(g,{textColor:"text.primary",children:"Multilingual Software Engineer"})," ",a?h(we,{children:["at ",s(fe,{textColor:"text.primary",href:a.url,children:a.company})," "]}):null,"and the ",s(g,{textColor:"text.primary",children:"Python/Javascript/TypeScript/C#/Java"})," ","Lover."]`,
      currentIntroSentence,
      currentIntroSentenceLive,
      `["The name's"," ",s(fe,{textColor:"primary.plainColor",href:B.contact.linkedin,children:\`\${B.name.first} \${B.name.last}\`}),", but you can call me ",B.name.nickname,". I'm a"," ",s(g,{textColor:"text.primary",children:"Chief Product Officer"})," ",a?h(we,{children:["at ",s(fe,{textColor:"text.primary",href:a.url,children:a.company})," "]}):null,"working across ",s(g,{textColor:"text.primary",children:"AI systems, entrepreneurship, media, and operations"}),"."]`,
      `["The name's"," ",s(fe,{textColor:"primary.plainColor",href:B.contact.linkedin,children:\`\${B.name.first} \${B.name.last}\`}),", but you can call me ",B.name.nickname,". I'm a"," ",s(g,{textColor:"text.primary",children:"Chief Product Officer"})," ",a?h(we,{children:["at ",s(fe,{textColor:"text.primary",href:a.url,children:a.company})," "]}):null,"working across ",s(g,{textColor:"text.primary",children:"AI, automation, media, sales, and operations"}),"."]`,
    ],
    replacement: introSentence,
  },
  {
    label: "replace daytime greeting logic",
    searches: [
      `function Fo(){const t=new Date().getHours();let n="";return t<3?n="Good night":t<12?n="Good morning":t<18?n="Good afternoon":n="Good evening",n}`,
    ],
    replacement: `function Fo(){const t=new Date().getHours();return t<12?"Good morning":"Good afternoon"}`,
  },
  {
    label: "remove random greeting suffixes",
    searches: [
      `const yt=["stranger","collaborator","developer","human","visitor","friend"]`,
    ],
    replacement: `const yt=[""]`,
  },
  {
    label: "render direct greeting only",
    searches: [
      `children:\`\${n}, \${t}\``,
    ],
    replacement: `children:n`,
  },
  {
    label: "simplify phone label",
    searches: [
      `[{key:"address",label:"Address"},{key:"email",label:"Email"},{key:"phone",label:"Phone(WhatsApp/Viber)"},{key:"website",label:"Website"}]`,
    ],
    replacement:
      `[{key:"address",label:"Address"},{key:"email",label:"Email"},{key:"phone",label:"Phone"},{key:"linkedin",label:"LinkedIn"}]`,
  },
  {
    label: "replace featured badge copy",
    search:
      `}),"Featured"," ",s(g,{color:"info",alignItems:"center",fontWeight:"xl",endDecorator:s(N,{children:s(Fe,{variant:"soft",color:"info",startDecorator:s(Q,{alt:"GitHub",color:"info",variant:"outlined",children:s(Ue,{size:"1rem"})}),children:\`\${t.length>0?t.length:"No"} repositor\${t.length===1?"y":"ies"}\`})}),children:"Projects"})`,
    replacement:
      `}),"Featured"," ",s(g,{color:"info",alignItems:"center",fontWeight:"xl",endDecorator:s(N,{children:s(Fe,{variant:"soft",color:"info",startDecorator:s(Q,{alt:"Portfolio",color:"info",variant:"outlined",children:s(Ue,{size:"1rem"})}),children:\`\${t.length>0?t.length:"No"} featured build\${t.length===1?"":"s"}\`})}),children:"Projects"})`,
  },
  {
    label: "replace featured stat copy",
    search:
      `children:[t.length," repositories"]`,
    replacement:
      `children:[t.length," featured builds"]`,
  },
  {
    label: "replace featured loading copy",
    search: `children:"Fetching the latest projects from GitHub, please wait."`,
    replacement: `children:"Loading featured work and case studies, please wait."`,
  },
  {
    label: "replace contact links list",
    searches: [
      `[{url:\`mailto:\${B.contact.email}\`,icon:s(Qe,{}),title:"Email",color:"#ea4335"},{url:\`tel:\${B.contact.phone}\`,icon:s(gr,{}),title:"Phone",color:"#4285f4"},{url:B.contact.linkedin,icon:s(mr,{}),title:"LinkedIn",color:"#0a66c2"},{url:B.contact.github,icon:s(Ue,{}),title:"GitHub",color:"#E6EDF3"}]`,
      `[{url:\`mailto:\${B.contact.email}\`,icon:s(Qe,{}),title:"Email",color:"#ea4335"},{url:\`tel:\${B.contact.phone}\`,icon:s(gr,{}),title:"Phone",color:"#4285f4"},{url:B.contact.linkedin,icon:s(mr,{}),title:"LinkedIn",color:"#0a66c2"},{url:B.contact.github,icon:s(Ue,{}),title:"Linktree",color:"#43e660"}]`,
    ],
    replacement:
      `h(b,{direction:"row",flexWrap:"wrap",columnGap:2,rowGap:1,children:[s(g,{level:"body2",children:B.contact.address}),s(fe,{href:\`mailto:\${B.contact.email}\`,children:B.contact.email}),s(fe,{href:\`tel:\${B.contact.phone}\`,children:B.contact.phone}),s(fe,{href:B.contact.linkedin,children:"LinkedIn"})]})`,
  },
  {
    label: "replace hero name preface",
    search: `children:"Wesley Jin is "`,
    replacement: `children:"Tyler Preisser is "`,
  },
  {
    label: "replace hero keyword one",
    searches: [
      `children:"Working hard"`,
      `children:"Building"`,
    ],
    replacement: `children:"Operating"`,
  },
  {
    label: "replace hero keyword two",
    searches: [
      `children:"Passionate"`,
      `children:"Shipping"`,
    ],
    replacement: `children:"Growing"`,
  },
  {
    label: "replace trait one",
    searches: [
      `children:"Avid"`,
      `children:"AI Systems"`,
    ],
    replacement: `children:"AI & Automation"`,
  },
  {
    label: "replace trait two",
    searches: [
      `children:"Open Communicator"`,
      `children:"Automation Workflows"`,
    ],
    replacement: `children:"Media Strategy"`,
  },
  {
    label: "replace trait three",
    searches: [
      `children:"Creative"`,
      `children:"Product Vision"`,
    ],
    replacement: `children:"Audience Growth"`,
  },
  {
    label: "replace trait four",
    searches: [
      `children:"Innovative"`,
      `children:"Client Alignment"`,
    ],
    replacement: `children:"Leadership"`,
  },
  {
    label: "replace trait five",
    search: `children:"Accepting to Challenges"`,
    replacement: `children:"Operational Problem Solving"`,
  },
  {
    label: "replace trait six",
    searches: [
      `children:"Part of the Team"`,
      `children:"Technical Execution"`,
    ],
    replacement: `children:"Execution"`,
  },
  {
    label: "replace trait seven",
    searches: [
      `children:"Team Culture"`,
      `children:"Business Outcomes"`,
    ],
    replacement: `children:"Brand Building"`,
  },
  {
    label: "replace contact blurb",
    searches: [
      `["Feel free to"," ",s(g,{textColor:"text.primary",children:"contact me"})," if you have any questions or suggestions. I am always open to new"," ",s(g,{textColor:"text.primary",children:"ideas and opportunities"}),"."]`,
      currentContactBlurb,
      currentContactBlurbLive,
      `["Reach out if you want to"," ",s(g,{textColor:"text.primary",children:"build a smarter system"}),", tighten up an operation, or talk through a brand or audience-growth problem. I am always open to"," ",s(g,{textColor:"text.primary",children:"serious opportunities and good people"}),"."]`,
    ],
    replacement: contactBlurb,
  },
  {
    label: "show linkedin instead of website on landing",
    search:
      `[{key:"address",label:"Address"},{key:"email",label:"Email"},{key:"phone",label:"Phone"},{key:"website",label:"Website"}]`,
    replacement:
      `[{key:"address",label:"Address"},{key:"email",label:"Email"},{key:"phone",label:"Phone"},{key:"linkedin",label:"LinkedIn"}]`,
  },
  {
    label: "add achievements tab to landing profile",
    search: `de=["experience","education"]`,
    replacement: `de=["experience","education","achievements"]`,
  },
  {
    label: "stop auto-rotating profile tabs",
    search: `,[d,f]=u.useState(!0),m=Y(),{colorScheme:A}=le(),w=A==="dark";`,
    replacement: `,[d,f]=u.useState(!1),m=Y(),{colorScheme:A}=le(),w=A==="dark";`,
  },
  {
    label: "remove featured explorer description",
    search: `children:"Browse more projects in the dedicated explorer, a centralised hub for all my work and experiments."`,
    replacement: `children:"A mix of ventures, client systems, and media work from across Tyler's portfolio."`,
  },
  {
    label: "remove featured explorer button",
    search:
      `s(G,{component:It,to:"/projects",size:"lg",variant:"outlined",color:"neutral",endDecorator:s(pr,{}),sx:{transition:"all ease .2s",background:"var(--joy-palette-text-primary)",color:"var(--joy-palette-background-level1)",borderColor:"var(--joy-palette-text-primary)",padding:"1 2",whiteSpace:"nowrap",width:e?"100%":"initial","&:hover":{background:"var(--joy-palette-background-body)",color:"var(--joy-palette-text-primary)"},"&:active":{transform:"scale(.98)"}},children:"Explore more projects"})`,
    replacement: `null`,
  },
  {
    label: "replace moving contact strip with static links",
    search:
      `s(Mo,{repeat:4,links:[{url:\`mailto:\${B.contact.email}\`,icon:s(Qe,{}),title:"Email",color:"#ea4335"},{url:\`tel:\${B.contact.phone}\`,icon:s(gr,{}),title:"Phone",color:"#4285f4"},{url:B.contact.linkedin,icon:s(mr,{}),title:"LinkedIn",color:"#0a66c2"},{url:B.contact.github,icon:s(Ue,{}),title:"Linktree",color:"#43e660"}]})`,
    replacement:
      `h(b,{direction:"row",flexWrap:"wrap",columnGap:2,rowGap:1,children:[s(g,{level:"body2",children:B.contact.address}),s(fe,{href:\`mailto:\${B.contact.email}\`,children:B.contact.email}),s(fe,{href:\`tel:\${B.contact.phone}\`,children:B.contact.phone}),s(fe,{href:B.contact.linkedin,children:"LinkedIn"})]})`,
  },
  {
    label: "fit headshot image more naturally",
    searches: [
      `style:{...n?{height:"350px"}:{height:"500px"},filter:"drop-shadow(0 -20px 20px hsla(185, 74%, 41%, 0.299)) drop-shadow(0 20px 20px hsla(7, 57%, 51%, 0.364))"}`,
    ],
    replacement: `style:{...n?{height:"350px"}:{height:"500px"},objectFit:"contain",filter:"drop-shadow(0 -20px 20px hsla(185, 74%, 41%, 0.299)) drop-shadow(0 20px 20px hsla(7, 57%, 51%, 0.364))"}`,
  },
  {
    label: "replace footer lead word",
    search: `children:"Software."`,
    replacement: `children:"Systems."`,
  },
  {
    label: "replace footer cta",
    search:
      `["Let's build products that people love."," ",s(g,{textColor:"text.primary",fontWeight:"600",children:"Together."})]`,
    replacement:
      `["Let's build systems that remove friction and create leverage."," ",s(g,{textColor:"text.primary",fontWeight:"600",children:"Together."})]`,
  },
]);

updateFile("public/assets/index-B3e8QT6n.js", [
  {
    label: "remove projects nav tab",
    regex:
      /,oe\(rd,\{icon:oe\(h\$,\{\}\),selectedIcon:oe\(p\$,\{\}\),text:"Projects",layout:l\?"horizontal":"vertical",to:"\/projects",selected:t\.pathname\.startsWith\("\/projects"\)\}\)/g,
    replacement: ``,
  },
  {
    label: "remove analytics whitelist banner",
    searches: [
      `function k4(){const[e,t]=y.useState(localStorage.getItem("analyticsBannerDismissed")==="true"),n=Pw(),r=l4(),o=s4(e,{ref:r,keys:null,from:{opacity:0,transform:"translateY(2rem)"},enter:{opacity:1,transform:"translateY(0rem)"},leave:{opacity:0,transform:"translateY(2rem)"}});y.useEffect(()=>{r.start()},[r,e]);const i=()=>{localStorage.setItem("analyticsBannerDismissed","true"),t(!0)};return o((a,l)=>l?null:oe(V_,{component:ga.div,variant:"outlined",sx:s=>({display:n?"none":"flex",position:"fixed",bottom:"var(--nav-safe-area-inset-bottom, 0)",marginBottom:"1rem",left:"50%",backgroundColor:s.palette.background.body,zIndex:1e3,width:"min(100% - 2rem, 45rem)",boxShadow:"xl"}),style:{...a,transform:a.transform.to(s=>\`\${s} translateX(-50%)\`)},children:pt(bn,{gap:2,children:[pt(bn,{gap:1,children:[oe(zi,{level:"body1",fontWeight:"600",children:"Hey there mate 👋"}),oe(zi,{level:"body2",textColor:"text.primary",children:"I gather analytics to understand how you use this site and to improve your experience. Adding this page to your ad blocker whitelist would mean a lot. You won't see any ads, and your data will still be kept private."})]}),pt(bn,{direction:"row",gap:1,justifyContent:"flex-end",children:[oe(Ao,{size:"sm",variant:"outlined",color:"neutral",onClick:i,children:"Dismiss"}),oe(Ao,{size:"sm",color:"neutral",sx:s=>({transition:"all 0.2s",backgroundColor:s.palette.text.primary,color:s.palette.background.body,"&:hover":{backgroundColor:s.palette.text.secondary},"&:active":{backgroundColor:s.palette.text.tertiary}}),onClick:()=>{i(),window.location.reload()},children:"I've whitelisted this site"})]})]})}))}`,
    ],
    replacement: `function k4(){return null}`,
  },
  {
    label: "disable vercel speed insights mount",
    searches: [
      `function vx(e){const t=y.useRef(null);return y.useEffect(()=>{if(t.current)e.route&&t.current(e.route);else{const n=mx({framework:e.framework||"react",...e});n&&(t.current=n.setRoute)}},[e.route]),null}`,
    ],
    replacement: `function vx(){return null}`,
  },
]);

console.log("Bundle personalization complete.");
