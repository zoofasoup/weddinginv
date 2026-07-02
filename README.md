# Digital Wedding Invitation - Zufar & Salma

This is a single-page, static digital wedding invitation built with HTML, CSS, and JavaScript. It is designed to be mobile-first, fast-loading, and easily deployable to platforms like GitHub Pages, Vercel, or Netlify.

## How to Customize

You can customize the content by editing the `index.html` file directly. Look for the placeholder texts.

### 1. Update Venue Address
Search for `[Placeholder: Nama Jalan, Nomor, Kecamatan, Kota Bogor]` in `index.html` and replace it with the full address of Jelita Venue & Sakha Cafe.

### 2. Update Mother's Name
Search for `[Nama Ibu Salma]` in `index.html` and replace it with the correct name.

### 3. Connect Custom RSVP Form to Google Forms
Instead of an ugly iframe, the invitation now uses a beautifully styled custom HTML form that sends data silently to your Google Form. To connect it:

1. Create a Google Form with 4 Short Answer/Paragraph questions exactly in this order:
   - Nama Lengkap
   - Konfirmasi Kehadiran (Hadir / Tidak Hadir)
   - Jumlah Tamu
   - Ucapan & Doa
2. Get your Form's Action URL:
   - Open your published Google Form, right-click, and select **Inspect**.
   - Search (Ctrl+F) for `<form action="`.
   - Copy the URL (it ends in `/formResponse`).
   - Paste it into `js/main.js` at line 143: `const GOOGLE_FORM_ACTION_URL = '...'`.
3. Get the Entry IDs for your inputs:
   - Still in Inspect mode, search for `name="entry.`.
   - You will find 4 numbers (e.g. `entry.123456789`).
   - Open `index.html` and replace the `name="entry.PLACEHOLDER_...` attributes in the `<input>`, `<select>`, and `<textarea>` tags with your actual entry IDs matching the questions.

### 4. Background Music
There is an `<audio>` element at the top of `index.html`. 
Currently, it looks for `assets/music.mp3`. 
1. Get an MP3 file of your desired background music.
2. Rename it to `music.mp3` (or whatever you prefer, just update the src in HTML).
3. Place it inside the `assets/` folder.

### 5. Bank Account & QRIS
The Bank BCA account number is already set to `5195201941`.
If you want to add a QRIS barcode, uncomment the QRIS HTML block in `index.html` and upload your QRIS image to the `assets` folder (e.g., `assets/qris.png`).

## Testing the Personalized URL
To see the personalized greeting for guests, simply add `?to=Nama+Tamu` to the end of the URL.
Example: `http://127.0.0.1:5500/index.html?to=Budi+Santoso`

## Deployment
Since this is a static site without any build tools, you can simply upload these files directly to a host, or enable **GitHub Pages** on your repository:
1. Go to your GitHub repository Settings.
2. Navigate to **Pages** on the left sidebar.
3. Under Build and deployment -> Source, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder.
5. Click Save. Your site will be live in a few minutes!
