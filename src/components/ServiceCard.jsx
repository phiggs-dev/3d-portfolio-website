import Tilt from "react-parallax-tilt";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

import { fadeIn, textVariant } from "../utils/motion";
import { services } from "../constants";
import { styles } from "../styles";

const ServiceCard = () => {
  const reducedMotion = useReducedMotion();
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className={`${styles.padding} max-w-7xl mx-auto relative`}
    >
      <motion.div
        initial={reducedMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={reducedMotion ? undefined : textVariant()}
      >
        <p className={`${styles.sectionSubText} !text-accent`}>Capabilities</p>
        <h2 id="capabilities-heading" className={styles.sectionHeadText}>What I build.</h2>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      {services.map((service, index) => {
        const Icon = service.icon;
        const linkClass = "capability-link text-accent text-[14px] font-medium mt-6 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
        const linkContent = <>Explore related projects <span aria-hidden="true">↗</span><span className="sr-only"> for {service.title}</span></>;
        return (
        <Tilt
          key={service.title}
          className="w-full h-full"
          tiltEnable={!reducedMotion}
          tiltMaxAngleX={12}
          tiltMaxAngleY={12}
          scale={1}
          transitionSpeed={450}
        >
          <motion.div
            initial={reducedMotion ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={reducedMotion ? undefined : fadeIn("up", "spring", 0.12 * index, 0.75)}
            className="capability-card w-full h-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
          >
            <div className="capability-surface bg-tertiary rounded-[20px] p-6 min-h-[370px] h-full flex items-start flex-col relative overflow-hidden">
              <div className="capability-icon text-accent rounded-2xl p-4 mb-6 relative">
                <Icon size={32} aria-hidden="true" />
              </div>
              <h3 className="text-white text-[20px] font-bold relative">
                {service.title}
              </h3>
              <p className="text-secondary text-[14px] leading-6 mt-4 relative">{service.description}</p>
              <p className="text-accent text-[12px] leading-5 mt-4 mb-4 relative">{service.tools}</p>
              <div className="mt-auto relative">
                {service.href.startsWith("/") ? (
                  <Link to={service.href} className={linkClass}>{linkContent}</Link>
                ) : (
                  <a href={service.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{linkContent}<span className="sr-only"> (opens in a new tab)</span></a>
                )}
              </div>
            </div>
          </motion.div>
        </Tilt>
        );
      })}
      </div>
    </section>
  );
};

export default ServiceCard;
