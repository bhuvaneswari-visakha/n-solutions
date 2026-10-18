
import { useState } from "react";
import {
  FiX,
  FiChevronRight,
  FiSend,
  FiArrowLeft,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaSolarPanel,
  FaBuilding,
} from "react-icons/fa";
import { MdFactory, MdAccountBalance } from "react-icons/md";
import "./WhatsAppWidget.css";

const WHATSAPP_NUMBER = "917993836424";

const enquiries = [
  {
    title: "Project Enquiry",
    message:
      "Hello N Solutions Solar, I have a general solar project enquiry.",
    icon: <FaSolarPanel />,
  },
  {
    title: "Commercial",
    message:
      "Hello N Solutions Solar, I am interested in a commercial solar project.",
    icon: <FaBuilding />,
  },
  {
    title: "Industrial",
    message:
      "Hello N Solutions Solar, I am interested in an industrial solar project.",
    icon: <MdFactory />,
  },
  {
    title: "Government",
    message:
      "Hello N Solutions Solar, I am enquiring about a government solar project.",
    icon: <MdAccountBalance />,
  },
];

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomMessage, setShowCustomMessage] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  const openWhatsApp = (message) => {
    if (
      !WHATSAPP_NUMBER ||
      WHATSAPP_NUMBER.includes("YOURNUMBER")
    ) {
      alert("Please configure your business WhatsApp number.");
      return;
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const sendCustomMessage = () => {
    const message = customMessage.trim();

    if (!message) return;

    openWhatsApp(
      `Hello N Solutions Solar! \n\n${message}`
    );
  };

  const closeWidget = () => {
    setIsOpen(false);
    setShowCustomMessage(false);
  };

  return (
    <div className="wa-widget">
      {isOpen && (
        <div className="wa-panel">
          <div className="wa-panel-header">
            <div className="wa-header-icon">
              <FaWhatsapp />
            </div>

            <div className="wa-header-text">
              <h3>N Solutions Solar </h3>
              <p>We're here to help!</p>
            </div>
          </div>

          {!showCustomMessage ? (
            <>
              <div className="wa-welcome">
                <h4>Hello! Welcome to N Solutions Solar!</h4>

                <p>
                  Thank you for your interest in solar energy.
                  We're happy to help you find the right solar
                  solution for your needs.
                </p>

                <p className="wa-welcome-question">
                  How can we assist you today?
                </p>
              </div>

              <div className="wa-options">
                {enquiries.map((item) => (
                  <button
                    type="button"
                    className="wa-option"
                    key={item.title}
                    onClick={() => openWhatsApp(item.message)}
                  >
                    <span className="wa-option-icon">
                      {item.icon}
                    </span>
                    <span className="wa-option-title">
                      {item.title}
                    </span>
                    <FiChevronRight className="wa-chevron" />
                  </button>
                ))}

                <button
                  type="button"
                  className="wa-option"
                  onClick={() => setShowCustomMessage(true)}
                >
                  <span className="wa-option-icon">
                    <FiSend />
                  </span>
                  <span className="wa-option-title">
                    Custom Message
                  </span>
                  <FiChevronRight className="wa-chevron" />
                </button>
              </div>

              <p className="wa-footer-text">
                Let's make your solar project happen!
              </p>
            </>
          ) : (
            <div className="wa-custom-form">
              <button
                type="button"
                className="wa-back-button"
                onClick={() => setShowCustomMessage(false)}
              >
                <FiArrowLeft />
                Back to enquiries
              </button>

              <h4>Write your message </h4>

              <p>
                Tell us what you need. Our team will be happy
                to assist you.
              </p>

              <textarea
                className="wa-custom-textarea"
                placeholder="Type your solar enquiry here..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={5}
                maxLength={1500}
                aria-label="Your custom WhatsApp message"
              />

              <div className="wa-character-count">
                {customMessage.length}/1500
              </div>

              <button
                type="button"
                className="wa-send-button"
                onClick={sendCustomMessage}
                disabled={!customMessage.trim()}
              >
                <FaWhatsapp />
                Continue to WhatsApp
              </button>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        className="wa-toggle"
        aria-label={
          isOpen
            ? "Close WhatsApp enquiries"
            : "Open WhatsApp enquiries"
        }
        aria-expanded={isOpen}
        onClick={() => {
          if (isOpen) {
            closeWidget();
          } else {
            setIsOpen(true);
          }
        }}
      >
        {isOpen ? <FiX /> : <FaWhatsapp />}
      </button>
    </div>
  );
}
