import Navbar from "@/components/Navbar"
import SocialButton from "@/components/SocialButton"
import Github from "../public/Github.svg"
import Instagram from "../public/instagram.svg"
import Twitter from "@/public/twitter.svg"
import Linkedin from "../public/linkedin.svg"
import Image from "next/image"
import { motion } from "framer-motion"
import { PreviewAnimation } from "@/components/ProjectPreview"
import ProjectPreview from "@/components/ProjectPreview"
import Link from "next/link"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 mb-4">
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={PreviewAnimation}
          className="bg-zinc-200 h-[30rem] rounded-3xl p-10 flex flex-col gap-16 bg-[url('/gradient-bg.jpg')] bg-cover bg-center"
        >
          <h1 className="text-4xl font-semibold">Hello, I'm Satya Feriawan</h1>
          <p className="flex-1">
            My journey as a student at Primakara University is driven by my deep
            affection for technology, and my focus is primarily on the exciting
            world of web development.
          </p>
          <div className="flex flex-col lg:flex-row items-center gap-4  justify-self-end">
            <Link href="#">
              <button className="bg-black text-white font-medium py-3 px-12 rounded-full w-60 lg:w-auto">
                Contact Me
              </button>
            </Link>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/satyaferiawan/">
                <SocialButton bgColor="instagram">
                  <Instagram className="w-5 h-5" />
                </SocialButton>
              </a>
              <a href="https://www.linkedin.com/in/satya-feriawan/">
                <SocialButton bgColor="linkedin">
                  <Linkedin className="w-5 h-5" />
                </SocialButton>
              </a>
              <a href="https://github.com/satyarrr">
                <SocialButton bgColor="Github">
                  <Github className="w-5 h-5" />
                </SocialButton>
              </a>
              <a href="https://github.com/zetta-satya-feriawan">
                <SocialButton bgColor="Github">
                  <Github className="w-5 h-5" />
                </SocialButton>
              </a>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={PreviewAnimation}
          className="h-[30rem] rounded-3xl p-8 bg-[url('/profile.jpeg')] bg-cover bg-center"
        />
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
        <a href="#">
          <ProjectPreview
            name="Expensive Tracker"
            description="App for calculate price items"
            imageUrl="/project-5.png"
            bgColor="#685cdd"
          />
        </a>
        <a href="#">
          <ProjectPreview
            imageUrl="project-6.png"
            name="ToDoList"
            description="A simple todolist apps"
            bgColor="#176B87"
            dark
          />
        </a>
        <ProjectPreview />
        <ProjectPreview />
      </section>
    </main>
  )
}
