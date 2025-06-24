const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

const ADMIN_CRED_PATH = path.join(__dirname, 'admin.json');

// Initialize SQLite DB
const db = new sqlite3.Database('./waitlist.db', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    db.run(`CREATE TABLE IF NOT EXISTS waitlist (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      suggestion TEXT
    )`);
    console.log('Connected to SQLite database.');
  }
});

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email and phone validation helpers
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) {
  return /^\d{10}$/.test(phone);
}

// Helper to get/set admin credentials
function getAdminCreds() {
  if (fs.existsSync(ADMIN_CRED_PATH)) {
    return JSON.parse(fs.readFileSync(ADMIN_CRED_PATH, 'utf8'));
  }
  // Default fallback
  return { username: 'admin', password: 'admin123' };
}
function setAdminCreds({ username, password }) {
  fs.writeFileSync(ADMIN_CRED_PATH, JSON.stringify({ username, password }), 'utf8');
}

// API endpoint to add to waitlist
app.post('/api/waitlist', (req, res) => {
  const { name, email, phone, suggestion } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are required.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }
  if (!isValidPhone(phone)) {
    return res.status(400).json({ error: 'Phone number must be 10 digits.' });
  }
  db.get(
    'SELECT id FROM waitlist WHERE email = ? AND phone = ?',
    [email, phone],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error.' });
      }
      if (row) {
        return res.status(400).json({ error: 'You are already in the waitlist.' });
      }
      db.get('SELECT IFNULL(MAX(id), 0) + 1 as nextId FROM waitlist', [], (err, idRow) => {
        if (err) return res.status(500).json({ error: 'Database error.' });
        const nextId = idRow.nextId;
        db.run(
          'INSERT INTO waitlist (id, name, email, phone, suggestion) VALUES (?, ?, ?, ?, ?)',
          [nextId, name, email, phone, suggestion],
          function (err) {
            if (err) {
              return res.status(500).json({ error: 'Database error.' });
            }
            // Send confirmation email
            const mailOptions = {
              from: process.env.SMTP_FROM || process.env.SMTP_USER,
              to: email,
              subject: 'Thanks for signing up ✌️ | CredWorth.AI Early Access',
              html: `
  <div style="background:#fff; margin:0; padding:0; font-family:'Segoe UI',Arial,sans-serif;">
    <div style="background:#6557FF; padding:36px 0 24px 0; text-align:center;">
      <span style="font-size:2.3rem; font-weight:800; color:#fff; letter-spacing:-1px;">CredWorth.AI</span>
    </div>
    <div style="background:#F4F2FF; padding:24px 0 18px 0; text-align:center; border-bottom:1.5px solid #e5e5e5;">
      <span style="font-size:1.45rem; font-weight:700; color:#6557FF;">Thanks for signing up ✌️</span>
    </div>
    <div style="max-width:600px; margin:0 auto; background:#fff; padding:36px 32px 32px 32px;">
      <div style="font-size:1.08rem; color:#222;">
        <p style="font-weight:700; font-size:1.13rem; margin-bottom:18px;">Hi ${name},</p>
        <p>You've officially made it to my early access watchlist. That means you'll be among the first to experience how I assess the creditworthiness of Indian companies—intelligently, instantly, and confidentially.</p>
        <p>I'm designed to work 24/7, never take a break, and never miss a signal—so you can make sharper, faster credit decisions with confidence.</p>
        <p style="margin:28px 0 10px 0; font-weight:600;">I got your following details stored in my phone book.</p>
        <ul style="margin:0 0 24px 18px; padding:0; color:#222;">
          <li>Name: <b>${name}</b></li>
          <li>Mobile: <b>${phone}</b></li>
          <li>Email ID: <b>${email}</b></li>
          <li>Suggestions: <b>${suggestion ? suggestion : '—'}</b></li>
        </ul>
        <div style="font-weight:700; margin-bottom:8px; margin-top:30px; font-size:1.08rem;">
          <span style="font-size:1.2em;">🧠</span> What happens next?
        </div>
        <p style="margin-bottom:10px;">I'm still learning and evolving. Before I go live, We will stay in touch with some useful updates. You can expect early access, feature previews, and maybe even a few surprises.</p>
        <p style="margin-bottom:10px;">If you've submitted feature suggestions, thank you. I'm already thinking them through. If not, you still can – just reply to this email.</p>
        <p style="margin-bottom:0;">Until then, I'll keep your spot reserved.</p>
      </div>
    </div>
    <div style="background:#6557FF; color:#fff; padding:32px 0 24px 0; text-align:left; margin-top:32px;">
      <div style="max-width:600px; margin:0 auto; padding:0 32px;">
        <div style="font-size:1.08rem; font-weight:700; margin-bottom:8px;">Regards</div>
        <div style="font-size:1.02rem; font-weight:500;">Raji M (He/Him)<br/>Co-Founder & CEO<br/>Mobile: +91 9880481023<br/>Email: Raji@CredWorth.AI</div>
      </div>
    </div>
  </div>
            `
            };
            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                console.error('Email send error:', err);
                return res.json({ success: true, id: nextId, emailSent: false });
              }
              res.json({ success: true, id: nextId, emailSent: true });
            });
          }
        );
      });
    }
  );
});

// --- ADMIN ENDPOINTS START ---

// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const creds = getAdminCreds();
  if (username === creds.username && password === creds.password) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Change admin credentials endpoint
app.post('/api/admin/change-credentials', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  setAdminCreds({ username, password });
  res.json({ success: true });
});

// Get all waitlist data (no auth for demo, add auth in production)
app.get('/api/admin/data', (req, res) => {
  db.all('SELECT * FROM waitlist', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Delete a waitlist entry by id
app.delete('/api/admin/delete/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM waitlist WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Entry not found' });
      return;
    }
    // Re-number all ids to be sequential after delete
    db.all('SELECT rowid, id FROM waitlist ORDER BY id', [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      let updates = rows.map((row, idx) => new Promise((resolve, reject) => {
        db.run('UPDATE waitlist SET id = ? WHERE rowid = ?', [idx + 1, row.rowid], function(err) {
          if (err) reject(err); else resolve();
        });
      }));
      Promise.all(updates).then(() => {
        res.json({ success: true });
      }).catch(e => {
        res.status(500).json({ error: e.message });
      });
    });
  });
});

// Renumber all waitlist IDs to be sequential (1, 2, 3, ...)
app.post('/api/admin/renumber-ids', (req, res) => {
  db.all('SELECT rowid, id FROM waitlist ORDER BY id', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    let updates = rows.map((row, idx) => new Promise((resolve, reject) => {
      db.run('UPDATE waitlist SET id = ? WHERE rowid = ?', [idx + 1, row.rowid], function(err) {
        if (err) reject(err); else resolve();
      });
    }));
    Promise.all(updates).then(() => {
      res.json({ success: true, count: rows.length });
    }).catch(e => {
      res.status(500).json({ error: e.message });
    });
  });
});
// --- ADMIN ENDPOINTS END ---

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 