import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    flat_no: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit  = async (e) => {
    e.preventDefault();
    console.log("Submit clicked", formData);
  
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const data = await res.json();
      console.log('Response from server:', data);  // Log the response from the server
      alert(data.message || "Form submitted!");
  
      // Clear the form
      setFormData({
        name: '',
        flat_no: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div style={styles.wrapper} id="contact">
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Contact Us</h2>

        <label style={styles.label}>Name:</label>
        <input
          type="text"
          name="name"
          style={styles.input}
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label style={styles.label}>Flat No.:</label>
        <input
          type="text"
          name="flat_no"
          style={styles.input}
          placeholder="Enter your flat number"
          value={formData.flat_no}
          onChange={handleChange}
          required
        />

        <label style={styles.label}>Email:</label>
        <input
          type="email"
          name="email"
          style={styles.input}
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label style={styles.label}>Message:</label>
        <textarea
          name="message"
          style={styles.textarea}
          placeholder="Write your message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button style={styles.button} type="submit">Submit</button>
      </form>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#777',
    padding: '50px 0',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: "0",
  },
  form: {
    backgroundColor: '#bfb8b8',
    padding: '50px',
    borderRadius: '40px',
    width: '90%',
    maxWidth: '700px',
    boxShadow: '0px 8px 16px rgba(0,0,0,0.3)',
  },
  heading: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: '30px',
    fontSize: '30px',
    fontWeight: 'bold',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: '1px solid #333',
    borderRadius: '6px',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '12px',
    border: '1px solid #333',
    borderRadius: '6px',
    fontSize: '16px',
    marginBottom: '20px',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  }
};

export default Contact;
