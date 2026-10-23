# Islamia Arts & Science Degree & PG College, Warangal: website

A static website (HTML, CSS, vanilla JavaScript). No framework, no external libraries, no API keys.
The original website source was not available, so this site was **built new** from the supplied photographs, logo, documents and project notes. Design: navy, white and gold (the approved theme; a green redesign was NOT applied).

## 1. Project overview and folder structure

```
index.html   styles.css   script.js   .nojekyll   README.md
assets/
  docs/
    MCom_Computer_Applications_Revised_Curriculum_2024-25.pdf
  images/
    administration/   2 portraits (College Administration & Support)
    campus/           6 gallery photos
    college-logo/     3 files: original logo, logo-192.png and favicon-64.png (derived)
    events/           9 gallery photos
    hero/             6 hero photos
    laboratories/     11 gallery photos
    leadership/       3 portraits
    management/       9 portraits
    social/           instagram-qr.jpg
    sports/           girls_playing_games_1.jpg, girls_playing_games_4.jpg
    ug-faculty/       1 portrait
```

Page sections, in order: brand bar and navigation; hero slider (6 slides); welcome; college facts strip (six items, including the college codes); About the College (ESTD. 1973); Chairman / Secretary / Principal messages (tabs); Leadership; Academics (five confirmed programmes); M.Com. (Computer Applications) with curriculum card and lab photos; Faculty (UG Teaching Staff of 12, then Postgraduate Faculty of 4, with coloured placeholders where no photograph exists); Non-Teaching Staff (9 cards with silhouette placeholders); College Administration & Support (2 cards, each with a college label); Gold Medalists; Campus; Laboratories; Events; Sports; Admissions (with the embedded Admission Enquiry Form); Contact (with the embedded Contact & Feedback Form); Footer; image lightbox.

Notes for maintainers:
- `index.html` was produced by a generator script (`build.py`) that is **not included in this folder**. There is no build step in this project; to change content, edit `index.html`, `styles.css` and `script.js` directly and carefully.
- The two embedded Google Forms (section 6) need an internet connection and are the only content loaded from a third-party site. The generator script mentioned above has **not** been updated with them, so do not regenerate `index.html` from it, or both forms will be lost.
- All paths are relative. External links use `target="_blank"` with `rel="noopener noreferrer"`.
- Below-the-fold images use native lazy loading; the Leadership, PG Faculty, UG Faculty and Administration portraits load immediately so they do not appear as blank boxes in previews that do not scroll.
- Hero photos are shown with `object-fit: contain` (not cropped). Portraits are JPEG copies, 560 px wide; gallery photos are resized JPEGs. The Instagram QR image and the curriculum PDF are byte-identical copies of the supplied files.
- Names, designations and qualifications come only from information supplied by the owner. Do not invent or substitute any, and do not replace missing photos with generated faces.

## 2. Run locally

- Simplest: open `index.html` in a browser. Keep the whole folder together, because the images and PDF are in `assets/` next to `index.html`.
- Or serve it from this folder: `python3 -m http.server 8765 --bind 127.0.0.1`, then visit http://127.0.0.1:8765/ (this is the command used for the testing below).

## 3. Hosting on GitHub Pages

Steps (standard GitHub Pages setup; **not yet tested on a live GitHub Pages site**):
1. Create a repository and upload the **contents** of this folder, so `index.html` is at the repository root. `.nojekyll` is included.
2. In the repository: Settings, Pages, Source "Deploy from a branch", branch `main`, folder `/ (root)`.
3. The site is then served at `https://<user>.github.io/<repository>/`. All paths are relative, so a subfolder URL should work.

**Deployment status:** the site has not been deployed anywhere. **Not tested:** deployment to GitHub Pages, the live URL, and whether the PDF, QR image, external links and the two embedded Google Forms behave correctly there. Check them after the first deployment. The site has been run only locally.

## 4. Contact section (as shown on the site)

- Address: M.G.M. Road, Auto Nagar, Kothawada, Warangal, Telangana – 506007, India
- Official postal address: H.No. 11-26-225, Opp: M.G.M. Hospital, Warangal - 506 007 (Telangana State). It is shown in the Contact section and the footer. The older address line above is kept alongside it.
- College codes: UG / Degree College Code **008**; PG College Code **008 PG**. They appear in the Contact section and as two items in the facts strip.
- Office hours: 9:30 AM – 4:30 PM
- Phones (shown by role; `tel:` links):
  - Principal: 97041 16260 (`tel:+919704116260`)
  - Vice Principal: 77998 71141 (`tel:+917799871141`)
  - Office Superintendent: 98492 03329 (`tel:+919849203329`)
  - System Administrator: 99665 29610 (`tel:+919966529610`)
- Emails (`mailto:` links):
  - General college email: islamia.idcwarangal@gmail.com
  - PG Department email: islamiacollege.pg@gmail.com
- Google Maps: https://maps.app.goo.gl/pb5S5ovoeQRvwzPF8
- Affiliation: Kakatiya University. Managed by the Islamia Education Society, Warangal.
- The Contact section also ends with the embedded Contact & Feedback Form (section 6).

## 5. Social media links (Contact section and footer)

- Instagram: https://instagram.com/islamiacollegewgl?utm_source=qr&xtok=MTlzaWswcDl3bXdqeQ==
- YouTube: https://youtube.com/@islamiacollegewarangal?si=4qcvOSqNR8Nc4JNC
- WhatsApp channel: https://whatsapp.com/channel/0029VbDNTFEDZ4LfXg87uo47

### Instagram QR image
- Location: `assets/images/social/instagram-qr.jpg` (1052 × 1600 px, identical to the supplied file).
- It is displayed unmodified; the `.ig-qr` rule in `styles.css` only crops the *display* to the white QR card.

## 6. Embedded Google Forms

Two Google Forms are embedded with `<iframe>` elements. The form questions, settings and responses are managed entirely in Google Forms. They were not created or changed here, and no questions were invented.

| | Admission Enquiry Form | Contact & Feedback Form |
|---|---|---|
| Section | Admissions (`#admissions`), between the admissions notice and the **Contact the College** button | Contact (`#contact`), at the end of the section, after the Google Maps button |
| Block id | `admission-enquiry` | `contact-feedback` |
| Heading (h3) | "Admission Enquiry Form" (`#enquiry-h`) | "Contact & Feedback Form" (`#feedback-h`) |
| Iframe title | "Islamia College Admission Enquiry Form" | "Islamia College Contact and Feedback Form" |
| Embed URL | https://docs.google.com/forms/d/e/1FAIpQLScYsNxRPlH-VSSDeWBnL9IKtKikIx1kuHf2NER8WwqqI0H6Yg/viewform?embedded=true | https://docs.google.com/forms/d/e/1FAIpQLScWkt_4X4Ty1Cg3V7lesuOXpxipkyHwWWSYzJiA4KEelu9rjQ/viewform?embedded=true |

- Each block has a short instruction above the form, and says to use the contact details on the page if the form does not appear. The existing admissions notice and the **Contact the College** button are unchanged.
- Styling: the shared classes `.enquiry`, `.enquiry__intro` and `.enquiry__frame` at the end of `styles.css`. The frame fills the available width up to 40rem.
- **Fixed iframe heights:** each iframe is **1000 px** tall (`height="1000"` plus CSS), and **1200 px at 600 px viewport width and below**. The page cannot read the form's length from Google, so these heights are estimates. If a form is taller, it scrolls inside its frame; if shorter, white space shows below it. **These heights must be checked in a real browser with the live forms, then adjusted in `styles.css` (`.enquiry__frame iframe` and its `@media (max-width: 600px)` rule) and, if desired, the `height` attribute in `index.html`.**
- To change a form, replace the `src` URL of the matching iframe in `index.html` (keep `?embedded=true`) and update the table above.

**Current limitation: live rendering and submission were NOT verified.** In the test environment, requests to Google Forms returned HTTP 403 (blocked), so neither form could be loaded. Only the page layout was tested, with each form request replaced by a stand-in page. That showed the iframes fit the page at 360, 390, 768, 1024 and 1440 px with no horizontal scrolling and no console errors. Not verified: that either form displays in a real browser, that the questions look right inside the frame, that a submission succeeds, and that responses reach the intended Google Sheet or inbox. Test both forms on the real site, with a test submission, before publishing.

## 7. M.Com. curriculum PDF

- Location: `assets/docs/MCom_Computer_Applications_Revised_Curriculum_2024-25.pdf` (identical to the supplied file).
- How it is linked: in `index.html`, the `#mcom` section contains a card with id `mcom-curriculum`. It has two buttons pointing to the same file:
  - **View**: `href="assets/docs/MCom_Computer_Applications_Revised_Curriculum_2024-25.pdf"`, opens in a new tab (`target="_blank" rel="noopener noreferrer"`).
  - **Download**: the same path with the `download` attribute.
- The card describes the curriculum as four semesters, effective 2024–2025.
- **M.Com. eligibility card** (`#mcom-eligibility`, just before the curriculum card) shows only the wording supplied by the owner: educational qualification (any graduation from a recognized university, as specified in the TG CPGET Information Brochure); admission through the Telangana Common Post Graduate Entrance Test (TG CPGET), subject to the applicable eligibility conditions and counselling rules; course duration of 2 years (4 semesters); a note that eligibility, qualifying marks, reservation benefits and admission requirements are subject to the latest official TG CPGET guidelines and university rules; a link to the official admission portal https://cpget.ouadmissions.com/ (new tab); and a pointer to the curriculum PDF. No other criteria, marks or dates were added.
- **Fees and admission dates are not published** and must not be added until the college supplies them. The live portal link was not opened in testing.
- If the PDF is renamed or moved, update both buttons.

## 7a. Current design and recent changes (navy, gold and white)

The approved theme is **navy, white and gold**. Changes are additive blocks at the end of `styles.css` (the original rules are unchanged) and two small blocks at the end of `script.js`.
- **Header and brand bar:** gold top line, larger college name, logo in a rounded-square badge. **Navigation:** sticky, animated gold underline for hover and active states, soft shadow once scrolled.
- **Hero:** deep navy stage with ornamental gold frame. Photographs are still shown uncropped (`object-fit: contain`), in the original order, with a slide-number plaque and caption, and the existing slider controls. Autoplay is paused under reduced-motion settings.
- **Mobile menu fix:** at 1099 px and below the open menu used to squeeze into a column beside the Menu button (also in the original build). The bar now wraps and the list is full width. CSS only.
- **Facts strip:** six items (Affiliation, Management, Programmes, Location, UG / Degree College Code 008, PG College Code 008 PG), laid out 3 × 2 on wide screens.
- **Footer:** contains the official postal address (see section 4).
- **Faculty placeholders:** every faculty card without a photograph shows the same person silhouette as the Non-Teaching Staff cards, in pastel blue, green or purple. The UG list has 12 cards: 3 real photographs and 9 placeholders in the order blue, green, purple (repeating). The PG list has 4 cards: 3 real photographs and Mohd. Rafiuddin's placeholder, which is green. Each placeholder has an accessible label "Faculty photograph not available for <name>". The old blank grey boxes are gone. To add a photograph later, replace the placeholder block in that card with an `<img>`.
- **Administration labels:** Mohd. Azmathullah Khan Javid (Office Superintendent, M.A. English) has the secondary lines "Degree College Administration" and "Islamia Arts and Science Degree College, Warangal". MD Tajuddin Hussain (System Administrator, Department M.Com., B.Tech (Computer Science and Engineering)) has "PG College — IT & Technical Support" and "Islamia Arts and Science PG College, Warangal".
- **UG faculty experience and titles (as supplied by the owner):** Mrs. Arshiya Tabassum 18 Years; Dr. Meer Kowkab Ali 42 Years; Mr. Syed Mushtaq Ahmad 4 Years; Mrs. Fouzia Mohammadi 4 Years; Mrs. Uzma Iram 3 Years. Titles are "Mr. Syed Mushtaq Ahmad" and "Mrs. Uzma Iram". Experience years are fixed text and need manual updating.

## 8. Known missing item

- `girls playing games 3.jpeg` (a sports photo) was never received. The Sports section therefore shows only two photos. Add it to `assets/images/sports/` and to the Sports section when supplied.

## 9. Items needing college confirmation

- **Establishment year: 1973 (confirmed by the college).** The "ESTD. 1973" badge, its label, the large "1973" and the History text all stay as they are. The 2005 dates are not establishment years: the Society Celebrations hero caption reads "5 February 2005" (an Islamia Education Society event) and the Gold Medalists table lists 2005 as a year of achievement (Juveriya Tabassum, B.A.). Both are kept exactly as supplied. **The Society event date of 5 February 2005 has not been independently verified by the college.** The photos in slides 1 and 5 show a Society centenary banner (1905–2005); this has also not been verified.
- **Admissions:** admission dates and fees are not published. M.Com. fees are not published either; M.Com. eligibility and duration appear only in the wording supplied (section 7). The college should confirm the eligibility wording and whether the codes and postal address are final.
- **Google Forms:** the college should confirm who receives the responses from both forms and that the form owner's settings allow public responses. This was not checked.
- **Photo authenticity and captions not verified:** botany, chemistry and B.Com lab photos; zoology lab 1; the parking photos; the Swachh Bharat photo; the Haritha Haram photo (shows "Junior College" signage); the Independence Day "75th Independence Celebration" caption and the Annual Day "22 Dec 2022" note (both read from banners in the photos); the generic "College campus" and "College building" captions.
- **Gold medalists:** hall-ticket numbers are kept exactly as supplied and were not checked against college records.
- **Staff experience years** are fixed text and will go out of date; update them manually.
- **Phone numbers** are shown by role only, as supplied.
- **Faculty photographs:** Mohd. Rafiuddin (PG Faculty) and 9 of the 12 UG Teaching Staff cards show coloured placeholders (section 7a) until photographs are supplied.
- **College name:** the site writes "PG" in the official name; whether the college prefers "P.G." has not been confirmed.
- **Existing ZIP:** `islamia-college-website.zip` (outside this folder) predates the redesign and later changes and must be regenerated, with your approval, before any release.
- The Society-celebrations hero photo is small (867 × 240 px) and looks soft on wide screens.

## 10. Testing

### Performed (headless Chromium via Playwright, local server, at 360, 390, 768, 1024 and 1440 px)
- External link targets and new-tab behaviour (external sites stubbed, not loaded live); link attributes, `mailto:` / `tel:` values, `noopener noreferrer` on external links.
- Internal anchors and nav/footer click targets.
- Content of the 12 UG profiles, the PG list, Academics, Admissions and Contact.
- All 63 images load.
- Instagram QR file hash identical to the supplied upload.
- Keyboard Tab order and focus outlines in Contact; footer accessibility tree.
- No horizontal scrolling and no console errors.
- The PDF is served as 200 `application/pdf`, and the Download button saves the correct filename.
- Both Google Form blocks: heading, instruction, iframe title and URL present; iframe width inside the page margins (318, 348, 638, 638 and 638 px at the five widths); no horizontal scrolling; no console errors. The Google requests were replaced by stand-in pages, so this tests the page layout only.
- Earlier rounds: hero slider controls and order, message tabs, mobile menu, lightbox open/close with Esc, gold medalist table.

### Re-run for the current version
- Headless Chromium at 360, 390, 768, 1024 and 1440 px: no horizontal scroll, no console or network errors, hero photos uncropped, slider (next, previous, dots, pause, ArrowRight), mobile menu and Esc, scrollspy and anchor jumps clear of the sticky nav, message tabs, lightbox, reduced motion, form URLs unchanged, external link `rel`, PDF links, QR present (21 checks at 360-1024 px and 20 at 1440 px, where the mobile-menu checks do not apply; all passed).
- Code inspection of `index.html`: no duplicate IDs, no broken internal links, no unclosed tags, all local assets exist, iframe titles present, `aria-labelledby` / `aria-controls` targets exist, one `h1`, no skipped heading levels.
- Faculty experience values, titles, both administration labels, and the 10 coloured placeholders (and the real photographs) confirmed in the markup; layout checked in screenshots.

### Not tested
- Real phones and touch devices; Safari; Firefox; a real screen reader. The new header, hero and placeholder colours were not checked for contrast beyond the earlier Stage 1 measurements.
- The live Instagram, YouTube, WhatsApp and Google Maps pages.
- Scanning the QR code (the available reader could not decode it); scan it with a phone before publishing.
- The PDF displaying in a browser tab (the headless browser has no PDF viewer); the PDF pages 5–31 were not read.
- Placing a call or sending an email from the links.
- **Live Google Forms:** rendering, fixed iframe heights against the real forms, keyboard use inside the iframes, and form submission (Google returned 403 in the test environment).
- Deployment and behaviour on GitHub Pages.
- **Response delivery of both Google Forms** (who receives submissions) and the live CPGET portal link.
