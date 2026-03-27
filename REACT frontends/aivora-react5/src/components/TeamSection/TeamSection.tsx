import React from "react";
import { Link } from "react-router-dom";
import Team from "../../api/team";

interface TeamMember {
  id?: string | number;
  tImg: string;
  slug: string;
  name: string;
  title: string;
}

interface TeamSectionProps {
  tClass?: string;
}
const ClickHandler = (): void => {
  window.scrollTo({ top: 10, behavior: "smooth" });
};

const TeamSection: React.FC<TeamSectionProps> = ({ tClass }) => {
  return (
    <section className={`wpo-team-section ${tClass || ""}`}>
      <div className="container">
        <div className="wpo-team-wrap">
          <div className="wpo-section-title">
            <h2 className="poort-text poort-in-right">Expert Team Members</h2>
            <p>
              From intimate gatherings to grand luxury weddings, we bring
              together creativity, organization, and passion to design every
              detail with precision.
            </p>
          </div>

          <div className="row">
            {Team.slice(0, 4).map((team: TeamMember, index: number) => (
              <div
                className="col col-lg-3 col-md-6 col-sm-6 col-12"
                key={team.id || index}
              >
                <div
                  className="wpo-team-item wow fadeInUp"
                  data-wow-duration="1200ms"
                >
                  <div className="wpo-team-img-wrap">
                    <div className="wpo-team-img">
                      <div className="wpo-team-img-inner">
                        <img
                          src={team.tImg}
                          alt={team.name || "Team Member"}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="wpo-team-text">
                    <h3>
                      <Link
                        onClick={ClickHandler}
                        to={`/team-single/${team.slug}`}
                      >
                        {team.name}
                      </Link>
                    </h3>
                    <span>{team.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
