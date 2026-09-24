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
    name: "Yusuke Tanaka",
    affiliation: "ETH Zurich",
    photo: "/images/iros2026/people/yusukeTanaka.jpg",
    url: "https://yusuke-tanaka.org/",
  },
  {
    name: "Rob Ambrose",
    affiliation: "Texas A&M University",
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
    affiliation: "NASA Johnson Space Center",
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
    photo: "/images/iros2026/people/ignacioGLopezFrancos.png",
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
    photo: "/images/iros2026/people/marcelKaufmann.jpeg",
    url: "https://www.linkedin.com/in/kaufmann-space",
  },
  {
    name: "Brian Coltin",
    affiliation: "NASA ARC / KBR",
    photo: "/images/iros2026/people/brianColtin.jpg",
    url: "https://brian.coltin.org/",
  },
  {
    name: "Roshan Kalghatgi",
    affiliation: "NASA ARC / KBR",
    photo: "/images/iros2026/people/roshanKalghatgi.png",
    url: "https://www.linkedin.com/in/roshankalghatgi/",
  },
  {
    name: "Hiro Ono",
    affiliation: "NASA JPL / Georgia Tech",
    photo: "/images/iros2026/people/hiroOno.jpg",
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
    photo: "/images/iros2026/people/pyojinKim.jpeg",
    url: "https://mpil-gist.github.io/",
  },
];

type Sponsor = {
  name: string;
  logo: string;
  url: string;
};

type SponsorTier = {
  platinum: Sponsor[];
  gold: Sponsor[];
};

const sponsors: SponsorTier = {
  platinum: [
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
  ],
  gold: [
    {
      name: "ERC-TRIPS Engineering Research Center",
      logo: "/images/iros2026/sponsors/erc-trips.png",
      url: "https://erc-trips.re.kr/",
    },
  ],
};

const supportingOrganizations: Sponsor[] = [
  {
    name: "IEEE RAS Technical Committee for Space Robotics",
    logo: "/images/iros2026/sponsors/ras-tc-sr.png",
    url: "https://www.ieee-ras.org/space-robotics/",
  },
  {
    name: "IEEE RAS Technical Committee for Robot Learning",
    logo: "/images/iros2026/sponsors/ras-tc-rl.png",
    url: "https://www.ieee-ras.org/robot-learning/",
  },
  {
    name: "NASA",
    logo: "/images/iros2026/sponsors/nasa.png",
    url: "https://www.nasa.gov/",
  },
];

type AgendaSpeaker = {
  name: string;
  affiliation: string;
  photo?: string;
  role?: string;
  bio?: string[];
};

type AgendaItem = {
  title: string;
  time: string;
  kind?: string;
  isBreak?: boolean;
  description?: string;
  abstract?: string[];
  speakers?: AgendaSpeaker[];
  papers?: { title: string; authors: string }[];
};

const agenda: AgendaItem[] = [
  {
    title: "Opening Remarks",
    time: "8:30 – 8:35 AM",
    speakers: [
      {
        name: "Ignacio G. López-Francos",
        affiliation: "SETI Institute / UT Austin",
        photo: "/images/iros2026/people/ignacioGLopezFrancos.png",
      },
    ],
  },
  {
    kind: "Keynote",
    title: "Similitude Techniques for Correlating Lunar Rover Performance with Earth Testing",
    time: "8:35 – 9:00 AM",
    speakers: [
      {
        name: "Rob Ambrose",
        affiliation: "Texas A&M University",
        photo: "/images/iros2026/people/robAmbrose.jpg",
        bio: [
          "Rob Ambrose is a University Distinguished Professor of Mechanical Engineering at Texas A&M University, Associate Director of the Texas A&M Space Institute, and Director for Space and Robotics Initiatives at the Texas A&M Engineering Experiment Station. Before joining Texas A&M, he spent more than two decades at NASA Johnson Space Center, where he served as Chief of the Software, Robotics and Simulation Division and helped lead the development of systems including Robonaut, Valkyrie, and multiple lunar rover concepts. He is a member of the National Academy of Engineering, and his research focuses on robotic manipulation, mobility, and space robotics.",
        ],
      },
    ],
  },
  {
    kind: "Invited Talk",
    title: "From Constellation Coordination to Mission-Scale Digital Twins",
    time: "9:00 – 9:25 AM",
    abstract: [
      "Coordinated space missions require spacecraft to make decisions with incomplete information while their opportunities to observe and interact change along their orbits. This talk presents research from the Space-FALCON Lab on distributed state estimation and constellation control, and examines how these capabilities can support autonomy across an entire mission. The talk will introduce SpaceAGORA.jl, a modular simulation framework for developing and evaluating spacecraft guidance, navigation, and control, and discuss how it connects individual algorithms to realistic mission scenarios. Examples from spacecraft coordination and proximity operations will motivate the development of mission-scale digital twins that link physical models with observations and experiments to assess the consequences of autonomous decisions. It will also discuss the role of flight data and hardware experiments in building confidence in these models, and the challenges of keeping human operators informed and involved as mission complexity grows.",
    ],
    speakers: [
      {
        name: "Giusy Falcone",
        affiliation: "University of Michigan",
        photo: "/images/iros2026/people/giusyFalcone.jpg",
        bio: [
          "Giusy Falcone is an Assistant Professor of Aerospace Engineering at the University of Michigan, where she founded and directs the Space-FALCON Lab. Her research connects flight mechanics, guidance and control, and autonomous decision-making to enable adaptive space missions. She studies spacecraft and constellation coordination under uncertainty and develops simulation tools for evaluating mission behavior, including SpaceAGORA.jl. She earned her Ph.D. in Aerospace Engineering at the University of Illinois Urbana-Champaign in 2022 and was a postdoctoral researcher at Carnegie Mellon University’s Robotics Institute before joining Michigan.",
        ],
      },
    ],
  },
  {
    kind: "Invited Talk",
    title: "TRUSSES: Temporarily, Robots Unite to Surmount Sandy Entrapments, then Separate",
    time: "9:25 – 9:50 AM",
    abstract: [
      "Robots exploring extraterrestrial environments will need to be able to robustly traverse the environment and recover from a number of hazards, including sinkage, slippage, and entrapment in the ground. As part of a recent LuSTR project, we have developed methods for teams of robots to jointly overcome hazards by attaching to each other to form larger and more stable, maneuverable structures. In this talk, I will show some results of this project and discuss our approach to giving robots the ability to sense ground interactions, estimate traversal risk, and plan safe motions, even in the presence of loose, treacherous terrain.",
    ],
    speakers: [
      {
        name: "Cynthia Sung",
        affiliation: "University of Pennsylvania",
        photo: "/images/iros2026/people/cynthiaSung.jpg",
        bio: [
          "Cynthia Sung is an Associate Professor in the Department of Mechanical Engineering and Applied Mechanics (MEAM) and a member of the General Robotics, Automation, Sensing & Perception (GRASP) Lab at the University of Pennsylvania. She completed a Ph.D. (2016) in Electrical Engineering and Computer Science at MIT and a B.S. (2011) in Mechanical Engineering at Rice University. Her research interest is computational design and fabrication for robotic systems, with a particular focus on origami-inspired and compliant robots. She is the recipient of a 2023 ONR Young Investigator Award, a 2019 NSF CAREER Award, a 2020 Johnson & Johnson Women in STEM2D Scholars Award, and a 2017 Popular Mechanics Breakthrough Award.",
        ],
      },
    ],
  },
  {
    kind: "Industry Lightning Talk",
    title: "Shadow Voyager: A Semi-Autonomous Rover for Lunar Ice Mining",
    time: "9:50 – 9:55 AM",
    abstract: [
      "Starpath was founded by former SpaceX engineers to use robots and ISRU to enable human settlement of the Moon and Mars. Starpath is developing the Shadow Voyager rover to mine water ice from permanently shadowed regions (PSRs) of craters at the Lunar South Pole, as well as the chemical plant to refine the ice into LOX for propellant and the vertical solar array to power the plant. Shadow Voyager uses LIDAR sensors, an IMU, a star tracker, and fine sun sensors for semi-autonomous waypoint navigation within line-of-sight and fully autonomous navigation beyond line-of-sight.",
      "We’re currently developing the Shadow Voyager R9 prototype at our ATLANTIS (Autonomous Technology Lunar Analog Navigation Test and Integration Site) in the Mojave Desert, while building the near-flight-ready R11 prototype, with the goal of having a flight-ready rover by Q4 2027. We’re also working with NASA’s Ames Research Center and Goddard Space Flight Center on the HELION (High-speed Exploration using LIDAR for Intelligent Onboard Navigation) project to develop high-speed navigation capabilities for autonomous lunar rovers.",
    ],
    speakers: [
      {
        name: "Brian Yamauchi",
        affiliation: "Starpath",
        photo: "/images/iros2026/people/brianYamauchi.jpg",
        bio: [
          "Brian Yamauchi is the Head of Software Engineering at Starpath, a New Space company building an end-to-end system for mining ice on the Moon and producing LOX to refuel landers. He leads the team developing the autonomy, teleoperation, and communications software for the Shadow Voyager rover. Previously, he was a Principal Roboticist at both Boston Dynamics and iRobot, and he has over 30 years of experience developing robots for commercial, defense, and space applications. Before that, he was a Robotics Engineer at NASA’s Kennedy Space Center and a Research Associate at the US Naval Research Laboratory. He holds a B.S. in Applied Math/Computer Science from Carnegie Mellon University, an M.S. in Computer Science from the University of Rochester, and a Ph.D. in Computer Science from Case Western Reserve University.",
        ],
      },
    ],
  },
  {
    kind: "Invited Talk",
    title:
      "GITAI’s Approach to Spacecraft Development: Agile, Vertically Integrated Development Built on Experience in Terrestrial Robotics",
    time: "9:55 – 10:10 AM",
    abstract: [
      "GITAI is a vertically integrated space company delivering scalable LEO satellite constellation platforms for interceptor, on-orbit servicing, communications, and observation missions. A key strength of GITAI is its in-house development of core technologies, enabling tight integration and rapid iteration across spacecraft systems.",
      "Coming from terrestrial robotics rather than the traditional space industry, GITAI brings a different development mindset, unconstrained by some conventional assumptions and practices. Building on this experience, we apply an agile, highly iterative approach based on rapid cycles of design, build, test, and failure — what we call “crush & build.”",
      "In this talk, I will introduce GITAI’s approach to accelerating spacecraft development, accompanied by videos from our latest development and testing efforts.",
    ],
    speakers: [
      {
        name: "Yuto Nakanishi",
        affiliation: "GITAI",
        photo: "/images/iros2026/people/yutoNakanishi.jpg",
        bio: [
          "Yuto Nakanishi is Chief Robotics Officer of GITAI. For nearly eight years at GITAI, he has worked to bring development practices and engineering know-how cultivated in terrestrial robotics into spacecraft development, helping establish GITAI’s agile and vertically integrated development approach. He was previously Founder & CEO of SCHAFT. After serving as a research associate at the University of Tokyo Graduate School of Information Science and Technology (JSK Lab), he founded the bipedal robotics startup SCHAFT, which won the DARPA Robotics Challenge Trials in 2013. He later sold the company to Google and led the Tokyo bipedal robotics platform development team at Google X for five years.",
        ],
      },
    ],
  },
  {
    title: "Contributed Paper Spotlights",
    time: "10:10 – 10:30 AM",
    papers: [
      {
        title: "Dynamic Symmetry for Orientation-Independent Planetary Mobility",
        authors: "Boxi Xia, Jiaxun Liu, Boyuan Chen",
      },
      {
        title:
          "In-Situ Reconstruction of the International Space Station Using 3D Gaussian Splatting and Astrobee",
        authors: "Hudson Kim, Ryan Soussan, Brian Coltin, Jordan Kam",
      },
      {
        title:
          "Bridging the Scale Gap: Cross-View Localization from Dense Rover LiDAR to Coarse Lunar DEMs",
        authors:
          "Seongwon Kim, Minseok Song, Seonmo Yang, Soumyadeep Chatterjee, Ryan Soussan, Seokju Lee, Pyojin Kim",
      },
      {
        title:
          "Rethinking Learned Occupancy in Autonomous Active Mapping with Observation-Gated Filtering",
        authors: "Jiahui Zhang, Bonian Han, Gongbo Liang, Yu Zhang",
      },
    ],
  },
  {
    title: "Coffee Break + Poster Session",
    time: "10:30 – 11:00 AM",
    isBreak: true,
  },
  {
    kind: "Invited Talk",
    title: "Lunar Leaper: Agile Legged Locomotion on the Moon",
    time: "11:00 – 11:25 AM",
    abstract: [
      "Legged robots have demonstrated unique traversability and robust locomotion capabilities in terrestrial environments. Extending these capabilities to extraterrestrial applications, such as lunar exploration, however, introduces substantial challenges in both mechanical design and control under tightly constrained mass, power, mechanical, and onboard-computing resources. Unlike terrestrial systems, space robotic hardware must accommodate stringent thermal-management and environmental-protection requirements associated with vacuum, extreme temperature variations, abrasive dust, radiation, and launch-induced shock and vibration. At the same time, locomotion on lunar regolith introduces highly variable and uncertain terrain interactions, placing additional demands on robust control.",
    ],
    speakers: [
      {
        name: "Yusuke Tanaka",
        affiliation: "ETH Zurich",
        photo: "/images/iros2026/people/yusukeTanaka.jpg",
        bio: [
          "Yusuke Tanaka is a postdoctoral researcher at ETH Zurich’s Robotic Systems Lab (RSL) under Prof. Marco Hutter, where he works on legged robotic systems for terrestrial and extraterrestrial applications. He received his Ph.D. in Robotics from UCLA, where he worked at the Robotics and Mechanisms Laboratory on multi-limbed and climbing robots.",
          "His research focuses on mechanical-intelligence-aware robotic systems for extreme environments, including limbed climbing robots, multimodal robotic systems, and dynamic legged robots for lunar exploration. At ETH Zurich, he serves as a robotics lead for the LunarLeaper project, developing dynamic legged mobility technologies for future lunar missions.",
        ],
      },
    ],
  },
  {
    kind: "Invited Talk",
    title: "AI Robotics for Sustainable Space Exploration",
    time: "11:25 – 11:50 AM",
    abstract: [
      "The global space sector is moving toward the New Space era, driven by commercialization and resource exploitation, where AI robotics will play central roles and be directly responsible for meeting stringent requirements in cost, operability, reusability, and sustainability of long-lived assets in harsh space environments. This talk will present recent research and technology development involving AI-powered algorithmic and mechanism design, ranging from spacecraft GNC to astronaut assistive robotics.",
    ],
    speakers: [
      {
        name: "Yang Gao",
        affiliation: "Hong Kong University of Science and Technology",
        photo: "/images/iros2026/people/yangGao.jpg",
        bio: [
          "Professor Yang Gao, FIET FRAeS, has over 20 years of R&D and space mission experience, including ESA’s ExoMars, Proba-3, and lunar VMMO; the UK’s CLEAR, MoonLITE, and Moonraker; and China’s Chang’E-3/-8. She has led research projects for ESA, UKSA, UKRI, the EU, and industrial companies. Research under her leadership has won the IAF 3AF Edmond Brun Silver Medal (2013), the COSPAR Outstanding Paper Award (2016), the ESA SysNova Challenge First Prize (2018), the IEEE-ICRA Space Workshop Wiley Poster Award First Prize (2020), and the Sino-UK Entrepreneurship Competition First Prize (2022), among others. She served as Co-Chair of the IEEE-RAS Space Robotics Technical Committee for 2022–2025 and is an IEEE-RAS Distinguished Lecturer for 2026–2028.",
          "Professor Gao spent over 20 years (2004–2025) in the UK as Professor of Robotics and Director of the Robotics Centre at King’s College London. Earlier, as Professor of Space Autonomous Systems at the University of Surrey, she founded and led the award-winning Space Technology and Autonomous Robotic systems Laboratory (STAR-LAB).",
          "She joined HKUST in mid-2025 as a Global STEM Professor. At HKUST, she founded the Centre for AI and Robotics in Space Sustainability (CAIRSS), dedicated to developing technologies for orbital debris removal, autonomous space systems, and in-situ extraterrestrial resource utilization for crewed and uncrewed deep space missions. She is also Co-Director of HKUST’s Space Science & Technology Institute and Director of the InnoHK Hong Kong Space Robotics & Energy Centre.",
        ],
      },
    ],
  },
  {
    kind: "Panel Discussion",
    title: "Next-Gen Lunar Robotics: Building and Sustaining a Moon Base",
    time: "11:50 AM – 12:20 PM",
    abstract: [
      "Building and sustaining a human presence on the Moon will require a new generation of robots that can move beyond one-off demonstrations to survive and perform useful work as part of day-to-day surface operations. These systems will need to operate reliably over time, adapt to the lunar environment, and work effectively with crews and mission operators. This panel will examine what it takes to turn promising prototypes into operational systems, and how researchers, companies, and mission organizations can work together to make next-generation lunar robotics a practical foundation for a Moon base.",
    ],
    speakers: [
      {
        name: "Yuto Nakanishi",
        affiliation: "GITAI",
        photo: "/images/iros2026/people/yutoNakanishi.jpg",
        bio: [
          "Chief Robotics Officer of GITAI. His experience spans humanoid and legged robotics, on-orbit robotic systems, and commercial space robotics, bringing a deployment-focused perspective on building machines that can perform useful work beyond Earth.",
        ],
      },
      {
        name: "Emma Zemler",
        affiliation: "NASA Johnson Space Center",
        photo: "/images/iros2026/people/emmaZemler.jpg",
        bio: [
          "Project Manager of Dexterous Robotics at NASA Johnson Space Center. She brings the mission-integration perspective: how operational needs, environments, requirements, and challenge problems can be translated into productive collaboration with the broader robotics community, and what promising technologies must demonstrate to become relevant to future lunar operations.",
        ],
      },
      {
        name: "Brian Yamauchi",
        affiliation: "Starpath",
        photo: "/images/iros2026/people/brianYamauchi.jpg",
        bio: [
          "Head of Software Engineering at Starpath, developing lunar surface systems with an emphasis on real hardware, field testing, and infrastructure-oriented use cases. He brings a commercial operator’s perspective on iteration speed, reliability, economics, and the path from prototype to sustained utility on the Moon.",
        ],
      },
      {
        name: "Yashwanth Nakka",
        affiliation: "Georgia Tech",
        photo: "/images/iros2026/people/yashwanthNakka.jpg",
        bio: [
          "Assistant Professor of Aerospace Engineering and Director of the Aerospace Robotics Laboratory at Georgia Tech. His research focuses on autonomous aerospace systems, multi-robot collaboration, and planning and control under uncertainty. Previously a Robotics Technologist at NASA JPL, where he led planning, controls, and estimation tasks on CADRE, EELS, and DARPA LINC, he brings an academic perspective grounded in hardware validation and trustworthy robotic systems for lunar operations.",
        ],
      },
    ],
  },
  {
    title: "Awards + Closing Remarks",
    time: "12:20 – 12:30 PM",
    description:
      "Best Paper, Runner-Up Paper, Best Oral Presentation, and Best Poster.",
  },
  {
    title: "Lunch",
    time: "12:30 PM",
    isBreak: true,
    description: "Details TBD.",
  },
];

type AcceptedPaper = {
  title: string;
  authors: string;
  oral?: boolean;
};

const acceptedSubmissions: AcceptedPaper[] = [
  {
    title: "Dynamic Symmetry for Orientation-Independent Planetary Mobility",
    authors: "Boxi Xia, Jiaxun Liu, Boyuan Chen",
    oral: true,
  },
  {
    title:
      "In-Situ Reconstruction of the International Space Station Using 3D Gaussian Splatting and Astrobee",
    authors: "Hudson Kim, Ryan Soussan, Brian Coltin, Jordan Kam",
    oral: true,
  },
  {
    title:
      "Bridging the Scale Gap: Cross-View Localization from Dense Rover LiDAR to Coarse Lunar DEMs",
    authors:
      "Seongwon Kim, Minseok Song, Seonmo Yang, Soumyadeep Chatterjee, Ryan Soussan, Seokju Lee, Pyojin Kim",
    oral: true,
  },
  {
    title:
      "Rethinking Learned Occupancy in Autonomous Active Mapping with Observation-Gated Filtering",
    authors: "Jiahui Zhang, Bonian Han, Gongbo Liang, Yu Zhang",
    oral: true,
  },
  {
    title:
      "Proprioceptive Learning-Based Nonlinear Control for Planetary Rover Navigation",
    authors: "Umesh Krishna Ponugupati, Yashwanth Kumar Nakka",
  },
  {
    title:
      "Alakananda: A ROS 2-Enabled Modular Mars Rover for Field and Astrobiological Exploration",
    authors:
      "Manish Jain, Jay Dhamija, Rhitam Dutta, Pranjay Dhawan, Ekam Singh, Mrinal Sood, Sachin Kansal, Ashish Singla",
  },
  {
    title:
      "Distributionally Robust Adaptive Iterative Covariance Steering for Small-Body Proximity Operations",
    authors: "Vivek Khatana, Aditya Gahlawat, Naira Hovakimyan, Petros G. Voulgaris",
  },
  {
    title: "A Robotic Lunar Lava Cave Explorer and Mission",
    authors: "Gilly Elor, William C. Stone",
  },
  {
    title:
      "The Autonomy–Avionics Trade-Off: Architectural Choices for Lunar Lava Tube Exploration Robots",
    authors: "Olga Ton",
  },
  {
    title: "Vision-based Detection and Tracking for Unknown Active Debris Removal",
    authors: "Huiji Yang, Yang Gao, Nicola Y. Bailey",
  },
  {
    title:
      "Towards Reinforcement Learning for Space Robotics: Fast Training and Reliable Real-World Transfer",
    authors:
      "Abhishek Naik, Michael Wu, Michael O'Sullivan, Colin Bellinger, Yunli Wang",
  },
  {
    title:
      "Offline Relevance Is Not Recovery: Seed-Dependent Small Language Model Policies for Spacecraft Fault Management",
    authors: "Geunwoo Park",
  },
  {
    title:
      "Craters as Constellations: Adapting Star Identification to Lunar Crater Identification",
    authors: "Jeongbin Sohn, Hyunsung Kim, Pyojin Kim, Seokju Lee",
  },
  {
    title:
      "Continuous Celestial Attitude Estimation for Lunar Rover Motion via Relative Tracking and Catalog Re-Anchoring",
    authors: "Jina Lee, Dowan Gwon, Uland Wong, Pyojin Kim",
  },
  {
    title:
      "Grounding Lunar Rover Simulation in Hardware, Physics, and Topography for Energy-Constrained Autonomy",
    authors: "Minseok Song, Sumin Lee, Junseo Moon, Seokju Lee",
  },
  {
    title:
      "Design of a Compact Dual-Sided Rover with Hybrid Compliance for Planetary Exploration",
    authors:
      "Junseo Moon, Hyunsung Kim, Minseok Song, Sunwoo Mun, Hyeonseok Jin, Seokju Lee",
  },
  {
    title:
      "Toward Evidence-Driven Human-Agent-Robot Teaming for Earth-Independent Anomaly Triage",
    authors: "Ignacio G. López-Francos, Alexis Gallagher, Samira Shalal",
  },
  {
    title: "Gravity as an Evolutionary Design Pressure for Legged Robot Mobility",
    authors: "Naomi Oke, Aja Mia Carter, Aaron M. Johnson",
  },
  {
    title:
      "The Evolution of a Swerve-Steer Robot with Dual-arm Manipulation for Multi-agent Space Applications",
    authors:
      "Andrew Sharp, Valentina Larina, Saesha Loonker, Mitch Pryor, Hallie Brass, Gloria Wang",
  },
  {
    title:
      "Beyond Hazard Reduction: Progress-Aware Evaluation and Off-Policy Supervision for Lunar Rover Safety Screens",
    authors: "Kevin Huang, Sunghyun Darian Park, Ishan Wazir",
  },
  {
    title:
      "Toward Froude-Number-Based Gait Switching for Humanoid Locomotion Control in Lunar Gravity",
    authors: "Jack Anders Smitterberg, Tan Chen",
  },
  {
    title:
      "Gait-Level Parameters and Performance Trade-offs in Grasp-Based Microgravity Locomotion",
    authors: "Chaerim Moon, Justin K. Yim",
  },
  {
    title:
      "Benchmarking Remote Sensing Deep Learning Models on Edge Computing Hardware",
    authors:
      "Joao Passos, Jiho Lee, Maxwell Kenny, Alberto Candela, Emily R. Dunkel, Steve Chien",
  },
  {
    title: "World-Model-Accelerated Planning for Lunar Dry Stone Stacking",
    authors: "Xuandong Liang, Rongyu Li, Xue Wan, Yang Gao, Qi Zhao, Yu He, Xuzhi Li",
  },
  {
    title:
      "Resource Prospecting for Extraterrestrial Subsurface Environments Using Unmanned Ground Vehicles",
    authors:
      "Nathaniel Rose, Hannah Chuang, Emanuel Gutierrez-Cornejo, Manuel A. Andrade-Rodriguez, Rishi Parashar, Dani Or, Parikshit Maini",
  },
  {
    title:
      "Lunar Cable-Driven Excavation Robot for Surface Construction with Load Characterization",
    authors: "Zahir Castrejon",
  },
  {
    title:
      "A Synthetic Terrain Data Generation Pipeline for Testing Perception on the Next-Gen Mars Helicopter",
    authors: "Deon F. Petrizzo, Adam Johnson",
  },
  {
    title:
      "A Deployable Four-Finger Payload for Teleoperated Free-Flying Manipulation with Astrobee",
    authors:
      "William Su, Jordan Kam, Yunosuke Nakamura, Yixiao Wang, Jianshu Zhou, Masayoshi Tomizuka",
  },
  {
    title:
      "AWM: All Wheel Morph for Continuous Wheel-Leg Morphing for Terrain Adaptive Locomotion",
    authors: "Jayden Chen, Shashwat Singh, Zeynep Temel",
  },
  {
    title: "Illumination-Aware Active Perception for Spacecraft Inspection",
    authors: "Sagarika Rao Valluri, Benjamin Riviere",
  },
  {
    title:
      "Safe-by-design Reinforcement Learning with CBF-Derived Admissible Action Sets: Experimental Validation on a Satellite Emulator",
    authors:
      "Nektarios Aristeidis Tafanidis, Sathyanarayanan Seshasayanan, Avijit Banerjee, George Nikolakopoulos",
  },
  {
    title:
      "Vision Foundation Models with Synthetic-Only Training for Monocular Spacecraft Pose Estimation",
    authors: "John Church, Vazghen Nikolian",
  },
  {
    title:
      "What Visual-Inertial Navigation Costs on Radiation-Tolerant Hardware: Compute Characterisation of a RISC-V and FPGA Lunar Rover Navigation Subsystem at Preliminary Design",
    authors: "Alexey Simonov, Sergio Fabian Sirota, Yusra Alkendi",
  },
  {
    title:
      "Toward Qualified Soft Actuators for Space: Stratospheric Flight and Gamma Radiation Testing of Dielectric Elastomer Actuators",
    authors: "Anatol Mateusz Gogoj, Mihai Duduta",
  },
  {
    title:
      "Escape Without a Recipe: Maneuver-Agnostic Mars Rover Recovery from Granular Entrapment",
    authors:
      "Meraj Hossain Promit, Chandak Chakma, Md Jubair Ahmed Sourov, Sejuti Rahman",
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

const dayOfFacts: { label: string; value: string }[] = [
  { label: "Date", value: "Sunday, Sept. 27" },
  { label: "Time", value: "8:30 AM – 12:30 PM ET" },
  { label: "Room", value: "335, Level 3" },
  { label: "Venue", value: "David L. Lawrence Convention Center" },
];

const dayOfLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Venue Map", href: "https://2026.ieee-iros.org/program/venue_map/", external: true },
  { label: "Agenda", href: "#agenda" },
  { label: "Accepted Papers", href: "#accepted-papers" },
  { label: "IROS Registration", href: "https://2026.ieee-iros.org/attend/registration/", external: true },
  { label: "Space Robotics Social", href: "https://luma.com/m1oc5nev", external: true },
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

const stepTitle = (index: number, label: string) => {
  const current = isCurrentStep(index);
  return (
    <span
      style={{
        fontWeight: current ? 700 : 400,
        color: current ? "#1a1a1a" : "#8b93a1",
      }}
    >
      {label}
    </span>
  );
};

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

const TalkDetails = (props: { item: AgendaItem }) => {
  const { item } = props;
  const withBio = (item.speakers ?? []).filter(speaker => speaker.bio);
  if (!item.abstract && withBio.length === 0) return null;

  const isPanel = withBio.length > 1;
  const label = isPanel
    ? "Panel description & panelists"
    : item.abstract
      ? "Abstract & speaker bio"
      : "Speaker bio";

  return (
    <details className={style.talkDetails}>
      <summary>{label}</summary>
      <div className={style.talkDetailsBody}>
        {item.abstract ? (
          <div className={style.talkDetailsBlock}>
            <div className={style.talkDetailsLabel}>{isPanel ? "About the panel" : "Abstract"}</div>
            {item.abstract.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : null}
        {withBio.map(speaker => (
          <div key={speaker.name} className={style.talkDetailsBlock}>
            <div className={style.talkDetailsLabel}>
              {isPanel ? `${speaker.name} · ${speaker.affiliation}` : `About ${speaker.name}`}
            </div>
            {speaker.bio?.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ))}
      </div>
    </details>
  );
};

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

const PaperItem = (props: { paper: AcceptedPaper }) => {
  const { paper } = props;
  return (
    <div className={style.paperItem}>
      <div className={style.paperTitle}>
        {paper.title}
        {paper.oral ? <span className={style.paperBadge}>Oral</span> : null}
      </div>
      <div className={style.paperAuthors}>{paper.authors}</div>
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
            <strong>Registration is open.</strong> Attending the workshop requires a{" "}
            <strong>workshop ticket</strong>, which is separate from the main IROS 2026
            conference registration.{" "}
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
              <div className={style.heroMetaLabel}>Date</div>
              <div className={style.heroMetaValue}>Sunday, September 27, 2026</div>
            </div>
          </div>
        </div>
      </div>

      <Section title="Important Info for Attendees">
        <div className={style.dayOf}>
          <div className={style.dayOfFacts}>
            {dayOfFacts.map(fact => (
              <div key={fact.label} className={style.dayOfFact}>
                <div className={style.dayOfFactLabel}>{fact.label}</div>
                <div className={style.dayOfFactValue}>{fact.value}</div>
              </div>
            ))}
          </div>
          <div className={style.dayOfActions}>
            {dayOfLinks.map(link =>
              link.external ? (
                <a
                  key={link.label}
                  className={style.dayOfButton}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                  <span className={style.externalIcon} aria-hidden="true">↗</span>
                </a>
              ) : (
                <a key={link.label} className={style.dayOfButton} href={link.href}>
                  {link.label}
                </a>
              )
            )}
          </div>
        </div>
      </Section>


      <Section title="About">
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
        <Steps
          className={style.eventTimeline}
          progressDot
          current={getCurrentTimelineStep()}
          direction="vertical"
        >
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
                Room 335, Level 3
                <br />
                September 27th, 2026
              </>
            }
          />
        </Steps>
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
                {item.kind ? <div className={style.agendaKind}>{item.kind}</div> : null}
                <div className={style.agendaTitle}>{item.title}</div>
                <Time time={item.time} />
                {item.description ? (
                  <div className={style.agendaDescription}>{item.description}</div>
                ) : null}
                {item.speakers && item.speakers.length > 0 ? (
                  <AgendaSpeakers speakers={item.speakers} />
                ) : null}
                {item.papers && item.papers.length > 0 ? (
                  <ol className={style.spotlightPapers}>
                    {item.papers.map(paper => (
                      <li key={paper.title}>
                        <div className={style.spotlightTitle}>{paper.title}</div>
                        <div className={style.spotlightAuthors}>{paper.authors}</div>
                      </li>
                    ))}
                  </ol>
                ) : null}
                <TalkDetails item={item} />
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
      </Section>

      <Section title="Speakers">
        <div className={style.speakersGrid}>
          {speakers.map(person => (
            <SpeakerCard key={person.name} person={person} />
          ))}
        </div>
      </Section>

      <Section title="Accepted Papers">
        <p>
          Congratulations to all the authors whose work was selected! Thank you to
          everyone who submitted, and to our reviewers for their valuable feedback
          and dedication to maintaining the quality of the workshop.
        </p>

        <div className={style.paperList}>
          {acceptedSubmissions.map(paper => (
            <PaperItem key={paper.title} paper={paper} />
          ))}
        </div>
      </Section>

      <Section title="Social & Tour">
        <SubSection title="Space Robotics Social @ IROS 2026">
          <p className={style.eventMeta}>
            Sunday, Sept. 27 · 8:30 – 11:00 PM ET · Space Bar, 22 Market Square
          </p>
          <p>
            Join the SRW ×{" "}
            <a
              href="https://sites.google.com/view/iros-2026-rose-workshop/home?authuser=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              ROSE workshop
            </a>{" "}
            social right after the IROS welcome reception. RSVP is required, and
            approval is subject to capacity.
          </p>
          <iframe
            className={style.socialEmbed}
            src="https://luma.com/embed/event/m1oc5nev/simple"
            title="Space Robotics Social @ IROS 2026"
            allowFullScreen
            aria-hidden="false"
          />
          <p className={style.embedFallback}>
            Card not loading?{" "}
            <a href="https://luma.com/m1oc5nev" target="_blank" rel="noopener noreferrer">
              RSVP on Luma
            </a>
            .
          </p>
        </SubSection>
        <SubSection title="Astrobotic HQ">
          <div className={style.bookedBadge}>Fully booked · Registration closed</div>
          <p className={style.eventMeta}>
            Monday, Sept. 28 · 10:30 AM ET · About 90 minutes
          </p>
          <p>
            Facility tour of Astrobotic’s headquarters in Pittsburgh. Confirmed
            attendees have received logistics by email.
          </p>
          <span className={style.signupClosed} aria-disabled="true">
            Sign-up closed
          </span>
        </SubSection>
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
        <div className={style.sponsorTier}>
          <div className={style.sponsorTierLabel}>Platinum</div>
          <div className={style.sponsorGrid}>
            {sponsors.platinum.map(sponsor => (
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
        </div>
        <div className={style.sponsorTier}>
          <div className={style.sponsorTierLabel}>Gold</div>
          <div className={style.sponsorGrid}>
            {sponsors.gold.map(sponsor => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className={style.sponsorLink}
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className={`${style.sponsorLogo} ${style.sponsorLogoGold}`}
                />
              </a>
            ))}
          </div>
        </div>
        <div className={style.sponsorTier}>
          <div className={style.sponsorTierLabel}>Supporting Organizations</div>
          <div className={style.sponsorGrid}>
            {supportingOrganizations.map(org => (
              <a
                key={org.name}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className={style.sponsorLink}
              >
                <img
                  src={org.logo}
                  alt={org.name}
                  className={`${style.sponsorLogo} ${style.sponsorLogoSupport}`}
                />
              </a>
            ))}
          </div>
        </div>
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

      <Section title="Call for Contributions">
        <p className={style.archiveNote}>
          Submissions are closed. The call is kept here for reference; see{" "}
          <a href="#accepted-papers">Accepted Papers</a> for the program.
        </p>
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
              also be invited to give short oral presentations. Awards presented at
              the workshop are Best Paper, Runner-Up Paper, Best Oral Presentation,
              and Best Poster.
            </li>
            <li>
              Posters should fit within a maximum 4 ft × 4 ft (122 × 122 cm) display
              area. No mandatory template or orientation. An A0 poster fits within
              this area.
            </li>
            <li>
              Camera-ready versions of accepted submissions will be published on the
              workshop website. At least one author must register for the workshop and
              present the poster in person.
            </li>
          </ul>
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
