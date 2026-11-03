# 🔥 Professional CV & Resume Writing Landing Page ($4.99)

A high-converting, modern, and mobile-responsive landing page designed for professional CV/Resume writing services. Built with pure HTML5, CSS3, and JavaScript — **zero build tools required**, loads in milliseconds, and ready for **GitHub Pages** with **100% serverless Stripe payment processing**.

---

## 💡 Can You Add Stripe Payment Method Without a Backend?

### **YES! Absolutely 100%.**
Stripe provides official **zero-backend** payment solutions designed specifically for static landing pages like this:

### 1. **Stripe Payment Links (Recommended & Pre-configured)**
With Stripe Payment Links, Stripe hosts the entire PCI-compliant checkout page on their secure servers. You don't need any server, PHP, Node.js, database, or API keys.

#### How to create your Stripe Payment Link in 2 minutes:
1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com/).
2. In the top search bar, search for **Payment Links** (or go to **Payments > Payment Links**).
3. Click **"+ New"** (Create payment link).
4. Select or create your product:
   - **Title**: `Basic CV Package`
   - **Price**: `$4.99` (One-time)
5. **Post-Payment Setup (Crucial)**:
   - Under **"After payment"**, choose **"Don't show confirmation page"** and redirect to:
     - A **Google Form / Typeform** to collect the client's current resume & target role, OR
     - Your **WhatsApp link**: `https://wa.me/YOUR_PHONE_NUMBER?text=Paid+CV+Package`
6. Click **"Create Link"** and copy the resulting URL (e.g., `https://buy.stripe.com/xxxxxx`).
7. Paste this URL into `script.js` in the `CONFIG.stripeLinks` section or directly inside the `data-stripe-link` attribute in `index.html`.

---

### 2. **Stripe Buy Button (Embeddable Web Component)**
If you prefer a direct Stripe button popup without leaving your page:
1. In Stripe Dashboard, go to **Product Catalog** -> Click your Product -> **Create Buy Button**.
2. Stripe gives you a 2-line snippet like:
```html
<script async src="https://js.stripe.com/v3/buy-button.js"></script>
<stripe-buy-button
  buy-button-id="buy_btn_xxxxxx"
  publishable-key="pk_live_xxxxxx">
</stripe-buy-button>
```
3. Paste that snippet anywhere inside `index.html`.

---

## 🚀 How to Publish to GitHub Pages (100% Free Hosting)

Follow these simple steps to put your landing page live on the internet with a free `.github.io` domain or your own custom domain:

### Step 1: Initialize Git and Commit
Open PowerShell or your terminal in this project folder:
```powershell
git init
git add .
git commit -m "Initial commit: High-converting $4.99 CV landing page"
```

### Step 2: Create a New Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g., `cv-writing-service` or `resume-service`).
3. Set visibility to **Public**.
4. Click **Create repository** (do NOT check "Initialize with README").

### Step 3: Link and Push to GitHub
Run the following commands in your terminal (replace `YOUR_USERNAME` and `YOUR_REPO`):
```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your GitHub repository -> click **Settings**.
2. In the left sidebar, click **Pages**.
3. Under **Branch**, select `main` and root `/ (root)`, then click **Save**.
4. Within 1-2 minutes, your website will be live at:
   `https://YOUR_USERNAME.github.io/YOUR_REPO/`

---

## ⚙️ Configuration & Customization

Open `script.js` to customize your details:
```javascript
const CONFIG = {
  // Your WhatsApp number with country code (e.g. 88017XXXXXXXX or 1XXXXXXXXXX)
  whatsappNumber: "1234567890",

  // Your Stripe Payment Links generated from Stripe Dashboard
  stripeLinks: {
    "Basic CV Package": "https://buy.stripe.com/YOUR_LINK_1",
    "Professional CV": "https://buy.stripe.com/YOUR_LINK_2",
    "CV + Cover Letter": "https://buy.stripe.com/YOUR_LINK_3",
    "CV + LinkedIn Revamp": "https://buy.stripe.com/YOUR_LINK_4",
    "Complete Job Package": "https://buy.stripe.com/YOUR_LINK_5"
  }
};
```

To update freelance platform profiles (Fiverr, Upwork, Freelancer), search for `fiverr.com` or `upwork.com` in `index.html` and replace with your profile links.

---

## 📈 High-Converting Ad Copy & Strategy Included

### Ad Copy 1 (Direct Sales)
> 🚀 **Looking for a professional CV that gets noticed by recruiters?**
>
> For only $4.99, I will create a:
> ✅ ATS-Friendly Resume
> ✅ Professional CV Design
> ✅ Job Application Ready Resume
> ✅ Editable Format
> ✅ Fast Delivery
>
> Available worldwide through Fiverr, Upwork & Direct Stripe checkout.
> 📩 Inbox me today and boost your chances of getting interviews!

### Ad Copy 2 (Higher Conversion Hook)
> ❌ **Sending applications but not getting interview calls?**
>
> Your CV might be the problem. Over 75% of resumes get rejected by ATS bots before a recruiter sees them.
>
> ✅ Professional CV Writing
> ✅ ATS Optimization
> ✅ Modern Resume Design
> ✅ International Standard Format
>
> 💰 Starting at only $4.99
> 🌎 Available Worldwide
> 📩 Message now and let's create a CV that recruiters can't ignore.

---

## 📁 Project Structure
```text
├── index.html       # Semantic, SEO-optimized landing page with all packages
├── styles.css       # Clean, modern CSS with responsive design & blue/white styling
├── script.js        # Stripe checkout modal, WhatsApp link generation, FAQ accordion
└── README.md        # Complete documentation & zero-backend Stripe guide
```
