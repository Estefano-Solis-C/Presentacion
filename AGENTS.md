# AGENTS.md — Repository Constitution & Engineering Standards
**Project:** Portal Web Institucional y Plataforma de Admisión — I.E.P. "Dora Mayer de Zulen"  
**Domain:** `doramayerdezulen.edu.pe`  
**Location:** Calle Ricardo Bentín 749, Urb. Ventura Rossi, Rímac, Lima, Perú  
**Version:** 1.0.0 (Production-Grade High-Concurrency Prototype)

---

## 1. INSTITUTIONAL TRUTH DATA & CONTEXT (NON-NEGOTIABLE)

1. **Identity & Heritage:**
   - **Full Name:** Institución Educativa Privada "Dora Mayer de Zulen".
   - **Motto:** "Estudio – Trabajo – Amistad".
   - **Trajectory:** Over 65 years serving the youth of Rímac (Founded in 1957).
   - **Historic Founders:** **Prof. Paulino Lapa ("El Dire")** and **Yolanda Salinas**.
   - **Addresses:** Originally founded on Calle Monitor Huáscar; currently at **Calle Ricardo Bentín 749, Urb. Ventura Rossi, Rímac, Lima**.
2. **Visual Identity & Color Palette:**
   - **Deep Navy Blue:** `#0F296B` (Institutional authority, primary headers, dark surfaces).
   - **Mayerino Sky Blue:** `#0284C7` (Youth, secondary accents, active states).
   - **Warm Gold / Amber:** `#F59E0B` (Academic prestige, trust badges, highlights).
   - **Crest Red:** `#DC2626` (School crest accent, book of wisdom, alerts).
   - **Canvas Fog:** `#F8FAFC` (Clean, warm paper-like background).
   - **Official Mascot:** Academic Owl wearing glasses and graduation cap bearing the school crest, holding a red book.
3. **Educational Levels:**
   - **Inicial (3, 4 y 5 años):** Psicomotricidad, aprestamiento y lectoescritura, desarrollo de la creatividad, laboratorio de cómputo infantil, juegos recreativos, inglés temprano, departamento de psicología.
   - **Primaria (1° a 6° grado):** Currículo nacional actualizado, tareas dirigidas en clase, laboratorio de cómputo y ciencias, inglés intensivo, talleres artísticos y folklóricos, seguimiento psicopedagógico.
   - **Secundaria (1° a 5° año):** Orientación preuniversitaria rigurosa, simulacros de admisión periódicos, laboratorios especializados de Biología/Química y Cómputo, seminarios audiovisuales, inglés, departamento de psicología.
4. **Key Institutional Differentiators:**
   - **Tareas realizadas en clase:** Los estudiantes refuerzan y completan sus actividades con orientación docente directa en el aula, aliviando la sobrecarga en el hogar.
   - **Atención Psicológica Permanente:** Orientación profesional continua a estudiantes y escuela de padres.
   - **Laboratorios y Recursos Especializados:** Cómputo, Ciencias y Multimedia.
   - **Vacaciones Útiles:** Programa formativo de verano (refuerzo académico, robótica/cómputo, danzas y deportes).
5. **Omnichannel Contact Data:**
   - **WhatsApp de Admisión:** `+51 966057981`
   - **Teléfono Fijo:** `(01) 4815770`
   - **Correos Electrónicos:** `secretaria@doramayerdezulen.edu.pe` y `doramayer1957@gmail.com`
   - **Facebook Institucional:** `https://www.facebook.com/iepdoramayerdezulen/` (`@iepdoramayerdezulen`)

---

## 2. HIGH-CONCURRENCY ARCHITECTURAL LAWS (2,000 CONCURRENT USERS)

The platform must withstand **2,000 concurrent parents** hitting the landing page, academic explorer, and enrollment gateway during admission campaigns on Render and TiDB Serverless.

```
                    ┌────────────────────────────────────────────────────────┐
                    │               2,000 CONCURRENT PARENTS                 │
                    └──────────────────────────┬─────────────────────────────┘
                                               │
                                 HTTPS (HTTP/2 + Brotli / Gzip)
                                               │
                    ┌──────────────────────────▼─────────────────────────────┐
                    │                 RENDER STATIC CDN / EDGE               │
                    │   Angular 18+ SPA (Initial Gzipped Bundle < 250 KB)    │
                    │   @defer (on viewport) for below-the-fold content      │
                    └──────────────────────────┬─────────────────────────────┘
                                               │ REST API
                                               │
                    ┌──────────────────────────▼─────────────────────────────┐
                    │            SPRING BOOT 3.3.4 (JAVA 21)                 │
                    │    Virtual Threads enabled (spring.threads.virtual)    │
                    │    Bucket4j IP Rate Limiting (5 POSTs/min/IP)          │
                    │    RAM Limit: <= 384 MB (Memory optimized JVM)         │
                    └─────────────┬───────────────────────────┬──────────────┘
                                  │                           │
                   Cache HIT (90% read traffic)     Cache MISS / Async Writes (10%)
                                  │                           │
                    ┌─────────────▼─────────────┐ ┌───────────▼──────────────┐
                    │    CAFFEINE CACHE (RAM)   │ │  HIKARICP CONNECTION POOL │
                    │  Response Time < 1 ms     │ │  maximum-pool-size: 5    │
                    │  TTL: 10m public data     │ │  sslMode: VERIFY_IDENTITY│
                    └───────────────────────────┘ └───────────┬──────────────┘
                                                              │
                                                  ┌───────────▼──────────────┐
                                                  │      TiDB SERVERLESS     │
                                                  │  Indexed Distributed SQL │
                                                  └──────────────────────────┘
```

1. **Virtual Threads Exclusivity:** All blocking I/O (database, external SMTP, file operations) runs on Java 21 Virtual Threads. No manual thread pool instantiation. Avoid `synchronized` blocks in I/O paths to eliminate carrier thread pinning.
2. **Caffeine In-Memory RAM Caching:**
   - All public read endpoints (`/api/v1/events`, `/api/v1/levels`, `/api/v1/testimonials`, `/api/v1/workshops`) MUST be cached using Caffeine.
   - Public requests must hit RAM and respond in $<1\text{ ms}$, ensuring TiDB receives zero queries during read-heavy surges.
3. **TiDB Serverless Connection Safety:**
   - HikariCP pool size MUST NOT exceed 5 connections (`maximum-pool-size=5`, `minimum-idle=1`, `connection-timeout=10000ms`).
   - All transactions must be short-lived. Never execute external calls (email, WhatsApp) inside a database transaction.
4. **Asynchronous Form Offloading:**
   - Form submissions (Enrollment, Summer Workshops, Contact) must write to TiDB and immediately return `200 OK` ($<50\text{ ms}$).
   - Email notifications and WhatsApp payload generation MUST execute asynchronously (`@Async`).

---

## 3. STRICT CODING CONVENTIONS & STACK STANDARDS

### Frontend (Angular 18/19+ & Tailwind CSS)
- **100% Standalone Components:** `standalone: true` on every component, pipe, and directive. Zero `NgModule`.
- **Reactive State via Signals:** Use `signal()`, `computed()`, and `effect()`. Avoid raw RxJS subjects in components unless interfacing with complex streaming.
- **Change Detection:** `ChangeDetectionStrategy.OnPush` on every single component.
- **Bundle Size Budget:** Initial gzipped JavaScript bundle MUST be strictly $\le 250\text{ KB}$.
  - Use Angular deferrable views: `@defer (on viewport)` for below-the-fold sections.
- **Forbidden Libraries:** No jQuery, no Bootstrap, no FontAwesome, no heavy carousels (Swiper/Slick). Testimonials carousel MUST use native CSS Scroll Snap (`scroll-snap-type: x mandatory`).
- **Strict Forms:** Reactive Forms with typed interfaces and explicit Peruvian validation rules.

### Backend (Java 21 + Spring Boot 3.3+)
- **Data Transfer Objects (DTOs):** Immutable Java 21 `record` with `jakarta.validation` annotations.
- **Strict Validation Rules:**
  - Peruvian DNI: Exactly 8 numeric digits (`^[0-9]{8}$`).
  - Carné de Extranjería (CE): 9 to 12 alphanumeric characters.
  - Peruvian Mobile Phone: Exactly 9 numeric digits starting with 9 (`^9[0-9]{8}$`).
  - Legal Consents: Boolean flags (`aceptaTerminos`, `aceptaPoliticaDatos`) must be `true`.
- **Exception Handling:** Unified RFC 7807 `ProblemDetail` via `@RestControllerAdvice`.
- **Logging & Auditing:** Client IP, timestamp, and user-agent recorded for all legal consent actions.

---

## 4. SECURITY & PERUVIAN LEGAL COMPLIANCE

1. **Ley N° 29733 (Ley de Protección de Datos Personales):**
   - Checkbox for privacy policy acceptance MUST be unchecked by default.
   - The user's explicit consent timestamp (`consent_timestamp`) and IP address (`ip_address`) MUST be persisted in the database.
   - Purpose limitation clause must explicitly state that student/parent data is collected solely for the educational admission process.
   - Clear disclosure of ARCO rights (Acceso, Rectificación, Cancelación y Oposición) with contact email `secretaria@doramayerdezulen.edu.pe`.
2. **Indecopi — Libro de Reclamaciones Virtual (D.S. 011-2011-PCM):**
   - Visible, accessible link on the institutional portal.
   - Clear categorization between **Reclamo** (disconformity with educational service) and **Queja** (malestar regarding administrative/staff attention).
   - Automated correlative registration code: `DMS-LR-YYYY-NNNN`.
   - Mandatory tracking of the non-extendable **15-business-day** statutory response deadline.
3. **OWASP Top 10 & Network Security:**
   - Security Headers: `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`.
   - Honeypot Anti-Bot Field: Hidden form input; if populated, request is silently rejected.
   - IP Rate Limiting: Max 5 submissions per minute per IP via Bucket4j in-memory filter.

---

## 5. VISUAL RULES & ASSET DISCIPLINE

1. **Strict Ban on AI-Generated Images:**
   - No synthetic people, artificial classrooms, or distorted AI imagery.
   - Visual richness is achieved via:
     - Pure CSS modern UI techniques: mesh gradients with Mayerino colors, glassmorphic headers, subtle SVG geometric patterns.
     - Official institutional iconography and crest.
     - Real photographic asset placeholders for founders and campus history.
2. **Mandatory `outline-icons` (`https://github.com/outline/outline-icons`):**
   - Zero icon font requests (no `.woff2`, no FontAwesome).
   - Dedicated standalone `OutlineIconComponent` (`<app-icon name="...">`) embedding clean, tree-shakable inline SVG paths with `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="2"`.

---

## 6. AUDIT & VERIFICATION COMMITMENT
Any code alteration or architectural change must be accompanied by an update to `AUDIT_LOG.md` following the Sequential Thinking protocol.
