import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import './article.css'

const Article = (props) => {
  return (
    <section className={`article-thq-card-elm ${props.rootClassName} `}>
      <main className="article-thq-content-elm">
        <header className="article-thq-header-elm1">
          <h1 className="article-thq-header-elm2">{props.header}</h1>
        </header>
        <p className="article-thq-description-elm">{props.description}</p>
        <div className="article-thq-button-elm">
          <Link to={props.buttonLink} className="article-navlink">
            <p className="article-thq-text-elm">{props.button}</p>
          </Link>
        </div>
      </main>
    </section>
  )
}

Article.defaultProps = {
  rootClassName: '',
  button: 'Read ->',
  buttonLink: {
    url: '',
    newTab: false,
  },
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
  header: 'TechCrunch',
}

Article.propTypes = {
  rootClassName: PropTypes.string,
  button: PropTypes.string,
  buttonLink: PropTypes.object,
  description: PropTypes.string,
  header: PropTypes.string,
}

export default Article
