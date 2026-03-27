import React, { useState } from "react";
import faqBg from "../../../images/bg/faq-bg.png";
import subLeftIcon from "../../../images/icon/sub-left-icon.png";
import subRightIcon from "../../../images/icon/sub-right-icon.png";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "Do I need a lot of data to train the AI chatbot?",
    answer:
      "You don’t need much to start. Just provide your website URL, and our tool will automatically scrape and train your AI chatbot. Even with limited data, you can collect customer questions and keep improving the bot. The more data you provide, the smarter and more effective it becomes.",
  },
  {
    id: 2,
    question: "How long does it take to train the chatbot?",
    answer:
      "The setup is instant — once you provide your URL, Aivora begins training automatically. Within minutes, your chatbot is ready to answer real customer queries and continuously improve as it learns.",
  },
  {
    id: 3,
    question: "How can I embed the AI assistant on my website?",
    answer:
      "Simply copy the provided embed code and paste it into your site’s HTML. You can also integrate it with popular CMS platforms like WordPress or Shopify in just a few clicks.",
  },
  {
    id: 4,
    question: "Does it support languages other than English?",
    answer:
      "Yes! Aivora supports 90+ languages, allowing your chatbot to communicate with customers globally in their preferred language.",
  },
  {
    id: 5,
    question: "Can I take control of a conversation if needed?",
    answer:
      "Absolutely. You can jump in anytime and take over a chat session manually if the AI needs human support.",
  },
];

const FAQSection: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="faq pos-rel pt-145 pb-150 bg_img"
      style={{ backgroundImage: `url(${faqBg})` }}
    >
      <div className="container">
        {/* Section Title */}
        <div className="sec-title sec-title--two pricing-sec-title text-center mb-50">
          <span
            className="sub-title mb-25 wow fadeInUp"
            data-wow-duration="600ms"
          >
            <img src={subLeftIcon} alt="icon" /> FAQ’s{" "}
            <img src={subRightIcon} alt="icon" />
          </span>
          <h2
            className="title wow fadeInUp"
            data-wow-delay="150ms"
            data-wow-duration="600ms"
          >
            Have a question Look here
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="row">
          <div className="col-lg-12">
            <div className="xb-faq wow fadeInUp" data-wow-duration="600ms">
              <ul className="accordion_box clearfix list-unstyled">
                {faqs.map((faq, index) => (
                  <li
                    key={faq.id}
                    className={`accordion block ${
                      activeId === faq.id ? "active-block" : ""
                    }`}
                  >
                    {/* Question Button */}
                    <div
                      className={`acc-btn ${
                        activeId === faq.id ? "active" : ""
                      }`}
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      <span className="number">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </span>
                      _ {faq.question}
                      <span className="arrow">
                        <span></span>
                      </span>
                    </div>

                    {/* Answer Body */}
                    <div
                      className={`acc_body ${
                        activeId === faq.id ? "current" : ""
                      }`}
                      style={{
                        maxHeight: activeId === faq.id ? "300px" : "0px",
                        overflow: "hidden",
                        transition: "max-height 0.4s ease",
                      }}
                    >
                      <div className="content">
                        <p>{faq.answer}</p>
                        <ul className="list-unstyled">
                          <li>
                            <i className="far fa-check"></i> Instant Setup –
                            Add your URL, and the chatbot trains itself.
                          </li>
                          <li>
                            <i className="far fa-check"></i> Self-Learning –
                            Learns from real customer questions.
                          </li>
                          <li>
                            <i className="far fa-check"></i> Smarter with Data –
                            More data means better answers.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Shape */}
      <span className="faq-linear-shape"></span>
    </section>
  );
};

export default FAQSection;
