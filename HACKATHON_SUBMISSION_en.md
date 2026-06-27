# AI Business Assistant - Hackathon Submission

**One sentence:** An internal AI academy for SMEs. Each employee enters their real work, and **AI generates a personalized learning path** by department, with an AI tutor alongside them and a dashboard for business owners to manage company-wide progress.

**Live product:** https://hackathon-codex-track-1.vercel.app/
**Quick test flow:** open the link -> **Start assessment** -> enter "Current work" + "Goals" + choose a department -> **Score level** -> view the **AI-generated personal learning path** with a "Confidence %" score -> *Enter lesson* / *Ask tutor* / *View business dashboard*.
**Presentation format:** live product demo to the judges, no video.

> Note: fields in `[brackets]` should be filled with the exact facts before submission, such as backend stack, repo/video links, and member names.

---

## 1. Does the product run? - Rough, but REALLY WORKING

**Yes. It is deployed and usable now**. The "API live" badge on the web app means the AI is connected live, not just mocked.

**End-to-end features that can be verified directly on the live link:**
- **Onboarding Assessment** - employees enter their real job description, self-assess AI experience, prompt confidence, data-safety awareness, goals, and department.
- **AI-generated personal learning path** - from that input, AI scores the employee's level and builds a personalized path with a **"Confidence %"** score. For example, "AI for Marketing - Confidence 73%" with m1-m4 lessons across L1 to L3 and tags such as prompting, tooling, content, and campaign. *This is the AI core: the path follows each employee's real work, instead of being a static one-size-fits-all course.*
- **Lessons** + **AI Tutor** with department and work context already loaded.
- **Learner progress tracking**.
- **Business manager dashboard** - supports multiple departments such as HR, Sales, Marketing, and Accounting; shows average completion, **hours saved** as immediate ROI, for example 33.5h, and department-level progress.

**Technology:** Frontend **Next.js** deployed on Vercel. AI: **LLM API (live)**. Backend/API: **Next.js API route handlers for the active product demo, with a FastAPI + LangGraph/LangChain agent skeleton for future AI workflows**. Database/Auth: **Supabase prepared as the source of truth for organization data, learning records, and tenant isolation**. Source code is in this repository.

**Team and roles:**
- **Hai** - main developer.
- **Toi (Lucas)** - PM, product direction, and UI design.
- **Chien** - gamification design: making company-wide and department-based learning more engaging.

**What we built during the hackathon, stated plainly:**
- Analyzed the business problem, selected the model, and designed the solution.
- Split responsibilities and **rebuilt the whole product in a new direction**.
- Designed a **gamification mechanism** so the whole company, or each department, can learn together in a fun and sticky way.
- **Transparent note:** the idea existed before, **but this new direction had not been built before. Today we rebuilt it from A to Z.** There was an older production version in a different direction; this hackathon version is new code.

**Why this should not be disqualified:**
- **Not just slides:** there is a working web app, usable product flow, and source code in the repo.
- **Not copied:** the idea, including AI-generated paths from real work, department-specific learning, and gamification, plus the source code, is original.
- **Transparent timeline:** we state clearly that the idea existed before, but this new direction was built during the hackathon; the repository commit history shows that. `[fill in: key branch/commit if needed]`

---

## 2. Market Scale - and Why This Is NOT a Tarpit

**Market:** AI application training for SMEs, starting in Vietnam, with **hundreds of thousands of SMEs**, each with multiple departments. The wedge is very specific: companies are *already paying* 5-10 million VND per employee for AI courses, but employees often **cannot apply what they learn afterward**. We sell the missing outcome.

**Sharp differentiation, and why this is not a generic AI wrapper:**
1. **AI generates a learning path from each person's real work, by department** - generic "learn AI" courses cannot do this.
2. **Assessment + AI scoring means learners must prove they can apply the skill before moving on.** This directly attacks the industry's core problem: people learn but do not apply.
3. **Gamified learning by department and company** - this solves the "company buys a course but nobody finishes it" problem through team motivation, one of the biggest adoption barriers in enterprise learning.
4. **ROI is measured directly on the dashboard** through "hours saved", so business owners see value in numbers, not vibes.

**Why we avoid the tarpit traps warned about by the judges:**
- **This is not "replacing people with AI in a low-trust market."** Instead, we **upgrade existing employees**. The buyer, the business owner, and the users, their employees, are in a high-trust relationship. We augment people instead of replacing them.
- **This is not a naive crowded category:** the crowded category is "AI courses"; we compete through *personalization + forced application + gamification*, which existing course products structurally do not provide.

**Clear first customer:** the first department inside an SME. The assessment and learning path already run. One business owner, one department, one obvious pain point.

**Credible expansion path, already designed as land and expand:**
- **Land** with one department inside one SME.
- **Expand inside the same company** - the product is multi-department by design; assign the next department and grow account value without a new sale.
- **Expand to other companies** - repeat the same B2B process; adding a new module is *content work*, not a full product rebuild.

---

## 3. Vibe Check - Why We Believe in This Project

We work with SME owners every week, and we keep seeing the same pattern: they *know* AI matters, they spend real money sending employees to training, and a month later nothing changes. It is not because employees are lazy. It is because nobody teaches them AI **on their actual work**, and nobody requires them to prove they can use it.

This project is our answer to that problem. It is not just a tool we sell; it is **confidence**. The moment someone who used to be "afraid of AI" enters their own job into the product, sees AI build a learning path that fits them, completes an exercise, and unlocks the next level, something changes in how they see themselves. Multiply that across every department in every small business that feels left behind, and that is the future we want to build.

And today, we are not bringing a paper prototype. **It is running for real.** We are just getting started.

- Team: Hai - Toi (Lucas) - Chien - lucasnguyen.vn

---

## Links
- **Live product:** https://hackathon-codex-track-1.vercel.app/
- **Repo:** https://github.com/minhhai203/hackathon-codex-track-1
- **Presentation:** live demo to the judges
