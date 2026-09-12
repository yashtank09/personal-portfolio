export interface ProjectCaseStudy {
  slug: string;
  name: string;
  title: string;
  description: string;
  summary: string;
  stack: string[];
  workflow: string[];
  architecture: string;
  focus: string;
  repo?: string;
}

// Content drawn from the portfolio's documented project descriptions.
export const PROJECT_CASE_STUDIES: ProjectCaseStudy[] = [
  {
    slug: 'sievex', name: 'Sievex',
    title: 'Sievex — Web Crawling & AI Integration | Yash Tank',
    description: 'Explore Yash Tank’s Sievex project: secure web crawling, automation and AI assistance using Java, Spring Boot, Spring Security and Spring AI.',
    summary: 'Sievex brings controlled web crawling, data processing and AI-assisted exploration into a backend-focused automation platform. It connects collecting web data with asking follow-up questions about that data.',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'MySQL', 'REST APIs', 'Spring AI', 'LLM APIs'],
    workflow: ['Authenticate users and authorize access with Spring Security, JWT and roles.', 'Validate crawling requests before executing dynamic crawling and product-data extraction workflows.', 'Run automation jobs and process the collected data.', 'Use crawl results and conversation history to support contextual AI assistance.'],
    architecture: 'A modular backend organizes secure access, crawling workflows, automation and data processing. AI assistance uses the collected data and conversation history as context for follow-up questions.',
    focus: 'The engineering focus is the connection between access control, request validation, web-data workflows and contextual assistance. This project brings together my interests in backend engineering, automation and Generative AI.',
    repo: 'https://github.com/yashtank09/Sievex-Application'
  },
  {
    slug: 'trade-journal', name: 'Trade Journal',
    title: 'Trade Journal — Trading Analytics with Java & Angular | Yash Tank',
    description: 'Yash Tank’s Trade Journal project: Java 17, Spring Boot 3 and Angular, with CSV/Excel ingestion, FIFO positions and trading performance analytics.',
    summary: 'Trade Journal turns broker executions into trading positions and performance summaries. It combines data ingestion and calculation with journaling tools for reviewing trading behavior.',
    stack: ['Java 17', 'Spring Boot 3', 'Angular', 'MySQL', 'Spring Security', 'JWT', 'REST APIs'],
    workflow: ['Import broker CSV/Excel files or enter trades manually.', 'Clean imported data, detect duplicates and match executions.', 'Calculate FIFO positions, partial closes, weighted exit prices and realized profit and loss.', 'Review performance summaries, equity curves, strategy analytics and risk metrics alongside plans, notes and tracked mistakes.'],
    architecture: 'The application uses a modular-monolith backend built with Java 17 and Spring Boot 3, paired with an Angular frontend. Its scope includes authentication, authorization, administration and security configuration.',
    focus: 'The core data-processing challenge is translating individual executions into positions, including partial closes and weighted exit prices. The project is a way for me to explore application architecture, financial data processing, analytics and security.',
    repo: 'https://github.com/yashtank09/trade-journal-monorepo'
  },
  {
    slug: 'instasend', name: 'InstaSend',
    title: 'InstaSend — Spring Boot Email Automation | Yash Tank',
    description: 'Explore Yash Tank’s InstaSend email automation project, covering Spring Boot campaigns, scheduling, queues, background workers and audit logging.',
    summary: 'InstaSend is an exploratory email automation project focused on understanding how campaign management and background email processing can fit into a modular Spring Boot backend.',
    stack: ['Java', 'Spring Boot', 'MySQL', 'REST APIs', 'Scheduling', 'Automation'],
    workflow: ['Manage campaigns and validate email addresses.', 'Schedule messages and queue the work.', 'Process queued emails with background workers.', 'Maintain audit logs and manage soft deletes.'],
    architecture: 'The project explores modular backend architecture, database structures, scheduling, email queues and background workers. Campaign management and audit logging are part of its design scope.',
    focus: 'My learning focus is how production email automation platforms can be designed using Spring Boot. This project explores the responsibilities of scheduling, queued processing and auditable campaign management.'
  }
];
