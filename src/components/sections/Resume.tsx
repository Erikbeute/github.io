import React from 'react';
import './Resume.css';
import {
  SiJavascript,
  SiTypescript,
//   SiSharp,
  SiReact,
  SiAngular,
  SiPhp,
  SiLaravel,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiSass, 
  SiMysql,
} from "react-icons/si";


type ResumeProps = {
    onBack: () => void;
};

export const Resume: React.FC<ResumeProps> = ({ onBack }) => {
    return (
        <section id="resume" className="resume">
            <button className="resume-back" onClick={onBack}>
                ← Back
            </button>

            <div className="resume-container">
                <h2 className="resume-title">Resume</h2>

                <div className="resume-block">
                    <h3 className="resume-item-title">Profile</h3>
                    <p>
                        Software Engineer who builds practical, scalable solutions. Works autonomously, <br></br>
                        contributes ideas, and smoothly bridges the gap between technology and people.
                    </p>
                </div>

                <div className="resume-block">
                    <h3 className="resume-item-title">Work experience</h3>

                    <div className="resume-item">
                        <span className="resume-meta">2024 – Present</span>
                        <strong>Software Engineer / Implementation Consultant — Unica</strong>
                        <p>C#, TypeScript, React, PHP (Laravel), Tailwind, JavaScript, IoT</p>
                    </div>

                    <div className="resume-item">
                        <span className="resume-meta">2022 – 2024</span>
                        <strong>Developer — Fair Furniture Group</strong>
                        <p>C#, Angular, TypeScript, Azure (CI/CD), PHP,  JavaScript</p>
                    </div>

                    <br></br>
                    <div className="resume-block">
                        <h3 className="resume-item-title">Additional projects</h3>
                        <div className="resume-item">
                            <strong>Expertise Center for Movement (PoC)</strong>
                            <p>C#, TypeScript, React</p>
                            <p>
                                Proof of Concept focused on applying AI diagnostics within healthcare.
                            </p>
                        </div>
                    </div>



                    <br></br>

                    <div className="resume-block">
                        <h3 className="resume-item-title">Education</h3>
                        <p>2022 – 2025
                            HBO ICT: Software Engineering
                            Windesheim University of Applied Sciences, Zwolle (Part-time, completed)
                        </p>
                        <p>
                            2016 – 2018
                            Master EN: Behaviour Specialist
                            Windesheim University of Applied Sciences, Zwolle (Completed)
                        </p>
                        <p>
                            2006 – 2010
                            Teacher Training in History
                            Windesheim University of Applied Sciences, Zwolle (Completed)
                        </p>

                    </div>

                    <div className="resume-item">
                        <span className="resume-meta"><strong>2020 – 2022</strong></span>
                        <p className="resume-meta">Educational Developer & Teacher </p>
                    </div>

                    <div className="resume-item">
                        <span className="resume-meta"><strong>2012 – 2020</strong></span>
                        <p className='resume-meta'>Teacher (Secondary Special Education) </p>
                    </div>
                </div>


                <div className="resume-block">
                    <h3 className="resume-item-title">Skills</h3>

                    <ul className="resume-skills-icons">
                        <li title="PHP"><SiPhp /></li>
                        <li title="Laravel"><SiLaravel /></li>
                        <li title="JavaScript"><SiJavascript /></li>
                        <li title="TypeScript"><SiTypescript /></li>
                        <li title="C#">C#</li>
                        <li title="React"><SiReact /></li>


                        <li title="Tailwind CSS"><SiTailwindcss /></li>
                        <li title="HTML5"><SiHtml5 /></li>
                        <li title="CSS3"><SiCss3 /></li>
                        <li title="SCSS"><SiSass /></li>
                        <li title="Angular"><SiAngular /></li>
                        {/* <li title="Azure CI/CD"><SiMicrosoftazuredevops /></li> */}
                        <li title="SQL"><SiMysql /></li>
                    </ul>
                </div>
            </div>
        </section>
    );
};