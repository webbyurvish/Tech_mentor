import React from "react";
// import "./about.css";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <div id="___gatsby">
        <div
          style={{ outline: "none" }}
          tabindex="-1"
          role="group"
          id="gatsby-focus-wrapper"
        >
          <nav class="bg-primary-light py-4">
            <div class="acontainer-fluid">
              <ul class="inline-block">
                <li class="mr-3 inline-block md:mr-8">
                  <Link to={"/"} class="header-cover">
                    Mentors
                  </Link>
                </li>
                <li class="mr-3 inline-block md:mr-8">
                  <a
                    href="https://shop.spreadshirt.com/coding-coach"
                    class="header-cover"
                  >
                    Store
                  </a>
                </li>
                <li class="mr-3 inline-block md:mr-8">
                  <a class="header-cover" href="/mock-openings">
                    Mock Openings
                  </a>
                </li>
                <li class="mr-3 inline-block md:mr-8">
                  <a
                    class="header-cover"
                    href="/guidelines/mentorship-guidelines"
                  >
                    Mentorship Guidelines
                  </a>
                </li>
                <li class="mr-3 inline-block md:mr-8">
                  <a class="header-cover" href="/blog">
                    Blog
                  </a>
                </li>
                <li class="mr-3 inline-block md:mr-8">
                  <a class="header-cover" href="/about">
                    About
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          {/* <header class="header bg-primary-light bg-diagonal-primary-light bg-diagonal">
            <div class="acontainer-fluid">
              <div class="header-cover">
                <div class="header-inner-cover">
                  <h1>Coding</h1>
                  <h2>Coach</h2>
                  <p>Connecting developers with mentors worldwide</p>
                  <a href="https://mentors.codingcoach.io" class="shadow-lg">
                    Find a mentor
                  </a>
                </div>
                <div class="hidden md:block flex-1">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MjgiIGhlaWdodD0iMzQ4IiB2aWV3Qm94PSIwIDAgNjI4IDM0OCI+CiAgPGcgZmlsbD0iI0ZGRiIgZmlsbFJ1bGU9ImV2ZW5vZGQiPgogICAgPHBvbHlnb24gcG9pbnRzPSI0MDcgNDYuNTk1IDUzNC42MzkgMTc0IDQwNyAzMDEuNDA1IDQ1My42ODEgMzQ4IDYyOCAxNzQgNDUzLjY4MSAwIi8+CiAgICA8cGF0aCBkPSJNMzg4LDMwMS40MDQ5ODMgTDI2MC4zMDk3NDYsMTc0IEwzODgsNDYuNTk1MDE2NSBMMzQxLjI0MzE0MiwwIEwyMTMuMzk1NjM0LDEyNy40MDQ5ODMgTDE2Ni43OTYwMjksMTc0IEwxMzcuMzM3MTEyLDIwMy4zNTY5NSBDMTI1LjM4NzI2NiwyMTUuNDIxMTEzIDEwNy4zMDgwMjYsMjE5LjA5NjE2IDkxLjU3MTM1ODMsMjEyLjY1OTk1NyBDNzUuODM0NjkxMSwyMDYuMjIzNzU0IDY1LjU1ODY3NzgsMTkwLjk1MTU3OCA2NS41NTg2Nzc4LDE3NCBDNjUuNTU4Njc3OCwxNTcuMDQ4NDIyIDc1LjgzNDY5MTEsMTQxLjc3NjI0NiA5MS41NzEzNTgzLDEzNS4zNDAwNDMgQzEwNy4zMDgwMjYsMTI4LjkwMzg0IDEyNS4zODcyNjYsMTMyLjU3ODg4NyAxMzcuMzM3MTEyLDE0NC42NDMwNSBMMTUxLjkwOTMxNywxNTkuMTY0ODE1IEwxOTguNjY2MTc1LDExMi41Njk3OTkgTDE4NC4wOTM5Nyw5OC4wNDgwMzM2IEMxNTMuMjYyNjIxLDY3LjMwMTQ4NzEgMTA2Ljg3OTYzOCw1OC4wOTQ0MjQyIDY2LjU3OTE5NTMsNzQuNzIxMjQ3NCBDMjYuMjc4NzUyNCw5MS4zNDgwNzA1IDAsMTMwLjUzMzMxMSAwLDE3NCBDMCwyMTcuNDY2Njg5IDI2LjI3ODc1MjQsMjU2LjY1MTkyOSA2Ni41NzkxOTUzLDI3My4yNzg3NTMgQzEwNi44Nzk2MzgsMjg5LjkwNTU3NiAxNTMuMjYyNjIxLDI4MC42OTg1MTMgMTg0LjA5Mzk3LDI0OS45NTE5NjYgTDIxMy41NTI4ODgsMjIwLjU5NTAxNyBMMzQxLjQwMDM5NiwzNDggTDM4OCwzMDEuNDA0OTgzIFoiLz4KICA8L2c+Cjwvc3ZnPgo="
                    class="w-5/6 float-right"
                    alt="The coding coach logo"
                  />
                </div>
              </div>
            </div>
          </header> */}
          <section class="py-32">
            <div class="container-fluid d-flex align-items-center md:flex-row-reverse">
              <div class="md:flex-1 mr-6 md:flex md:flex-col md:items-end md:pl-16">
                <img
                  src="https://codingcoach.io/static/about-01142835027ed21d551128444ff6d5a0.svg"
                  alt="Illustration"
                />
              </div>
              <div class="mt-16 md:mt-0 md:w-2/5 text-right">
                <h3 class="text-6xl font-display font-normal uppercase leading-tight mb-6 border-b border-secondary-lightest text-primary-light md:text-right">
                  About
                </h3>
                <p class="text-lg text-secondary-dark leading-normal font-body md:text-right">
                  Coding Coach is a free, open-source platform which aims to
                  connect software developers and mentors all over the world. It
                  is built by a group of talented and passionate developers,
                  designers, engineers, and humans who want to make the
                  engineering world a better place to collaborate. This project
                  was born out of a desire to provide a platform to connect
                  mentors and mentees throughout the world at no cost. Coding
                  Coach is created by the people, for the people.
                </p>
              </div>
            </div>
          </section>
          <section class="py-32 bg-primary-lighter bg-band bg-band-primary-lighter">
            <div class="container-fluid lighter-tigh-cover md:flex md:flex-row">
              <div class="md:flex-1 md:flex md:flex-col md:pr-16">
                <h3 class="text-6xl font-display font-normal uppercase leading-tight-2 mb-6 border-b border-secondary-lightest text-secondary-dark">
                  Mission
                </h3>
                <p class="text-lg text-secondary-dark leading-normal font-body">
                  We believe that mentorship should be accessible to all people
                  regardless of location or financial standing. In pursuit of
                  this goal we will provide a free and open source platform to
                  facilitate mentorship connections. Our mission is to foster a
                  greater sense of collaboration and inclusiveness in the
                  technical industry by providing a platform to aid the
                  mentorship process.
                </p>
              </div>
              <div class="mt-16 md:mt-0 md:w-2/5">
                <img
                  src="https://codingcoach.io/static/mission-3c72b01c43a10d34c2d828b13c14bfd0.svg"
                  alt="Illustration"
                />
              </div>
            </div>
          </section>
          <section class="py-32">
            <div class="container-fluid d-flex align-items-center md:flex md:flex-row-reverse">
              <div class="mt-16 md:mt-0 md:w-2/5">
                <img
                  src="https://codingcoach.io/static/contact-ba7a97dc3f4b9e2ec032e0374192c668.svg"
                  alt="Illustration"
                  style={{ width: "100%", maxWidth: "600px" }}
                />
              </div>
              <div class="md:flex-1 text-right md:flex md:flex-col md:items-end md:pl-16">
                <h3 class="leading-tight" style={{ width: "250px" }}>
                  Contact
                </h3>
                <p class="leading-normal">
                  We want to hear your thoughts! Feel free to join our Slack
                  Organization or send us an email at admin@codingcoach.io
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
