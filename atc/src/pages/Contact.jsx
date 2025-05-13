import { useState, useCallback, useRef, useEffect } from "react";
import "../css/Contact.css";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';

// Validation patterns
const VALIDATION_PATTERNS = {
    name: /^[a-zA-Z\s]{2,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phonenumber: /^[6-9]\d{9}$/,
};

// Error messages
const ERROR_MESSAGES = {
    name: "Please enter a valid name (letters and spaces only).",
    email: "Please enter a valid email address.",
    phonenumber: "Please enter a valid 10-digit phone number.",
    type: "Please select a business type.",
};

// Business types
const BUSINESS_TYPES = [
    { value: "", label: "Select Business Type" },
    { value: "footwear", label: "Footwear" },
    { value: "hospital", label: "Hospital" },
    { value: "restaurant", label: "Restaurant" },
    { value: "education", label: "Education" },
    { value: "other", label: "Other" },
];

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phonenumber: "",
        type: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const animatedBtnRef = useRef(null);

    const validateField = useCallback((name, value) => {
        if (name === "type") return value ? "" : ERROR_MESSAGES.type;
        if (!value) return "This field is required";
        return VALIDATION_PATTERNS[name].test(value) ? "" : ERROR_MESSAGES[name];
    }, []);

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
            setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
        },
        [validateField]
    );

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            setIsSubmitting(true);

            const newErrors = {};
            Object.keys(formData).forEach((key) => {
                const error = validateField(key, formData[key]);
                if (error) newErrors[key] = error;
            });

            setErrors(newErrors);

            if (Object.keys(newErrors).length === 0) {
                try {
                    const response = await fetch("https://atcbackend.onrender.com/api/contacts/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRFToken": await getCsrfToken(),  // Add this
                        },
                        credentials: "include",  // Add this
                        body: JSON.stringify(formData),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        setResponseMessage("Form submitted successfully!");
                        setFormData({ name: "", email: "", phonenumber: "", type: "" });

                        setTimeout(() => {
                            setResponseMessage("");
                        }, 3000);
                    } else {
                        if (data.message) {
                            setResponseMessage(data.message);
                            setFormData({ name: "", email: "", phonenumber: "", type: "" });
                        } else {
                            setErrors(data);
                        }
                    }
                } catch (error) {
                    console.error("Submission error:", error);
                    setResponseMessage("There was an error submitting the form. Please try again.");
                }
            }

            setIsSubmitting(false);
        },
        [formData, validateField]
    );

    useEffect(() => {
        const btn = animatedBtnRef.current;
        if (!btn) return;

        const handleMouseMove = (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(btn, {
                "--xpos": `${x}px`,
                "--ypos": `${y}px`,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        btn.addEventListener("mousemove", handleMouseMove);

        return () => {
            btn.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="contact-container">
            <Navbar />
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <h2>Contact</h2>

                {responseMessage && <p className="response-message">{responseMessage}</p>}

                <div className="form-grid">
                    {["name", "email", "phonenumber"].map((field) => (
                        <div key={field} className="form-group">
                            <input
                                type={field === "email" ? "email" : field === "phonenumber" ? "tel" : "text"}
                                name={field}
                                placeholder={field === "phonenumber" ? "Phone number" : field.charAt(0).toUpperCase() + field.slice(1)}
                                value={formData[field]}
                                onChange={handleChange}
                                className={errors[field] ? "error-input" : ""}
                            />
                            {errors[field] && <p className="error-message">{errors[field]}</p>}
                        </div>
                    ))}

                    <div className="form-group">
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className={errors.type ? "error-input" : ""}
                        >
                            {BUSINESS_TYPES.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        {errors.type && <p className="error-message">{errors.type}</p>}
                    </div>
                </div>

                <button
                    ref={animatedBtnRef}
                    type="submit"
                    disabled={isSubmitting}
                    className="animated-btn"
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}
