import React from "react"
import { motion } from "framer-motion"

const Menu=()=>{
    // Animation variants for fade-in effect
    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                duration: 0.7,
                type: "spring",
                stiffness: 60
            }
        })
    }

    return(
        <main className="main-content">
        <section id="breakfast" className="section container">
            <h2 id="breakfast-heading" className="section__title">Breakfast Menu</h2>
            <div className="cards">
                {[{
                    img: "/img/Menu/Breakfast/toast.png",
                    alt: "Avocado Toast",
                    title: "Avocado Toast",
                    price: "$12.00",
                    text: "Toasted sourdough, fresh avocado, cherry tomatoes, and a perfectly poached egg."
                }, {
                    img: "/img/Menu/Breakfast/pancake.png",
                    alt: "Classic Pancakes",
                    title: "Classic Pancakes",
                    price: "$10.00",
                    text: "Fluffy buttermilk pancakes served with seasonal berries and maple syrup."
                }, {
                    img: "/img/Menu/Breakfast/burrito.png",
                    alt: "Breakfast Burrito",
                    title: "Breakfast Burrito",
                    price: "$11.50",
                    text: "Warm tortilla filled with scrambled eggs, cheddar, black beans, and salsa."
                }].map((item, i) => (
                    <motion.article
                        className="card"
                        key={item.title}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={cardVariants}
                    >
                        <motion.img
                            className="card__image"
                            src={item.img}
                            alt={item.alt}
                            whileHover={{ scale: 1.08, rotate: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}
                            transition={{ type: "spring", stiffness: 300 }}
                        />
                        <div className="card__body">
                            <h3 className="card_title">{item.title}</h3>
                            <p className="card__price">{item.price}</p>
                            <p className="card__text">{item.text}</p>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>

        <section id="lunch" className="section container">
            <h2 id="lunch-heading" className="section__title">Lunch Menu</h2>
            <div className="cards">
                {[{
                    img: "/img/Menu/Lunch/sandwitch.png",
                    alt: "Caprese Sandwich",
                    title: "Caprese Sandwich",
                    price: "$13.50",
                    text: "Fresh mozzarella, ripe tomatoes, basil pesto, and balsamic glaze on focaccia."
                }, {
                    img: "/img/Menu/Lunch/salad.png",
                    alt: "Mediterranean Quinoa Salad",
                    title: "Mediterranean Quinoa Salad",
                    price: "$14.00",
                    text: "Nutritious quinoa with roasted vegetables, feta, and a light lemon vinaigrette."
                }, {
                    img: "/img/Menu/Lunch/chicken.png",
                    alt: "Grilled Chicken Wrap",
                    title: "Grilled Chicken Wrap",
                    price: "$12.00",
                    text: "Tender grilled chicken, fresh lettuce, and our special sauce wrapped in a soft tortilla."
                }].map((item, i) => (
                    <motion.article
                        className="card"
                        key={item.title}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={cardVariants}
                    >
                        <motion.img
                            className="card__image"
                            src={item.img}
                            alt={item.alt}
                            whileHover={{ scale: 1.08, rotate: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}
                            transition={{ type: "spring", stiffness: 300 }}
                        />
                        <div className="card__body">
                            <h3 className="card_title">{item.title}</h3>
                            <p className="card__price">{item.price}</p>
                            <p className="card__text">{item.text}</p>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>

        <section id="drinks" className="section container">
            <h2 id="drinks-heading" className="section__title">Drinks Menu</h2>
            <div className="cards">
                {[{
                    img: "/img/Menu/Drinks/coffe.png",
                    alt: "Espresso",
                    title: "Espresso",
                    price: "$3.50",
                    text: "A rich and intense shot of our signature coffee blend."
                }, {
                    img: "/img/Menu/Drinks/milk.png",
                    alt: "Iced Latte",
                    title: "Iced Latte",
                    price: "$5.00",
                    text: "Chilled espresso with fresh milk over ice — perfect for a warm day."
                }, {
                    img: "/img/Menu/Drinks/juice.png",
                    alt: "Fresh Orange Juice",
                    title: "Fresh Orange Juice",
                    price: "$4.50",
                    text: "Hand-squeezed daily from the finest oranges."
                }].map((item, i) => (
                    <motion.article
                        className="card"
                        key={item.title}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={cardVariants}
                    >
                        <motion.img
                            className="card__image"
                            src={item.img}
                            alt={item.alt}
                            whileHover={{ scale: 1.08, rotate: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}
                            transition={{ type: "spring", stiffness: 300 }}
                        />
                        <div className="card__body">
                            <h3 className="card_title">{item.title}</h3>
                            <p className="card__price">{item.price}</p>
                            <p className="card__text">{item.text}</p>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>

        <section id="desserts" className="section container">
            <h2 id="desserts-heading" className="section__title">Desserts Menu</h2>
            <div className="cards">
                {[{
                    img: "/img/Menu/Desert/chocolate.png",
                    alt: "Chocolate Lava Cake",
                    title: "Chocolate Lava Cake",
                    price: "$9.00",
                    text: "Warm, gooey chocolate cake with a molten center, served with vanilla ice cream."
                }, {
                    img: "/img/Menu/Desert/cheese_cake.png",
                    alt: "New York Cheesecake",
                    title: "New York Cheesecake",
                    price: "$8.50",
                    text: "Classic creamy cheesecake on a graham cracker crust, topped with berry compote."
                }, {
                    img: "/img/Menu/Desert/Fruit.png",
                    alt: "Seasonal Fruit Tart",
                    title: "Seasonal Fruit Tart",
                    price: "$7.50",
                    text: "Light pastry crust filled with crème pâtissière and topped with fresh seasonal fruits."
                }].map((item, i) => (
                    <motion.article
                        className="card"
                        key={item.title}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={cardVariants}
                    >
                        <motion.img
                            className="card__image"
                            src={item.img}
                            alt={item.alt}
                            whileHover={{ scale: 1.08, rotate: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}
                            transition={{ type: "spring", stiffness: 300 }}
                        />
                        <div className="card__body">
                            <h3 className="card_title">{item.title}</h3>
                            <p className="card__price">{item.price}</p>
                            <p className="card__text">{item.text}</p>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    </main>

    )
}
export default Menu;