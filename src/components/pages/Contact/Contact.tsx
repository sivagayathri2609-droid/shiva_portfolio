import { useState, useCallback } from "react";
import { Mail, Phone, MapPin, Clock, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/Button/Button";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { useInView } from "@/hooks/use-in-view";
import contactImage from "@/assets/contact-character.png";
import "./Contact.css";

const contactInfo = [
  { icon: Mail,    label: "Email",        value: "ggayathri4142@gmail.com" },
  { icon: Phone,   label: "Phone",        value: "+91 7904695594" },
  { icon: MapPin,  label: "Location",     value: "Nagercoil, Tamil Nadu, India" },
  { icon: Clock,   label: "Availability", value: "Open for new opportunities" },
];

/* ── Validation rules ── */
const RULES = {
  name: (v: string) => {
    const t = v.trim();
    if (!t) return "Please enter your name.";
    if (!/^[A-Za-z\s]+$/.test(t)) return "Name can only contain letters.";
    if (t.length < 2)  return "Name must be at least 2 characters.";
    if (t.length > 50) return "Name cannot exceed 50 characters.";
    return "";
  },
  email: (v: string) => {
    if (!v.trim()) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return "Please enter a valid email address.";
    return "";
  },
  subject: (v: string) => {
    const t = v.trim();
    if (!t) return "Please enter a subject.";
    if (t.length < 3)   return "Subject must be at least 3 characters.";
    if (t.length > 100) return "Subject cannot exceed 100 characters.";
    return "";
  },
  message: (v: string) => {
    const t = v.trim();
    if (!t) return "Please enter your message.";
    if (t.length < 10)   return "Message must be at least 10 characters.";
    if (t.length > 1000) return "Message cannot exceed 1000 characters.";
    return "";
  },
};

type Field = keyof typeof RULES;
type FormState = Record<Field, string>;
type ErrorState = Record<Field, string>;
type TouchedState = Record<Field, boolean>;

/* ── Sanitize: strip HTML/JS injection ── */
function sanitize(s: string): string {
  return s.replace(/[<>"'`]/g, "");
}

const EMPTY_FORM: FormState = { name: "", email: "", subject: "", message: "" };
const EMPTY_ERRORS: ErrorState = { name: "", email: "", subject: "", message: "" };
const EMPTY_TOUCHED: TouchedState = { name: false, email: false, subject: false, message: false };

export function Contact() {
  const [form,    setForm]    = useState<FormState>(EMPTY_FORM);
  const [errors,  setErrors]  = useState<ErrorState>(EMPTY_ERRORS);
  const [touched, setTouched] = useState<TouchedState>(EMPTY_TOUCHED);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { ref: pageRef, inView: pageIn } = useInView<HTMLDivElement>({ threshold: 0.1 });

  /* Validate a single field */
  const validateField = useCallback((key: Field, value: string): string => {
    return RULES[key](sanitize(value));
  }, []);

  /* Handle input change — real-time validation if field was touched */
  const handleChange = (key: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = sanitize(e.target.value);
    setForm(f => ({ ...f, [key]: val }));
    if (touched[key]) {
      setErrors(err => ({ ...err, [key]: validateField(key, val) }));
    }
  };

  /* On blur — mark touched and validate */
  const handleBlur = (key: Field) => () => {
    setTouched(t => ({ ...t, [key]: true }));
    setErrors(err => ({ ...err, [key]: validateField(key, form[key]) }));
  };

  /* Submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || success) return;

    // Mark all as touched and validate everything
    const allTouched = { name: true, email: true, subject: true, message: true };
    setTouched(allTouched);
    const newErrors: ErrorState = {
      name:    validateField("name",    form.name),
      email:   validateField("email",   form.email),
      subject: validateField("subject", form.subject),
      message: validateField("message", form.message),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    setSubmitting(true);
    // Simulate async submission (replace with real API call)
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setSuccess(true);
    setForm(EMPTY_FORM);
    setErrors(EMPTY_ERRORS);
    setTouched(EMPTY_TOUCHED);
    setTimeout(() => setSuccess(false), 6000);
  };

  const fields: { key: Field; label: string; type?: string }[] = [
    { key: "name",    label: "Your Name" },
    { key: "email",   label: "Your Email", type: "email" },
  ];

  return (
    <div ref={pageRef} className={`page-section contact-page ${pageIn ? "anim-in" : ""}`}>
      <div className="anim-child anim-child--1">
        <PageHeader badge="Contact" titleStart="Get In" titleAccent="Touch" align="left" />
      </div>

      <div className="contact-grid anim-child anim-child--2">
        <form
          className="contact-form"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Contact form"
        >
          {/* Name + Email row */}
          <div className="form-row">
            {fields.map(({ key, label, type = "text" }) => (
              <div key={key} className="form-field">
                <input
                  id={`field-${key}`}
                  className={`form-input ${errors[key] && touched[key] ? "form-input--error" : ""}`}
                  type={type}
                  placeholder={label}
                  value={form[key]}
                  onChange={handleChange(key)}
                  onBlur={handleBlur(key)}
                  aria-invalid={!!(errors[key] && touched[key])}
                  aria-describedby={errors[key] ? `err-${key}` : undefined}
                  disabled={submitting}
                  autoComplete={key === "email" ? "email" : "name"}
                />
                {errors[key] && touched[key] && (
                  <span id={`err-${key}`} className="form-error" role="alert">{errors[key]}</span>
                )}
              </div>
            ))}
          </div>

          {/* Subject */}
          <div className="form-field">
            <input
              id="field-subject"
              className={`form-input ${errors.subject && touched.subject ? "form-input--error" : ""}`}
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange("subject")}
              onBlur={handleBlur("subject")}
              aria-invalid={!!(errors.subject && touched.subject)}
              aria-describedby={errors.subject ? "err-subject" : undefined}
              disabled={submitting}
            />
            {errors.subject && touched.subject && (
              <span id="err-subject" className="form-error" role="alert">{errors.subject}</span>
            )}
          </div>

          {/* Message */}
          <div className="form-field">
            <textarea
              id="field-message"
              className={`form-input form-textarea ${errors.message && touched.message ? "form-input--error" : ""}`}
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange("message")}
              onBlur={handleBlur("message")}
              rows={6}
              aria-invalid={!!(errors.message && touched.message)}
              aria-describedby={errors.message ? "err-message" : undefined}
              disabled={submitting}
            />
            <div className="form-meta-row">
              {errors.message && touched.message ? (
                <span id="err-message" className="form-error" role="alert">{errors.message}</span>
              ) : <span />}
              <span className="form-char-count">{form.message.length}/1000</span>
            </div>
          </div>

          {/* Success banner */}
          {success && (
            <div className="form-success" role="status" aria-live="polite">
              <CheckCircle2 size={18} />
              Thank you! Your message has been sent successfully.
            </div>
          )}

          <Button
            variant="primary"
            type="submit"
            className="contact-submit"
            disabled={submitting}
          >
            {submitting ? (
              <><Loader2 size={16} className="spin" /> Sending…</>
            ) : "Send Message"}
          </Button>
        </form>

        <div className="contact-image">
          <img src={contactImage} alt="Contact" loading="lazy" />
        </div>
      </div>

      <div className="contact-info anim-child anim-child--3">
        {contactInfo.map(({ icon: Icon, label, value }) => (
          <div key={label} className="ci-item">
            <span className="ci-icon"><Icon size={20} /></span>
            <div>
              <p className="ci-label">{label}</p>
              <p className="ci-value">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
