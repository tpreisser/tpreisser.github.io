import { slugify } from "@/lib/utils";
import type { Episode, Host, Question, Series } from "@/types/content";

export const phaseTitles = {
  1: "The Foundation & The Creator",
  2: "The Fall",
  3: "Redemption",
  4: "The Christian Life & The Church",
  5: "The Hard Questions & The Ultimate Hope",
} as const;

export const hosts: Host[] = [
  {
    name: "Tyler Preisser",
    role: "Co-Host & Producer",
    shortBio:
      "Systems thinker, builder, and steady interrogator of the question behind the question.",
    bio: "Tyler is the co-founder and CPO of R Squared AI, a self-taught product builder with a path that runs from farm work and construction through Verizon sales, oil and gas operations leadership, and into AI startup leadership. He brings an analytical edge to the show, pressing for clarity, structure, and substance while keeping the conversation human. Tyler is married to Clare, attends C3 Hays, and still carries the cadence of western Kansas into every conversation.",
    business: "R Squared AI",
    businessUrl: "https://rsquaredai.com",
    location: "Hays, Kansas",
    imageUrl: null,
    socials: [
      {
        label: "R Squared AI",
        href: "https://rsquaredai.com",
      },
    ],
  },
  {
    name: "Lincoln Myers",
    role: "Co-Host & Creative Director",
    shortBio:
      "Filmmaker, visual storyteller, and the voice reminding every idea that form still matters.",
    bio: "Lincoln is the founder of Myers Media LLC and a filmmaker rooted in western Kansas. With experience across agriculture, education, healthcare, real estate, and branded media, he brings a creative director's instinct to every episode. Lincoln cares deeply about how truth is carried, not just whether it is technically correct. That makes him the show's lens for tone, story, and resonance, grounding difficult conversations in clarity and empathy.",
    business: "Myers Media LLC",
    businessUrl: "https://myersmedia.co",
    location: "Western Kansas",
    imageUrl: null,
    socials: [
      {
        label: "Myers Media",
        href: "https://myersmedia.co",
      },
    ],
  },
];

export const seriesList: Series[] = [
  {
    id: "foundations-of-the-faith",
    slug: "foundations-of-the-faith",
    title: "Foundations of the Faith",
    subtitle: "A 12-Episode Guide to the Questions People Are Actually Asking",
    description:
      "Season one traces the arc from revelation and creation through fall, redemption, life in the church, and the final hope of the believer. Every episode is built around real objections, pastoral conversations, search behavior, and the kinds of late-night questions people are already typing into the internet.",
    episodeCount: 12,
    seasonNumber: 1,
    phases: [
      {
        number: 1,
        title: phaseTitles[1],
        description:
          "Where authority, trust, and the nature of God get tested first.",
        episodeIds: [
          "episode-1-is-scripture-sufficient",
          "episode-2-the-character-of-god",
          "episode-3-what-is-the-trinity",
        ],
      },
      {
        number: 2,
        title: phaseTitles[2],
        description:
          "The fracture point: sin, fairness, and whether the whole system feels rigged.",
        episodeIds: ["episode-4-why-does-sin-separate-us-from-god"],
      },
      {
        number: 3,
        title: phaseTitles[3],
        description:
          "Jesus, resurrection, grace, and the claims Christianity is actually making.",
        episodeIds: [
          "episode-5-is-jesus-really-god",
          "episode-6-did-the-resurrection-happen",
          "episode-7-what-is-the-gospel",
        ],
      },
      {
        number: 4,
        title: phaseTitles[4],
        description:
          "The Spirit, the church, and what it looks like to live this out with other people.",
        episodeIds: [
          "episode-8-who-is-the-holy-spirit",
          "episode-9-the-church",
        ],
      },
      {
        number: 5,
        title: phaseTitles[5],
        description:
          "Fear, suffering, salvation, death, and the future people are genuinely afraid to name.",
        episodeIds: [
          "episode-10-can-you-lose-your-salvation",
          "episode-11-why-do-christians-suffer",
          "episode-12-ultimate-hope-of-the-believer",
        ],
      },
    ],
  },
];

export const episodes: Episode[] = [
  {
    id: "episode-1-is-scripture-sufficient",
    number: 1,
    slug: "is-scripture-sufficient",
    title: "Is Scripture Sufficient?",
    subtitle: "Can You Trust a Book That's 2,000 Years Old?",
    seriesId: "foundations-of-the-faith",
    phase: 1,
    phaseTitle: phaseTitles[1],
    description:
      "An opening episode for skeptics, seekers, and Christians who quietly wonder whether the Bible can bear the weight placed on it. The conversation moves through translation anxiety, canon myths, contradictions, and why Scripture is still treated as uniquely authoritative.",
    questionsAddressed: [
      "How do we know the Bible wasn't just written by men who made everything up?",
      "Hasn't the Bible been translated so many times it's basically a game of telephone?",
      "The Bible contradicts itself — how can it be reliable?",
      "Which version of the Bible is even the right one? There's like 450 English translations.",
      "Why should I trust the Bible and not the Quran or any other holy book?",
      "Didn't the Council of Nicaea just pick which books to include based on politics?",
      "You can't prove the Bible using the Bible — isn't that circular reasoning?",
      "Why would you base your entire life on a book written by people who didn't know what germs were?",
      "If the Bible is so clear, why do Christians disagree on what it means?",
    ],
    talkTrackNotes:
      "Council of Nicaea myth is the hidden boss. 'Written by men' is the most common entry point. 450 translations destabilizes seekers.",
    youtubeId: null,
    spotifyUrl: null,
    applePodcastsUrl: null,
    scriptureReferences: [
      "2 Timothy 3:16-17",
      "2 Peter 1:20-21",
      "Psalm 19:7-11",
    ],
    resources: [
      {
        label: "Canon formation explainer",
        href: null,
      },
      {
        label: "Translation overview",
        href: null,
      },
    ],
    publishedAt: null,
    duration: null,
    thumbnailUrl: null,
    heroVerse: "2 Timothy 3:16-17",
    keyTakeaways: [
      "Scripture claims divine origin through human authorship, not against it.",
      "Translation abundance is a sign of textual access, not textual decay.",
      "Authority questions usually hide trust questions beneath them.",
    ],
  },
  {
    id: "episode-2-the-character-of-god",
    number: 2,
    slug: "the-character-of-god",
    title: "The Character of God — Goodness & Justice",
    subtitle: "Is God Good — Or Just Powerful?",
    seriesId: "foundations-of-the-faith",
    phase: 1,
    phaseTitle: phaseTitles[1],
    description:
      "This episode enters the emotional center of deconstruction: hell, wrath, Old Testament violence, suffering, and the suspicion that divine sovereignty feels unsafe.",
    questionsAddressed: [
      "If God is good, why does He send people to hell?",
      "How can God be loving AND wrathful?",
      "God in the OT seems like a completely different God than in the NT.",
      "Why did God kill so many people in the OT?",
      "How is it just to punish someone eternally for a finite sin?",
      "If God knows everything, why did He create people He knew would go to hell?",
      "Why does God let bad things happen to good people?",
      "Is God actually fair or does He just do whatever He wants?",
      "Why does God need to be worshipped? That seems insecure.",
    ],
    talkTrackNotes:
      "Hell plus foreknowledge is a leading deconstruction sequence for ages 18 to 35. Old Testament violence is a major stumbling block. The felt question is whether God is safe.",
    youtubeId: null,
    spotifyUrl: null,
    applePodcastsUrl: null,
    scriptureReferences: [
      "Exodus 34:6-7",
      "Romans 9:14-24",
      "Psalm 145:8-9",
    ],
    resources: [
      {
        label: "Justice and mercy reading list",
        href: null,
      },
      {
        label: "Old Testament violence notes",
        href: null,
      },
    ],
    publishedAt: null,
    duration: null,
    thumbnailUrl: null,
    heroVerse: "Exodus 34:6-7",
    keyTakeaways: [
      "The Bible refuses to separate God's love from His justice.",
      "Questions about hell usually reveal questions about moral seriousness and fairness.",
      "God's power matters because it belongs to His character, not apart from it.",
    ],
  },
  {
    id: "episode-3-what-is-the-trinity",
    number: 3,
    slug: "what-is-the-trinity",
    title: "What Is the Trinity?",
    subtitle: "One God, Three Persons — How Does That Work?",
    seriesId: "foundations-of-the-faith",
    phase: 1,
    phaseTitle: phaseTitles[1],
    description:
      "A precision episode for confused believers and skeptical friends alike, working through the doctrine most Christians affirm and few feel equipped to explain.",
    questionsAddressed: [
      "How is it not polytheism?",
      "If Jesus is God, was He praying to Himself?",
      "On the cross, who was Jesus talking to?",
      "I've been in church my whole life and can't explain the Trinity.",
      "Trinity doesn't appear in the Bible.",
      "When Jesus died, was God dead for three days?",
      "Is the Holy Spirit a person or a force?",
      "Constantine made up the Trinity at Nicaea — wasn't it political?",
      "My Muslim friend says I worship three gods and I didn't know what to say.",
    ],
    talkTrackNotes:
      "The rawest confusion here often comes from lifelong Christians. 'Jesus praying to Himself' is the dominant question across platforms.",
    youtubeId: null,
    spotifyUrl: null,
    applePodcastsUrl: null,
    scriptureReferences: [
      "Matthew 28:19",
      "John 1:1-14",
      "2 Corinthians 13:14",
    ],
    resources: [
      {
        label: "Historical doctrine summary",
        href: null,
      },
      {
        label: "Bible passages on Father, Son, and Spirit",
        href: null,
      },
    ],
    publishedAt: null,
    duration: null,
    thumbnailUrl: null,
    heroVerse: "Matthew 28:19",
    keyTakeaways: [
      "The Trinity is not a math problem to solve but a revealed identity to receive.",
      "Christianity insists on one God while speaking truly of Father, Son, and Spirit.",
      "Confusion here is common, which makes clarity pastoral, not merely academic.",
    ],
  },
  {
    id: "episode-4-why-does-sin-separate-us-from-god",
    number: 4,
    slug: "why-does-sin-separate-us-from-god",
    title: "Why Does Sin Separate Us From God?",
    subtitle: "What Actually Went Wrong?",
    seriesId: "foundations-of-the-faith",
    phase: 2,
    phaseTitle: phaseTitles[2],
    description:
      "A conversation about fairness, blame, sacrifice, and why Christian language around sin can feel manipulative unless it is explained in plain human terms.",
    questionsAddressed: [
      "Why can't God just forgive everyone without a blood sacrifice?",
      "Why am I accountable for original sin? I didn't eat the apple.",
      "If God made me this way, why is it sinful?",
      "God set us up to fail then punished us.",
      "How is it fair that babies are born sinful?",
      "God sacrificed Himself to Himself to save us from Himself because of a rule He made.",
      "Sin seems made up to control people.",
      "Why does God care what I do with my own body?",
      "The blood sacrifice thing is barbaric.",
    ],
    talkTrackNotes:
      "Sin questions are fairness questions. The person usually feels the system is rigged. Blood sacrifice critiques land because atonement is rarely explained in ordinary language.",
    youtubeId: null,
    spotifyUrl: null,
    applePodcastsUrl: null,
    scriptureReferences: [
      "Genesis 3",
      "Romans 3:23-26",
      "Isaiah 53:4-6",
    ],
    resources: [
      {
        label: "Atonement notes",
        href: null,
      },
      {
        label: "Original sin primer",
        href: null,
      },
    ],
    publishedAt: null,
    duration: null,
    thumbnailUrl: null,
    heroVerse: "Romans 3:23-26",
    keyTakeaways: [
      "Sin in Scripture is relational rupture before it is merely rule-breaking.",
      "Fairness objections deserve answers in ordinary language, not slogans.",
      "The cross is God's answer to evil without pretending evil is small.",
    ],
  },
  {
    id: "episode-5-is-jesus-really-god",
    number: 5,
    slug: "is-jesus-really-god",
    title: "Is Jesus Really God?",
    subtitle: "Did Jesus Actually Claim to Be God?",
    seriesId: "foundations-of-the-faith",
    phase: 3,
    phaseTitle: phaseTitles[3],
    description:
      "A careful, evidence-shaped episode for people who respect Jesus but are unsure whether the church later overclaimed His identity.",
    questionsAddressed: [
      "Did Jesus ever actually say I am God?",
      "I believe Jesus is the son of God but now told He IS God — is this true?",
      "Was Jesus just a teacher turned myth?",
      "How do we know what Jesus actually said vs. what was added later?",
      "Nicaea voted on Jesus' divinity — political?",
      "Jesus said the Father is greater than I — how is that something God says?",
      "Why would God come to one tiny corner of the ancient world?",
      "Jesus seemed scared about dying — God can't be scared.",
      "What's the difference between Jesus and any other mythology?",
    ],
    talkTrackNotes:
      "This is often driven by Bart Ehrman style social clips. The people asking it usually are not hostile. They want evidence without pressure.",
    youtubeId: null,
    spotifyUrl: null,
    applePodcastsUrl: null,
    scriptureReferences: [
      "John 8:58",
      "John 10:30-33",
      "Colossians 1:15-20",
    ],
    resources: [
      {
        label: "Jesus and divinity passages",
        href: null,
      },
      {
        label: "Historical Jesus reading list",
        href: null,
      },
    ],
    publishedAt: null,
    duration: null,
    thumbnailUrl: null,
    heroVerse: "John 1:1-14",
    keyTakeaways: [
      "Jesus' identity is claimed by His words, works, and the reactions He provoked.",
      "Incarnation means true divinity without canceling true humanity.",
      "The church did not invent a higher Jesus than the texts already require.",
    ],
  },
  {
    id: "episode-6-did-the-resurrection-happen",
    number: 6,
    slug: "did-the-resurrection-happen",
    title: "Did the Resurrection Happen?",
    subtitle: "What Do You Do With an Empty Tomb?",
    seriesId: "foundations-of-the-faith",
    phase: 3,
    phaseTitle: phaseTitles[3],
    description:
      "The show's most explicitly evidential episode, moving through alternative theories, late-date concerns, Gospel differences, and the stubbornness of the earliest Christian claims.",
    questionsAddressed: [
      "Any actual proof beyond the Bible?",
      "Disciples made it up to keep the movement going?",
      "Swoon theory?",
      "Four Gospels tell it differently — why?",
      "Accounts written too late?",
      "People die for beliefs all the time — why does disciples died prove anything?",
      "Copy of dying-and-rising god myths?",
      "Why didn't Jesus appear to Pilate?",
      "Dead people don't come back to life.",
    ],
    talkTrackNotes:
      "Swoon theory is the most common physical alternative. Mythology parallels remain the most common internet-atheism point. Many listeners here are open to evidence.",
    youtubeId: null,
    spotifyUrl: null,
    applePodcastsUrl: null,
    scriptureReferences: [
      "1 Corinthians 15:3-8",
      "Luke 24:1-12",
      "Acts 2:22-36",
    ],
    resources: [
      {
        label: "Resurrection evidence notes",
        href: null,
      },
      {
        label: "Alternative theory comparison",
        href: null,
      },
    ],
    publishedAt: null,
    duration: null,
    thumbnailUrl: null,
    heroVerse: "1 Corinthians 15:3-8",
    keyTakeaways: [
      "Christianity stands or falls on a public historical claim, not a vague inspiration.",
      "The earliest witnesses were not expecting resurrection and did not benefit from it.",
      "The strongest objection is still that dead people stay dead, which is exactly why the claim matters.",
    ],
  },
  {
    id: "episode-7-what-is-the-gospel",
    number: 7,
    slug: "what-is-the-gospel",
    title: "What Is the Gospel?",
    subtitle: "What Is Christianity Actually Offering?",
    seriesId: "foundations-of-the-faith",
    phase: 3,
    phaseTitle: phaseTitles[3],
    description:
      "Grace, repentance, heaven, exclusivity, and what salvation actually means in practice when the questions stop being theoretical.",
    questionsAddressed: [
      "Just believe and you're saved? Too easy.",
      "If it's all grace, why does how I live matter?",
      "Serial killer accepts Christ on deathbed — heaven?",
      "Hitler repented = heaven?",
      "People where Christianity never reached — hell?",
      "Only Christians go to heaven seems arrogant.",
      "All religions teach the same thing.",
      "What does repentance actually look like practically?",
      "Good non-Christian neighbor — hell?",
    ],
    talkTrackNotes:
      "Deathbed murderer scenarios stress-test grace. 'People who never heard' remains one of the most common apologetics questions on American campuses.",
    youtubeId: null,
    spotifyUrl: null,
    applePodcastsUrl: null,
    scriptureReferences: [
      "Ephesians 2:8-10",
      "Romans 10:9-13",
      "Mark 1:14-15",
    ],
    resources: [
      {
        label: "Grace and repentance guide",
        href: null,
      },
      {
        label: "Exclusivity and evangelism notes",
        href: null,
      },
    ],
    publishedAt: null,
    duration: null,
    thumbnailUrl: null,
    heroVerse: "Ephesians 2:8-10",
    keyTakeaways: [
      "Grace feels scandalous because it is meant to shatter performance logic.",
      "Repentance is not theater but reorientation.",
      "The gospel is not merely a ticket out of hell but union with Christ.",
    ],
  },
  {
    id: "episode-8-who-is-the-holy-spirit",
    number: 8,
    slug: "who-is-the-holy-spirit",
    title: "Who Is the Holy Spirit?",
    subtitle: "Presence, Personhood, and Everyday Confusion",
    seriesId: "foundations-of-the-faith",
    phase: 4,
    phaseTitle: phaseTitles[4],
    description:
      "This episode speaks to quiet confusion, charismatic baggage, intrusive-thought panic, and the widespread fear that everyone else is having a spiritual experience you missed.",
    questionsAddressed: [
      "What even IS the Holy Spirit?",
      "Person or force?",
      "How do you know if the Spirit is talking or just your own thoughts?",
      "Been a Christian for years, never felt the Spirit — something wrong with me?",
      "Why do people at some churches speak in tongues and fall on the floor?",
      "Is tongues real?",
      "Is the Spirit the same as conscience?",
      "Blasphemy of the Holy Spirit — am I going to hell?",
      "Having vs being filled with the Spirit?",
    ],
    talkTrackNotes:
      "'Never felt anything' is an enormous and under-addressed confession. Blasphemy panic is a genuine pastoral crisis, especially among younger anxious believers.",
    youtubeId: null,
    spotifyUrl: null,
    applePodcastsUrl: null,
    scriptureReferences: [
      "John 14:16-17",
      "Acts 1:8",
      "Romans 8:14-16",
    ],
    resources: [
      {
        label: "Spirit and conscience guide",
        href: null,
      },
      {
        label: "Tongues and gifts framework",
        href: null,
      },
    ],
    publishedAt: null,
    duration: null,
    thumbnailUrl: null,
    heroVerse: "John 14:16-17",
    keyTakeaways: [
      "The Holy Spirit is not vague energy but divine person.",
      "Assurance is not measured by emotional intensity alone.",
      "Discernment requires Scripture, community, and humility.",
    ],
  },
  {
    id: "episode-9-the-church",
    number: 9,
    slug: "the-church",
    title: "The Church",
    subtitle: "Why Can't I Just Do This On My Own?",
    seriesId: "foundations-of-the-faith",
    phase: 4,
    phaseTitle: phaseTitles[4],
    description:
      "A direct conversation with the burnt-out, the suspicious, and the self-sufficient about hypocrisy, money, denominations, and why embodied community still matters.",
    questionsAddressed: [
      "Why do I have to go to church?",
      "More connected to God hiking than in church.",
      "Church people are the biggest hypocrites.",
      "Hate church — bad Christian?",
      "Church always asking for money.",
      "40,000+ denominations — why?",
      "Want to start church but overwhelmed by denominations.",
      "What's the point of baptism?",
      "Communion — just eating a cracker?",
    ],
    talkTrackNotes:
      "Hypocrisy objections almost always have a face attached to them. Denomination confusion is a real access barrier. Money suspicion often hides a longing for the church to be genuine.",
    youtubeId: null,
    spotifyUrl: null,
    applePodcastsUrl: null,
    scriptureReferences: [
      "Hebrews 10:24-25",
      "Acts 2:42-47",
      "1 Corinthians 12:12-27",
    ],
    resources: [
      {
        label: "Church and belonging guide",
        href: null,
      },
      {
        label: "Baptism and communion notes",
        href: null,
      },
    ],
    publishedAt: null,
    duration: null,
    thumbnailUrl: null,
    heroVerse: "Hebrews 10:24-25",
    keyTakeaways: [
      "Christianity is personal, but never solitary.",
      "The failures of churches do not erase the purpose of the church.",
      "Practices like baptism and communion train the body, not just the mind.",
    ],
  },
  {
    id: "episode-10-can-you-lose-your-salvation",
    number: 10,
    slug: "can-you-lose-your-salvation",
    title: "Can You Lose Your Salvation?",
    subtitle: "Are You Still Saved If You Keep Failing?",
    seriesId: "foundations-of-the-faith",
    phase: 5,
    phaseTitle: phaseTitles[5],
    description:
      "An episode built around fear, recurring failure, assurance, suicide, apostasy, and the haunting question so many people ask in six words: will God take me back?",
    questionsAddressed: [
      "Habitual sin = not saved?",
      "Same sin over and over — will God stop forgiving?",
      "What if I don't feel saved?",
      "Christian suicide — still saved?",
      "Sinner's prayer as a kid, not sure I meant it — ever saved?",
      "Most devout friend is now atheist.",
      "Once saved always saved = license to sin.",
      "Will God take me back?",
    ],
    talkTrackNotes:
      "Most of these collapse into one central fear: whether God's love is conditional on continued performance. Habitual sin questions often orbit unnamed pornography. Suicide comes up with devastating frequency.",
    youtubeId: null,
    spotifyUrl: null,
    applePodcastsUrl: null,
    scriptureReferences: [
      "John 10:27-30",
      "Romans 8:1",
      "1 John 1:9",
    ],
    resources: [
      {
        label: "Assurance and repentance notes",
        href: null,
      },
      {
        label: "Pastoral care guide",
        href: null,
      },
    ],
    publishedAt: null,
    duration: null,
    thumbnailUrl: null,
    heroVerse: "John 10:27-30",
    keyTakeaways: [
      "Assurance grows through Christ's grip before it grows through self-confidence.",
      "Repeated failure should lead toward confession and help, not away from God.",
      "Fear around salvation often needs both theology and pastoral tenderness.",
    ],
  },
  {
    id: "episode-11-why-do-christians-suffer",
    number: 11,
    slug: "why-do-christians-suffer",
    title: "Why Do Christians Suffer?",
    subtitle: "When Faith Doesn't Fix the Pain",
    seriesId: "foundations-of-the-faith",
    phase: 5,
    phaseTitle: phaseTitles[5],
    description:
      "A distinction-heavy episode separating abstract theodicy from personal abandonment and dealing honestly with prayer, depression, cancer, grief, and anger at God.",
    questionsAddressed: [
      "Why does God allow suffering?",
      "If God loves me, why is life so hard?",
      "Prayed for years, God didn't come through — what now?",
      "Good people get cancer, terrible people live long.",
      "God has a plan when kids die?",
      "Okay to be angry at God?",
      "God in control = responsible for suffering?",
      "Became Christian to help depression — it didn't.",
      "Why pray if God already knows?",
    ],
    talkTrackNotes:
      "Unanswered prayer is not the same as theodicy. 'Christianity didn't fix depression' usually means somebody sold transactional faith.",
    youtubeId: null,
    spotifyUrl: null,
    applePodcastsUrl: null,
    scriptureReferences: [
      "Psalm 13",
      "Romans 8:18-28",
      "2 Corinthians 12:7-10",
    ],
    resources: [
      {
        label: "Suffering and lament guide",
        href: null,
      },
      {
        label: "Prayer in disappointment",
        href: null,
      },
    ],
    publishedAt: null,
    duration: null,
    thumbnailUrl: null,
    heroVerse: "Psalm 13",
    keyTakeaways: [
      "Lament is not unbelief. It is faith refusing to leave the conversation.",
      "Suffering answers require different language when the wound is personal.",
      "Hope does not erase grief. It gives grief a horizon.",
    ],
  },
  {
    id: "episode-12-ultimate-hope-of-the-believer",
    number: 12,
    slug: "ultimate-hope-of-the-believer",
    title: "What Is the Ultimate Hope of the Believer?",
    subtitle: "How Does This All End?",
    seriesId: "foundations-of-the-faith",
    phase: 5,
    phaseTitle: phaseTitles[5],
    description:
      "The closing episode for the season, facing death, heaven, hell, fear, grief, exclusivity, and whether Christian hope is vivid enough to withstand real loss.",
    questionsAddressed: [
      "What actually happens when you die?",
      "Hell real or scare tactic?",
      "Heaven = clouds and harps?",
      "Heaven boring forever?",
      "Heaven perfect without my loved ones?",
      "Eternity in hell for a human lifetime of sin — fair?",
      "People who never heard about Jesus?",
      "Still scared of death as a Christian.",
      "Way out of hell if you repent?",
      "Do dogs go to heaven? Lost my best friend today.",
    ],
    talkTrackNotes:
      "Finite crime versus infinite punishment is a leading cause of youth deconstruction. 'Heaven sounds boring' reveals an imagination failure in the church. Fear of death often carries double shame for believers.",
    youtubeId: null,
    spotifyUrl: null,
    applePodcastsUrl: null,
    scriptureReferences: [
      "Revelation 21:1-5",
      "1 Thessalonians 4:13-18",
      "1 Corinthians 15:51-58",
    ],
    resources: [
      {
        label: "Heaven and hell overview",
        href: null,
      },
      {
        label: "Hope in grief notes",
        href: null,
      },
    ],
    publishedAt: null,
    duration: null,
    thumbnailUrl: null,
    heroVerse: "Revelation 21:1-5",
    keyTakeaways: [
      "Christian hope is resurrection and renewed creation, not disembodied drift.",
      "Fear of death does not disqualify faith.",
      "The end of the story is not escape but restoration.",
    ],
  },
];

export const questions: Question[] = episodes.flatMap((episode) =>
  episode.questionsAddressed.map((questionText, index) => ({
    id: `${episode.id}-question-${index + 1}`,
    questionText,
    episodeId: episode.id,
    episodeSlug: episode.slug,
    episodeNumber: episode.number,
    episodeTitle: episode.title,
    phase: episode.phase,
    phaseTitle: episode.phaseTitle,
    seriesId: episode.seriesId,
    youtubeTimestamp: null,
    slug: `${slugify(questionText)}-${episode.number}`,
  })),
);

export const questionsByEpisodeId = Object.groupBy(
  questions,
  (question) => question.episodeId,
);

export const homeQuestionCloud = questions.slice(0, 15);

export function getSeriesBySlug(slug: string) {
  return seriesList.find((series) => series.slug === slug);
}

export function getEpisodeBySlug(slug: string) {
  return episodes.find((episode) => episode.slug === slug);
}

export function getQuestionBySlug(slug: string) {
  return questions.find((question) => question.slug === slug);
}

export function getEpisodeQuestions(episodeId: string) {
  return questionsByEpisodeId[episodeId] ?? [];
}

export function getRelatedQuestions(questionId: string, episodeId: string) {
  return getEpisodeQuestions(episodeId).filter((question) => question.id !== questionId);
}

export function getSeriesEpisodes(seriesId: string) {
  return episodes.filter((episode) => episode.seriesId === seriesId);
}
