import { Link } from "react-router-dom";
import { styles } from "../styles";

export default function Footer() {
  return (
    <footer className={`${styles.paddingX} max-w-7xl mx-auto relative z-0 py-10 text-secondary`}>
      <div className="border-t border-accent/20 pt-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <p>Scott N. Lopez · Software Engineer · Orange County, California</p>
          <div className="flex flex-wrap gap-5">
            <a className="hover:text-accent underline underline-offset-4" href="https://www.linkedin.com/in/scott-lopez-622bb832/">LinkedIn</a>
            <a className="hover:text-accent underline underline-offset-4" href="https://github.com/phiggs-dev">GitHub</a>
            <Link className="hover:text-accent underline underline-offset-4" to="/resume">Resume</Link>
          </div>
        </div>
        <details className="text-sm leading-6">
          <summary className="cursor-pointer w-fit hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">Asset credits</summary>
          <div className="mt-3 space-y-3 max-w-3xl [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-accent">
            <p>The 3D workstation is based on <a href="https://sketchfab.com/3d-models/gaming-desktop-pc-d1d8282c9916438091f11aeb28787b66">Gaming Desktop PC</a> by <a href="https://sketchfab.com/Yolala1232">Yolala1232</a>, licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.</p>
            <p>Planet model: <a href="https://sketchfab.com/3d-models/stylized-planet-789725db86f547fc9163b00f302c3e70">Stylized planet</a> by <a href="https://sketchfab.com/cmzw">cmzw</a>, CC BY 4.0. Icons: <a href="https://www.flaticon.com/free-icons/game-development">Freepik</a> and <a href="https://www.flaticon.com/free-icons/360-degrees">Ilham Fitrotul Hayat</a> via Flaticon.</p>
          </div>
        </details>
      </div>
    </footer>
  );
}
