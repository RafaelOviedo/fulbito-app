import style from './About.module.css';

function About() {
  return (
    <div className={style.aboutComponent}>
      <div className={style.textContainer}>
        <p>Esta applicacion fue creada para organizar de manera mas eficiente las partidas con los pibes del futbol.</p>
      </div>

      <div className={style.socialMediaContainer}>
        <h3 className={style.socialMediaText}>Mas info sobre su creador:</h3>

        <div className={style.iconsContainer}>
          <a className={style.githubIconContainer} href="https://github.com/RafaelOviedo" target="_blank" rel="noreferrer">
            <img className={style.githubIcon} src="https://pngimg.com/uploads/github/github_PNG58.png" alt="github icon" />
          </a>
          <a className={style.linkedinIconContainer} href="https://www.linkedin.com/in/rafael-oviedo/?locale=en_US" target="_blank" rel="noreferrer">
            <img className={style.linkedinIcon} src="https://cdn.pixabay.com/photo/2017/08/22/11/56/linked-in-2668696_960_720.png" alt="linkedin icon" />
          </a>
        </div>
      </div>

      <div className={style.versionContainer}>
        <span>Version: 1.2.0</span>
      </div>
    </div>
  )
}

export default About;