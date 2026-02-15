import React, { useState, useRef } from "react"
import { sendContactMessage } from "../api";

const Contact = () => {
  // State for form fields and validation
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Validation logic
  const validate = {
    name: v => v.trim().length > 1,
    email: v => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v),
    message: v => v.trim().length > 5,
  };
  const isValid = Object.keys(validate).every(key => validate[key](fields[key]));

  const handleChange = e => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };
  const handleBlur = e => {
    setTouched({ ...touched, [e.target.name]: true });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    // Only set touched for fields that are empty or invalid
    setTouched(t => ({
      name: fields.name ? t.name : true,
      email: fields.email ? t.email : true,
      message: fields.message ? t.message : true,
    }));
    if (!isValid) return;
    setSubmitting(true);
    setError('');
    try {
      await sendContactMessage(fields);
      setSuccess(true);
      setFields({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
    } catch (err) {
      setError('Failed to send message. Please try again.');
    }
    setSubmitting(false);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <main id="cp-main" className="cp-main">
      <section className="cp-contact container">
        <h1 id="cp-contact-heading" className="cp-heading">Get In Touch</h1>
        <div className="form-container">
          <form className="cp-contact__form" autoComplete="off" onSubmit={handleSubmit}>
            <div className={`cp-field-group floating-label ${fields.name ? 'has-value' : ''}`}>
              <input
                id="cp-name"
                name="name"
                className={`cp-input ${touched.name && !validate.name(fields.name) ? 'invalid' : ''}`}
                type="text"
                value={fields.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <label htmlFor="cp-name" className="cp-label">Name</label>
              {/* Only show error if user has interacted with the field */}
              {touched.name && !validate.name(fields.name) && (
                <span className="input-error">Please enter your name.</span>
              )}
            </div>
            <div className={`cp-field-group floating-label ${fields.email ? 'has-value' : ''}`}>
              <input
                id="cp-email"
                name="email"
                className={`cp-input ${touched.email && !validate.email(fields.email) ? 'invalid' : ''}`}
                type="email"
                value={fields.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <label htmlFor="cp-email" className="cp-label">Email</label>
              {/* Only show error if user has interacted with the field */}
              {touched.email && !validate.email(fields.email) && (
                <span className="input-error">Enter a valid email.</span>
              )}
            </div>
            <div className={`cp-field-group floating-label ${fields.message ? 'has-value' : ''}`}>
              <textarea
                id="cp-message"
                name="message"
                className={`cp-textarea ${touched.message && !validate.message(fields.message) ? 'invalid' : ''}`}
                rows="6"
                value={fields.message}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder=" "
              ></textarea>
              <label htmlFor="cp-message" className="cp-label">Message</label>
              {/* Only show error if user has interacted with the field */}
              {touched.message && !validate.message(fields.message) && (
                <span className="input-error">Message must be at least 6 characters.</span>
              )}
            </div>
            <button type="submit" className="cp-btn" disabled={submitting || !isValid}>
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
            {success && (
              <div className="success-message animate-success">Thank you! Your message has been sent.</div>
            )}
            {error && <div className="input-error">{error}</div>}
          </form>
        </div>
      </section>

      <section className="cp-reservation container">
        <h2 id="cp-reservation-heading" className="cp-heading2">Book a Table</h2>
        <ReservationForm />
      </section>

      <section className="cp-location container">
              <section className="cp-gallery container">
                <h2 className="cp-heading2" style={{ textAlign: 'center', marginBottom: '2rem' }}>Gallery</h2>
                <div className="cp-gallery__grid">
                  {[
                    '/img/Contact/place1.jpg',
                    '/img/Contact/place2.jpg',
                    '/img/Contact/place3.jpg',
                    '/img/Contact/palce4.jpg',
                  ].map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={`Gallery ${i + 1}`}
                      className="cp-gallery__img"
                      loading="lazy"
                    />
                  ))}
                </div>
              </section>
        <h2 id="cp-location-heading" className="cp-heading--secondary">Our Location</h2>
        <div className="cp-location__wrap">
          <address className="cp-address">
            <strong>Hill Bottom Restaurant</strong><br/>
            Airport Rd, Addis Ababa 1755<br/>
            Phone: (251) 923456789<br/>
            Email: <a href="mailto:info@hillbottom.com">info@hillbottom.com</a>
            <p className="cp-address__note">We look forward to welcoming you to HILL BOTTOM <br/>Feel free to drop by or contact us for assistance.</p>
          </address>
          <div className="cp-map">
            <iframe
              className="cp-map__img"
              title="Hill Bottom Recreation & Spa Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.760964899839!2d38.8733579!3d9.022369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b909c514569b9%3A0x613d439899a2cb5f!2sHill%20Bottom%20Recreation%20%26%20Spa!5e0!3m2!1sen!2set!4v1706630000000!5m2!1sen!2set"
              width="100%"
              height="280"
              style={{ border: 0, borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </main>  
    )
  }


// Reservation form as a subcomponent
import { sendReservation } from "../api";

function ReservationForm() {
  const [fields, setFields] = React.useState({ name: '', phoneNumber: '', date: '', time: '', guests: 1 });
  const [touched, setTouched] = React.useState({ name: false, phoneNumber: false, date: false, time: false, guests: false });
  const [success, setSuccess] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const validate = {
    name: v => v.trim().length > 1,
    phoneNumber: v => /^\+?[0-9\-\s]{7,}$/.test(v),
    date: v => !!v,
    time: v => !!v,
    guests: v => Number(v) > 0,
  };
  const isValid = Object.keys(validate).every(key => validate[key](fields[key]));

  const handleChange = e => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };
  const handleBlur = e => {
    setTouched({ ...touched, [e.target.name]: true });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    // Only set touched for fields that are empty or invalid
    setTouched(t => ({
      name: fields.name ? t.name : true,
      phoneNumber: fields.phoneNumber ? t.phoneNumber : true,
      date: fields.date ? t.date : true,
      time: fields.time ? t.time : true,
      guests: fields.guests ? t.guests : true,
    }));
    if (!isValid) return;
    setSubmitting(true);
    try {
      await sendReservation(fields);
      setSuccess(true);
      setFields({ name: '', phoneNumber: '', date: '', time: '', guests: 1 });
      setTouched({ name: false, phoneNumber: false, date: false, time: false, guests: false });
    } catch (err) {
      // Optionally show error
    }
    setSubmitting(false);
    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <form className="cp-reserv__form" autoComplete="off" onSubmit={handleSubmit}>
      <div className="cp-reserv__row">
        <div className="cp-field">
          <label className="cp-label" htmlFor="cp-res-name">Name</label>
          <input
            id="cp-res-name"
            name="name"
            className={`cp-input ${touched.name && !validate.name(fields.name) ? 'invalid' : ''}`}
            type="text"
            value={fields.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.name && !validate.name(fields.name) && (
            <span className="input-error">Please enter your name.</span>
          )}
        </div>
        <div className="cp-field">
          <label className="cp-label" htmlFor="cp-res-phone">Phone Number</label>
          <input
            id="cp-res-phone"
            name="phoneNumber"
            className={`cp-input ${touched.phoneNumber && !validate.phoneNumber(fields.phoneNumber) ? 'invalid' : ''}`}
            type="tel"
            value={fields.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.phoneNumber && !validate.phoneNumber(fields.phoneNumber) && (
            <span className="input-error">Enter a valid phone number.</span>
          )}
        </div>
        <div className="cp-field">
          <label className="cp-label" htmlFor="cp-date">Date</label>
          <input
            id="cp-date"
            name="date"
            className={`cp-input ${touched.date && !validate.date(fields.date) ? 'invalid' : ''}`}
            type="date"
            value={fields.date}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </div>
        <div className="cp-field">
          <label className="cp-label" htmlFor="cp-time">Time</label>
          <input
            id="cp-time"
            name="time"
            className={`cp-input ${touched.time && !validate.time(fields.time) ? 'invalid' : ''}`}
            type="time"
            value={fields.time}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </div>
        <div className="cp-field">
          <label className="cp-label" htmlFor="cp-guests">Guests</label>
          <input
            id="cp-guests"
            name="guests"
            className={`cp-input ${touched.guests && !validate.guests(fields.guests) ? 'invalid' : ''}`}
            type="number"
            min="1"
            value={fields.guests}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </div>
      </div>
      <button type="submit" className="cp-btn" disabled={submitting || !isValid}>
        {submitting ? 'Booking...' : 'Make Reservation'}
      </button>
      {success && (
        <div className="success-message animate-success">Reservation submitted! We look forward to seeing you.</div>
      )}
    </form>
  );
}

export default Contact;