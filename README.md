
# Career Decision Simulator – Career GPS

A data-driven web application that helps users evaluate and simulate career transitions by analyzing their current skills against target roles. It provides actionable insights such as match percentage, skill gaps, difficulty level, and a personalized learning roadmap.

---

## Problem Statement

Many job seekers make career decisions blindly without understanding:

* How prepared they are for a target role
* What skills they are missing
* How long it will take to transition

This leads to inefficient learning paths and repeated rejections.

---

## Solution

Career GPS acts as a **decision engine** that simulates career transitions using structured data and rule-based logic.

It enables users to:

* Analyze their current skillset
* Compare it with industry role requirements
* Get a clear, data-backed transition plan

---

## Key Features

* 🎯 **Match Score Calculation**

  * Calculates compatibility with target roles using skill matching logic

* 🧩 **Skill Gap Analysis**

  * Identifies missing skills required for the desired role

* 📉 **Difficulty Assessment**

  * Evaluates transition difficulty based on skill gaps and role complexity

* ⏳ **Time Estimation**

  * Predicts time required to transition based on missing skills

* 🛣️ **Personalized Roadmap**

  * Step-by-step learning path with structured phases

* 🔄 **What-If Simulation**

  * Dynamically updates results when new skills are added

* 📊 **Interactive Visualizations**

  * Skill coverage charts and progress indicators

---

## 🏗️ System Architecture

```text
User Input → Skill Mapping Engine → Gap Analyzer → Scoring Engine → Output Dashboard
```

---

## ⚙️ Tech Stack

### Frontend

* React.js
* Tailwind CSS / Modern UI styling
* Chart libraries (for visualizations)

### Backend

* Flask (Python)
* REST APIs

### Data Processing

* Rule-based scoring system
* Skill-role mapping dataset

---

## 🧠 Core Logic

* Match Score:
  (User Skills ∩ Required Skills) / Total Required Skills

* Missing Skills:
  Required Skills − User Skills

* Difficulty Score:
  Based on the number of missing skills and role complexity

* Time Estimation:
  Calculated using predefined learning duration per skill

---

## 🚫 Design Philosophy

This system is intentionally built to:

* Work **without dependency on external AI APIs**
* Avoid rate limits and failures
* Demonstrate strong problem-solving and system design skills

Optional AI integration can be added only for enhancing textual insights.

---


## 📦 Setup Instructions

```bash
# Clone repository
git clone <repo-url>

# Navigate to project
cd career-decision-simulator

# Backend setup
cd backend
pip install -r requirements.txt
python app.py

# Frontend setup
cd frontend
npm install
npm start
```

---

## 👨‍💻 Author

Developed by Augustya
Focused on building data-driven products and intelligent systems.

---

## ⭐ Impact

This project demonstrates:

* Product thinking
* System design
* Data-driven decision modeling
* Full-stack development

It is built to solve a real-world problem, not just demonstrate technical skills.
