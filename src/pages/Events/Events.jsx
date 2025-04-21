import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Events.css";
import CardEvent from "../../components/common/CardEvent/CardEvent";
import CardMainEvent from "../../components/common/CardMainEvent/CardMainEvent";
import { eventsData } from "../../assets/data/events";
import squared_placeholder from "../../assets/images/placeholder-cuadrado.jpg";
import BrainAwarenessWeekLogo from "../../assets/logos/Brain-Awareness-Week-logo-color-rgb.png";
import DanaFoundationLogo from "../../assets/logos/Dana_Logo-1.png";
import IBROLogo from "../../assets/logos/IBRO_logo_main_RGB_1000.png";
import NeurotechUmsaLogo from "../../assets/logos/Logo actual.jpg";
import { organizersData } from "../../assets/data/organizers";
import portraitPlaceholder from "../../assets/images/Portrait_Placeholder.png";
import { alliedCommunitiesData } from "../../assets/data/allied_communities";

export const Events = () => {
  const navigate = useNavigate();
  const leadIdsToExclude = [48, 49];

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const outstandingEvent = eventsData.find((event) => event.isOutstanding);
  const upcomingEvents = eventsData.filter((event) => !event.isOutstanding);

  const commissionLeaders = organizersData.filter(
    (org) => org.title && !leadIdsToExclude.includes(org.id)
  );

  const committeeMembers = organizersData.filter(
    (org) => !org.title && org.team
  );

  const groupedCommittee = committeeMembers.reduce((acc, curr) => {
    if (!acc[curr.team]) acc[curr.team] = [];
    acc[curr.team].push(curr);
    return acc;
  }, {});

  const committeeTeams = Object.entries(groupedCommittee);
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [currentTeam, setCurrentTeam] = useState(committeeTeams[0]);
  const comiteRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (comiteRef.current) {
        comiteRef.current.classList.remove("fade-in");
        comiteRef.current.classList.add("fade-out");
      }

      setTimeout(() => {
        setActiveTeamIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % committeeTeams.length;
          setCurrentTeam(committeeTeams[nextIndex]);

          if (comiteRef.current) {
            comiteRef.current.classList.remove("fade-out");
            comiteRef.current.classList.add("fade-in");
          }

          return nextIndex;
        });
      }, 500); 
    }, 10000);

    return () => clearInterval(interval);
  }, [committeeTeams]);

  const [currentTeamName, currentTeamMembers] = currentTeam || [];

  const alliesRef = useRef(null);
  const [currentCommunityIndex, setCurrentCommunityIndex] = useState(0);

  const communityGroups = alliedCommunitiesData.reduce((acc, curr, index) => {
    const groupIndex = Math.floor(index / 5);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(curr);
    return acc;
  }, []);

  const currentCommunityGroup = communityGroups[currentCommunityIndex] || [];

  useEffect(() => {
    const interval = setInterval(() => {
      if (alliesRef.current) {
        alliesRef.current.classList.remove("fade-in");
        alliesRef.current.classList.add("fade-out");
      }

      setTimeout(() => {
        setCurrentCommunityIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % communityGroups.length;

          if (alliesRef.current) {
            alliesRef.current.classList.remove("fade-out");
            alliesRef.current.classList.add("fade-in");
          }

          return nextIndex;
        });
      }, 500); 
    }, 10000); 

    return () => clearInterval(interval);
  }, [communityGroups.length]);

  return (
    <div className="container">
      {outstandingEvent && (
        <>
          <h2 className="title-section">Featured Event</h2>
          <CardMainEvent
            title={outstandingEvent.title}
            image={outstandingEvent.image}
            description={outstandingEvent.description}
            buttonText={outstandingEvent.buttonText}
            onButtonClick={() => handleEventClick(outstandingEvent.id)}
          />
        </>
      )}

      <h2 className="title-section">Upcoming Events</h2>
      <div className="row">
        {upcomingEvents.map((event) => (
          <CardEvent
            key={event.id}
            title={event.title}
            image={event.image}
            description={event.description}
            buttonText={event.buttonText}
            onButtonClick={() => handleEventClick(event.id)}
          />
        ))}
      </div>

      <div className="section--column" id="organizers">
        <h2 className="section__content-title--secondary">Organizers</h2>

        <div className="section--column">
          <h3 className="section__content-title--secondary">Lead Organizers</h3>
          <div className="cards-container">
            <div className="profile" key={49}>
              <div className="profile__picture">
                <img
                  src={organizersData[48].picture || portraitPlaceholder}
                  alt={`Organizador: ${organizersData[48].name}`}
                />
              </div>
              <p className="profile__name">{organizersData[48].name.toUpperCase()}</p>
              <p className="profile__role">{organizersData[48].title}</p>
            </div>
            <div className="profile" key={48}>
              <div className="profile__picture">
                <img
                  src={organizersData[47].picture || portraitPlaceholder}
                  alt={`Organizador: ${organizersData[47].name}`}
                />
              </div>
              <p className="profile__name">{organizersData[47].name.toUpperCase()}</p>
              <p className="profile__role">{organizersData[47].title}</p>
            </div>
          </div>
        </div>

        <div className="section--column">
          <h3 className="section__content-title--secondary">Committee Leaders </h3>
          <div className="section-row cards-container leads">
            {commissionLeaders.map((org) => (
              <div className="profile" key={org.id}>
                <div className="profile__picture">
                  <img
                    src={org.picture || portraitPlaceholder}
                    alt={`Organizador: ${org.name}`}
                  />
                </div>
                <p className="profile__name">{org.name.toUpperCase()}</p>
                <p className="profile__role">{org.title}</p>
              </div>
            ))}
          </div>
        </div>

        {currentTeamMembers && (
          <div className="section--column">
            <div className="comite section--column">
              <h3 className="comite__title section__content-title--secondary">
                {currentTeamName} Committee Members 
              </h3>
              <div
                key={currentTeamName}
                ref={comiteRef}
                className="comite__content section--row cards-container fade-in"
              >
                {currentTeamMembers.map((member) => (
                  <div className="profile" key={member.id}>
                    <div className="profile__picture">
                      <img
                        src={member.picture || portraitPlaceholder}
                        alt={`Organizador: ${member.name}`}
                      />
                    </div>
                    <p className="profile__name">{member.name.toUpperCase()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <h2 className="title-section">Sponsors</h2>
      <div className="row">
        <div className="colaborador">
          <img src={BrainAwarenessWeekLogo} alt="Brain Awareness Week Logo" />
        </div>
        <div className="colaborador">
          <img src={DanaFoundationLogo} alt="Dana Foundation Logo" />
        </div>
        <div className="colaborador">
          <img src={IBROLogo} alt="IBRO Logo" />
        </div>
      </div>

      <h2 className="title-section">Allied Communities</h2>
      <div
        className="row fade-in"
        ref={alliesRef}
        key={`community-group-${currentCommunityIndex}`}
      >
        {currentCommunityGroup.map((community) => (
          <div className="colaborador" key={community.id}>
            {community.social_media && community.social_media !== "none" ? (
              <a href={community.social_media} target="_blank" rel="noopener noreferrer">
                <img src={community.logo} alt={`${community.name} Logo`} />
              </a>
            ) : (
              <img src={community.logo} alt={`${community.name} Logo`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};