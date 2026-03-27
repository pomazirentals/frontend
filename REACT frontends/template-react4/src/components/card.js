import React from 'react'

import PropTypes from 'prop-types'

import './card.css'

const Card = (props) => {
  return (
    <section className={`card-thq-card-elm ${props.rootClassName} `}>
      <div className="card-thq-icon-elm1">
        <img
          alt={props.iconAlt}
          src={props.icon}
          className="card-thq-icon-elm2"
        />
      </div>
      <main className="card-thq-content-elm">
        <h1 className="card-thq-header-elm">{props.header}</h1>
        <p className="card-thq-description-elm">{props.description}</p>
      </main>
    </section>
  )
}

Card.defaultProps = {
  description:
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium',
  rootClassName: '',
  icon: '/Icons/group%201316-200w.png',
  iconAlt: 'image',
  header: 'Sima Mosbacher',
}

Card.propTypes = {
  description: PropTypes.string,
  rootClassName: PropTypes.string,
  icon: PropTypes.string,
  iconAlt: PropTypes.string,
  header: PropTypes.string,
}

export default Card
