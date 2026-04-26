"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Star, Command, Menu, X } from "lucide-react";
import { supabase } from "../lib/supabase";
import MagicCanvas from "../components/MagicCanvas";

const featureItems = [
  {
    icon: "🎨",
    title: "Playful Style",
    description:
      "Soft gradients, bubbly shapes, and a kawaii-friendly palette that feels like a sticker book.",
  },
  {
    icon: "⚡",
    title: "Smooth Motion",
    description:
      "Framer Motion transitions and floating canvas sprites keep the world lively and cute.",
  },
  {
    icon: "🌈",
    title: "Responsive Joy",
    description:
      "A layout that stretches, shrinks, and sparkles beautifully on every screen size.",
  },
];

export default function Home() {
  const [statusMessage, setStatusMessage] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [pulseMagic, setPulseMagic] = useState(false);
  const [showMagicCanvas, setShowMagicCanvas] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chupaCount, setChupaCount] = useState(1);
  const [purchaseMessage, setPurchaseMessage] = useState("");
  const [showEsewaQR, setShowEsewaQR] = useState(false);
  const [showKhaltiQR, setShowKhaltiQR] = useState(false);
  const costPerChupa = 15;
  const khaltiPublicKey = process.env.NEXT_PUBLIC_KHALTI_PUBLIC_KEY;
  const esewaMerchantId = process.env.NEXT_PUBLIC_ESEWA_MERCHANT_ID;
  const esewaSuccessUrl = process.env.NEXT_PUBLIC_ESEWA_SUCCESS_URL;
  const esewaFailureUrl = process.env.NEXT_PUBLIC_ESEWA_FAILURE_URL;

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCuteMotion = () => {
    if (showMagicCanvas) {
      setStatusMessage("Sparkles turned off. See you later! 💫");
      setPulseMagic(false);
      setShowMagicCanvas(false);
      return;
    }

    setStatusMessage("Sparkles activated! ✨");
    setPulseMagic(true);
    setShowMagicCanvas(true);
    window.setTimeout(() => setPulseMagic(false), 700);
  };

  const handleAmountChange = (event) => {
    const value = Number(event.target.value);
    if (Number.isNaN(value) || value < 1) {
      setChupaCount(1);
      return;
    }
    setChupaCount(value);
  };

  const handleEsewaPayment = () => {
    setShowEsewaQR(true);
    setShowKhaltiQR(false);
    setPurchaseMessage("");
  };

  const handleKhaltiPayment = () => {
    setShowKhaltiQR(true);
    setShowEsewaQR(false);
    setPurchaseMessage("");
  };

  const handleApiDemo = async () => {
    if (!supabase) {
      setStatusMessage("⚠️ Supabase not configured yet!");
      setApiResponse("Please add your Supabase credentials to .env.local");
      return;
    }
    setStatusMessage("Sending test message to Supabase...");
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .insert([
          {
            name: "BIGEM Tester",
            favorite: "kawaii vibes",
            message: "Hello from the button!",
          },
        ])
        .select();
      if (error) throw error;
      console.log("Supabase demo insert data:", data);
      setApiResponse(
        `✨ Test message saved to Supabase! ${JSON.stringify(data)}`,
      );
      setStatusMessage("Supabase API response received!");
    } catch (err) {
      setApiResponse(`Error: ${err.message}`);
      setStatusMessage("Oops! Something went wrong.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!supabase) {
      setStatusMessage("⚠️ Supabase not configured yet!");
      setApiResponse("Please add your Supabase credentials to .env.local");
      return;
    }
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    const favorite = formData.get("favorite");
    const message = formData.get("message");

    setStatusMessage("Sending your cute message to Supabase...");
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .insert([{ name, favorite, message }])
        .select();
      if (error) throw error;
      console.log("Supabase form insert data:", data);
      setApiResponse(`💖 Thank you ${name}! Your message has been saved.`);
      setStatusMessage("Message sent successfully!");
      form.reset();
    } catch (err) {
      setApiResponse(`Error: ${err.message}`);
      setStatusMessage("Oops! Couldn't save your message.");
    }
  };

  return (
    <>
      <main className="page-shell">
        {showMagicCanvas ? <MagicCanvas /> : null}

        <header className="nav-panel">
          <div className="logo-badge">BIGEM</div>
          <button
            type="button"
            className="nav-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
          <nav className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>
              About
            </a>
            <a href="#magic" onClick={() => setMobileMenuOpen(false)}>
              Magic
            </a>
            <a href="#buy" onClick={() => setMobileMenuOpen(false)}>
              Buy
            </a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </a>
          </nav>
        </header>

        <section className="hero-section">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="hero-tag">Welcome to my kawaii corner</span>
            <h1>
              Hi, I&apos;m <span>BIGEM</span>
            </h1>
            <p>
              A cute React + Next.js playground with canvas sprites, bubbly
              motion, and soft pastel energy.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="btn hero-btn"
                onClick={() => scrollToSection("#about")}
              >
                <Sparkles className="icon" /> Explore
              </button>
              <button
                type="button"
                className="btn ghost-btn"
                onClick={() => scrollToSection("#contact")}
              >
                <span className="icon">📩</span> Send a smile
              </button>
            </div>
          </motion.div>

          <motion.div
            className="hero-card"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={
              pulseMagic
                ? { scale: [1, 1.03, 1], rotate: [0, 2, -2, 0], opacity: 1 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="cute-face">
              <div className="cheek left" />
              <div className="cheek right" />
              <div className="mouth" />
            </div>
            <div className="hero-sparkles">
              <span>💖</span>
              <span>🌟</span>
              <span>🍓</span>
            </div>
          </motion.div>
        </section>

        <section id="about" className="section-panel">
          <div className="section-heading">
            <span className="label">About BIGEM</span>
            <h2>Design made for curious kids and charming dreamers</h2>
          </div>

          <div className="feature-grid">
            {featureItems.map((item) => (
              <motion.article
                key={item.title}
                className="feature-card"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <div className="feature-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="magic" className="section-panel magic-panel">
          <div className="magic-layout">
            <div>
              <span className="label">Canvas magic</span>
              <h2>
                Animated shapes, floating sprites, and a playful Node-powered
                API.
              </h2>
              <p>
                This site uses Next.js for React rendering, Framer Motion for
                page animation, GSAP for subtle effects, and a small API route
                to show Node.js capability.
              </p>
              <div className="magic-buttons">
                <button
                  type="button"
                  className="btn soft-btn"
                  onClick={handleCuteMotion}
                >
                  <Star className="icon" /> Cute motion
                </button>
                <button
                  type="button"
                  className="btn soft-btn"
                  onClick={handleApiDemo}
                >
                  <Command className="icon" /> Node API
                </button>
              </div>
              {statusMessage ? (
                <div className="status-banner">{statusMessage}</div>
              ) : null}
              {apiResponse ? (
                <div className="api-response">{apiResponse}</div>
              ) : null}
            </div>

            <div className="magic-card">
              <div className="magic-card-badge">Kawaii Lab</div>
              <p>
                Everything here is cute, responsive, and built with React
                components backed by Next.js routes.
              </p>
              <div className="mini-card-grid">
                <div className="mini-card">🍬 Candy code</div>
                <div className="mini-card">✨ Sparkly state</div>
                <div className="mini-card">🌈 Smooth motion</div>
              </div>
            </div>
          </div>
        </section>

        <section id="buy" className="section-panel buy-section">
          <div className="section-heading">
            <span className="label">Buy Bigem ChupaChups</span>
            <h2>Choose how many chupa chups and pay with eSewa or Khalti</h2>
          </div>

          <div className="buy-layout">
            <div className="buy-card">
              <label>
                Chupa Chups quantity
                <input
                  type="number"
                  min="1"
                  value={chupaCount}
                  onChange={handleAmountChange}
                />
              </label>
              <p className="buy-summary">
                Rs.{costPerChupa} each ={" "}
                <strong>Rs.{chupaCount * costPerChupa}</strong>
              </p>
              <div className="payment-buttons">
                <button
                  type="button"
                  className="btn soft-btn"
                  onClick={handleEsewaPayment}
                >
                  Pay with eSewa
                </button>
                <button
                  type="button"
                  className="btn soft-btn"
                  onClick={handleKhaltiPayment}
                >
                  Pay with Khalti
                </button>
              </div>
              {showEsewaQR && (
                <div className="qr-display">
                  <h3>Scan eSewa QR Code</h3>
                  <img
                    src="/eSewa.jpg"
                    alt="eSewa QR Code"
                    style={{ maxWidth: "200px", height: "auto" }}
                  />
                  <button
                    type="button"
                    className="btn ghost-btn"
                    onClick={() => setShowEsewaQR(false)}
                  >
                    Close
                  </button>
                </div>
              )}
              {showKhaltiQR && (
                <div className="qr-display">
                  <h3>Scan Khalti QR Code</h3>
                  <img
                    src="/khalti.png"
                    alt="Khalti QR Code"
                    style={{ maxWidth: "200px", height: "auto" }}
                  />
                  <button
                    type="button"
                    className="btn ghost-btn"
                    onClick={() => setShowKhaltiQR(false)}
                  >
                    Close
                  </button>
                </div>
              )}
              <p className="payment-note">
                For now, click the buttons to view the QR codes for payment.
              </p>
              <p className="payment-hint">
                Scan the QR code with your eSewa or Khalti app to complete the
                payment.
              </p>
              {purchaseMessage ? (
                <div className="status-banner">{purchaseMessage}</div>
              ) : null}
            </div>
          </div>
        </section>

        <section id="contact" className="section-panel contact-section">
          <div className="section-heading">
            <span className="label">Say Hello</span>
            <h2>Send a cute message to BIGEM</h2>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Your nickname
              <input
                name="name"
                type="text"
                placeholder="e.g. Bubbles"
                required
              />
            </label>
            <label>
              Favorite thing
              <input
                name="favorite"
                type="text"
                placeholder="e.g. unicorns, candy, rainbows"
                required
              />
            </label>
            <label>
              Message
              <textarea
                name="message"
                rows="4"
                placeholder="Tell BIGEM something sweet..."
                required
              />
            </label>
            <button type="submit" className="btn primary-btn">
              <Heart className="icon" /> Send love
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
