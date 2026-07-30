import { useEffect, useState } from "react";
import {
  FaProjectDiagram,
  FaTools,
  FaRoute,
  FaQuestionCircle,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import { getProjects } from "../services/projectService";
import { getSkills } from "../services/skillService";
import { getJourneys } from "../services/journeyService";
import { getFAQs } from "../services/faqService";
import { getContacts } from "../services/contactService";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    projects: 0,
    skills: 0,
    journey: 0,
    faqs: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      getProjects(),
      getSkills(),
      getJourneys(),
      getFAQs(),
      getContacts(),
    ]).then(([projects, skills, journey, faqs, messages]) => {
      setCounts({
        projects: projects.value?.data?.length || 0,
        skills: skills.value?.data?.length || 0,
        journey: journey.value?.data?.length || 0,
        faqs: faqs.value?.data?.length || 0,
        messages: messages.value?.data?.length || 0,
      });
      setLoading(false);
    });
  }, []);

  const cards = [
    { label: "Projects", value: counts.projects, icon: <FaProjectDiagram />, to: "/admin/projects" },
    { label: "Skills", value: counts.skills, icon: <FaTools />, to: "/admin/skills" },
    { label: "Journey Items", value: counts.journey, icon: <FaRoute />, to: "/admin/journey" },
    { label: "FAQs", value: counts.faqs, icon: <FaQuestionCircle />, to: "/admin/faqs" },
    { label: "Messages", value: counts.messages, icon: <FaEnvelopeOpenText />, to: "/admin/contacts" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Dashboard <span className="text-cyan-400">Overview</span>
      </h1>
      <p className="text-gray-400 mt-2 mb-8">
        Quick summary of your portfolio content.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.to}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-400 transition flex items-center justify-between"
          >
            <div>
              <p className="text-gray-400">{card.label}</p>
              <p className="text-4xl font-bold text-cyan-400 mt-2">
                {loading ? "…" : card.value}
              </p>
            </div>
            <div className="text-3xl text-cyan-400/60">{card.icon}</div>
          </a>
        ))}
      </div>

      <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-3">Getting Started</h2>
        <ul className="text-gray-400 list-disc list-inside space-y-1">
          <li>Fill your <span className="text-cyan-400">About</span> info first — Hero &amp; Contact sections use it.</li>
          <li>Add your <span className="text-cyan-400">Skills</span>, <span className="text-cyan-400">Projects</span> and <span className="text-cyan-400">Journey</span> items.</li>
          <li>Add a few <span className="text-cyan-400">FAQs</span> for visitors.</li>
          <li>Check <span className="text-cyan-400">Messages</span> whenever someone contacts you.</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
