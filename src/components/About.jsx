import { motion } from "framer-motion";

import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} !text-accent`}>Introduction</p>
        <h2 className={styles.sectionHeadText}>About Me.</h2>
      </motion.div>

      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] space-y-4"
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
    </>
  );
};

const WrappedAbout = SectionWrapper(About, "about");
export default WrappedAbout;
