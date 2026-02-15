import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const fullText = "Savor the Flavors of Fine Dining";
    const [displayedText, setDisplayedText] = useState("");
    const cardRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(fullText.slice(0, i + 1));
            i++;
            if (i === fullText.length) clearInterval(interval);
        }, 80); // Adjust speed here
        return () => clearInterval(interval);
    }, []);

    // Animated counter for years of expertise, triggers when chef section is visible
    const [years, setYears] = useState(0);
    const chefSectionRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [chefVisible, setChefVisible] = useState(false);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setChefVisible(true);
                    if (!hasAnimated) {
                        let start = 0;
                        const end = 20;
                        let incrementTime = 40;
                        let timer = setInterval(() => {
                            start += 1;
                            setYears(start);
                            if (start === end) {
                                clearInterval(timer);
                                setHasAnimated(true);
                            }
                        }, incrementTime);
                    }
                }
            },
            { threshold: 0.3 }
        );
        if (chefSectionRef.current) {
            observer.observe(chefSectionRef.current);
        }
        return () => {
            if (chefSectionRef.current) {
                observer.unobserve(chefSectionRef.current);
            }
        };
    }, [hasAnimated]);

     // About image animation
     const aboutImgRef = useRef(null);
     const [aboutImgVisible, setAboutImgVisible] = useState(false);
     useEffect(() => {
         const observer = new window.IntersectionObserver(
             (entries) => {
                 if (entries[0].isIntersecting) {
                     setAboutImgVisible(true);
                 }
             },
             { threshold: 0.5 }
         );
         if (aboutImgRef.current) {
             observer.observe(aboutImgRef.current);
         }
         return () => {
             if (aboutImgRef.current) {
                 observer.unobserve(aboutImgRef.current);
             }
         };
     }, []);

     return (
        <>
                        <section id="hero" className="hero" role="banner" style={{ position: 'relative', overflow: 'hidden' }}>
                                {/* Floating decorative elements */}

                <div className="hero__inner container">
                    <h1 className="hero__title">{displayedText}</h1>
                    <p className="hero__lead">
                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            Experience culinary excellence with every dish, <br />crafted from the freshest ingredients.
                        </span>
                    </p>
                    
                    <a href="#dishes"><button className="btn">View Menu</button></a>
                </div>
            </section>

            {/* About section*/}
            <section id="about" className="about container">
                                <div className="about__media">
                                        <img
                                            ref={aboutImgRef}
                                            className={`about__image${aboutImgVisible ? ' about__image--rotate' : ''}`}
                                            src="/img/Home/About/about-us.jpg"
                                            alt="error"
                                        />
                                </div>
                <div className="about__content">
                    <h2 id="about-heading" className="about__title">About Hill Bottom Restaurant</h2>
                    <p className="about__lead">At Hill Bottom we celebrate seasonal, thoughtfully prepared dishes that highlight the best ingredients. Our chefs blend modern techniques with classic flavors to create memorable dining experiences.</p>
                    <p className="about__text">Founded on a love for hospitality, we focus on fresh sourcing, attentive service, and a warm atmosphere — whether you're joining us for a special occasion or a relaxed meal.</p>
                    <blockquote className="about__quote">"Cooking is an act of love, a way to share joy and create unforgettable memories through taste."</blockquote>
                </div>
            </section>

            <main className="main-content">
                <section id="dishes" className="section container">
                    <h2 id="dishes-heading" className="section__title">Our Signature Dishes</h2>
                    <div className="cards cards--dishes">
                        <article ref={cardRefs[0]} className="card card--dish">
                            <img className="card__image" src="/img/Home/Dishes/Selection (2).png" alt="Pan-Seared Scallops" />
                            <div className="card__body">
                                <h4 className="card__title">Pan-Seared Scallops</h4>
                                <p className="card__text">Perfectly seared scallops served with a delicate lemon-butter sauce and asparagus.</p>
                            </div>
                        </article>

                        <article ref={cardRefs[1]} className="card card--dish">
                            <img className="card__image" src="/img/Home/Dishes/Selection (3).png" alt="Braised Short Ribs" />
                            <div className="card__body">
                                <h4 className="card__title">Braised Short Ribs</h4>
                                <p className="card__text">Tender beef short ribs slow-braised to perfection, accompanied by creamy mashed potatoes.</p>
                            </div>
                        </article>

                        <article ref={cardRefs[2]} className="card card--dish">
                            <img className="card__image" src="/img/Home/Dishes/Selection (4).png" alt="Mushroom Risotto" />
                            <div className="card__body">
                                <h4 className="card__title">Mushroom Risotto</h4>
                                <p className="card__text">Creamy arborio rice with assorted wild mushrooms, Parmesan cheese, and truffle oil.</p>
                            </div>
                        </article>

                        <article ref={cardRefs[3]} className="card card--dish">
                            <img className="card__image" src="/img/Home/Dishes/Selection (5).png" alt="Decadent Chocolate Lava Cake" />
                            <div className="card__body">
                                <h4 className="card__title">Decadent Chocolate Lava Cake</h4>
                                <p className="card__text">Rich chocolate cake with a molten center, served with a scoop of vanilla bean ice cream.</p>
                            </div>
                        </article>
                    </div>
                </section>

                <section id="chef" className={`section chef container${chefVisible ? ' chef-animate' : ''}`} ref={chefSectionRef}>
                    <div className={`chef__media${chefVisible ? ' chef__media--show' : ''}`}>
                        <img className="chef__image" src="/img/Home/chef/chefs.jpg" alt="Portrait of the chef" />
                    </div>
                    <div className={`chef__content${chefVisible ? ' chef__content--show' : ''}`}>
                                                <h2 id="chef-heading" className="chef__title">Meet Our Chef, Chef Antoine Dubois</h2>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
                                                    <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f4c66a', letterSpacing: '2px', lineHeight: 1 }}>
                                                        {years}
                                                    </span>
                                                    <span style={{ fontSize: '1.2rem', fontWeight: '500', color: '#333' }}>years of expertise</span>
                                                </div>
                                                <p className="chef__bio">Chef Antoine Dubois brings over 20 years of culinary expertise, specializing in modern European cuisine with a flair for fresh, seasonal ingredients. His passion for gastronomy shines through in every meticulously crafted dish.</p>
                                                <p className="chef__quote">"Cooking is an act of love, a way to share joy and create unforgettable memories through taste."</p>
                                        </div>
                </section>
            </main>
        </>
    );
};

export default Home;