import { motion } from "framer-motion";

import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import headshot from "../assets/headshot.png";

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} !text-accent`}>Introduction</p>
        <h2 className={styles.sectionHeadText}>About Me.</h2>
      </motion.div>

      <div className="mt-6 flex flex-col-reverse lg:flex-row items-start gap-8 lg:gap-12">
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="flex-1 min-w-0 text-secondary text-[17px] max-w-3xl leading-[30px] space-y-4"
      >
        <p>
          I’m a software engineer with paid experience delivering C++ and C#
          applications and independent projects using React, TypeScript, and
          Python. My work spans web applications, AI integrations, and
          interactive experiences built with Unreal Engine and Unity.
        </p>
        <p>
          In engagements for Logitech and inciteVR, I’ve taken responsibility
          for translating client goals into technical plans, investigating
          blockers, delivering working software, and supporting handoff.
        </p>
        <p>
          I graduated from the University of Silicon Valley in August 2025 as
          class valedictorian. Earlier work in construction coordination,
          in-house IT support, and residential real estate adds practical
          experience managing deadlines and client relationships.
        </p>
        <p>
          Based in Orange County, California, I’m open to local on-site and
          hybrid software engineering roles, as well as remote opportunities.
        </p>
      </motion.div>
      <motion.div variants={fadeIn("", "", 0.1, 1)} className="w-48 lg:w-72 shrink-0 self-center lg:self-start">
        <img
          src={headshot}
          alt="Portrait of Scott N. Lopez"
          width={1060}
          height={1484}
          loading="lazy"
          decoding="async"
          className="w-full h-auto aspect-[5/7] object-cover rounded-2xl border border-accent/40 shadow-card"
        />
      </motion.div>
      </div>
    </>
  );
};

const WrappedAbout = SectionWrapper(About, "about");
export default WrappedAbout;
