import React from "react";
import CountUp from "react-countup";

interface FunFactItem {
  title: string;
  subTitle: string;
}

interface FunFactProps {
  fClass?: string;
}

const funFactData: FunFactItem[] = [
  {
    title: "3210",
    subTitle: "Happy Couples",
  },
  {
    title: "230",
    subTitle: "Location",
  },
  {
    title: "3325",
    subTitle: "Wedding",
  },
  {
    title: "526",
    subTitle: "Decoration",
  },
];

const FunFact: React.FC<FunFactProps> = ({ fClass }) => {
  return (
    <section className={`wpo-fun-fact-section ${fClass || ""}`}>
      <div className="container">
        <div className="row">
          <div className="col col-xs-12">
            <div className="wpo-fun-fact-grids clearfix">
              {funFactData.map((funfact, index) => (
                <div className="grid" key={index}>
                  <div className="info">
                    <h3>
                      <span>
                        <CountUp
                          end={parseInt(funfact.title, 10)}
                          enableScrollSpy
                        />
                      </span>
                      +
                    </h3>
                    <p>{funfact.subTitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <span id="counter" className="d-none" />
    </section>
  );
};

export default FunFact;
