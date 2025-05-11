import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import "../App.css";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const trailImages = [
  "/Vector-1.svg",
  "/Vector-2.svg",
  "/Vector-3.svg",
  '/Vector-4.svg',
  '/Vector-6.svg',
  '/Vector-7.svg',
  '/Vector-8.svg',
  '/Vector-9.svg',
];

function Home() {
  const plans = [
    {
      title: "Starter",
      image: "/starter.svg",
      price: "₹6,999",
      buttontext: "start with starter",
      features: [
        { label: "Mobile & Desktop Friendly Design", included: true },
        { label: "Up to 5 Pages (Home, About, Contact, etc.)", included: true },
        { label: "Basic Contact Form", included: true },
        { label: "Basic SEO Setup", included: false },
        { label: "Admin Panel (CMS)", included: false },
        { label: "1 Week Support After Delivery", included: true },
      ],
      whatsapp: "Hi, I'm interested in the Starter plan."
    },
    {
      title: "Business",
      image: "/medium.svg",
      price: "₹15,999",
      buttontext: "get started today!",
      features: [
        { label: "Mobile & Desktop Friendly Design", included: true },
        { label: "Up to 10 Pages", included: true },
        { label: "Advanced Contact & Inquiry Forms", included: true },
        { label: "SEO Optimization", included: true },
        { label: "Admin Panel (CMS)", included: false },
        { label: "1 Month Support After Delivery", included: true },
      ],
      whatsapp: "Hi, I'm interested in the Business plan."
    },
    {
      title: "Enterprise",
      image: "/premium.svg",
      price: "Custom Quote",
      buttontext: "contact us for a Quote",
      features: [
        { label: "Custom Mobile & Desktop Design", included: true },
        { label: "Unlimited Pages", included: true },
        { label: "Advanced Forms & Integrations", included: true },
        { label: "Full SEO Optimization", included: true },
        { label: "Admin Panel (CMS) Included", included: true },
        { label: "3 Months Priority Support", included: true },
      ],
      whatsapp: "Hi,i'm interested in your custom website plan"
    },
  ];

  const reviews = [
    {
      content: "Working with this team was an absolute game-changer for our business! Their creative approach and attention to detail transformed our website into something beyond our expectations. The user experience is seamless, and our customers have noticed the difference. We couldn't be happier with the end result!",
      person: "Sarah M. - Founder, Tech Innovators",
      image: "/person1.jpeg"
    },
    {
      content: "The team was incredible from start to finish. They not only understood our vision but enhanced it with their expertise. The end product was a perfect blend of functionality and design. Our website now not only looks amazing but also performs flawlessly. We've seen increased traffic and engagement since the launch!",
      person: "John D. - Marketing Director, Global Enterprises",
      image: "/person2.jpg"
    },
    {
      content: "I've worked with many web design agencies, but this team stands out. They brought fresh ideas and creative solutions to the table that made our website stand out in a crowded industry. They took the time to understand our brand and delivered a website that truly reflects who we are. Highly recommend them!",
      person: "Emily R. - Creative Director, Bright Studios",
      image: "/person3.jpg"
    },
  ];

  const containerRef = useRef(null);
  const mainContainerRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const lastPosition = useRef({ x: 0, y: 0 });
  const distanceThreshold = 150;

  const createTrail = useCallback((x, y) => {
    const img = document.createElement("img");
    img.classList.add("image-trail");
    img.src = trailImages[currentImageIndex];

    containerRef.current.appendChild(img);

    setCurrentImageIndex((prev) => (prev + 1) % trailImages.length);

    gsap.set(img, {
      x,
      y,
      scale: 0,
      opacity: 0,
    });

    gsap.to(img, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(img, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      delay: 0.4,
      ease: "power2.in",
      onComplete: () => img.remove(),
    });
  }, [currentImageIndex]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (mainContainerRef.current) {
        const rect = mainContainerRef.current.getBoundingClientRect();
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (!isInside) return;
      }

      const dx = e.clientX - lastPosition.current.x;
      const dy = e.clientY - lastPosition.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > distanceThreshold) {
        createTrail(e.clientX, e.clientY);
        lastPosition.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [createTrail]);

  const btnRefs = useRef([]);

  const svgRef1 = useRef(null);
  const svgRef2 = useRef(null);
  const svgRef3 = useRef(null);
  const logoRef = useRef(null);
  const designRef = useRef(null);
  const websiteRef = useRef(null);
  const secondsectionRef = useRef(null);
  const thirdsectionRef = useRef(null);
  const addBtnRef = (el) => {
    if (el && !btnRefs.current.includes(el)) {
      btnRefs.current.push(el);
    }
  };
  
  useEffect(() => {
    const buttons = [...btnRefs.current];

    buttons.forEach((btn) => {
      const handleMouseMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(btn, {
          '--xpos': `${x}px`,
          '--ypos': `${y}px`,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      btn.addEventListener("mousemove", handleMouseMove);
      btn._handleMouseMove = handleMouseMove;
    });

    gsap.to(svgRef3.current, {
      rotate: 180,
      duration: 2,
      delay: 1,
      ease: "power2.inOut",
      repeat: -1,
      repeatDelay: 2,
      yoyo: true,
    });

    gsap.fromTo(svgRef2.current, {
      opacity: 0,
      y: 30,
    }, {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: "power2.out"
    });

    gsap.fromTo(svgRef1.current, {
      scale: 0.5,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
      onComplete: () => {
        gsap.to(svgRef1.current, {
          scale: 1.05,
          duration: 1,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
      }
    });

    gsap.fromTo(secondsectionRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: secondsectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    gsap.fromTo(thirdsectionRef.current, {
      opacity: 0, x: 100
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: thirdsectionRef.current,
        start: "top 70%",
        toggleActions: "play reverse play reverse"
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: secondsectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
      }
    });

    tl.fromTo(designRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }
    )
      .fromTo(websiteRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        },
        "-=0.3"
      )
      .fromTo(logoRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        },
        "-=0.3"
      );

    return () => {
      buttons.forEach((btn) => {
        if (btn._handleMouseMove) {
          btn.removeEventListener("mousemove", btn._handleMouseMove);
          delete btn._handleMouseMove;
        }
      });
    };
  }, []);

  return (
    <div className="home-container">
      <div className="main-container" ref={mainContainerRef}>
        <div className="trail-container" ref={containerRef}></div>
        <Navbar />
        
        <section className="hero-section">
          <div className="hero-content">
            <h1>Great design starts here.</h1>
            <p>We don't just build websites—we create experiences that connect, inspire, and grow your brand.</p>
            <div className="buttons">
              <Link to="/contact">
                <button className="start-button">Start your project</button>
              </Link>
              <button className="view-button" ref={addBtnRef}>
                <span>view our work</span>
              </button>
            </div>
          </div>
          <img src="/vectorimage1.svg" alt="svgimage" className="vectorimage1" ref={svgRef1} />
          <img src="/vectorimage2.svg" alt="svgimage" className="vectorimage2" ref={svgRef2} />
          <img src="/vectorimage3.svg" alt="svgimage" className="vectorimage3" ref={svgRef3} />
        </section>
      </div>

      <div className="second-section" ref={secondsectionRef}>
        <div className="header">
          <p>top</p>
          <p>Works</p>
        </div>
        <div className="works">
          <div className="logo" ref={logoRef}>
            <img src="/atclogo.png" alt="logo" className="logoimage" />
          </div>
          <div className="design" ref={designRef}>
            <img src="/designimage.jpeg" alt="design" className="designimage" />
          </div>
          <div className="website" ref={websiteRef}>
            <img src="/websiteimage.jpeg" alt="website" className="websiteimage" />
          </div>
        </div>
        <div className="button">
          <button className="explore-button">Explore more</button>
        </div>
      </div>

      <div className="third-section" ref={thirdsectionRef}>
        <p className="thirdsection-title">What our clients are saying</p>
        <div className="reviews">
          {reviews.map((review, index) => (
            <div key={index} className={`review review-${index}`}>
              <p>{review.content}</p>
              <div className="review-person">
                <img src={review.image} alt="review" className="reviewimage" />
                <p className="person-name">{review.person}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="pricing-section">
        <div className="pricing-header">
          <h2 className="pricing-title">Affordable website solutions</h2>
          <p className="pricing-subtitle">Choose the perfect plan tailored to your needs, from personal to enterprise solutions.</p>
        </div>
        <div className="pricing-cards">
          {plans.map((plan, index) => (
            <div className="pricing-card" key={index}>
              <div className="card-header">
                <h3 className="plan-title">
                  <img src={plan.image} alt={plan.title} className="planimage" />
                  {plan.title}
                </h3>
                <p className="plan-price">{plan.price}</p>
              </div>
              <ul className="feature-list">
                {plan.features.map((feature, i) => (
                  <li key={i} className={`feature ${feature.included ? "included" : ""}`}>
                    <img src="/Check.svg" alt="check" className="check" />
                    {feature.label}
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/917386131419?text=Hi,%20I'm%20interested%20in%20the%20${encodeURIComponent(plan.title)}%20plan.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="select-button" ref={addBtnRef}>
                  {plan.buttontext}
                </button>
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="topcta">
          <div className="getintouch">
            <p>Get in touch</p>
            <a
              href={`https://wa.me/917386131419?text=Hi,%20I'm%20interested%20in%20building%20my%20website.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="cta-button">
                Let's Build Your Website
              </button>
            </a>
          </div>
          <div className="services-connect">
            <div className="services">
              <p>services</p>
              <ul>
                <li>ui ux design</li>
                <li>web development</li>
                <li>poster making</li>
                <li>marketing</li>
              </ul>
            </div>
            <div className="connect">
              <p>Connect</p>
              <ul>
                <Link to="/contact">
                  <li>contact us</li>
                </Link>
                <li>Linkedin</li>
                <li>Instagram</li>
                <li>youtube</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="lastone">
          <p className="year">© {new Date().getFullYear()} ATCIDEAS. All rights reserved</p>
          <p>privacy policy.Terms of use</p>
        </div>
      </section>
    </div>
  );
}

export default Home;