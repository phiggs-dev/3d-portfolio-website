import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

import { styles } from '../styles'
import { EarthCanvas } from './canvas'
import { SectionWrapper } from '../hoc'
import { slideIn } from '../utils/motion'
import { isWebGLSupported } from '../utils/webgl'

const Contact = () => {
  const formRef = useRef();
  const submitting = useRef(false);
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitting.current) return;
    if (!form.name.trim() || !form.message.trim()) {
      setStatus('Please enter your name and a message.');
      return;
    }
    submitting.current = true;
    setLoading(true);
    setStatus('Sending your message…');

    emailjs.send(
      'service_80ite8f',
      'template_dd0m7r6',
      {
        from_name: form.name,
        to_name: 'Scott',
        from_email: form.email,
        to_email: 'scottnlopez60@gmail.com',
        message: form.message
      },
      'ZN3qEZeaUs6z2gcaU'
    )
      .then(() => {
        setLoading(false);
        submitting.current = false;
        setStatus('Thank you. Your message has been sent.');

        setForm({
          name: '',
          email: '',
          message: '',
        })
      }, (error) => {
        setLoading(false)

        console.log(error);

        submitting.current = false;
        setStatus('Your message could not be sent. Please email me directly using the link above.');
      })
  }

  useEffect(() => {
    setWebGLSupported(isWebGLSupported());
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width:500px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <>
      <div>
        <p className={`${styles.sectionSubText} !text-accent`}>Get in touch</p>
        <h2 className={styles.sectionHeadText}>Let’s talk.</h2>
        <p className="mt-5 text-secondary text-[17px] leading-7 max-w-2xl">
          Open to software engineering opportunities in and around Orange County, and remotely.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-white">
          <a href="mailto:scottnlopez60@gmail.com" className="underline underline-offset-4 hover:text-accent">scottnlopez60@gmail.com</a>
          <a href="https://www.linkedin.com/in/scott-lopez-622bb832/" className="underline underline-offset-4 hover:text-accent">Connect on LinkedIn</a>
        </div>
      </div>
      <div className="mt-10 xl:flex-row flex-col flex gap-10">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className={`${webGLSupported && !isMobile ? 'flex-[0.9]' : 'flex-1'} min-w-0 bg-black-100 border border-accent/20 p-6 sm:p-8 rounded-2xl`}
        >
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6" aria-busy={loading}>
            <label className="flex flex-col gap-3">
              <span className="text-white font-medium">Your name</span>
              <input type="text" name="name" autoComplete="name" required maxLength={120} value={form.name} onChange={handleChange} placeholder="Your name" className="contact-input" />
            </label>
            <label className="flex flex-col gap-3">
              <span className="text-white font-medium">Your email</span>
              <input type="email" name="email" autoComplete="email" required maxLength={254} value={form.email} onChange={handleChange} placeholder="you@example.com" className="contact-input" />
            </label>
            <label className="flex flex-col gap-3">
              <span className="text-white font-medium">Message</span>
              <textarea rows={6} name="message" required maxLength={5000} value={form.message} onChange={handleChange} placeholder="Tell me about the role or project." className="contact-input resize-y" />
            </label>
            <button type="submit" disabled={loading} className="bg-accent hover:bg-accent/90 disabled:opacity-60 disabled:cursor-wait py-3 px-6 w-fit text-white font-bold rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              {loading ? 'Sending…' : 'Send message'}
            </button>
            <p role="status" aria-live="polite" className="text-secondary text-sm leading-6">{status}</p>
          </form>
        </motion.div>
        {webGLSupported && !isMobile && (
          <motion.div variants={slideIn("right", "tween", 0.2, 1)} className="xl:flex-1 min-w-0 xl:h-auto md:h-[550px] h-[350px]">
            <EarthCanvas />
          </motion.div>
        )}
      </div>
    </>
  )
}

export default SectionWrapper(Contact, "contact")
