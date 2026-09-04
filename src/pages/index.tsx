import * as React from "react";

import { Helmet } from "react-helmet";
import { css } from "@emotion/react";
import { Alert, Steps, Timeline } from "antd";

import PageWrapper from "../components/page-wrapper";
import { Section, SubSection } from "../components/text-helpers";
import color from "../components/color";
import { canonicalEventUrl } from "../data/event-routes";
import * as style from "./index.module.scss";

const { Step } = Steps;

// ------------------------------------------------------------------
// Data

type Person = {
  name: string;
  affiliation: string;
  photo?: string;
  url?: string;
};

// Invited speakers (from the IROS 2026 SRW proposal).
const speakers: Person[] = [
  {
    name: "Giusy Falcone",
    affiliation: "University of Michigan",
    photo: "/images/iros2026/people/giusyFalcone.jpg",
    url: "https://aero.engin.umich.edu/people/falcone-giusy/",
  },
  {
    name: "Cynthia Sung",
    affiliation: "University of Pennsylvania",
    photo: "/images/iros2026/people/cynthiaSung.jpg",
    url: "https://sung.seas.upenn.edu/people/sung/",
  },
  {
    name: "Yang Gao",
    affiliation: "Hong Kong University of Science and Technology",
    photo: "/images/iros2026/people/yangGao.jpg",
    url: "https://yanggao.people.ust.hk/",
  },
  {
    name: "Marco Hutter",
    affiliation: "ETH Zurich",
    photo: "/images/iros2026/people/marcoHutter.jpg",
    url: "https://rsl.ethz.ch/the-lab/people/person-detail.hutter.html",
  },
  {
    name: "Rob Ambrose",
    affiliation: "Texas A&M University / NASA",
    photo: "/images/iros2026/people/robAmbrose.jpg",
    url: "https://www.linkedin.com/in/robert-ambrose-81544547",
  },
  {
    name: "Yuto Nakanishi",
    affiliation: "GITAI",
    photo: "/images/iros2026/people/yutoNakanishi.jpg",
    url: "https://gitai.tech/",
  },
  {
    name: "Brian Yamauchi",
    affiliation: "Starpath",
    photo: "/images/iros2026/people/brianYamauchi.jpg",
    url: "https://www.starpath.space",
  },
  {
    name: "Emma Zemler",
    affiliation: "NASA",
    photo: "/images/iros2026/people/emmaZemler.jpg",
    url: "https://www.linkedin.com/in/emma-zemler-31a6723b6",
  },
  {
    name: "Yashwanth Nakka",
    affiliation: "Georgia Tech",
    photo: "/images/iros2026/people/yashwanthNakka.jpg",
    url: "https://www.ae.gatech.edu/directory/person/yashwanth-kumar-nakka",
  },
];

// Organizing committee (from the IROS 2026 SRW proposal).
const organizers: Person[] = [
  {
    name: "Ignacio G. López-Francos",
    affiliation: "SETI Institute / UT Austin",
    photo: "/images/organizers/ignacioGLopezFrancos.png",
    url: "https://www.linkedin.com/in/ilopezfrancos/",
  },
  {
    name: "Miguel A. Olivares-Mendez",
    affiliation: "University of Luxembourg",
    photo: "/images/iros2026/people/miguelOlivaresMendez.png",
    url: "https://www.uni.lu/snt-en/people/miguel-angel-olivares-mendez/",
  },
  {
    name: "Julia Di",
    affiliation: "Lockheed Martin / Columbia University",
    photo: "/images/iros2026/people/juliaDi.jpg",
    url: "https://www.juliadi.com",
  },
  {
    name: "Keenan Albee",
    affiliation: "University of Southern California",
    photo: "/images/iros2026/people/keenanAlbee.jpg",
    url: "https://albee.github.io/",
  },
  {
    name: "Marcel Kaufmann",
    affiliation: "NASA JPL",
    photo: "/images/organizers/marcelKaufmann.jpeg",
    url: "https://www.linkedin.com/in/kaufmann-space",
  },
  {
    name: "Brian Coltin",
    affiliation: "NASA ARC / KBR",
    photo: "/images/organizers/brianColtin.jpg",
    url: "https://brian.coltin.org/",
  },
  {
    name: "Roshan Kalghatgi",
    affiliation: "NASA ARC / KBR",
    photo: "/images/organizers/roshanKalghatgi.png",
    url: "https://www.linkedin.com/in/roshankalghatgi/",
  },
  {
    name: "Hiro Ono",
    affiliation: "NASA JPL / Georgia Tech",
    photo: "/images/scientific-committee/hiroOno.jpg",
  },
  {
    name: "Harsh G. Bhundiya",
    affiliation: "University of Maryland",
    photo: "/images/iros2026/people/harshBhundiya.jpg",
    url: "https://sparc.umd.edu/",
  },
  {
    name: "Andrés Mora",
    affiliation: "NASA ARC",
    photo: "/images/iros2026/people/andresMora.jpg",
    url: "https://www.nasa.gov/people/andres-mora-vargas/",
  },
  {
    name: "Pyojin Kim",
    affiliation: "GIST",
    photo: "/images/scientific-committee/pyojinKim.jpeg",
    url: "https://mpil-gist.github.io/",
  },
];

type Sponsor = {
  name: string;
  logo: string;
  url: string;
};

const sponsors: Sponsor[] = [
  {
    name: "SETI Institute",
    logo: "/images/sponsors/seti-institute.svg",
    url: "https://www.seti.org/",
  },
  {
    name: "Starpath",
    logo: "/images/sponsors/starpath.png",
    url: "https://www.starpath.space",
  },
];

type AgendaSpeaker = {
  name: string;
  affiliation: string;
  photo?: string;
  role?: string;
};

type AgendaItem = {
  title: string;
  time: string;
  isBreak?: boolean;
  description?: string;
  speakers?: AgendaSpeaker[];
};

const agenda: AgendaItem[] = [
  {
    title: "Opening Remarks",
    time: "8:30 – 8:35 AM",
    speakers: [
      {
        name: "Ignacio G. López-Francos",
        affiliation: "SETI Institute / UT Austin",
        photo: "/images/organizers/ignacioGLopezFrancos.png",
      },
    ],
  },
  {
    title:
      'Keynote — "Similitude Techniques for Correlating Lunar Rover Performance with Earth Testing"',
    time: "8:35 – 9:00 AM",
    speakers: [
      {
        name: "Rob Ambrose",
        affiliation: "Texas A&M University / NASA",
        photo: "/images/iros2026/people/robAmbrose.jpg",
      },
    ],
  },
  {
    title:
      'Invited Talk — "From Constellation Coordination to Mission-Scale Digital Twins"',
    time: "9:00 – 9:25 AM",
    speakers: [
      {
        name: "Giusy Falcone",
        affiliation: "University of Michigan",
        photo: "/images/iros2026/people/giusyFalcone.jpg",
      },
    ],
  },
  {
    title:
      'Invited Talk — "TRUSSES: Temporarily, Robots Unite to Surmount Sandy Entrapments, then Separate"',
    time: "9:25 – 9:50 AM",
    speakers: [
      {
        name: "Cynthia Sung",
        affiliation: "University of Pennsylvania",
        photo: "/images/iros2026/people/cynthiaSung.jpg",
      },
    ],
  },
  {
    title: "Industry Lightning Talk — TBD",
    time: "9:50 – 9:55 AM",
    speakers: [
      {
        name: "Brian Yamauchi",
        affiliation: "Starpath",
        photo: "/images/iros2026/people/brianYamauchi.jpg",
      },
    ],
  },
  {
    title: "Invited Talk — TBD",
    time: "9:55 – 10:10 AM",
    speakers: [
      {
        name: "Yuto Nakanishi",
        affiliation: "GITAI",
        photo: "/images/iros2026/people/yutoNakanishi.jpg",
      },
    ],
  },
  {
    title: "Contributed Paper Spotlights (4 × 5-minute presentations)",
    time: "10:10 – 10:30 AM",
  },
  {
    title: "Coffee Break + Poster Session",
    time: "10:30 – 11:00 AM",
    isBreak: true,
  },
  {
    title:
      'Invited Talk — "Lunar Leaper: A Mission to Investigate Lava Tubes on the Moon"',
    time: "11:00 – 11:25 AM",
    speakers: [
      {
        name: "Marco Hutter",
        affiliation: "ETH Zurich",
        photo: "/images/iros2026/people/marcoHutter.jpg",
      },
    ],
  },
  {
    title:
      'Invited Talk — "AI Robotics for Sustainable Space Exploration"',
    time: "11:25 – 11:50 AM",
    speakers: [
      {
        name: "Yang Gao",
        affiliation: "Hong Kong University of Science and Technology",
        photo: "/images/iros2026/people/yangGao.jpg",
      },
    ],
  },
  {
    title:
      'Panel Discussion — "Next-Gen Lunar Robotics: Building and Sustaining a Moon Base"',
    time: "11:50 AM – 12:20 PM",
    speakers: [
      {
        name: "Yuto Nakanishi",
        affiliation: "GITAI",
        photo: "/images/iros2026/people/yutoNakanishi.jpg",
      },
      {
        name: "Emma Zemler",
        affiliation: "NASA",
        photo: "/images/iros2026/people/emmaZemler.jpg",
      },
      {
        name: "Brian Yamauchi",
        affiliation: "Starpath",
        photo: "/images/iros2026/people/brianYamauchi.jpg",
      },
      {
        name: "Yashwanth Nakka",
        affiliation: "Georgia Tech",
        photo: "/images/iros2026/people/yashwanthNakka.jpg",
      },
    ],
  },
  {
    title: "Awards + Closing Remarks",
    time: "12:20 – 12:30 PM",
    description: "Best Paper / Poster Awards + Closing",
  },
];

const contributionTopics: string[] = [
  "Planetary surface mobility, manipulation, and loco-manipulation across wheeled, legged, aerial, and hybrid platforms",
  "Lunar surface logistics, construction, assembly, servicing, maintenance, and in-situ resource utilization (ISRU)",
  "In-space servicing, assembly, and manufacturing; orbital robotics; and IVA/EVA robotic assistance",
  "Multi-robot coordination and heterogeneous teams for distributed operations",
  "Machine perception, spatial intelligence, navigation, and mapping under degraded sensing and limited PNT",
  "Human-robot teaming, shared autonomy, and teleoperation under communication latency",
  "Robust autonomy, fault management, anomaly response, and assurance for learning-enabled systems",
  "Earth-independent autonomy under constrained compute, power, communications, and thermal resources",
  "Physical AI, embodied foundation models, and adaptive control for contact-rich tasks",
  "Sim-to-real transfer, digital twins, benchmarking, analog testing, and interoperable robotic interfaces",
];

const objectives: { title: string; text: string }[] = [
  {
    title: "Connect",
    text: "Link advances in learning-enabled autonomy, perception, manipulation, mobility, planning/control, multi-robot systems, and HRI to mission and commercial needs.",
  },
  {
    title: "Share",
    text: "Surface state-of-the-art methods, systems, and lessons learned from fielded and high-fidelity testing.",
  },
  {
    title: "Identify",
    text: "Pinpoint critical open problems and current research directions across the community.",
  },
  {
    title: "Seed",
    text: "Grow new collaborations across academia, industry, startups, and government, with strong early-career participation.",
  },
];

// ------------------------------------------------------------------
// Helpers

const Time = (props: { time: string }) => (
  <span
    css={css`
      color: ${color.gray7};
    `}
  >
    {props.time}
  </span>
);

const getCurrentTimelineStep = () => {
  const today = new Date();
  const deadlines = [
    { date: "2026-06-12", step: 0 },
    { date: "2026-08-21", step: 1 },
    { date: "2026-09-04", step: 2 },
    { date: "2026-09-18", step: 3 },
    { date: "2026-09-27", step: 4 },
  ];

  let currentStep = 0;
  for (const deadline of deadlines) {
    const deadlineDate = new Date(deadline.date);
    if (today >= deadlineDate) {
      currentStep = deadline.step;
    } else {
      break;
    }
  }

  if (currentStep < deadlines.length - 1) {
    return currentStep + 1;
  }

  return currentStep;
};

const isCurrentStep = (stepIndex: number) => getCurrentTimelineStep() === stepIndex;

const stepTitle = (index: number, label: string) => (
  <span
    style={{
      fontWeight: isCurrentStep(index) ? "bold" : "normal",
      color: isCurrentStep(index) ? "#1890ff" : "inherit",
    }}
  >
    {label}
  </span>
);

const AgendaSpeakers = (props: { speakers: AgendaSpeaker[] }) => (
  <div className={style.agendaSpeakers}>
    {props.speakers.map(speaker => (
      <div key={speaker.name} className={style.agendaSpeaker}>
        {speaker.photo ? (
          <img src={speaker.photo} alt={speaker.name} className={style.agendaSpeakerPhoto} />
        ) : null}
        <div>
          <div className={style.agendaSpeakerName}>{speaker.name}</div>
          <div className={style.agendaSpeakerAffiliation}>{speaker.affiliation}</div>
          {speaker.role ? <div className={style.agendaSpeakerRole}>{speaker.role}</div> : null}
        </div>
      </div>
    ))}
  </div>
);

const initials = (name: string) =>
  name
    .replace(/[^A-Za-z\s.-]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join("")
    .toUpperCase();

const Avatar = (props: { person: Person; className: string }) => {
  const { person, className } = props;
  const inner = person.photo ? (
    <img src={person.photo} alt={person.name} />
  ) : (
    <span>{initials(person.name)}</span>
  );
  return (
    <div className={`${style.avatar} ${className}`}>
      {person.url ? (
        <a href={person.url} target="_blank" rel="noopener noreferrer" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  );
};

const SpeakerCard = (props: { person: Person }) => {
  const { person } = props;
  return (
    <div className={style.speakerCard}>
      <Avatar person={person} className={style.speakerAvatar} />
      <div>
        <div className={style.speakerName}>
          {person.url ? (
            <a href={person.url} target="_blank" rel="noopener noreferrer">
              {person.name}
            </a>
          ) : (
            person.name
          )}
        </div>
        <div className={style.speakerAffiliation}>{person.affiliation}</div>
      </div>
    </div>
  );
};

const OrganizerCard = (props: { person: Person }) => {
  const { person } = props;
  return (
    <div className={style.organizer}>
      <Avatar person={person} className={style.organizerAvatar} />
      <div className={style.organizerName}>{person.name}</div>
      <div className={style.organizerOrg}>{person.affiliation}</div>
    </div>
  );
};

// ------------------------------------------------------------------
// Page

const IROS2026_SHARE_TITLE = "Space Robotics Workshop @ IROS 2026 (Sept 27th)";
const SITE_URL = "https://space-robots.org";
const IROS2026_OG_IMAGE = `${SITE_URL}/images/iros2026/hero-moon.jpg`;

const Iros2026Page = () => (
  <>
    <Helmet>
      <title>{IROS2026_SHARE_TITLE}</title>
      <meta name="description" content="Space Robotics Workshop at IEEE/RSJ IROS 2026 in Pittsburgh, PA — September 27th, 2026." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalEventUrl("iros2026")} />
      <meta property="og:title" content={IROS2026_SHARE_TITLE} />
      <meta
        property="og:description"
        content="Space exploration and sustained operations beyond Earth — Pittsburgh, PA, September 27th, 2026."
      />
      <meta property="og:image" content={IROS2026_OG_IMAGE} />
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="796" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={IROS2026_SHARE_TITLE} />
      <meta
        name="twitter:description"
        content="Space exploration and sustained operations beyond Earth — Pittsburgh, PA, September 27th, 2026."
      />
      <meta name="twitter:image" content={IROS2026_OG_IMAGE} />
    </Helmet>
    <PageWrapper
      conference="IROS 2026"
      documentTitle={IROS2026_SHARE_TITLE}
      compactHeader={true}
      editionNavSide="right"
      headerGradient="linear-gradient(120deg, #070b18, #1d2c4d 55%, #2b4b7c)"
      headerStyle={css`
        color: #f5f6f8 !important;
        button {
          &:hover {
            color: #e3e8f5 !important;
          }
        }
      `}
      imageContent={{}}
    >
      <Alert
        message={
          <>
            <strong>Workshop registration is open.</strong> To attend the Space
            Robotics Workshop at IROS 2026, you must register for the{" "}
            <strong>workshop ticket</strong> — this is separate from the main IROS
            2026 conference registration.{" "}
            <a
              href="https://2026.ieee-iros.org/attend/registration/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register for IROS 2026
            </a>
            .
          </>
        }
        type="info"
        showIcon={false}
        style={{ marginTop: "1em" }}
      />
      <Alert
        message={
          <>
            <strong>Submissions closed.</strong> Thank you to everyone who
            submitted an extended abstract. Decisions will be communicated by
            email; please watch your inbox (including spam) for the notification
            of acceptance on <strong>September 4th, 2026</strong>.
          </>
        }
        type="info"
        showIcon={false}
        style={{ marginTop: "0.75em" }}
      />

      {/* Hero */}
      <div className={style.hero}>
        <div className={style.heroOverlay} />
        <div className={style.heroLogos}>
          <img
            src="/images/iros2026/logos/ieee-wordmark.png"
            alt="IEEE"
          />
          <img
            src="/images/iros2026/logos/ieee-ras.png"
            alt="IEEE Robotics & Automation Society"
          />
          <img
            src="/images/iros2026/logos/rsj.png"
            alt="The Robotics Society of Japan"
          />
        </div>
        <div className={style.heroContent}>
          <span className={style.heroBadge}>Space Robotics Workshop · IROS 2026</span>
          <h1 className={style.heroTitle}>
            Space Exploration and Sustained Operations Beyond Earth
          </h1>
          <p className={style.heroSubtitle}>
            A technically grounded forum convening the space and terrestrial robotics
            communities around the challenges of exploration and sustained operations
            beyond Earth — from lunar and planetary surfaces to orbit.
          </p>
          <div className={style.heroMeta}>
            <div className={style.heroMetaItem}>
              <div className={style.heroMetaLabel}>Conference</div>
              <div className={style.heroMetaValue}>IEEE/RSJ IROS 2026</div>
            </div>
            <div className={style.heroMetaItem}>
              <div className={style.heroMetaLabel}>Location</div>
              <div className={style.heroMetaValue}>Pittsburgh, PA, USA</div>
            </div>
            <div className={style.heroMetaItem}>
              <div className={style.heroMetaLabel}>Dates</div>
              <div className={style.heroMetaValue}>September 27th, 2026</div>
            </div>
          </div>
        </div>
      </div>

      <Section title="Overview">
        <p>
          Robotic systems are becoming central to the next decade of space activity:
          NASA's Artemis lunar campaign and broader Moon-to-Mars architecture; the growing
          roles of ESA, JAXA, and other agencies in lunar exploration infrastructure; and
          expanding commercial capabilities beyond Earth orbit all demand higher levels of
          autonomy, adaptability, and human-robot teaming. In parallel, terrestrial
          robotics is advancing rapidly through an explosion in AI capabilities, cheaper
          and better sensors and compute, and improved sim-to-real transfer — creating a
          timely opportunity to translate these advances into more capable and robust
          space robotic systems.
        </p>
        <p>
          This workshop convenes the space robotics and terrestrial robotics communities
          around the challenges and opportunities that most directly impact exploration and
          sustained operations beyond Earth. It focuses on robotic systems that support
          lunar and planetary missions, astronaut assistance, surface infrastructure,
          logistics, and other mission-enabling capabilities in extreme environments.
        </p>
        <p>
          Compared to prior space robotics events, this workshop is framed around the
          broader challenge of enabling exploration and sustained operations beyond Earth,
          rather than a single domain or technical area. It brings together multiple
          domains under one umbrella, with an applied emphasis on mission use, integration
          constraints, and validation.
        </p>

        <SubSection title="Objectives">
          <div className={style.infoCards}>
            {objectives.map(obj => (
              <div className={style.infoCard} key={obj.title}>
                <div className={style.infoCardTitle}>{obj.title}</div>
                <div className={style.infoCardText}>{obj.text}</div>
              </div>
            ))}
          </div>
        </SubSection>
      </Section>

      <Section title="Timeline">
        <Steps progressDot current={getCurrentTimelineStep()} direction="vertical">
          <Step
            title={stepTitle(0, "Call for extended abstracts opens")}
            description="June 12th, 2026"
          />
          <Step
            title={stepTitle(1, "Submission deadline")}
            description={
              <>
                <s>August 14th, 2026</s>
                <br />
                <strong>Extended: August 21st, 2026, 11:59 PM (AoE)</strong>
              </>
            }
          />
          <Step
            title={stepTitle(2, "Notification of acceptance")}
            description="September 4th, 2026"
          />
          <Step
            title={stepTitle(3, "Camera-ready deadline")}
            description="September 18th, 2026"
          />
          <Step
            title={stepTitle(4, "Space Robotics Workshop at IROS 2026")}
            description={
              <>
                <a
                  href="https://www.pittsburghcc.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  David L. Lawrence Convention Center
                </a>
                <br />
                Pittsburgh, PA, USA
                <br />
                September 27th, 2026
              </>
            }
          />
        </Steps>
      </Section>

      <Section title="Invited Speakers">
        <div className={style.speakersGrid}>
          {speakers.map(person => (
            <SpeakerCard key={person.name} person={person} />
          ))}
        </div>
      </Section>

      <Section title="Agenda">
        <p>
          <strong>All times are in Eastern Time (ET).</strong>
        </p>

        <Timeline>
          {agenda.map(item => (
            <Timeline.Item
              key={`${item.time}-${item.title}`}
              className={item.isBreak ? style.agendaBreakItem : undefined}
              color={item.isBreak ? "#9aa3af" : undefined}
            >
              <div className={item.isBreak ? style.agendaBreak : undefined}>
                <b>{item.title}</b>
                <br />
                <Time time={item.time} />
                {item.description ? (
                  <>
                    <br />
                    {item.description}
                  </>
                ) : null}
                {item.speakers && item.speakers.length > 0 ? (
                  <AgendaSpeakers speakers={item.speakers} />
                ) : null}
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
      </Section>

      <Section title="Call for Contributions">
        <p>
          The organizing committee invites high-quality contributions advancing robotics
          for exploration, operation, construction, and sustained activity beyond Earth.
          We invite extended abstracts (2–4 pages) on topics including but not limited
          to:
        </p>

        <ul>
          {contributionTopics.map(topic => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>

        <p>
          Submissions will be evaluated based on technical merit and innovation,
          relevance to space robotics and sustained operations beyond Earth, clarity of
          presentation, and potential impact on the field. All submissions will undergo
          double-blind peer review. Please anonymize your manuscript by removing author
          names and affiliations and avoiding identifying self-references.
        </p>

        <p>
          The workshop is non-archival: accepted submissions will not appear in IEEE
          proceedings, and authors retain full rights to submit their work elsewhere.
          Work in progress and concurrently submitted work are welcome.
        </p>

        <SubSection title="Submission guidelines">
          <ul>
            <li>Extended abstracts may be up to 4 pages, including references.</li>
            <li>
              Submissions must be in PDF format (up to 10 MB) and must follow the
              official IEEE RAS double-column template. You can find the templates on
              the{" "}
              <a
                href="https://ras.papercept.net/conferences/support/support.php"
                target="_blank"
                rel="noopener noreferrer"
              >
                official IEEE RAS template page
              </a>{" "}
              or via the{" "}
              <a
                href="https://2026.ieee-iros.org/contribute/call-for-papers/"
                target="_blank"
                rel="noopener noreferrer"
              >
                IROS 2026 call for papers guidelines
              </a>
              .
            </li>
            <li>
              All submissions must be made through OpenReview.{" "}
              <a
                href="https://openreview.net/group?id=IEEE.org/IROS/2026/Workshop/SRW"
                target="_blank"
                rel="noopener noreferrer"
                className={style.submissionLink}
              >
                Here&apos;s the submission link
              </a>
              .
            </li>
            <li>
              Authors of accepted submissions may optionally provide a 2–3 minute
              video presentation. Instructions will be provided after
              notification.
            </li>
            <li>
              Accepted submissions will be presented as posters. A selected subset will
              also be invited to give short oral presentations. Best Contribution
              <sup>*</sup> and Best Oral Presentation<sup>**</sup> awards will be
              presented at the workshop.
            </li>
            <li>
              Camera-ready versions of accepted submissions will be published on the
              workshop website. At least one author must register for the workshop and
              present the poster in person.
            </li>
          </ul>
          <p>
            <sup>*</sup> Best Contribution recognizes the strongest technical work,
            based on the extended abstract, poster, and overall relevance to the
            workshop themes.
          </p>
          <p>
            <sup>**</sup> Best Oral Presentation recognizes the strongest live
            communication among the selected oral presenters.
          </p>
        </SubSection>

        <p>
          <strong>For submission-related questions, please contact the Program Chairs:</strong>
        </p>
        <ul>
          <li>
            Andres Mora:{" "}
            <a href="mailto:andres.moravargas@nasa.gov">andres.moravargas@nasa.gov</a>
          </li>
          <li>
            Pyojin Kim:{" "}
            <a href="mailto:pjinkim@gist.ac.kr">pjinkim@gist.ac.kr</a>
          </li>
        </ul>
      </Section>

      <Section title="Expected Audience">
        <p>
          The workshop targets researchers and practitioners working on planetary robotics
          and autonomy for extreme surface environments (Moon, Mars, and other planetary
          bodies), along with the broader IROS community developing enabling methods that
          translate to deep-space missions. Expected backgrounds include surface mobility
          and terramechanics, contact-rich manipulation and sampling, perception /
          localization / mapping under degraded sensing, planning and control for
          long-horizon autonomy, multi-robot and heterogeneous teaming, fault management
          and assurance, and human-robot teaming.
        </p>
        <p>
          We explicitly engage the <strong>IEEE RAS Technical Committee on Space
          Robotics</strong> and closely related communities (Field Robotics, Robotic
          Vision, SLAM, Mobile Manipulation, Multi-Robot Systems, and HRI), as well as
          government agencies and the Pittsburgh-area robotics and space ecosystem
          (e.g., Astrobotic, Field.AI, and Carnegie Mellon University).
        </p>
      </Section>

      <Section title="Organizers">
        <p>
          The Space Robotics Workshop is a volunteer-led effort by researchers and
          practitioners in robotics, autonomy, and AI from across academia, government, and
          industry.
        </p>
        <SubSection title="Organizing Committee">
          <div className={style.organizerGrid}>
            {organizers.map(person => (
              <OrganizerCard key={person.name} person={person} />
            ))}
          </div>
        </SubSection>
      </Section>

      <Section title="Sponsors">
        <p>
          We are grateful to the organizations whose support helps make the Space
          Robotics Workshop possible.
        </p>
        <div className={style.sponsorGrid}>
          {sponsors.map(sponsor => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className={style.sponsorLink}
            >
              <img src={sponsor.logo} alt={sponsor.name} className={style.sponsorLogo} />
            </a>
          ))}
        </div>
      </Section>

      <Section title="Contact">
        <div className={style.contactBox}>
          <p style={{ marginBottom: 0 }}>
            For sponsorship, participation, or other inquiries please contact{" "}
            <a href="mailto:hello@space-robots.org?subject=SRW%20%40%20IROS%202026">
              hello@space-robots.org
            </a>{" "}
            with the subject line <strong>SRW @ IROS 2026</strong>.
          </p>
        </div>
      </Section>
    </PageWrapper>
  </>
);

export default Iros2026Page;
