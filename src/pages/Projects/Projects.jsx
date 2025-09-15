// pages/Projects/Projects.jsx
import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import "./Projects.css";
import { useNavigate } from "react-router-dom";
import CardEvent from "../../components/common/CardEvent/CardEvent";
import {
  projectsData,
  technologyOptions,
  memberOptions,
} from "../../assets/data/projects";
import heroBg from "../../assets/images/hero-banner-bacground.jpeg";
import squaredPlaceholder from "../../assets/images/placeholder-cuadrado.jpg";
import { Helmet } from "react-helmet-async";

export const Projects = () => {
  const navigate = useNavigate();

  const featured = useMemo(
    () => projectsData.find((p) => p.status === "ongoing") || projectsData[0],
    []
  );

  const ongoingCount = useMemo(
    () => projectsData.filter((p) => p.status === "ongoing").length,
    []
  );
  const completedCount = useMemo(
    () => projectsData.filter((p) => p.status === "completed").length,
    []
  );
  const peopleCount = useMemo(() => {
    const uniq = new Set(projectsData.flatMap((p) => p.members));
    return uniq.size;
  }, []);

  const [q, setQ] = useState("");
  const [tech, setTech] = useState("");
  const [member, setMember] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const searchTimeoutRef = useRef(null);

  const performSearch = useCallback(() => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 300);
  }, []);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (q.trim() || tech || member) {
      searchTimeoutRef.current = setTimeout(() => {
        performSearch();
      }, 400);
    } else {
      setHasSearched(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [q, tech, member, performSearch]);

  const runSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 200);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") runSearch();
  };

  const filtered = useMemo(() => {
    if (!hasSearched && !q.trim() && !tech && !member) return [];
    const query = q.trim().toLowerCase();
    return projectsData.filter((p) => {
      const qMatch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query) ||
        (p.technologies || []).join(" ").toLowerCase().includes(query);
      const tMatch = !tech || (p.technologies || []).includes(tech);
      const mMatch = !member || (p.members || []).includes(member);
      return qMatch && tMatch && mMatch;
    });
  }, [hasSearched, q, tech, member]);

  const ongoing = useMemo(
    () => projectsData.filter((p) => p.status === "ongoing"),
    []
  );
  const completed = useMemo(
    () => projectsData.filter((p) => p.status === "completed"),
    []
  );

  const [ongoingVisible, setOngoingVisible] = useState(3);
  const [completedVisible, setCompletedVisible] = useState(3);

  const handleProjectClick = (id) => {
    const el = document.getElementById(`project-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const { hash } = window.location;
  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [hash]);

  return (
    <div className="projects-container">
      <Helmet>
        <title>Projects | Neurotech UCB</title>
        <meta
          name="description"
          content="Proyectos en neurotecnología del capítulo Neurotech UCB: investigación, educación y aplicaciones prácticas."
        />
      </Helmet>

      <section
        className="projects-hero"
        style={{ backgroundImage: `url(${heroBg})` }}
        role="banner"
        aria-label="Projects hero"
      >
        <div className="projects-hero__card">
          <p className="projects-hero__eyebrow">PROJECT 1</p>
          <h1 className="projects-hero__title">{featured?.title}</h1>
          <p className="projects-hero__desc">
            At NeurotechUCB, we drive innovation at the intersection of
            neuroscience and technology. Our projects combine AI, data analysis,
            and neuroengineering to create impactful solutions in health,
            education, and industry.
          </p>
          <button
            className="btn btn-primary projects-hero__btn"
            onClick={() => handleProjectClick(featured?.id)}
          >
            More info
          </button>
        </div>

        <div className="projects-hero__dots" aria-hidden="true">
          <span className="dot active" />
          <span className="dot" />
          <span className="dot" />
        </div>
      </section>

      <section className="projects-kpis">
        <div className="kpi">
          <div className="kpi__circle">
            <span>{ongoingCount}</span>
          </div>
          <p className="kpi__label">
            Ongoing
            <br />
            Projects
          </p>
        </div>
        <div className="kpi">
          <div className="kpi__circle">
            <span>{completedCount}</span>
          </div>
          <p className="kpi__label">
            Concluded
            <br />
            Projects
          </p>
        </div>
        <div className="kpi">
          <div className="kpi__circle">
            <span>{peopleCount}</span>
          </div>
          <p className="kpi__label">
            People
            <br />
            Involved
          </p>
        </div>
      </section>

      <section className="projects-search">
        <h2 className="projects-section-title">SEARCH PROJECTS</h2>

        <div className="search-bar">
          <div className="search-bar__group">
            <label htmlFor="q" className="sr-only">
              Title or keyword
            </label>
            <input
              id="q"
              type="text"
              placeholder="Search by title or keyword..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={onKeyDown}
              className={`search-input ${q.trim() ? "has-value" : ""}`}
            />
          </div>

          <div className="search-bar__group">
            <label htmlFor="tech">Technology</label>
            <select
              id="tech"
              value={tech}
              onChange={(e) => setTech(e.target.value)}
              className={`search-select ${tech ? "has-value" : ""}`}
            >
              <option value="">All Technologies</option>
              {technologyOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="search-bar__group">
            <label htmlFor="member">Member</label>
            <select
              id="member"
              value={member}
              onChange={(e) => setMember(e.target.value)}
              className={`search-select ${member ? "has-value" : ""}`}
            >
              <option value="">All Members</option>
              {memberOptions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <button
            className={`search-btn ${isSearching ? "searching" : ""}`}
            onClick={runSearch}
            disabled={isSearching}
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>

        <div
          className={`search-results-container ${
            hasSearched ? "visible" : "hidden"
          }`}
        >
          {hasSearched && (
            <div className="search-results">
              <div className="results-header">
                <h3 className="results-count">
                  {filtered.length === 0
                    ? "No projects found"
                    : `${filtered.length} project${
                        filtered.length !== 1 ? "s" : ""
                      } found`}
                </h3>
                {(q.trim() || tech || member) && (
                  <button
                    className="clear-filters"
                    onClick={() => {
                      setQ("");
                      setTech("");
                      setMember("");
                      setHasSearched(false);
                    }}
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              {filtered.length === 0 ? (
                <div className="search-results__empty">
                  <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <p className="empty-title">No projects match your search</p>
                    <p className="empty-description">
                      Try adjusting your filters or search terms
                    </p>
                  </div>
                </div>
              ) : (
                <div className="results-grid">
                  {filtered.map((p, index) => (
                    <article
                      className="result-card animate-in"
                      key={p.id}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="result-card__thumb">
                        <img
                          src={p.image || squaredPlaceholder}
                          alt={`Project thumbnail: ${p.title}`}
                          loading="lazy"
                        />
                        <div className="result-card__overlay">
                          <span className="status-badge status-badge--{p.status}">
                            {p.status === "ongoing"
                              ? "In Progress"
                              : "Completed"}
                          </span>
                        </div>
                      </div>
                      <div className="result-card__body">
                        <a
                          href={`#project-${p.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleProjectClick(p.id);
                          }}
                          className="result-card__title"
                        >
                          {p.title}
                        </a>
                        <p className="result-card__meta">{p.date}</p>
                        <p className="result-card__desc">
                          {p.shortDescription}
                        </p>
                        {p.technologies && p.technologies.length > 0 && (
                          <div className="result-card__tags">
                            {p.technologies.slice(0, 3).map((tech) => (
                              <span key={tech} className="tech-tag">
                                {tech}
                              </span>
                            ))}
                            {p.technologies.length > 3 && (
                              <span className="tech-tag tech-tag--more">
                                +{p.technologies.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section id="ongoing-projects" className="projects-section">
        <h2 className="projects-section-heading">ONGOING PROJECTS</h2>
        <div className="cards-grid">
          {ongoing.slice(0, ongoingVisible).map((p) => (
            <div id={`project-${p.id}`} key={p.id}>
              <CardEvent
                title={p.title}
                image={p.image}
                description={p.shortDescription}
                buttonText={p.buttonText}
                onButtonClick={() => handleProjectClick(p.id)}
              />
            </div>
          ))}
        </div>
        {ongoingVisible < ongoing.length && (
          <div className="see-more">
            <button
              className="see-more__btn"
              onClick={() => setOngoingVisible((v) => v + 3)}
            >
              See more
            </button>
          </div>
        )}
      </section>

      <section id="completed-projects" className="projects-section">
        <h2 className="projects-section-heading">COMPLETED PROJECTS</h2>
        <div className="cards-grid">
          {completed.slice(0, completedVisible).map((p) => (
            <div id={`project-${p.id}`} key={p.id}>
              <CardEvent
                title={p.title}
                image={p.image}
                description={p.shortDescription}
                buttonText={p.buttonText}
                onButtonClick={() => handleProjectClick(p.id)}
              />
            </div>
          ))}
        </div>
        {completedVisible < completed.length && (
          <div className="see-more">
            <button
              className="see-more__btn"
              onClick={() => setCompletedVisible((v) => v + 3)}
            >
              See more
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
