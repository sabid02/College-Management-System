import React from "react";

const TopicBank = () => {
  // Demo topics data
  const topics = [
    {
      name: "Machine Learning",
      description: "Study of algorithms that learn from data.",
      requirement: "Basic knowledge of Python and statistics.",
    },
    {
      name: "Web Development",
      description: "Building websites and web applications.",
      requirement: "Basic understanding of HTML, CSS, and JavaScript.",
    },
    {
      name: "Data Science",
      description: "Extracting knowledge from large datasets.",
      requirement: "Proficiency in Python, statistics, and data analysis.",
    },
    {
      name: "Artificial Intelligence",
      description:
        "Creating intelligent machines that can mimic human behavior.",
      requirement:
        "Understanding of algorithms, data structures, and problem-solving.",
    },
    {
      name: "Cyber Security",
      description: "Protecting systems from cyber threats.",
      requirement: "Basic knowledge of networking and encryption.",
    },
    {
      name: "Blockchain Technology",
      description: "Decentralized and distributed ledger technology.",
      requirement: "Familiarity with cryptography and programming basics.",
    },
    {
      name: "Cloud Computing",
      description:
        "Storing and accessing data and applications over the internet.",
      requirement: "Basic understanding of networks and virtualization.",
    },
    {
      name: "IoT (Internet of Things)",
      description: "Connecting physical devices to the internet.",
      requirement: "Basic knowledge of electronics and networking.",
    },
    {
      name: "Game Development",
      description: "Designing and creating video games.",
      requirement: "Proficiency in game engines like Unity or Unreal Engine.",
    },
    {
      name: "Mobile App Development",
      description: "Creating apps for mobile devices.",
      requirement:
        "Understanding of Java, Kotlin (for Android), or Swift (for iOS).",
    },
    {
      name: "Natural Language Processing",
      description:
        "Machine learning techniques for understanding and processing human language.",
      requirement: "Proficiency in Python and linguistics.",
    },
    {
      name: "DevOps",
      description: "Automating and monitoring development workflows.",
      requirement:
        "Understanding of software development and system administration.",
    },
    {
      name: "Robotics",
      description: "Designing and building robots.",
      requirement: "Knowledge of mechanical and electrical engineering.",
    },
    {
      name: "Augmented Reality",
      description:
        "Creating interactive experiences that blend the physical and virtual worlds.",
      requirement: "Experience with 3D modeling and coding.",
    },
    {
      name: "Virtual Reality",
      description: "Immersive experiences through simulated environments.",
      requirement: "Experience with VR hardware and software.",
    },
    {
      name: "Quantum Computing",
      description: "Using quantum-mechanical phenomena for computation.",
      requirement: "Understanding of quantum mechanics and computing.",
    },
    {
      name: "Software Testing",
      description: "Ensuring software quality through testing and validation.",
      requirement: "Knowledge of testing methodologies and tools.",
    },
    {
      name: "Database Management",
      description: "Organizing and managing data in databases.",
      requirement: "Proficiency in SQL and database design.",
    },
    {
      name: "Software Architecture",
      description: "Designing the structure of software systems.",
      requirement:
        "Understanding of design patterns and system design principles.",
    },
    {
      name: "Ethical Hacking",
      description: "Hacking with permission to identify vulnerabilities.",
      requirement:
        "Knowledge of networks, programming, and penetration testing.",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Topic Bank</h2>
      <div className="space-y-6">
        {topics.map((topic, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-600">
              {topic.name}
            </h3>
            <p className="text-gray-700">{topic.description}</p>
            <p className="text-gray-500">Requirements: {topic.requirement}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicBank;
